/**
 * Set each card to the height of the heightest card to get all cards with the same height 
 */
var sameHeightCards = function ($cards) {
    var t = 0;
    var t_elem;
    // get heightest height
    $cards.each(function () {
        $this = $(this);
        // reset height
        $this.css('min-height', 'auto');
        if ( $this.outerHeight() > t ) {
            t_elem=this;
            t=$this.outerHeight();
        }
    });
    
    // set all smaller cards to the height of the heightest card
    $cards.each(function () {
        $this = $(this);
        if($this.outerHeight() != t) {
            $this.css('min-height', t);
        }
    });
};

/**
 * Enable tooltips everywhere
 * @see http://v4-alpha.getbootstrap.com/components/tooltips/#example-enable-tooltips-everywhere
 */ 
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="tooltip"][data-show="always"]').tooltip('show');
});

/**
 * @see https://github.com/daneden/animate.css
 */
$.fn.extend({
    animateCss: function (animationName, cb) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            $(this).addClass('animationDone');
            if(typeof(cb) === 'function') {
                cb();
            }
            
        });
    }
});

/**
 * Special scroll events for jQuery
 * @see http://james.padolsey.com/javascript/special-scroll-events-for-jquery/
 */
(function(){
 
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
 
    special.scrollstart = {
        setup: function() {
 
            var timer,
                handler =  function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.dispatch.apply(_self, _args);
                    }
 
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll touchmove', handler).data(uid1, handler);
 
        },
        teardown: function(){
            jQuery(this).unbind( 'scroll touchmove', jQuery(this).data(uid1) );
        }
    };
 
    special.scrollstop = {
        latency: 300, // default is 300
        setup: function() {
 
            var timer,
                    handler = function(evt) {
 
                    var _self = this,
                        _args = arguments;
 
                    if (timer) {
                        clearTimeout(timer);
                    }
 
                    timer = setTimeout( function(){
 
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.dispatch.apply(_self, _args);
 
                    }, special.scrollstop.latency);
 
                };
 
            jQuery(this).bind('scroll touchmove', handler).data(uid2, handler);
 
        },
        teardown: function() {
            jQuery(this).unbind( 'scroll touchmove', jQuery(this).data(uid2) );
        }
    };
})();

/**
 * Moving background-image on mousemove
 * @see http://codepen.io/chrisboon27/pen/rEDIC
 */
var movingImageOnMousemove = function (mouseSelector, backgroundSelector, xOffset, yOffset, centerX, centerY, movementStrength) {
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    
    var move = function (pageX, pageY) {
        pageX = pageX - ($(window).width() / 2);
        pageY = pageY - ($(window).height() / 2);
        var newvalueX = (width * pageX * -1) + xOffset;
        var newvalueY = (height * pageY * -1) + yOffset;
        if(centerX === true) {
            newvalueX += $(mouseSelector).width() / 2;
        }
        if(centerY === true) {
            newvalueY += $(mouseSelector).height() / 2;
        }
        $(backgroundSelector).css("background-position", newvalueX+"px "+newvalueY+"px");
    };
    // initial position
    move(0, 0);
    // reset position on windows resize
    $( window ).resize(function() {
        move(0, 0);
    });
    // move background on mousemove
    $(mouseSelector).mousemove(function(e) {
        move(e.pageX, e.pageY);
    });
};


/**
 * Play line draw animation
 * @see https://github.com/maxwellito/vivus
 */
var playHeaderLineAnimation = function (cb) {
    var headerAnimateWrapper = $('#top .svg-wrapper');
    // if animation is not already played
    if(!$(headerAnimateWrapper).hasClass( "white-pathes" )) {
        // make all pathes white (before they are transparent) as a workaround for bad looking flipping effect
        $(headerAnimateWrapper).addClass('white-pathes');
        
        // init
        var headerLineAnimation = new Vivus('header_svg', {
            type: 'delayed',
            start: 'manual',
        }, cb);
        
        headerLineAnimation.play(0.5);
    }
};

/**
 * Play subtext fadein animation
 * @see https://github.com/daneden/animate.css
 */
var playSubtextAnimation = function (selector, cb) {
    // Show subtext with fadein animation
    $.each($(selector), function( index, value ) {
        // if animation is not already played
        if(!$(value).hasClass( "animationDone" )) {
            $(value).animateCss('fadeIn', cb);
        }
    });
};

/**
 * Start the subtext and line animation
 */
var playHeaderAnimation = function () {
    playHeaderLineAnimation(function () {
        playSubtextAnimation('.jumplink-subtext');
    });
};

/**
 * Init support Chat
 */
$(function () {
    /*
    sChat.init('EYee4kQNwKftpfm3z', {
        ssl: true,
        welcomeMessage: 'Hallo, hier kannst du direkt mit uns schreiben und Fragen stellen.',
        hostName: 'www.simplechat.support',
        labels: {
            sendPlaceholder: 'Deine Nachricht..',
            headerTitle: 'JumpLink Support'
        }
    });
    */
});

$(function () {   
    var $header = $('particles'); 
    affix(function () {
        return $header.height();
    });
})