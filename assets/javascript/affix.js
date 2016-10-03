/* ========================================================================
 * ScrollPos-Styler v0.6
 * https://github.com/acch/scrollpos-styler
 * ========================================================================
 * Copyright 2015 Achim Christ
 * Licensed under MIT (https://github.com/acch/scrollpos-styler/blob/master/LICENSE)
 * ======================================================================== */

// JSHint directives
/* exported ScrollPosStyler */

var affix = function(getScrollOffsetY) {

    /* ====================
    * private variables
    * ==================== */
    var $window = $(window);
    //var navbarStatic = $('#navbar-main-static');
    var navbarFixed = $('#navbar-main-fixed');
    var scrollPosY = $window.scrollTop();
    var scrollOffsetY = getScrollOffsetY();
    var onTop = true;
    var scrollTimeout; 
  
    /* ====================
    * private funcion to check scroll position
    * ==================== */
    function onScroll() {
        scrollOffsetY = getScrollOffsetY();
        
        // get current scroll position from window
        scrollPosY = $window.scrollTop(); // window.pageYOffset
        
        // if we were above, and are now below scroll position...
        if (onTop && scrollPosY > scrollOffsetY) {
            // remember that we are below scroll position
            onTop = false;
            
            belowScrollPos();
            
        // if we were below, and are now above scroll position...
        } else if (!onTop && scrollPosY <= scrollOffsetY) {
            // remember that we are above scroll position
            onTop = true;
            
            aboveScrollPos();
        }
    }


    /* ====================
    * private function to style elements when above scroll position
    * ==================== */
    function aboveScrollPos() {
        navbarFixed.removeClass('bg-primary z-depth-1').addClass('bg-transparent');
    }
    
    /* ====================
    * private function to style elements when below scroll position
    * ==================== */
    function belowScrollPos() {
        navbarFixed.removeClass('bg-transparent').addClass('bg-primary z-depth-1');
    }


    $window.bind('scrollstop', onScroll);
    onScroll();
}
