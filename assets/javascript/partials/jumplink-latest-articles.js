var $cards= $('#latest-blog-posts .card');
$(window).on('resize', function() {
  sameHeightCards($cards);
});
sameHeightCards($cards);