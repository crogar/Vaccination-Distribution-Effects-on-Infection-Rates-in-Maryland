d3.json("./data/samples.json").then((data) => {


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