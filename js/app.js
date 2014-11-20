/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847
 */

"use strict";

$(document).ready(function() {
    var mapElem = document.getElementById('map');
    var center = {
        lat: 41.8369,
        lng: -87.6847
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var stations;
    var markers = [];

    $.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
        .done(function(data) {
            stations = data;
            data.forEach(function(station) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h2>' + station.station_name + '</h2>';
                    html += '<p>' + station.street_address  + '</p>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });
            });
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            $('#ajax-loader').fadeOut();
        })

});
//iterating over aray using for each
//check if string is contained in camera label -.indexOf()
//cases -  upper/lower coonvert to all lower case to compare
//adding corresponding marker, same index in station, have two different callback functions in the foreach, itemIndex
//setMap null for the coressponding marker
//setMap to have them all reappear
//keyUp search, jQuery - bind for search bar to filter as you are typing
//use geoCoding service, if at all possible, geocode ahead of time, and store in a database or another file
//tips: cameralabel for search filtering