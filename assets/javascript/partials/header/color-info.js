$(function () {
    var $header = $('header');    
    
    playSubtextAnimation('.jumplink-subtext');
    
    affix(function () {
        return $header.height();
    });
})