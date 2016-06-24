// $('.navbar-brand').css('opacity', 1);

$(function () {
    
    var $blogHeader = $('#blog-header');
    var $window = $(window);
    var $navbarMain = $('.navbar-main');

    $('.nav-link.blog').addClass( "active" );

    
    affix(function () {
        return $blogHeader.height();
    });
})