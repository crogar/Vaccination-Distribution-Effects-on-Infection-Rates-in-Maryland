window.addEventListener('load', (event) => {
    var dom_rect = document.getElementById('gauge').getBoundingClientRect()
    // console.log(document.getElementById('gauge').getBoundingClientRect())
    var update = {
      width: dom_rect.width,  // or any new width
      height: 450 // " "
    };
    var searchcolumn = d3.select("#map-cases")
                      .style("width", update.width + 'px')
                      .style("height", update.height + 'px');
  });
  var myMap = null;
  
  function create_choropleth(date){
  
  // Load in geojson data
  // var geoData = "../static/js/maryland_geojson.geojson";
  var geoData = "http://127.0.0.1:5000/gen_cases/" + date;
  if(myMap != undefined || myMap != null){
    myMap.remove();
  }
  // Define variables for our tile layers
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  
  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  // Adding layers to baseMap
  var baseMaps = {
      Light: light,
      Dark: dark
    };
    
  // Creating map object
   myMap = L.map("map-cases", {
      center: [38.5221781, -77.10249019999999],
      zoom: 7,
      layers: [dark],
    });
    myMap.invalidateSize();
    $('#map-cases').on('shown.bs.modal', function() {
      myMap.resize();
      console.log("map resized")
    });
    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      // attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);
    L.control.layers(baseMaps).addTo(myMap);
  
    var geojson;
  // Grab data with d3
  fetch(geoData)
      .then((r) => r.json())
      .then((data) => {
    console.log(data)
    // Create a new choropleth layer
    
  });
  }
  
  $( window ).resize(function() {
    // $( "#log" ).append( "<div>Handler for .resize() called.</div>" );
    // console.log(this.innerHeight, this.innerWidth)
  });