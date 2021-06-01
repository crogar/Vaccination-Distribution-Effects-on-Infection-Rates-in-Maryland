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

fetch('http://127.0.0.1:5000/gen_linear_cases')
.then((r) => r.json())
.then((response) => {
    console.log(response);
    areaSeries.setData(response);
});

chart.timeScale().fitContent();

chart.applyOptions({
    timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: '#fff000',
        visible: true,
        timeVisible: true,
        secondsVisible: true,
        // tickMarkFormatter: (time, tickMarkType, locale) => {
        // 	console.log(time, tickMarkType, locale);
        // 	const year = LightweightCharts.isBusinessDay(time) ? time.year : new Date(time * 1000).getUTCFullYear();
        // 	return String(year);
        //  },
    },
    localization: {
        locale: 'en-US',
    },
});