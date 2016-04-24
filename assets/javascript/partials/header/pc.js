var headerAnimateWrapper = $('#top .svg-wrapper');

/**
 * Check if element is in viewport after scroll or resize, if it is, start animation
 * @see https://github.com/patik/within-viewport
 */
$(window).on('resize scrollstop scroll touchmove', function() {
    if($(headerAnimateWrapper).is(':within-viewport')) {
        playHeaderAnimation();
    }
});

/**
 * Check if element is in viewport as soon as page is loaded, if it is, start animation
 * @see https://github.com/patik/within-viewport
 */
if($(headerAnimateWrapper).is(':within-viewport')) {
    playHeaderAnimation();
}

