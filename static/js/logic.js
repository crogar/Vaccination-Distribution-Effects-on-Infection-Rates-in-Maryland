// Creates county population list 
let county_pop = [
  {County: "Allegany", population: 75300},  {County: "Anne Arundel", population: 556100},  {County: "Baltimore", population: 842600},
  {County: "Baltimore City", population: 620961},  {County: "Calvert", population: 100450},  {County: "Caroline", population: 40300},
  {County: "Carroll", population: 197400},  {County: "Cecil", population: 130350},  {County: "Charles", population: 177200},
  {County: "Dorchester", population: 36300},  {County: "Frederick", population: 287900},  {County: "Garrett", population: 31600},
  {County: "Harford", population: 276500},  {County: "Howard", population: 312900},  {County: "Kent", population: 22200},
  {County: "Montgomery", population: 1075000},  {County: "Prince George's ", population: 921900},  {County: "Queen Anne's", population: 55650},
  {County: "St. Mary's", population: 130100},  {County: "Somerset", population: 28300},  {County: "Talbot", population: 40050},
  {County: "Washington", population: 170950},  {County: "Wicomico", population: 107450},  {County: "Worcester", population: 56250},
];

$("document").ready(function(){
  var $dropdown = $("#counties-selector");
  $.each(county_pop, function() {
      $dropdown.append($("<option />").val(this.County).text(this.County));
  });
}); // Populating DropDown Menu with counties

$.getJSON('http://127.0.0.1:5000/get_cases_dates', function(data) { // Populating dates for cases    
  $.each(data, function() {
    var $dropdown = $("#dates-cases-select");
    $dropdown.append($("<option />").val(this).text(this));
  });    
});

$.getJSON('http://127.0.0.1:5000/get_vaccination_dates', function(data) { // Populating dates for vaccinations   
  $.each(data, function() {
    var $dropdown = $("#dates-vaccines-select");
    $dropdown.append($("<option />").val(this).text(this));
  });    
  var initial_date = data[data.length-1]
  gen_date(initial_date);
});


// Get current selected date
var initial_date = "2021-05-28"

// Initial gauge plot
function gen_date(date){
  $.getJSON('http://127.0.0.1:5000/gen_vaccines/' + date, function(data) { // Populating dates for cases    
  // var population = this.map
  var population = data.map(couty => couty.population)
  var fully_vaccinated = data.map(couty => couty.FullVaccinatedCumulative)
  const sum_population = population.reduce((partial_sum, a) => partial_sum + a,0);
  const sum_vaccinated = fully_vaccinated.reduce((partial_sum, a) => partial_sum + a,0);
  gauge_plot((sum_vaccinated/sum_population)*100) 
});
}
 
// Event Handler to check when a new date is selected
$(document).ready(function() {  
  $('#dates-vaccines-select').change(function(){
      console.log($(this).find("option:selected").attr('value'))  
      gen_date($(this).find("option:selected").attr('value')) ;
  });
});




// Creating Gauge Plot
function gauge_plot(percent){
  var value = percent;
  var data = [
  {
    domain: { x: [0, 2], y: [0, 2] },
    value: value,
    title: { text: "<b>Percentage of fully vaccinated</b> <br> People In Maryland" },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [0, 100] },
      steps: [
        { range: [0, 10], color: "FF0000" },
        { range: [10, 20], color: "E51900" },
        { range: [20, 30], color: "CC3300" },
        { range: [30, 40], color: "B24C00" },
        { range: [40, 50], color: "996600" },
        { range: [50, 60], color: "7F7F00" },
        { range: [60, 70], color: "669900" },
        { range: [70, 80], color: "4CB200" },
        { range: [80, 90], color: "32CC00" }, 
        { range: [90, 100], color: "19E500" }, 
      ],
      threshold: {
        line: { color: "purple", width: 7 },
        thickness: 0.75,
        value: value
      }
    }
  }
];

var layout = { width: 400, height: 300, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data, layout);  
}