/**
 * Init service carousel
 */
$(function () {
    $('#jewelberry_carousel, #chou-chou-berlin_carousel, #feinfineart_carousel, #breb_carousel').slick({
        accessibility: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'ease',
        draggable: false,
        fade: true,
        speed: 800,
        swipe: false,
        infinite: true, 
        arrows: false,
        centerMode: true,
        dots: false,
        dotsClass: 'slick-dots slick-dots-vertical',
        // appendDots: 'TODO', 
        slidesToShow:1,
        slidesToScroll: 1,
        centerPadding: '0px',
    });
    
    $('#credentials_carousel').slick({
        infinite: false, 
        autoplay: false,
        arrows:true,
        centerMode: true,
        dots: true,
        slidesToShow:1,
        slidesToScroll: 1,
        centerPadding: '0px',
        responsive: [
            {
                // Extra large devices (large desktops, 75em and up)
                breakpoint: 900,
                settings: {
                    arrows: true,
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