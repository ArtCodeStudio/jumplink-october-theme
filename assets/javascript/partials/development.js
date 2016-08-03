$(function () {
    
    var $cards= $('#development .card');
    
    /**
     * Set each card to the height of the heightest card to get all cards with the same height 
     */
    var sameHeightCards = function () {
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
    }
    
    $(window).on('resize', function() {
      sameHeightCards();
    });
    sameHeightCards();

})