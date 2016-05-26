/////////////////////// BOXPLOT //////////////////////////////

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
colors: [
'#9FC54D',
'#75C156',
'#33A457',
'#1EA86C',
'#71B67B',
'#61BDF0',
'#1E71B8',
'#E03C00',
'#E56000',
'#F08C00',
'#FFEA00',
'#729F1E',
'#EE7A01',
'#0053A0',
'#02C070'
],
 	    plotOptions: {
	    	boxplot: {
                // Enabling this option overrides the fillColor property
                colorByPoint: true,
	    		fillColor:'#F0F0E0',
           lineWidth: 3,

                medianWidth: 4,

                stemDashStyle: 'dot',
                stemWidth: 2,

                whiskerLength: '20%',
                whiskerWidth: 4

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


/////////////////////// TREEMAP //////////////////////////////
$(function () {
    var data = {
            'Cafe': {
                'High Income Area': {
                    'Token Count':'1385',
                },
                'Low Incomde Area': {
                    'Token Count':'1577',
                }
               },
           'Coffe': {
                'High Income Area': {
                    'Token Count':'481',
                },
                'Low Incomde Area': {
                    'Token Count':'347',
                }
               },

          'Pizza': {
                'High Income Area': {
                    'Token Count':'426',
                },
                'Low Incomde Area': {
                    'Token Count':'573',
                }
               },

           'Grill': {
                'High Income Area': {
                    'Token Count':'199',
                },
                'Low Incomde Area': {
                    'Token Count':'305',
                }
               },

            'Wine': {
                'High Income Area': {
                    'Token Count':'577',
                },
                'Low Incomde Area': {
                    'Token Count':'818',
                }
               },

           'Sushi': {
                'High Income Area': {
                    'Token Count':'104',
                },
                'Low Incomde Area': {
                    'Token Count':'62',
                }
               },


            'Thai': {
                'High Income Area': {
                    'Token Count':'176',
                },
                'Low Incomde Area': {
                    'Token Count':'80',
                }
               },

            'Chicken': {
                'High Income Area': {
                    'Token Count':'213',
                },
                'Low Incomde Area': {
                    'Token Count':'627',
                }
               },

             'Fried': {
                'High Income Area': {
                    'Token Count':'73',
                },
                'Low Incomde Area': {
                    'Token Count':'216',
                }
               },

             'Fish': {
                'High Income Area': {
                    'Token Count':'356',
                },
                'Low Incomde Area': {
                    'Token Count':'532',
                }
               },

             'Kebab': {
                'High Income Area': {
                    'Token Count':'170',
                },
                'Low Incomde Area': {
                    'Token Count':'385',
                }
               },

             'Waitrose': {
                'High Income Area': {
                    'Token Count':'69',
                },
                'Low Incomde Area': {
                    'Token Count':'18',
                }
               },

             'Sainsbury': {
                'High Income Area': {
                    'Token Count':'168',
                },
                'Low Incomde Area': {
                    'Token Count':'126',
                }
               },


              'Tesco': {
                'High Income Area': {
                    'Token Count':'199',
                },
                'Low Incomde Area': {
                    'Token Count':'254',
                }
               },

              'Costcutter': {
                'High Income Area': {
                    'Token Count':'60',
                },
                'Low Incomde Area': {
                    'Token Count':'110',
                }
               },



        },
        points = [],
        regionP,
        regionVal,
        regionI = 0,
        countryP,
        countryI,
        causeP,
        causeI,
        region,
        country,
        cause,
        causeName = {
        'Token Count':'Token Count'
        };

    for (region in data) {
        if (data.hasOwnProperty(region)) {
            regionVal = 0;
            regionP = {
                id: 'id_' + regionI,
                name: region,
                color: Highcharts.getOptions().colors[regionI]
            };
            countryI = 0;
            for (country in data[region]) {
                if (data[region].hasOwnProperty(country)) {
                    countryP = {
                        id: regionP.id + '_' + countryI,
                        name: country,
                        parent: regionP.id
                    };
                    points.push(countryP);
                    causeI = 0;
                    for (cause in data[region][country]) {
                        if (data[region][country].hasOwnProperty(cause)) {
                            causeP = {
                                id: countryP.id + '_' + causeI,
                                name: causeName[cause],
                                parent: countryP.id,
                                value: Math.round(+data[region][country][cause])
                            };
                            regionVal += causeP.value;
                            points.push(causeP);
                            causeI = causeI + 1;
                        }
                    }
                    countryI = countryI + 1;
                }
            }
            regionP.value = Math.round(regionVal / countryI);
            points.push(regionP);
            regionI = regionI + 1;
        }
    }
    $('#treemap').highcharts({
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            allowDrillToNode: true,
            animationLimit: 1000,
            dataLabels: {
                enabled: false
            },
            levelIsConstant: false,
            levels: [{
                level: 1,
                dataLabels: {
                    enabled: true
                },
                borderWidth: 3
            }],
            data: points
        }],
        subtitle: {
            text: 'Click points to drill down. Source: <a href="http://ratings.food.gov.uk">Food Standards Agency</a>.'
        },
        title: {
            text: 'Tree Map for Token Distribution by High and Low Income'
        }
    });
});



/////////////////////// TOKEN FREQUENCY //////////////////////////////
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
            text: 'Top 50 Most Frequent Tokens'
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
                  ['sainsbury', 294],
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
