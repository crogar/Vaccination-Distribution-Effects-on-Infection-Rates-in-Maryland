const counties = [{"county": "Allegany", "coordinates": [39.6255251, -78.6114999], "Confirmed_cases": 6977}, {"county": "Anne_Arundel", "coordinates": [38.9530109, -76.5488232], "Confirmed_cases": 43630}, {"county": "Baltimore", "coordinates": [39.4647665, -76.7336521], "Confirmed_cases": 65395}, {"county": "Baltimore_City", "coordinates": [39.2903848, -76.6121893], "Confirmed_cases": 52672}, {"county": "Calvert", "coordinates": [38.49495030000001, -76.5025742], "Confirmed_cases": 4207}, {"county": "Caroline", "coordinates": [38.9105018, -75.8533954], "Confirmed_cases": 2333}, {"county": "Carroll", "coordinates": [39.5423418, -77.0564464], "Confirmed_cases": 9454}, {"county": "Cecil", "coordinates": [39.5739403, -75.94632399999999], "Confirmed_cases": 6262}, {"county": "Charles", "coordinates": [38.5221781, -77.10249019999999], "Confirmed_cases": 10780}, {"county": "Dorchester", "coordinates": [38.4152819, -76.17837390000001], "Confirmed_cases": 2820}, {"county": "Frederick", "coordinates": [39.3844507, -77.4701972], "Confirmed_cases": 19718}, {"county": "Garrett", "coordinates": [39.5681243, -79.29021329999999], "Confirmed_cases": 2028}, {"county": "Harford", "coordinates": [39.5838964, -76.3637285], "Confirmed_cases": 16506}, {"county": "Howard", "coordinates": [39.2873463, -76.964306], "Confirmed_cases": 19166}, {"county": "Kent", "coordinates": [39.2713804, -76.1319953], "Confirmed_cases": 1346}, {"county": "Montgomery", "coordinates": [39.1547426, -77.2405153], "Confirmed_cases": 70698}, {"county": "Prince_Georges", "coordinates": [38.78492110000001, -76.8720961], "Confirmed_cases": 84790}, {"county": "Queen_Annes", "coordinates": [39.0263572, -76.1319953], "Confirmed_cases": 2981}, {"county": "Somerset", "coordinates": [38.0862333, -75.8533954], "Confirmed_cases": 2600}, {"county": "St_Marys", "coordinates": [38.1060259, -76.3637285], "Confirmed_cases": 6006}, {"county": "Talbot", "coordinates": [38.7803973, -76.1319953], "Confirmed_cases": 2152}, {"county": "Washington", "coordinates": [39.641762, -77.719993], "Confirmed_cases": 14523}, {"county": "Wicomico", "coordinates": [38.3941813, -75.667356], "Confirmed_cases": 7629}, {"county": "Worcester", "coordinates": [38.1584227, -75.4344727], "Confirmed_cases": 3619}]
// Creating map object
var myMap = L.map("map", {
    center: [38.9072, -77.0369],
    zoom: 7
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
// Use this link to get the geojson data.
var link = "../static/js/maryland_geojson.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(borough) {
  switch (borough) {
  case "Brooklyn":
    return "yellow";
  case "Bronx":
    return "red";
  case "Manhattan":
    return "orange";
  case "Queens":
    return "green";
  case "Staten Island":
    return "purple";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  console.log(data)
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      console.log(feature.properties.confirmed_cases)
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(myMap);
});
