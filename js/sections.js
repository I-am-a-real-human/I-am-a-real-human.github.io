let dataset, svg
let salarySizeScale, salaryXScale, categoryColorScale
let simulation, nodes
let categoryLegend, salaryLegend

const margin = { left: 170, top: 50, bottom: 50, right: 20 }
const width = 1000 - margin.left - margin.right
const height = 950 - margin.top - margin.bottom

//Read Data, convert numerical categories into floats
//Create the initial visualisation


d3.csv('/data/lga_by_field.csv', function (d) {
  return {
    LGA: d.LGA,
    Field_Of_Study: d.Field_Of_Study, 
    Count: +d.Count,
    X: +d.X,
    Y: +d.Y
  };
}).then(data => {
  dataset = data
  console.log(dataset)
  createScales()
  setTimeout(drawInitial(), 100)
})

const colors = [
  '#ffcc00', '#ff6666', '#cc0066', '#66cccc', '#f688bb', 
  '#65587f', '#baf1a1', '#333333', '#75b79e', '#66cccc', 
  '#9de3d0', '#f1935c', '#0c7b93', '#eab0d9', 
  '#baf1a1', '#9399ff'
]

//Create all the scales and save to global variables

function createScales() {
  countScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d.Count))
    .range([5, 35])

  // scale for xy positions
  xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d.X))
    .range([0, width])

  yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d.Y))
    .range([height, 0])
}




// All the initial elements should be create in the drawInitial function
// As they are required, their attributes can be modified
// They can be shown or hidden using their 'opacity' attribute
// Each element should also have an associated class name for easy reference

function drawInitial() {

  let svg = d3.select("#vis")
    .append('svg')
    .attr('width', 1000)
    .attr('height', 950)
    .attr('opacity', 1)


  // Instantiates the force simulation
  // Has no forces. Actual forces are added and removed as required

  simulation = d3.forceSimulation(dataset)

  // Define each tick of simulation
  simulation.on('tick', () => {
    nodes
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  })

  // Stop the simulation until later
  simulation.stop()

  // Selection of all the circles 
  nodes = svg
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('fill', 'black')
    .attr('r', 3)
    .attr('cx', (d, i) => d.X)
    .attr('cy', (d, i) => d.Y)
    .attr('opacity', 0.8)

  // Add mouseover and mouseout events for all circles
  // Changes opacity and adds border
  svg.selectAll('circle')
    .on('mouseover', mouseOver)
    .on('mouseout', mouseOut)
    
  function mouseOver(d, i) {

    d3.select(this)
      .transition('mouseover').duration(100)
      .attr('opacity', 1)
      .attr('stroke-width', 5)
      .attr('stroke', 'black')

    d3.select('#tooltip')
      .style('left', (d3.event.pageX + 10) + 'px')
      .style('top', (d3.event.pageY - 25) + 'px')
      .style('display', 'inline-block')
      .html(`<strong>Field Of Study:</strong> $${d3.format(",.2r")(d.FieldOfStudy)} 
             <br> 
             <strong># Count:</strong> ${d3.format(",.2r")(d.Count)}`)
  }

  function mouseOut(d, i) {
    d3.select('#tooltip')
      .style('display', 'none')

    d3.select(this)
      .transition('mouseout').duration(100)
      .attr('opacity', 0.8)
      .attr('stroke-width', 0)
  }
  draw1();
}

//Cleaning Function
//Will hide all the elements which are not necessary for a given chart type 

function clean(chartType) {
  let svg = d3.select('#vis').select('svg')
  if (chartType !== "isScatter") {
    svg.select('.scatter-x').transition().attr('opacity', 0)
    svg.select('.scatter-y').transition().attr('opacity', 0)
    svg.select('.best-fit').transition().duration(200).attr('opacity', 0)
  }
  if (chartType !== "isMultiples") {
    svg.selectAll('.lab-text').transition().attr('opacity', 0)
      .attr('x', 1800)
    svg.selectAll('.cat-rect').transition().attr('opacity', 0)
      .attr('x', 1800)
  }
  if (chartType !== "isFirst") {
    svg.select('.first-axis').transition().attr('opacity', 0)
    svg.selectAll('.small-text').transition().attr('opacity', 0)
      .attr('x', -200)
  }
  if (chartType !== "isHist") {
    svg.selectAll('.hist-axis').transition().attr('opacity', 0)
  }
  if (chartType !== "isBubble") {
    svg.select('.enrolment-axis').transition().attr('opacity', 0)
  }
}

//First draw function

function draw1() {
  let svg = d3.select("#vis").select('svg');
  console.log("draw1")
  clean('none');

  svg.selectAll('circle')
      .transition().duration(300).delay((d, i) => i * 5)
      .attr('r', d => countScale(d.Count));

  simulation  
      .force('charge', d3.forceManyBody().strength([2]))
      .force('forceX', d3.forceX(d => xScale(d.X)))
      .force('forceY', d3.forceY(d => yScale(d.Y)))
      .force('collide', d3.forceCollide(d => countScale(d.Count) + 4))
      .alphaDecay([0.2]);

  //Reheat simulation and restart
  simulation.alpha(0.9).restart();
}

// TODO

//Array of all the graph functions
//Will be called from the scroller functionality

let activationFunctions = [
  draw1
]

// All the scrolling function
// Will draw a new graph based on the index provided by the scroll


let scroll = scroller()
  .container(d3.select('#graphic'))
scroll()

let lastIndex, activeIndex = 0

scroll.on('active', function (index) {
  d3.selectAll('.step')
    .transition().duration(500)
    .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

  activeIndex = index
  let sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
  let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
  scrolledSections.forEach(i => {
    activationFunctions[i]();
  })
  lastIndex = activeIndex;

})

scroll.on('progress', function (index, progress) {
  if (index == 2 & progress > 0.7) {

  }
})

