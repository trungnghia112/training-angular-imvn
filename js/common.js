if (Modernizr.touch === true && $(window).width() <= 767) {
    //alert('Touch Screen');
} else {

}

$(window).load(function () {


});

(function ($) {
    "use strict";

    // Scroll to top
    function scrollToTop() {
        $('.x-scroll-top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });
    }

    function init() {
        inputPlaceholders();
        scrollToTop();
    }

    init();

})(jQuery);