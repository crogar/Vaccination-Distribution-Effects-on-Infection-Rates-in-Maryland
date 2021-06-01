// Creating our Chart instance
var chart = LightweightCharts.createChart(document.getElementById("linear-cases"), {
	width: 600,
  height: 300,
	rightPriceScale: {
		scaleMargins: {
			top: 0.1,
			bottom: 0.1,
		},
	},
});
// Ading areaSeries
var areaSeries = chart.addAreaSeries({
    topColor: 'rgba(76, 175, 80, 0.56)',
    bottomColor: 'rgba(76, 175, 80, 0.04)',
    lineColor: 'rgba(76, 175, 80, 1)',
    lineWidth: 2,
      title: "Cases",
  });