jQuery(document).ready(function ($) {
    function toggleNav(bool) {
        $('.ch-nav-container, .ch-overlay').toggleClass('is-visible', bool);
        //$('main').toggleClass('scale-down', bool);
        $('body').toggleClass('navigation-visible', bool);
    }

    //open navigation clicking the menu icon
    $('.ch-nav-trigger').on('click', function (event) {
        event.preventDefault();
        toggleNav(true);
    });

    //close the navigation
    $('.ch-close, .ch-overlay').on('click', function (event) {
        event.preventDefault();
        toggleNav(false);
    });

});