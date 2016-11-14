
$(function() {
    
    /**
     * Performs a smooth page scroll to an anchor on the same page.y
     * @see https://css-tricks.com/snippets/jquery/smooth-scrolling/
     */
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

