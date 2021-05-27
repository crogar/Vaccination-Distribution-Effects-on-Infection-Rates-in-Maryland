d3.json("./data/samples.json").then((data) => {
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

]

// Populates the dropdown with subject ID
function dropDown(County) {
    let options = d3.select("#selDataset");
        County.forEach((id) => {
            let option = options.append("option");
            option.text(id).property("value", id)
        })
    };

d3.csv("maryland_vaccinations.csv").then((vacc) => {

});

// Creates a gauge plot with stepping color codes for washed per week
function gaugePlot(subject) {
    let percent = subject.FullyVaccinated / 
    let trace3 = {
        domain: {x: [0,1], y: [0,1]},
        value: subject.wfreq,
        title: {text: "Scrubs per Week"},
        type: "indicator",
        mode: "gauge",
        gauge: {axis: {range: [null, 9], tickwidth: 1},
                steps: [
                    {range: [0, 1], color: "#ffffff"},
                    {range: [1, 2], color: "#ccffff"},
                    {range: [2, 3], color: "#99ffff"},
                    {range: [3, 4], color: "#66ffff"},
                    {range: [4, 5], color: "#33ffff"},
                    {range: [5, 6], color: "#00ffff"},
                    {range: [6, 7], color: "#00cccc"},
                    {range: [7, 8], color: "#009999"},
                    {range: [8, 9], color: "#006666"}
                    ]
                }
    };

    var data = [trace3];

    var layout = {
        title: "Belly Button Washing Frequency"
    };