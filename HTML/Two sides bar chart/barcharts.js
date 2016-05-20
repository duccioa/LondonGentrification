// Data gathered from http://populationpyramid.net/germany/2015/
$(function () {
    // Age categories
    var categories = ['Cafe', 'Coffee', 'Pizza', 'Grill',
            'Wine', 'Sushi', 'Thai', 'Chicken', 'Fried',
            'Fish', 'Kebab', 'Waitrose', 'Sainsbury', 'Tesco',
            'Costcutter'];
    $(document).ready(function () {
        $('#container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Tokens Distribution by Income'
            },
            subtitle: {
                text: 'Source: <a href="http://www.food.gov.uk/">Food Standards Agency</a>'
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name  +': '+ this.point.category + '</b><br/>' +
                        'Token Count: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
                name: 'Low Income Area',
                data: [-1577, -347, -573, -305, -818, -62, -80,-627,
                    -216, -532, -385, -18, -126, -254, -110]
            }, {
                name: 'High Income Area',
                data: [1385, 481, 426, 199, 577, 104, 176, 213,
                    73, 356, 170, 69, 168, 199, 60]
            }]
        });
    });

});
