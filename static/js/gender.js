function plot_pie(date){
    $.getJSON('http://127.0.0.1:5000/gen_vaccines_gender/' + date, function(gender_data) { // Populating dates for vaccinations   
      var values_ = [], labels_ = []
    Object.entries(gender_data[0]).forEach(([key, value]) => {
        labels_.push(key)
        values_.push(value)
      });
        // var values = 
        var data = [{
            values: values_,
            labels: labels_,
            name: 'Gender',
            hoverinfo: 'label+percent+name',
            hole: .4,
            type: 'pie'
          }];
          
          var layout = {
            title: 'Gender Vaccination Distribution',
            annotations: [
              {
                font: {
                  size: 16
                },
                showarrow: false,
                text: 'G',
                x: 0.50,
                y: 0.5
              }
            ],
            height: 400,
            width: 400,
            showlegend: true,
            grid: {rows: 1, columns: 1}
          };
          
          Plotly.newPlot('gender', data, layout);
    });
}