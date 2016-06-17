/* ========================================================================
 * ScrollPos-Styler v0.6
 * https://github.com/acch/scrollpos-styler
 * ========================================================================
 * Copyright 2015 Achim Christ
 * Licensed under MIT (https://github.com/acch/scrollpos-styler/blob/master/LICENSE)
 * ======================================================================== */

// JSHint directives
/* exported ScrollPosStyler */

var affix = function(elementSelectors, getScrollOffsetY) {
  "use strict";

  /* ====================
   * private variables
   * ==================== */
  var $window = $(window);
  var scrollPosY = $window.scrollTop();
  var busy = false;
  var onTop = true;
  var $body = $('body');
  
  

      // toggle style / class when scrolling below this position (in px)
  var scrollOffsetY = getScrollOffsetY();

      // choose elements to apply style / class to
  var elements = document.getElementsByClassName(elementSelectors);


  /* ====================
   * private funcion to check scroll position
   * ==================== */
  function onScroll() {
    scrollOffsetY = getScrollOffsetY();
    
    // ensure that events don't stack
    if (!busy) {
      // get current scroll position from window
      scrollPosY = $window.scrollTop(); // window.pageYOffset
      
      // if we were above, and are now below scroll position...
      if (onTop && scrollPosY > scrollOffsetY) {
        // suspend accepting scroll events
        busy = true;

        // remember that we are below scroll position
        onTop = false;

        // asynchronuously add style / class to elements
        window.requestAnimationFrame(belowScrollPos);

      // if we were below, and are now above scroll position...
      } else if (!onTop && scrollPosY <= scrollOffsetY) {
        // suspend accepting scroll events
        busy = true;

        // remember that we are above scroll position
        onTop = true;

        // asynchronuously add style / class to elements
        window.requestAnimationFrame(aboveScrollPos);
      }
    }
  }


  /* ====================
   * private function to style elements when above scroll position
   * ==================== */
  function aboveScrollPos() {
    // iterate over elements
    // for (var elem of elements) {
    for (var i = 0; elements[i]; ++i) { // chrome workaround
      // add style / class to element
      elements[i].classList.add("affix--abv");
      elements[i].classList.remove("affix--blw");
      
    }
    
    document.body.classList.add("affix--abv");
    document.body.classList.remove("affix--blw");

    // resume accepting scroll events
    busy = false;
  }

  /* ====================
   * private function to style elements when below scroll position
   * ==================== */
  function belowScrollPos() {
    // iterate over affix
    // for (var elem of elements) {
    for (var i = 0; elements[i]; ++i) { // chrome workaround
      // add style / class to element
      elements[i].classList.add("affix--blw");
      elements[i].classList.remove("affix--abv");
    }
    
    document.body.classList.add("affix--blw");
    document.body.classList.remove("affix--abv");

    // resume accepting scroll events
    busy = false;
  }


  /* ====================
   * public function to initially style elements based on scroll position
   * ==================== */
  var pub = {
    init: function() {
      // suspend accepting scroll events
      busy = true;

      // get current scroll position from window
      scrollPosY = $window.scrollTop(); // window.pageYOffset
      
      // if we are below scroll position...
      if (scrollPosY > scrollOffsetY) {
        // remember that we are below scroll position
        onTop = false;

        // asynchronuously add style / class to elements
        window.requestAnimationFrame(belowScrollPos);

      // if we are above scroll position...
      } else { // (scrollPosY <= scrollOffsetY)
        // remember that we are above scroll position
        onTop = true;

        // asynchronuously add style / class to elements
        window.requestAnimationFrame(aboveScrollPos);
      }
    }
  };


  /* ====================
   * main initialization
   * ==================== */
  // defer initialization to allow browser to restore scroll position
  pub.init();
  
  // register for window scroll events
  window.addEventListener("scroll", onScroll);
  $body.on("scroll", onScroll);


  return pub;
}
