let dataset, svg
let salarySizeScale, salaryXScale, categoryColorScale
let simulation, nodes
let categoryLegend, salaryLegend

const margin = { left: 170, top: 50, bottom: 50, right: 20 }
const width = 1000 - margin.left - margin.right
const height = 950 - margin.top - margin.bottom

//Read Data, convert numerical categories into floats
//Create the initial visualisation

var industry_data = [
  {Industry: "Accommodation and food services", Employment_2024: 231344, Annual_employment_growth_rate_2024_2027: 0.006, Employment_growth_2024_2027: 4301, Retirements_2024_2027: 11968, Total_new_workers_expected_by_2027: 16270}, 
  {Industry: "Administrative and support services", Employment_2024: 112442, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -114, Retirements_2024_2027: 10248, Total_new_workers_expected_by_2027: 10134}, 
  {Industry: "Agriculture, forestry and fishing", Employment_2024: 80985, Annual_employment_growth_rate_2024_2027: -0.002, Employment_growth_2024_2027: -446, Retirements_2024_2027: 7990, Total_new_workers_expected_by_2027: 7544}, 
  {Industry: "Arts and recreation services", Employment_2024: 71301, Annual_employment_growth_rate_2024_2027: 0.002, Employment_growth_2024_2027: 331, Retirements_2024_2027: 3996, Total_new_workers_expected_by_2027: 4327}, 
  {Industry: "Construction", Employment_2024: 367164, Annual_employment_growth_rate_2024_2027: 0.042, Employment_growth_2024_2027: 48725, Retirements_2024_2027: 19865, Total_new_workers_expected_by_2027: 68590}, 
  {Industry: "Education and training", Employment_2024: 305953, Annual_employment_growth_rate_2024_2027: 0.01, Employment_growth_2024_2027: 9585, Retirements_2024_2027: 22289, Total_new_workers_expected_by_2027: 31874}, 
  {Industry: "Electricity, gas, water and waste services", Employment_2024: 45041, Annual_employment_growth_rate_2024_2027: 0.012, Employment_growth_2024_2027: 1586, Retirements_2024_2027: 2735, Total_new_workers_expected_by_2027: 4321}, 
  {Industry: "Financial and insurance services", Employment_2024: 159620, Annual_employment_growth_rate_2024_2027: 0.015, Employment_growth_2024_2027: 7188, Retirements_2024_2027: 7741, Total_new_workers_expected_by_2027: 14929}, 
  {Industry: "Health care and social assistance", Employment_2024: 574520, Annual_employment_growth_rate_2024_2027: 0.028, Employment_growth_2024_2027: 49358, Retirements_2024_2027: 37125, Total_new_workers_expected_by_2027: 86482}, 
  {Industry: "Information media and telecommunications", Employment_2024: 56992, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -2, Retirements_2024_2027: 2906, Total_new_workers_expected_by_2027: 2904}, 
  {Industry: "Manufacturing", Employment_2024: 260243, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -56, Retirements_2024_2027: 17268, Total_new_workers_expected_by_2027: 17212}, 
  {Industry: "Mining", Employment_2024: 9167, Annual_employment_growth_rate_2024_2027: 0.014, Employment_growth_2024_2027: 377, Retirements_2024_2027: 643, Total_new_workers_expected_by_2027: 1020}, 
  {Industry: "Other services", Employment_2024: 130957, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -158, Retirements_2024_2027: 7554, Total_new_workers_expected_by_2027: 7396}, 
  {Industry: "Professional, scientific and technical services", Employment_2024: 375289, Annual_employment_growth_rate_2024_2027: 0.023, Employment_growth_2024_2027: 26023, Retirements_2024_2027: 16597, Total_new_workers_expected_by_2027: 42620}, 
  {Industry: "Public administration and safety", Employment_2024: 181941, Annual_employment_growth_rate_2024_2027: 0.011, Employment_growth_2024_2027: 6112, Retirements_2024_2027: 11356, Total_new_workers_expected_by_2027: 17468}, 
  {Industry: "Rental, hiring and real estate services", Employment_2024: 60008, Annual_employment_growth_rate_2024_2027: 0.018, Employment_growth_2024_2027: 3273, Retirements_2024_2027: 3656, Total_new_workers_expected_by_2027: 6929}, 
  {Industry: "Retail trade", Employment_2024: 362511, Annual_employment_growth_rate_2024_2027: 0.004, Employment_growth_2024_2027: 4303, Retirements_2024_2027: 18724, Total_new_workers_expected_by_2027: 23027}, 
  {Industry: "Transport, postal and warehousing", Employment_2024: 191030, Annual_employment_growth_rate_2024_2027: 0.012, Employment_growth_2024_2027: 7156, Retirements_2024_2027: 15157, Total_new_workers_expected_by_2027: 22313}, 
  {Industry: "Wholesale trade", Employment_2024: 102073, Annual_employment_growth_rate_2024_2027: 0.001, Employment_growth_2024_2027: 419, Retirements_2024_2027: 6388, Total_new_workers_expected_by_2027: 6807},   
];


// bring industry_data object into d3 object



// d3.csv('/data/lga_by_field.csv', function (d) {
//   return {
//     LGA: d.LGA,
//     Field_Of_Study: d.Field_Of_Study, 
//     Count: +d.Count,
//     X: +d.X,
//     Y: +d.Y
//   };
// }).then(data => {
//   dataset = data
//   console.log(dataset)
createScales()
setTimeout(drawInitial(), 100)
// })

const colors = [
  '#ffcc00', '#ff6666', '#cc0066', '#66cccc', '#f688bb', 
  '#65587f', '#baf1a1', '#333333', '#75b79e', '#66cccc', 
  '#9de3d0', '#f1935c', '#0c7b93', '#eab0d9', 
  '#baf1a1', '#9399ff'
]

//Create all the scales and save to global variables

function createScales() {
  Employment_2024Scale = d3.scaleLinear()
    .domain(d3.extent(industry_data, d => d.Employment_2024))
    .range([5, 35])

  // scale for xy positions
  xScale = d3.scaleLinear()
    .domain(d3.extent(industry_data, d => d.x))
    .range([0, width])

  yScale = d3.scaleLinear()
    .domain(d3.extent(industry_data, d => d.y))
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

    console.log("draw initial");

  // Instantiates the force simulation
  // Has no forces. Actual forces are added and removed as required

  simulation = d3.forceSimulation(industry_data)

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
    .data(industry_data)
    .enter()
    .append('circle')
    .attr('fill', 'black')
    .attr('r', 10)
    .attr('cx', (d, i) => Math.random() * 1000)
    .attr('cy', (d, i) => Math.random() * 950)
    .attr('opacity', 0.8)
    console.log(industry_data);
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
      .attr('r', d => Employment_2024Scale(d.Count));

  simulation  
      .force('charge', d3.forceManyBody().strength([2]))
      // .force('forceX', d3.forceX(d => xScale(d.x)))
      // .force('forceY', d3.forceY(d => yScale(d.y)))
      .force('collide', d3.forceCollide(d => Employment_2024Scale(d.Count) + 4))
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

