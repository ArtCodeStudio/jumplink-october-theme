/**
 * Init service carousel
 */
$(function () {
    $('#network_carousel').slick({
        infinite: true, 
        autoplay:false,
        arrows:true,
        centerMode: false,
        slidesToShow:4,
        slidesToScroll: 1,
        centerPadding: '0px',
        responsive: [
            {
                // Extra large devices (large desktops, 75em and up)
                breakpoint: 900,
                settings: {
                    slidesToShow:3,
                    centerMode: true,
                    arrows: true,
                }
            },
            {
                // Large devices (desktops, 62em and up)
                breakpoint: 744,
                settings: {
                    slidesToShow:3,
                    centerMode: true,
                    arrows: false,
                }
            },
            {
                // Medium devices (tablets, 48em and up)
                breakpoint: 576,
                settings: {
                    slidesToShow:2,
                    centerMode: true,
                    arrows: false,
                }
            },
            {
                // Small devices (landscape phones, 34em and up)
                breakpoint: 408,
                settings: {
                    slidesToShow:1,
                    centerMode: true,
                    arrows: false,
                }
            }
        ]
    });
});