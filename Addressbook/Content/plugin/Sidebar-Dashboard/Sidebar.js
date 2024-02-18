jQuery(document).ready(function ($) {
    function toggleNav(bool) {
        $('.wp-nav-container, .wp-overlay').toggleClass('is-visible', bool);
        //$('main').toggleClass('scale-down', bool);
        $('body').toggleClass('navigation-visible', bool);
    }

    //open navigation clicking the menu icon
    $('.wp-nav-trigger').on('click', function (event) {
        event.preventDefault();
        toggleNav(true);
    });

    //close the navigation
    $('.wp-close-nav, .wp-overlay').on('click', function (event) {
        event.preventDefault();
        toggleNav(false);
    });

});