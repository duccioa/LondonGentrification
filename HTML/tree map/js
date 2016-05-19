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
            text: 'Large Tree Map for Token Distribution by High and Low Income'
        }
    });
});
