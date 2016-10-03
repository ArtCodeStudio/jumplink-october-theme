/**
 * Performs a smooth page scroll to an anchor on the same page.y
 * @see https://css-tricks.com/snippets/jquery/smooth-scrolling/
 */
$(function() {
  /*$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return true;
      }
    }
  });*/
  
    $('a[href*="#"]:not([href="#"])').click(function() {
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return true;
    });
    
    
    /**
     * @see http://dcdeiv.github.io/simpler-sidebar/
     */
    var sidebarTrigger = '.navbar-toggler';
    var closingLinks = '.close-sidebar';
    
    $('#sidebar').show();
    $( "#sidebar" ).simplerSidebar( {
        align: "left",
        selectors: {
            trigger: sidebarTrigger,
            quitter: closingLinks,
        },
    	animation: {
    		duration: 500,
    		easing: 'easeOutQuint'
    	},
        sidebar: {
            width: '250px',
            
        },
        mask: {
            display: true,
        },
        events: {
          on: {
            animation: {
              open: function() {
                // icon animation for open
                //transformicons.transform($(sidebarTrigger+'.tcon')[ 0 ]);
              },
              close: function() {
                // icon animation for close
                //transformicons.revert($(sidebarTrigger+'.tcon')[ 0 ]);
              },
              both: function() {
    
              },
            }
          },
        },
    } ); 
    
  
});

