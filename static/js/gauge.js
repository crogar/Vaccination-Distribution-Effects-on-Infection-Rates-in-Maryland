county_vacc = [{"county": "Allegany", "population": 75300, "fully_vaccinated": 24246}];

// Creates county population list 
let county_pop = [
    {County: "Allegany", population: 75300},
    {County: "Anne Arundel", population: 556100},
    {County: "Baltimore", population: 842600},
    {County: "Baltimore City", population: 620961},
    {County: "Calvert", population: 100450},
    {County: "Caroline", population: 40300},
    {County: "Carroll", population: 197400},
    {County: "Cecil", population: 130350},
    {County: "Charles", population: 177200},
    {County: "Dorchester", population: 36300},
    {County: "Frederick", population: 287900},
    {County: "Garrett", population: 31600},
    {County: "Harford", population: 276500},
    {County: "Howard", population: 312900},
    {County: "Kent", population: 22200},
    {County: "Montgomery", population: 1075000},
    {County: "Prince George's ", population: 921900},
    {County: "Queen Anne's", population: 55650},
    {County: "St. Mary's", population: 130100},
    {County: "Somerset", population: 28300},
    {County: "Talbot", population: 40050},
    {County: "Washington", population: 170950},
    {County: "Wicomico", population: 107450},
    {County: "Worcester", population: 56250},
];

// Populates the dropdown with County from county_pop list
function dropDown(county_pop) {
    let options = d3.select("#selDataset");
        county_pop.forEach((county) => {
            let option = options.append("option");
            option.text(county.County).property("value", county.County)
        })
};


// d3.csv("../../Resources/maryland_vaccinations.csv").then((vacc) => {
//     // gaugePlot(vacc.County)
//     console.log(vacc[700].FullVaccinatedCumulative)
// });


// // Creates a gauge plot with stepping color codes for percent vaccinated
function gaugePlot(county) {
    let percent = county.fully_vaccinated / county.population
    let trace_gauge = {
        // domain: {x: [0,1], y: [0,1]},
        value: percent,
        title: {text: "Percent Vaccinated"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {axis: {range: [null, 100], tickwidth: 1},
                bar: {color: "grey"},
                steps: [
                    {range: [0, .25], color: "red"},
                    {range: [.25, .50], color: "orange"},
                    {range: [.50, .75], color: "yellow"},
                    {range: [.75, 1], color: "green"}
                    ]
                }
    };

    var data = [trace_gauge];

    var layout = {
        title: "County Vaccination Status"
    };

    Plotly.newPlot("gauge", data, layout);
};

dropDown(county_pop);
gaugePlot(county_vacc)

let selectedCounty = d3.select("#selDataset");
    selectedCounty.on("change",function() {        //creates an on-change function to update the visualizations based on subject
    var county = selectedCounty.property("value") //pulls the subject nuber that is selected
    var cntyIndex = data.names.indexOf(county)  //uses the value of "names" to identify the index so that it can be referenced in the functions below
    
gaugePlot(county_vacc[cntyIndex]);
    });