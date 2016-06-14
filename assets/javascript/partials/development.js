$(function () {
    
    var $cards= $('#development .card');
    
    var sameHeightCards = function () {
        var t = 0;
        var t_elem;
        $cards.each(function () {
            $this = $(this);
            if ( $this.outerHeight() > t ) {
                t_elem=this;
                t=$this.outerHeight();
            }
        });
        
        $cards.each(function () {
            $this = $(this);
            if($this.outerHeight() != t) {
                $this.css('min-height',t);
            }
            
        });

    }
    
    $(window).on('resize', function() {
      sameHeightCards();
    });
    sameHeightCards();

})