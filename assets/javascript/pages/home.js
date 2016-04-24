/**
 * Create Leaflet map
 */
var map = L.map('map', {
    zoomControl: false,
    attributionControl: true
}).setView([53.87249480720694, 8.698151707649231], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'jumplink.p9j2ob03',
    accessToken: 'pk.eyJ1IjoianVtcGxpbmsiLCJhIjoiY2lsODd0MGx0MDAyYXdzbHoxNWRzendxZyJ9.6HrdtEXX7n5DhJMNW8PEWA'
}).addTo(map);

var marker = L.marker([53.87249480720694, 8.698151707649231]).addTo(map);

/**
 * Init service carousel
 */
$(function () {
    $('#services_carousel').slick({
        infinite: true, 
        autoplay:false,
        arrows:true,
        centerMode: true,
        slidesToShow:1,
        slidesToScroll: 1,
        centerPadding: '0px',
        responsive: [
            {
                // Extra large devices (large desktops, 75em and up)
                breakpoint: 900,
                settings: {
                    arrows: false,
                }
            },
            {
                // Large devices (desktops, 62em and up)
                breakpoint: 744,
                settings: {
                    arrows: false,
                }
            },
            {
                // Medium devices (tablets, 48em and up)
                breakpoint: 576,
                settings: {
                    arrows: false,
                }
            },
            {
                // Small devices (landscape phones, 34em and up)
                breakpoint: 408,
                settings: {
                    arrows: false,
                }
            }
        ]
    });
});