$(function () {
    
    var $body= $('body');
    var $window = $(window);
    var $development = $('#development');
    var $network = $('#network');
    var $contact = $('#contact');
    var $imprint= $('#imprint');
    
    var $navbarMain = $('.navbar-main');
    
    var checkPart = function ($element) {
        if($element.is(':within-viewport')) {
            $element.addClass('bg-gray-lighter');
            $element.removeClass('bg-body');
        } else {
            $element.removeClass('bg-gray-lighter');
            $element.addClass('bg-body');
        }
    }
    
    var checkParts = function () {
        checkPart($development);
        checkPart($network);
        checkPart($contact);
        checkPart($imprint);
    }
    
    // $(window).on('resize scrollstop scrollstart', function() {
    //     checkParts();
    // });
    // checkParts();
    
    affix("navbar-main", function () {
        return $window.height();
    });
})