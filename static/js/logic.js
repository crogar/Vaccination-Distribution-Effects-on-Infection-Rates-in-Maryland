geojson_url = "https://opendata.arcgis.com/datasets/0573e90adab5434f97b082590c503bc1_0.geojson"

d3.json(geojson_url).then(data => {
    console.log(data);
}); // End reading geoJson