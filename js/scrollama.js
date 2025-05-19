const margin = { left: 20, top: 50, bottom: 50, right: 20 };
var simulation;
var xAxis;
var yAxis;
var yScale;
var xScale;
var nodes;
var line;
var line_data;
var path;
var line_length;
var xCentroidScale;
var yCentroidScale;
var regionalRadiusScale;

var regional_sim;

const industry_data = [
    { Industry: "Accommodation and food services", Employment_2024: 231344, Annual_employment_growth_rate_2024_2027: 0.006, Employment_growth_2024_2027: 4301, Retirements_2024_2027: 11968, Total_new_workers_expected_by_2027: 16270, Feb_25_Vacancies: 38.7 },
    { Industry: "Administrative and support services", Employment_2024: 112442, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -114, Retirements_2024_2027: 10248, Total_new_workers_expected_by_2027: 10134, Feb_25_Vacancies: 25.4 },
    { Industry: "Agriculture, forestry and fishing", Employment_2024: 80985, Annual_employment_growth_rate_2024_2027: -0.002, Employment_growth_2024_2027: -446, Retirements_2024_2027: 7990, Total_new_workers_expected_by_2027: 7544, Feb_25_Vacancies: 0 },
    { Industry: "Arts and recreation services", Employment_2024: 71301, Annual_employment_growth_rate_2024_2027: 0.002, Employment_growth_2024_2027: 331, Retirements_2024_2027: 3996, Total_new_workers_expected_by_2027: 4327, Feb_25_Vacancies: 4.6 },
    { Industry: "Construction", Employment_2024: 367164, Annual_employment_growth_rate_2024_2027: 0.042, Employment_growth_2024_2027: 48725, Retirements_2024_2027: 19865, Total_new_workers_expected_by_2027: 68590, Feb_25_Vacancies: 18.5 },
    { Industry: "Education and training", Employment_2024: 305953, Annual_employment_growth_rate_2024_2027: 0.01, Employment_growth_2024_2027: 9585, Retirements_2024_2027: 22289, Total_new_workers_expected_by_2027: 31874, Feb_25_Vacancies: 11.6 },
    { Industry: "Electricity, gas, water and waste services", Employment_2024: 45041, Annual_employment_growth_rate_2024_2027: 0.012, Employment_growth_2024_2027: 1586, Retirements_2024_2027: 2735, Total_new_workers_expected_by_2027: 4321, Feb_25_Vacancies: 3.9 },
    { Industry: "Financial and insurance services", Employment_2024: 159620, Annual_employment_growth_rate_2024_2027: 0.015, Employment_growth_2024_2027: 7188, Retirements_2024_2027: 7741, Total_new_workers_expected_by_2027: 14929, Feb_25_Vacancies: 11.8 },
    { Industry: "Health care and social assistance", Employment_2024: 574520, Annual_employment_growth_rate_2024_2027: 0.028, Employment_growth_2024_2027: 49358, Retirements_2024_2027: 37125, Total_new_workers_expected_by_2027: 86482, Feb_25_Vacancies: 59.1 },
    { Industry: "Information media and telecommunications", Employment_2024: 56992, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -2, Retirements_2024_2027: 2906, Total_new_workers_expected_by_2027: 2904, Feb_25_Vacancies: 3.7 },
    { Industry: "Manufacturing", Employment_2024: 260243, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -56, Retirements_2024_2027: 17268, Total_new_workers_expected_by_2027: 17212, Feb_25_Vacancies: 18.2 },
    { Industry: "Mining", Employment_2024: 9167, Annual_employment_growth_rate_2024_2027: 0.014, Employment_growth_2024_2027: 377, Retirements_2024_2027: 643, Total_new_workers_expected_by_2027: 1020, Feb_25_Vacancies: 10.3 },
    { Industry: "Other services", Employment_2024: 130957, Annual_employment_growth_rate_2024_2027: 0, Employment_growth_2024_2027: -158, Retirements_2024_2027: 7554, Total_new_workers_expected_by_2027: 7396, Feb_25_Vacancies: 13.4 },
    { Industry: "Professional, scientific and technical services", Employment_2024: 375289, Annual_employment_growth_rate_2024_2027: 0.023, Employment_growth_2024_2027: 26023, Retirements_2024_2027: 16597, Total_new_workers_expected_by_2027: 42620, Feb_25_Vacancies: 34.1 },
    { Industry: "Public administration and safety", Employment_2024: 181941, Annual_employment_growth_rate_2024_2027: 0.011, Employment_growth_2024_2027: 6112, Retirements_2024_2027: 11356, Total_new_workers_expected_by_2027: 17468, Feb_25_Vacancies: 20.4 },
    { Industry: "Rental, hiring and real estate services", Employment_2024: 60008, Annual_employment_growth_rate_2024_2027: 0.018, Employment_growth_2024_2027: 3273, Retirements_2024_2027: 3656, Total_new_workers_expected_by_2027: 6929, Feb_25_Vacancies: 6.5 },
    { Industry: "Retail trade", Employment_2024: 362511, Annual_employment_growth_rate_2024_2027: 0.004, Employment_growth_2024_2027: 4303, Retirements_2024_2027: 18724, Total_new_workers_expected_by_2027: 23027, Feb_25_Vacancies: 25.6 },
    { Industry: "Transport, postal and warehousing", Employment_2024: 191030, Annual_employment_growth_rate_2024_2027: 0.012, Employment_growth_2024_2027: 7156, Retirements_2024_2027: 15157, Total_new_workers_expected_by_2027: 22313, Feb_25_Vacancies: 11.2 },
    { Industry: "Wholesale trade", Employment_2024: 102073, Annual_employment_growth_rate_2024_2027: 0.001, Employment_growth_2024_2027: 419, Retirements_2024_2027: 6388, Total_new_workers_expected_by_2027: 6807, Feb_25_Vacancies: 12.2 },
];

const health_income = [
    { Weekly_Income: "$1-$149", Count: 1, Pct: 0.00823695889593803 },
    { Weekly_Income: "$150-$299", Count: 2, Pct: 0.0186604233523279 },
    { Weekly_Income: "$300-$399", Count: 3, Pct: 0.0256460282967458 },
    { Weekly_Income: "$400-$499", Count: 5, Pct: 0.0377873012242189 },
    { Weekly_Income: "$500-$649", Count: 9, Pct: 0.073134686499954 },
    { Weekly_Income: "$650-$799", Count: 12, Pct: 0.0998526631637726 },
    { Weekly_Income: "$800-$999", Count: 16, Pct: 0.129342456107302 },
    { Weekly_Income: "$1,000-$1,249", Count: 18, Pct: 0.151463164669658 },
    { Weekly_Income: "$1,250-$1,499", Count: 14, Pct: 0.113877694727943 },
    { Weekly_Income: "$1,500-$1,749", Count: 12, Pct: 0.100864062146094 },
    { Weekly_Income: "$1,750-$1,999", Count: 8, Pct: 0.0697125249766212 },
    { Weekly_Income: "$2,000-$2,999", Count: 12, Pct: 0.0947844554031356 },
    { Weekly_Income: "$3,000-$3,499", Count: 2, Pct: 0.0200261483639332 },
    { Weekly_Income: "$3,500 or more", Count: 6, Pct: 0.046945956310255 }
]

const region_shapes = [
    { Region: "Loddon Campaspe", x0: 223.0189, y0: 470.0378, x1: 355.4717, y1: 579.9623, centroid: [289.2453, 525.0001] }, 
    { Region: "Goulburn", x0: 355.4717, y0: 442.3022, x1: 439.9246, y1: 524.4911, centroid: [397.6982, 483.3967] }, 
    { Region: "Ovens Murray", x0: 439.9247, y0: 425.2076, x1: 535.9247, y1: 501.1697, centroid: [487.9247, 463.1886] }, 
    { Region: "Gippsland", x0: 439.9246, y0: 349.2454, x1: 652.5284, y1: 470.0378, centroid: [546.2265, 409.6416] }, 
    { Region: "Mallee", x0: 159.6227, y0: 425.2076, x1: 223.0188, y1: 460.6414, centroid: [191.3208, 442.9245] }, 
    { Region: "Wimmera Southern Mallee", x0: 104.6038, y0: 389.7736, x1: 223.0189, y1: 449.0942, centroid: [163.8113, 419.4339] }, 
    { Region: "Great South Coast", x0: 94.86787, y0: 330.453, x1: 175.0189, y1: 423.5096, centroid: [134.9434, 376.9813] }, 
    { Region: "Central Highlands", x0: 175.0189, y0: 360.1133, x1: 307.4717, y1: 453.1699, centroid: [241.2453, 406.6416] }, 
    { Region: "Barwon", x0: 175.0189, y0: 267.0567, x1: 307.4717, y1: 360.1133, centroid: [241.2453, 313.585] }, 
    { Region: "Metropolitan", x0: 307.4717, y0: 272.9433, x1: 439.9246, y1: 431.0942, centroid: [373.6982, 352.0187] }     
]

const occupations = [
    "Registered nurses", "Aged and disabled carers", "Receptionists", "Nursing support and personal care workers", "Child carers", "Welfare support workers", "General practitioners and resident medical officers", "General clerks", "Occupational therapists", "Health and welfare services managers", "Social workers", "Physiotherapists", "Psychologists", "Medical technicians", "Welfare, recreation and community arts workers", "Dental assistants", "Kitchenhands", "Commercial cleaners", "Medical imaging professionals", "Counsellors", "Ambulance officers and paramedics", "Massage therapists", "Practice managers", "Enrolled and mothercraft nurses", "Nurse managers", "Dental practitioners", "Contract, program and project administrators", "Chiropractors and osteopaths", "Midwives", "Other medical practitioners", "Audiologists and speech pathologists \ therapists", "Human resource managers", "Accounting clerks", "Human resource clerks", "Specialist physicians", "Child care centre managers", "Other miscellaneous technicians and trades workers", "Payroll clerks", "Keyboard operators",
    "Information officers", "Human resource professionals", "Office managers", "Chefs", "Complementary health therapists", "Management and organisation analysts", "Pharmacists", "Podiatrists", "Personal assistants", "Optometrists and orthoptists", "Other health diagnostic and promotion professionals", "Advertising, public relations and sales managers", "Nutrition professionals", "Other information and organisation professionals", "Medical laboratory scientists", "General managers", "Cooks", "Anaesthetists", "Sales assistants (general)", "Accountants", "Surgeons", "Other specialist managers", "Policy and planning managers", "Occupational and environmental health professionals", "Early childhood (pre-primary school) teachers", "Finance managers", "Packers", "Diversional therapists", "Dental hygienists, technicians and therapists", "Chief executives and managing directors", "Advertising and marketing professionals", "Bookkeepers", "Ict support technicians", "Nurse educators and researchers", "Database and systems administrators, and ict security specialists", "Software and applications programmers", "Retail managers", "Other machine operators", "Ict managers",
    "Other natural and physical science professionals", "Filing and registry clerks", "Training and development professionals", "Personal care consultants", "Purchasing and supply logistics clerks", "Public relations professionals", "Other hospitality, retail and service managers", "Storepersons", "Call or contact centre and customer service managers", "Psychiatrists", "Handypersons", "Couriers and postal deliverers", "Research and development managers", "Corporate services managers", "Other personal service workers", "Archivists, curators and records managers", "Call or contact centre workers", "Security officers and guards", "Education aides", "Housekeepers", "Ict business and systems analysts", "Intelligence and policy analysts", "Technical sales representatives", "Secretaries", "Social professionals", "Education advisers and reviewers", "Other miscellaneous clerical and administrative workers", "Domestic cleaners", "Supply, distribution and procurement managers", "Gardeners", "Laundry workers", "Life scientists", "Computer network professionals", "Conference and event organisers", "Indigenous health workers", "Beauty therapists", "Other accommodation and hospitality managers", "Special care workers", "Other engineering professionals",
    "Production managers", "Journalists and other writers", "Switchboard operators", "Auditors, company secretaries and corporate treasurers", "Graphic and web designers, and illustrators", "Vocational education teachers \ polytechnic teachers", "Ministers of religion", "Inspectors and regulatory officers", "Cafe and restaurant managers", "Sales representatives", "Fitness instructors", "Special education teachers", "Real estate sales agents", "Waiters", "Actuaries, mathematicians and statisticians", "Judicial and other legal professionals", "Science technicians", "Street vendors and related salespersons", "Delivery drivers", "Solicitors", "Construction managers", "Private tutors and teachers", "Financial investment advisers and managers", "Transport and despatch clerks", "Other building and engineering technicians", "Truck drivers", "Insurance, money market and statistical clerks", "Primary school teachers", "Bar attendants and baristas", "Precision metal trades workers", "Animal attendants and trainers", "Garden and nursery labourers", "Telemarketers", "Forklift drivers", "Ict support and test engineers"
]

const occColourScale = d3.scaleSequential()
    .domain([0, occupations.length])
    .interpolator(d3.interpolateRgb('#FFFFFF', '#C26A77'))

const region_strokes = {
    "Loddon Campaspe" : '#bc4a8b',
    "Goulburn" : '#6cc24a',
    "Ovens Murray" : '#8094dd',
    "Gippsland" : '#05c3de',
    "Mallee" : '#c54644',
    "Wimmera Southern Mallee" : '#974a8a',
    "Great South Coast" : '#5cb8b2',
    "Central Highlands" : '#ffb81c',
    "Barwon" : '#c8102e',
    "Metropolitan" : '#999999'
}


var full_data;
d3.json("/data/full_health_data.json").then(function (data) {
    full_data = data;
    // add centroid from region_shapes to full_data based on Region value
    full_data.forEach(function (d) {
        region_shapes.forEach(function (r) {
            if (d.Region === r.Region) {
                d.centroid = r.centroid;
            }
        })
    })
    regionalRadiusScale = d3.scaleLinear()
    .domain([0, d3.max(full_data, d => d.Count)])
    .range([3, 35]);
    console.log(full_data);
});




colours = {
    "Accommodation and food services": '#bbbbbb',
    "Administrative and support services": '#4477aa',
    "Agriculture, forestry and fishing": '#228833',
    "Arts and recreation services": '#66ccee',
    "Construction": '#ccbb44',
    "Education and training": '#ee6677',
    "Electricity, gas, water and waste services": '#aa3377',
    "Financial and insurance services": '#5da899',
    "Health care and social assistance": '#c26a77',
    "Information media and telecommunications": '#9f4a96',
    "Manufacturing": '#7e2954',
    "Mining": '#337538',
    "Other services": '#2e2585',
    "Professional, scientific and technical services": '#dccd7d',
    "Public administration and safety": '#94cbec',
    "Rental, hiring and real estate services": '#f0e442',
    "Retail trade": '#e69f00',
    "Transport, postal and warehousing": '#d55e00',
    "Wholesale trade": '#ff5f00',
}

text_colours = {
    "Accommodation and food services": '#000000',
    "Administrative and support services": '#000000',
    "Agriculture, forestry and fishing": '#ffffff',
    "Arts and recreation services": '#000000',
    "Construction": '#ffffff',
    "Education and training": '#ffffff',
    "Electricity, gas, water and waste services": '#ffffff',
    "Financial and insurance services": '#ffffff',
    "Health care and social assistance": '#ffffff',
    "Information media and telecommunications": '#ffffff',
    "Manufacturing": '#ffffff',
    "Mining": '#ffffff',
    "Other services": '#ffffff',
    "Professional, scientific and technical services": '#000000',
    "Public administration and safety": '#ffffff',
    "Rental, hiring and real estate services": '#000000',
    "Retail trade": '#ffffff',
    "Transport, postal and warehousing": '#ffffff',
    "Wholesale trade": '#ffffff',
}

// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

const Y24EmpRadiusScale = d3.scaleLinear()
    .domain([0, 100000])
    .range([5, 12]);


var colourScale = d3.scaleOrdinal()
    .domain(industry_data.map(d => d.Industry)) // map the index to the color
    .range(Object.values(colours));

// figure will be our canvas for visualization
var svg = d3.select("figure").append("svg").attr("width", "100%").attr("height", "100%").attr("opacity", 1);

// set width and height to the same as the figure
var width = parseInt(svg.style("width"));
var height = parseInt(svg.style("height"));


function mouseMoveClusterSim(event, d, i) {
    d3.select(this)
        .transition("mousemove").duration(100)
        .attr("r", d => Y24EmpRadiusScale(d.Employment_2024) + 3)
        .attr("stroke-width", 1)
        .attr("stroke", "black");

    d3.select("#tooltip")
        .style("top", (event.pageY) + "px")
        .style("left", (event.pageX) + "px");
}

function mouseOverClusterSim(event, d, i) {
    d3.select(this)
        .transition("mouseover").duration(100)
        .attr("r", d => Y24EmpRadiusScale(d.Employment_2024) + 3)
        .attr("stroke-width", 1)
        .attr("stroke", "black");

    d.hovered = true;

    // add a tooltip
    d3.select("#tooltip")
        .style("top", (event.pageY) + "px")
        .style("left", (event.pageX) + "px")
        .style("display", "inline-block")
        .html(`<strong>Industry:</strong> ${d.Industry}
        <br>
        <strong>Employment in 2024:</strong> ${d3.format(",.2r")(d.Employment_2024)}`);

    // Increase the collision radius temporarily
    simulation.force("collide", d3.forceCollide(d => Y24EmpRadiusScale(d.Employment_2024) + 5));
    simulation.alpha(1).restart();
}

function mouseOutClusterSim(event, d, i) {
    d3.select(this)
        .transition("mouseout").duration(100)
        .attr("r", d => Y24EmpRadiusScale(d.Employment_2024))
        .attr("stroke-width", 0);

    d3.select("#tooltip")
        .style("display", "none");

    // Increase the collision radius temporarily
    simulation.force("collide", d3.forceCollide(d => Y24EmpRadiusScale(d.Employment_2024) + 1));
    simulation.alpha(1).restart();
}

function clustered_simulation() {
    // create a force simulation using the industry_data object.
    // each row in the industry_data object will be a node in the simulation
    // and the size will be the Employment_2024 value
    nodes = svg.selectAll("circle")
        .data(industry_data, d => d.Industry)
        .join(
            enter => enter.append('circle')
                .attr("r", d => Y24EmpRadiusScale(d.Employment_2024) + 3)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("fill", (d, i) => colourScale(i))
                .attr('class', 'industry-node')
                .attr('opacity', 1)
                .on("mouseover", mouseOverClusterSim)
                .on("mouseout", mouseOutClusterSim)
                .on("mousemove", mouseMoveClusterSim),
            update => update
                .transition()
                .duration(1000)
                .attr("cy", d => d.y)
                .attr("cx", d => d.x),
            exit => exit
                .transition()
                .duration(1000)
                .attr('opacity', 0)
                .attr('r', 0)
                .remove()
        );

    simulation.nodes(industry_data);

    //Reheat simulation and restart with slow transition
    simulation.alpha(0.9).restart();
}

function mouseOverSizeGrowth(event, d, i) {
    d3.select(this)
        .transition("mouseover").duration(100)
        .attr("r", d => Y24EmpRadiusScale(d.Employment_2024) + 3)
        .attr("stroke-width", 1)
        .attr("stroke", "black");

    d3.select("#tooltip")
        .style("top", (event.pageY) + "px")
        .style("left", (event.pageX) + "px")
        .style("display", "inline-block")
        .html(`<strong>Industry:</strong> ${d.Industry}
        <br>
        <strong>Employment in 2024:</strong> ${d3.format(",.2r")(d.Employment_2024)}
        <br>
        <strong>New workers in 2027:</strong> ${d3.format(",.2r")(d.Total_new_workers_expected_by_2027)}
        <br>
        <strong>Vacancies as of Feb-25:</strong> ${d3.format(",.2r")(d.Feb_25_Vacancies * 1000)}`);
}
function mouseOutSizeGrowth(event, d, i) {
    d3.select(this)
        .transition("mouseout").duration(100)
        .attr("r", d => Y24EmpRadiusScale(d.Employment_2024))
        .attr("stroke-width", 0);


    d3.select("#tooltip")
        .style("display", "none");
}
function mouseMoveSizeGrowth(event, d, i) {
    d3.select(this)
        .transition("mousemove").duration(100)
        .attr("r", d => Y24EmpRadiusScale(d.Employment_2024) + 3)
        .attr("stroke-width", 1)
        .attr("stroke", "black");

    d3.select("#tooltip")
        .style("top", (event.pageY) + "px")
        .style("left", (event.pageX) + "px");
}




function size_by_growth() {
    // Update the y-axis scale
    simulation.stop();

    console.log("size by growth");
    console.log(industry_data);

    // Update the circle positions
    d3.selectAll("circle").interrupt()

    d3.selectAll("circle")
        .data(industry_data, d => d.Industry)
        .join(
            enter => enter.append('circle')
                .attr("r", d => Y24EmpRadiusScale(d.Employment_2024) + 3)
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("fill", (d, i) => colourScale(i))
                .attr('opacity', 0)
                .on("mouseover", mouseOverClusterSim)
                .on("mouseout", mouseOutClusterSim)
                .on("mousemove", mouseMoveClusterSim),
            update => update
                .transition()
                .duration(1000)
                .attr("cy", d => yScale(d.Total_new_workers_expected_by_2027))
                .attr("cx", d => xScale(d.Feb_25_Vacancies * 1000))
                .attr('opacity', d => (d.Feb_25_Vacancies > 0) ? 1 : 0.0),
            exit => exit
                .transition()
                .duration(1000)
                .attr('opacity', 0)
                .attr('r', 0)
                .remove()
        );
    // .transition()
    // .duration(1000)
    // .attr("cy", d => yScale(d.Total_new_workers_expected_by_2027))
    // .attr("cx", d => xScale(d.Feb_25_Vacancies * 1000))
    // .attr('opacity', d => (d.Feb_25_Vacancies > 0) ? 1 : 0.0);



    setTimeout(function () {
        d3.selectAll("circle")
            .on("mouseover", mouseOverSizeGrowth)
            .on("mouseout", mouseOutSizeGrowth)
            .on("mousemove", mouseMoveSizeGrowth)
    });

    d3.select('.size-growth-x-axis').transition().attr('opacity', 1)
    d3.select('.size-growth-y-axis').transition().attr('opacity', 1)

}


// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // set width and height to the same as the figure
    width = parseInt(svg.style("width"));
    height = parseInt(svg.style("height"));

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}




function draw_line() {
    // we want to draw a line between <0, 0>  and <86,000, 59,000>
    // in the x and y axis coordinate schemes
    path.attr("stroke-dasharray", line_length + " " + line_length)
        .attr("stroke-dashoffset", line_length)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(1100);

}

function healthCareToCenter() {
    console.log("health care to center");
    // Update the circle positions
    d3.selectAll("circle").interrupt()
    //fade out all the circles and move everything to the center
    d3.selectAll("circle").interrupt()
        .on('mouseover', null)
        .on('mouseout', null)
        .on("mousemove", null)
        .transition()
        .duration(150)
        .attr('opacity', d => (d.Industry === "Health care and social assistance") ? 1 : 0.0)
        .on("end", function () {
            d3.selectAll("circle")
                .transition()
                .duration(1000)
                .attr("cy", height / 2)
                .attr("cx", width / 2);
        });

}

function mouseOverRegion(event, d, i) {
    d3.select(this)
        .transition("mouseover").duration(100)
        .attr("r", d => regionalRadiusScale(d.Count) + 3)
        .attr("stroke-width", 4);
    

    d3.select("#tooltip")
        .style("top", (event.pageY) + "px")
        .style("left", (event.pageX) + "px")
        .style("display", "inline-block")
        .html(`<strong>Region:</strong> ${d.Region}
        <br>
        <strong>Occupation:</strong> ${d.Occupation}
        <br>
        <strong>Count:</strong> ${d3.format(",.2r")(d.Count)}`);

    regional_sim.force("collide").radius(node =>
        node === d ? regionalRadiusScale(node.Count) + 4 : regionalRadiusScale(node.Count) + 1
    );
    regional_sim.alpha(0.05).restart();
}


function mouseOutRegion(event, d, i) {
    d3.select(this)
        .transition("mouseout").duration(100)
        .attr("r", d => regionalRadiusScale(d.Count))
        .attr("stroke-width", 0);

    d3.select("#tooltip")
        .style("display", "none");

    regional_sim.force("collide").radius(node => regionalRadiusScale(node.Count)+1);
    // regional_sim.alpha(0.05).restart();
}

function mouseMoveRegion(event, d, i) {
    d3.select(this)
        .transition("mousemove").duration(100)
        .attr("r", d => regionalRadiusScale(d.Count) + 3)
        .attr("stroke-width", 4)

    d3.select("#tooltip")
        .style("top", (event.pageY) + "px")
        .style("left", (event.pageX) + "px");

    regional_sim.restart();
}


function regionalSim() {
    console.log("regional sim");


    regional_sim = d3.forceSimulation(full_data)
        .force("charge", d3.forceManyBody().strength([2]))
        .force("x", d3.forceX(d => xCentroidScale(d.centroid[0])).strength(0.15))
        .force("y", d3.forceY(d => yCentroidScale(d.centroid[1])).strength(0.25))
        .force("collide", d3.forceCollide(d => regionalRadiusScale(d.Count) + 1))
        .alphaDecay(0.02)
        .on("tick", ticked);

    // set up force simulation based on full_data
    nodes = svg.selectAll("circle")
        .data(full_data, d => d.ID)
        .join(
            enter => enter.append('circle')
                .attr("r", d => regionalRadiusScale(d.Count))
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("fill", d => region_strokes[d.Region])
                .attr("stroke", d => region_strokes[d.Region])
                .attr('class', 'regional-node')
                .attr('opacity', 1)
                .on("mouseover", mouseOverRegion)
                .on("mouseout", mouseOutRegion)
                .on("mousemove", mouseMoveRegion),
            update => update
                .transition()
                .duration(1000)
                .attr("cy", d => d.y)
                .attr("cx", d => d.x),
            exit => exit
                .transition()
                .duration(1000)
                .attr('opacity', 0)
                .attr('r', 0)
                .remove()
        );

    regional_sim.nodes(full_data);
    regional_sim.alpha(0.9).restart();

}




function healthCareToHistogram() {
    console.log("health care to histogram");

    const circleData = health_income.flatMap(d =>
        Array.from({ length: d.Count }, (_, i) => ({
            Weekly_Income: d.Weekly_Income,
            stackIndex: i,
            Count: d.Count
        }))
    );

    const yBase = height - margin.bottom - 20;
    circleSpacing = 5 * 2 + 0.1;
    // move income_nodes 
    svg.selectAll('circle')
        .data(circleData, d => d.Weekly_Income + '-' + d.stackIndex)
        .join(
            enter => enter.append('circle')
                .attr('class', 'income-node')
                .attr('r', 5)
                .attr('cx', d => width / 2)
                .attr('cy', d => height / 2)
                .attr('fill', colours['Health care and social assistance'])
                .attr('opacity', 1)
                .transition()
                .delay((d, i) => d.stackIndex * 60)
                .duration(1000)
                .attr('cx', d => xIncomeScale(d.Weekly_Income) + xIncomeScale.bandwidth() / 2)
                .attr('cy', d => yBase - d.stackIndex * (circleSpacing)),
            update => update
                .transition()
                .duration(1000)
                .attr('cx', d => xIncomeScale(d.Weekly_Income) + xIncomeScale.bandwidth() / 2)
                .attr('cy', d => yBase - d.stackIndex * (circleSpacing)),
            exit => exit
                .transition()
                .duration(1000)
                .attr('opacity', 0)
                .attr('r', 0)
                .remove()
        );

    d3.select('.income-x-axis').transition().attr('opacity', 1);

}

// scrollama event handlers
function handleStepEnter(response) {
    // response objects are  element, direction, index (respectively)

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // regardless of step, make sure SVG is visible
    svg.transition().duration(500).attr('opacity', 1);
    switch (response.index) {
        case 0:
            // update graphic based on step
            figure.select("p").text(response.index + 1);
            clustered_simulation(response);
            break;
        case 1:
            // update graphic based on step
            figure.select("p").text(response.index + 1);
            size_by_growth();
            break;
        case 2:
            // update graphic based on step
            figure.select("p").text(response.index + 1);
            path.style("display", "block");
            if (response.direction === "up") {
                size_by_growth();
            }
            draw_line();
            break;
        case 3:
            healthCareToCenter();
            break;
        case 4:
            healthCareToHistogram();
            break;
        case 5:
            regionalSim();
            break;
    }

    // update graphic based on step
    figure.select("p").text(response.index + 1);
}



function handleStepExit(response) {
    // response objects are  element, direction, index (respectively)

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i != response.index;
    });
    console.log(response.index);
    switch (response.index) {
        case 0:
            console.log("Exiting step 0");
            // clustered_simulation();
            // hide everything
            if (response.direction === "up") {
                svg.transition().duration(500).attr('opacity', 0);
            }
            simulation.stop();
            break;
        case 1:
            console.log("Exiting step 1");
            // hide the x and y axis
            if (response.direction === "up") {
                d3.select('.size-growth-x-axis').transition().attr('opacity', 0)
                d3.select('.size-growth-y-axis').transition().attr('opacity', 0)
            }
            break;
        case 2:
            if (response.direction === "down") {
                d3.select('.size-growth-x-axis').transition().attr('opacity', 0)
                d3.select('.size-growth-y-axis').transition().attr('opacity', 0)
            }
            path.style("display", "none");
            break;
        case 3:
            break;

        case 4:
            d3.select('.income-x-axis').transition().attr('opacity', 0)
            d3.select('.income-y-axis').transition().attr('opacity', 0)
            break
    }

}
function ticked() {
    nodes
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
}


function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    yScale = d3.scaleLinear()
        .domain([d3.min(industry_data, d => d.Total_new_workers_expected_by_2027), d3.max(industry_data, d => d.Total_new_workers_expected_by_2027)])
        .range([height - 50, 50]);

    // Update the x-axis scale
    xScale = d3.scaleLinear()
        .domain([d3.min(industry_data, d => d.Feb_25_Vacancies * 1000), d3.max(industry_data, d => d.Feb_25_Vacancies * 1000)])
        .range([50, width - 50]);

    // create scale for income categories using health_income Weekly_Income values
    xIncomeScale = d3.scaleBand().domain(["$1-$149", "$150-$299", "$300-$399", "$400-$499", "$500-$649", "$650-$799", "$800-$999", "$1,000-$1,249", "$1,250-$1,499", "$1,500-$1,749", "$1,750-$1,999", "$2,000-$2,999", "$3,000-$3,499", "$3,500 or more"]).range([50, width - 50]);
    yIncomeScale = d3.scaleLinear().domain([0, d3.max(health_income, d => d.Count)]).range([height - 50, 50]);

    xIncomeAxis = d3.axisBottom(xIncomeScale);
    yIncomeAxis = d3.axisLeft(yIncomeScale);


    xCentroidScale = d3.scaleLinear().domain([0, d3.max(region_shapes, d => d.centroid[0])]).range([50, width - 50]);
    yCentroidScale = d3.scaleLinear().domain([0, d3.max(region_shapes, d => d.centroid[1])]).range([height - 50, 50]);




    // Create axis generators
    xAxis = d3.axisBottom(xScale);

    yAxis = d3.axisLeft(yScale);


    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height - 40})`)
        .call(xAxis)
        .attr("class", "size-growth-x-axis")
        .attr('opacity', 0);

    // Add the y-axis
    svg.append("g")
        .attr("transform", `translate(50, 0)`)
        .call(yAxis)
        .attr("class", "size-growth-y-axis")
        .attr('opacity', 0);

    svg.append("g")
        .attr("transform", `translate(0, ${height - 60})`)
        .call(xIncomeAxis)
        .attr("class", "income-x-axis")
        .attr('opacity', 0)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");



    svg.append("g")
        .attr("transform", `translate(50, 0)`)
        .call(yIncomeAxis)
        .attr("class", "income-y-axis")
        .attr('opacity', 0);


    nodes = svg.selectAll("circle")
        .data(industry_data)
        .enter()
        .append("circle")
        .attr("r", d => Y24EmpRadiusScale(d.Employment_2024))
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", (d, i) => colourScale(i))
        .attr('class', 'industry-node')
        .attr('opacity', 0)
        .on("mouseover", mouseOverClusterSim)
        .on("mouseout", mouseOutClusterSim)
        .on("mousemove", mouseMoveClusterSim);

    health_income_nodes = svg.selectAll("circle")
        .data(health_income)
        .enter()
        .append("circle")
        .attr('class', 'income-node')
        .attr("r", 3)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", colours['Health care and social assistance'])
        .attr('opacity', 0)

    simulation = d3.forceSimulation(industry_data)
        .force("charge", d3.forceManyBody().strength([2]))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(d => Y24EmpRadiusScale(d.Employment_2024) + 1))
        .alphaDecay(0.02)
        .on("tick", ticked);


    simulation.stop();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);


    line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    line_data = [
        { x: 0, y: 0 },
        { x: 59000, y: 86000 }
    ]

    // draw line
    path = svg.append("path")
        .attr("d", line(line_data))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke", "#575757")
        .style("display", "none");

    line_length = path.node().getTotalLength();
}



function updateColours() {
    // get all the p elements with the class industry-text
    let pElements = document.querySelectorAll(".industry-text");
    // find the first key of colours that is a substring (in either direction)
    // of the text of the p element, case insensitive

    for (let i = 0; i < pElements.length; i++) {

        let pElement = pElements[i];
        let text = pElement.innerText;
        let key = Object.keys(colours).find(key => key.toLowerCase().includes(text.toLowerCase()));
        if (key === undefined) {
        }
        else {
            pElement.style.backgroundColor = colours[key];
            pElement.style.color = text_colours[key];
        }
    }


}


updateColours();
init();


