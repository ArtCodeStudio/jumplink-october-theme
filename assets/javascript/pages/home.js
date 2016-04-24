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