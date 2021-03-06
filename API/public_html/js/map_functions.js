function drawPolys(data, sw, z, stCol, fillOp, click) {
    // adapted from http://stackoverflow.com/questions/26122806/how-can-i-color-geojson-features-differently-based-on-their-id-googlemaps
    // data: geojson, i.e. wards_json
    // sw: stroke weight
    // z: z-index
    // stCol: stroke color
    // fillOp: fill opacity
    // add a click event?

    var polyArray = [];
    console.log('Drawing polygons for' + data);
    for (var i = 0; i < data.features.length; i++) {
        // collect polygon points  
        var polyPath = [];
        for (var p = 0; p < data.features[i].geometry.coordinates[0].length; p++) {
            polyPath.push(new google.maps.LatLng(data.features[i].geometry.coordinates[0][p][1], data.features[i].geometry.coordinates[0][p][0]));
        }
        polyArray.push(new google.maps.Polygon({
            paths: polyPath,
            strokeColor: stCol,
            strokeOpacity: 1,
            strokeWeight: sw,
            fillColor: null, //eval(colour),
            zIndex: z,
            fillOpacity: fillOp,
            clickable: click,
            map: map
        }));
        //if(addEvent){add the event}
    }
    return polyArray;

}




function changeViz(vizAttribute, newValuesField) {
    // vizAttribute is the map style attribute to be changed i.e. 'strokeColor', 'fillColor'
    // newValuesField is the name of the geojson's column to fetch the values from i.e. 'income_color' or setupViz('lq') 
    function resetViz(i, newValue) {
        wards_poly[i][vizAttribute] = newValue;
        wards_poly[i].setMap();
        wards_poly[i].setMap(map);
    }

    function getProperty(wards_json, newValuesField, callback) {
        if (newValuesField === null) {
            toggleMap(false);
        } else {
            for (var i = 0; i < wards_json.features.length; i++) {
                callback(i, wards_json.features[i].properties[newValuesField]);
            }
        }

    }


    getProperty(wards_json, newValuesField, resetViz);

}



// Set up the scatter plot map filtered by token
function setupTokenMap(token) {

    function loop() { // loop through functions to force order of execution
        var args = arguments;
        if (args.length <= 0)
            return;
        (function chain(i) {
            if (i >= args.length || typeof args[i] !== 'function')
                return;
            window.setTimeout(function() {
                args[i]();
                chain(i + 1);
            }, 1000);
        })(0);
    }


    loop(
        function() {
            console.log('setupTokenMap: loop1');
            bounds = map.getBounds();
            lat_min = bounds.getSouthWest().lat();
            lng_min = bounds.getSouthWest().lng();
            lat_max = bounds.getNorthEast().lat();
            lng_max = bounds.getNorthEast().lng();
            link2analysis = './text/' + token + '_analysis.html';
            console.log("SW: " + bounds.getSouthWest() + " NE: " + bounds.getNorthEast());
            console.log("Center: " + map.getCenter().lat() + ", " + map.getCenter().lng());
        },
        function() {
            console.log('setupTokenMap: loop2');
            getData(lat_min, lng_min, lat_max, lng_max, token);
            $("#describeWords").load(link2analysis);
        }
    );




}




function setupViz(viz) {
    var field = [];
    if (viz == 'income') {
        field = 'income_color';
        console.log('setupViz: Visualisation set to: ' + field);
        return field;
    }
    if (viz == 'lq') {
        field = token + '_smooth_' + viz + '_color';
        console.log('setupViz: Visualisation set to: ' + field);
        return field;
    }
    if (viz == 'lmoran') {
        field = token + '_morans_color';
        return field;
    }
    if (viz == 'clusters') {
        field = 'cluster_colors';
        return field;
    } else {
        field = null;
        console.log('setupViz: No polygons drawn');
        return field;
    }
}

function toggleMap(state, callback) {
    if (state) {
        if (polygonDrawn) {
            if (polygonDisplayed) {
                console.log('toggleMap: Polygon already ON');
            } else {
                for (var i = 0; i < wards_poly.length; i++) {
                    wards_poly[i].setMap(null);
                    wards_poly[i].setMap(map);
                }
                for (var j = 0; j < boroughs_poly.length; j++) {
                    boroughs_poly[j].setMap(null);
                    boroughs_poly[j].setMap(map);
                }
                polygonDisplayed = true;
            }
        } else {
            polygonDisplayed = true;
            polygonDrawn = true;

            wards_poly = drawPolys(wards_json, 0.5, 1, '#cccccc', 0.7, 'yes');
            boroughs_poly = drawPolys(boroughs_json, 1, 2, '#f2f2f2', 0, 'no');
        }
    }
    if (!state) {
        if (polygonDisplayed) {
            for (var i = 0; i < wards_poly.length; i++) {
                wards_poly[i].setMap(null);
            }
            for (var j = 0; j < boroughs_poly.length; j++) {
                boroughs_poly[j].setMap(null);
            }
            polygonDisplayed = false;
        } else {
            console.log('toggleMap: Polygon already OFF');
        }
    }
    if (callback != null) {
        callback();
    }
}



function getData(lat_min, lng_min, lat_max, lng_max, token) {
    lat_min = lat_min.toFixed(2);
    lng_min = lng_min.toFixed(3);
    lat_max = lat_max.toFixed(2);
    lng_max = lng_max.toFixed(3);

    console.log("Getting Data: ((" + lat_min + ", " + lng_min + ") (" + lat_max + ", " + lng_max + "))");

    setAllMap(null);
    markerArray = [];

    $.getJSON("http://128.40.150.34:" + port + "/data/tokens_spatial/" + lat_min + "/" + lng_min + "/" + lat_max + "/" + lng_max + "/" + token + "/", function(data) {
        $.each(data, function(k, v) {

            var latLng = new google.maps.LatLng(v.points.y, v.points.x);

            dataArray.push(latLng);

            var marker = new google.maps.Marker({
                position: latLng,
                icon: "./img/icon_" + token + '.png',
                customInfo: v.BusinessID
            });

            google.maps.event.addListener(marker, 'click', function(content) {
                return function() {
                    infowindow.setContent("");

                    //map.setCenter(new google.maps.LatLng(v.points.y, v.points.x));
                    $.getJSON("http://128.40.150.34:" + port + "/data/tokens_spatial/" + this.customInfo, function(data) {
                        var content = "<b>" + v.BusinessName + "</b>" + "<br/><br/><b>Business ID: </b>" + v.BusinessID + "<br/><b>Business Type: </b> " + v.BusinessType + " <br/><b>Borough: </b> " + v.LocalAuthorityName + "<br/><b>Postcode:</b> " + v.PostCode + " <br/><b>Hygiene rating: </b>" + v.RatingValue;
                        infowindow.setContent(content);
                    });

                    infowindow.open(map, this);
                };
            }(""));

            markerArray.push(marker);

        });

        $("#premisesNum").html(data.length);

        setAllMap(map);
    });
}




function createMarkers() {
    var marker = new google.maps.Marker({
        position: latLng
    });
}

function setAllMap(map) {
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(map);
    }
}

function clearMarkers() {
    setAllMarkers(null);
}