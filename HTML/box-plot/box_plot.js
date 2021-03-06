$(function () {
    $('#box_plot').highcharts({

        chart: {
            type: 'boxplot'

        },

        title: {
            text: 'Box Plot for Tokens with Income Estimate'
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: ['cafe','coffee','pizza','grill','wine','sushi','thai','chicken','fried','fish','kebab','waitrose','sainsbury','tesco','costcutter'],
            title: {
                text: 'Tokens'
            }
        },

        yAxis: {
            title: {
                text: 'Income Estimate'
            },

        },

       plotOptions: {
            boxplot: {
                fillColor: '#F0F0E0',
                lineWidth: 2,
                medianColor: '#0C5DA5',
                medianWidth: 3,
                stemColor: '#A63400',
                stemDashStyle: 'dot',
                stemWidth: 1,
                whiskerColor: '#3D9200',
                whiskerLength: '50%',
                whiskerWidth: 3
            }
        },

        series: [{
            name: 'Income Estimate by Wards',
            data: [
            		[25090,34670,38755,43920,88330],
                [25800,35840,40340,48090,88330],
                [25090,33580,38090,43790,65500],
                [26290,33820,37600,43120,64320],
                [25090,33530,37600,43320,65500],
                [26010,37355,40615,50100,88330],
                [30100,38410,43920,49290,65500],
                [25090,31980,35130,39475,63620],
                [25090,31840,35130,39405,62840],
                [25090,33170,37940,42375,65500],
                [25090,33000,36300,40340,64320],
                [30320,40340,45410,50410,88330],
                [25090,35670,40340,46210,65500],
                [25800,34010,38090,43470,65500],
                [26290,32930,37120,41230,58400]

            ],
            tooltip: {
                headerFormat: '<em>Token: {point.key}</em><br/>'
            }
        }, {
            name: 'Outlier',
            color: Highcharts.getOptions().colors[0],
            type: 'scatter',
            data: [ // x, y positions where 0 is the first category

            ],
            marker: {
                fillColor: 'white',
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[0]
            },
            tooltip: {
                pointFormat: 'Observation: {point.y}'
            }
        }]

    });
});
