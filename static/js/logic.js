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