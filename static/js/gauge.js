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

dropDown(county_pop);



d3.csv("../../Resources/maryland_vaccinations.csv").then((vacc) => {
    // gaugePlot(vacc.County)
    console.log(vacc[0])
});

// // Creates a gauge plot with stepping color codes for percent vaccinated
// function gaugePlot(subject) {
//     let percent = subject.FullyVaccinated / county_pop[Allegany].population
//     let trace_gauge = {
//         // domain: {x: [0,1], y: [0,1]},
//         value: percent,
//         title: {text: "Percent Vaccinated"},
//         type: "indicator",
//         mode: "gauge+number",
//         gauge: {axis: {range: [null, 100], tickwidth: 1},
//                 bar: {color: "grey"},
//                 steps: [
//                     {range: [0, .25], color: "red"},
//                     {range: [.25, .50], color: "orange"},
//                     {range: [.50, .75], color: "yellow"},
//                     {range: [.75, 1], color: "green"}
//                     ]
//                 }
//     };

//     var data = [trace_gauge];

//     var layout = {
//         title: "County Vaccination Status"
//     };

//     Plotly.newPlot("gauge", data, layout);
// };


// d3.select("#selDataset").property("value")