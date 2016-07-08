var particlesConfig = {
  "particles": {
    "number": {
      "value": 10,
      "density": {
        "enable": true,
        "value_area": 80
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 100,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

particlesJS('particles', particlesConfig);

var headerAnimateWrapper = $('#particles');
var $window = $(window);


$(window).on('resize scrollstop', function() {
    if(!$('#particles').is(':within-viewport')) {
        pJSDom[0].pJS.particles.move.enable = false;
        $('.particles-js-canvas-el').css('opacity', 0);
    } else {
        pJSDom[0].pJS.particles.move.enable = true;
        pJSDom[0].pJS.fn.particlesRefresh();
        $('.particles-js-canvas-el').css('opacity', 0.99); // use 0.99 instead of 1 as workaround for mouse over effekt, I don't know why this is not working with opacity == 1
    }
});



/**
 * Check if element is in viewport after scroll or resize, if it is, start animation
 * @see https://github.com/patik/within-viewport
 */
$(window).on('resize scrollstop', function() {
    if($(headerAnimateWrapper).is(':within-viewport')) {
        setTimeout(function(){
            playSubtextAnimation('.jumplink-subtext');
        }, 500);
    }
});

/**
 * Check if element is in viewport as soon as page is loaded, if it is, start animation
 * @see https://github.com/patik/within-viewport
 */
if($(headerAnimateWrapper).is(':within-viewport')) {
    setTimeout(function(){
        playSubtextAnimation('.jumplink-subtext');
        
    }, 500);
}

$(function () {
    // WORKAROUND um seiten sprünge zu verhindern wenn sich die Seitenhöhe ändert (z.B. wenn unter Android die adresseleißte verschwindet)
    $('#particles, #particles-subtext-container, .particles-js-canvas-el').height($window.height());
});