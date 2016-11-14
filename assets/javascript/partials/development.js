$(function () {
    
    var $cards= $('#development .card');
    
    
    $(window).on('resize', function() {
      sameHeightCards($cards);
    });
    sameHeightCards($cards);

})