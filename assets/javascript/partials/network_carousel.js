/**
 * Init service carousel
 */
$(function () {
    $('#network_carousel').slick({
        infinite: true, 
        autoplay:false,
        arrows:true,
        centerMode: true,
        slidesToShow:3,
        slidesToScroll: 1,
        centerPadding: '0px',
        responsive: [
            {
                // Extra large devices (large desktops, 75em and up)
                breakpoint: 1199,
                settings: {
                    arrows: false,
                }
            },
            {
                // Large devices (desktops, 62em and up)
                breakpoint: 991,
                settings: {
                    arrows: false,
                }
            },
            {
                // Medium devices (tablets, 48em and up)
                breakpoint: 767,
                settings: {
                    slidesToShow:2,
                    arrows: false,
                }
            },
            {
                // Small devices (landscape phones, 34em and up)
                breakpoint: 543,
                settings: {
                    slidesToShow:1,
                    arrows: false,
                }
            }
        ]
    });
});