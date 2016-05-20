$(function () {
    $('#token_frequency').highcharts({
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 15,
                depth: 50
            }
        },
        title: {
            text: 'Top 50 Meaningful Tokens'
        },
        subtitle: {
            text: 'Source: <a href="http://ratings.food.gov.uk">Food Standard Agency</a>'
        },
        plotOptions: {
            column: {
                depth: 40
            }
        },

            xAxis: {

            type:'category',
            labels: {
                rotation: -45,

                       style: {
                    fontSize: '15px',
                    fontFamily: 'Verdana, sans-serif'

                }
            }
        },
           yAxis: {
            min: 0,
            max:3000,
            title: {
                text: 'Tokens Frequency'
            }
        },
          legend: {
            enabled: false
        },
        series: [{
            name: 'Token Frequency',
            data: [
                  ['cafe', 2912],
                  ['food',1932 ],
                  ['restaurant', 1916],
                  ['bar', 1439],
                  ['club', 1317],
                  ['wine', 1181],
                  ['pizza', 970],
                  ['express', 895],
                  ['kitchen', 818],
                  ['chicken', 818],
                  ['coffee', 813],
                  ['hotel', 774],
                  ['supermarket', 757],
                  ['fish', 746],
                  ['store', 623],
                  ['catering', 535],
                  ['shop',506],
                  ['grill', 466],
                  ['tesco', 445],
                  ['kebab', 440],
                  ['market', 385],
                  ['royal', 348],
                  ['halal', 336],
                  ['bakery', 333],
                  ['costa', 317],
                  ['arms', 301],
                  ['fried', 289],
                  ['hall', 277],
                  ['chinese', 270],
                  ['caffe', 268],
                  ['tandoori', 247],
                  ['spice', 243],
                  ['local', 235],
                  ['subway', 235],
                  ['takeaway', 231],
                  ['thai', 227],
                  ['star', 212],
                  ['butchers', 208],
                  ['starbucks', 207],
                  ['boots', 202],
                  ['hut', 197],
                  ['wines', 192],
                  [ 'deli', 192],
                  ['licence', 186],
                  ['pret', 184],
                  ['sainsbury', 183],
                  ['lounge', 182],
                  ['indian', 179],
                  ['greggs', 178],
                  ['burger', 169],
            ],
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});
