/**
 * Performs a smooth page scroll to an anchor on the same page.y
 * @see https://css-tricks.com/snippets/jquery/smooth-scrolling/
 */
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
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
  });
});


/**
 * @see http://dcdeiv.github.io/simpler-sidebar/
 */
var closingLinks = '.close-sidebar';
$('#sidebar').show();
var $sidebar = $('#sidebar').simplerSidebar({
	opener: '.navbar-toggler',
	animation: {
		duration: 500,
		easing: 'easeOutQuint'
	},
	sidebar: {
		align: 'left',
		width: 250,
		closingLinks: closingLinks,
	},
	mask: {
		display: true
	}
});
