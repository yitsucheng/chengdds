jQuery(document).ready(function ($) {
    "use strict";

    $('#menu_toggle').on('click touchstart', function () {
        $(this).toggleClass('open');
        $('.mobile_menu').slideToggle(300);
        return false;
    });

    $(".mobile_menu .top_mobile_menu > li.menu-item-has-children > a").after('<span class="arrow"><i class="fa fa-chevron-down"></i></span>');

    $(".mobile_menu .top_mobile_menu > li.menu-item-has-children .arrow").on('click', function () {
        $(this).toggleClass('active');
        $(this).closest('li').toggleClass('active');
        $(this).closest('li').find('> ul').slideToggle(0);
    });

    $(".mobile_menu .top_mobile_menu > li.menu-item-has-children > a").on('click', function () {
        if( $(this).attr('href') == '#' ){
            $(this).closest('li').find('ul').slideToggle(0);
            $(this).closest('li').find('.arrow').toggleClass('active');
            $(this).closest('li').toggleClass('active');
            return false;
        }
    });

    $(".left_nav .left_nav_menu li.menu-item-has-children > a").on('click', function () {
        $(this).closest('li').addClass('active').find(' > ul').slideToggle(0);
        return false;
    });

    $.fn.is_on_screen = function () {
        var win = $(window);
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    $(".datepicker").datepicker({
        showOtherMonths: true,
        prevText: '<i class="fa fa-arrow-circle-o-left"></i>',
        nextText: '<i class="fa fa-arrow-circle-o-right"></i>'
    });

    $(".timepicker").timepicker();

    $(".fancy").fancybox({
        padding: 0,
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(57, 82, 97, 0.3)'
                }
            }
        }
    });

    $("select").select2({width: '100%', minimumResultsForSearch: '-1'});

    if( $(".booked_calendar_chooser").length ){
        $(".booked_calendar_chooser").select2('destroy');
    }

    $(".staff_read_more").on('click', function () {
        $(this).closest('.staff').find('.full_text').slideToggle(300);
        return false;
    });

    $("#left_menu_toggle").on('click', function () {
        $(this).toggleClass('open');
        if( $('.main').hasClass('left_nav_active') ){
            $('.main').removeClass('left_nav_active');
            $('.left_nav').css({left: -240});
            $('.main_wrapper').css({left: 0});
        }else{
            $('.main').addClass('left_nav_active');
            $('.left_nav').css({left: 0});
            $('.main_wrapper').css({left: 240});
        }
        return false;
    });

    $('.main').on('click', function (kik) {
        if (!$(kik.target).is('.left_nav, .left_nav *') && $('.main').hasClass('left_nav_active')) {
            $('.main').removeClass('left_nav_active');
            $('.left_nav').css({left: -240});
            $('.main_wrapper').css({left: 0});
            $('#left_menu_toggle').toggleClass('open');
        }
    });

    $('body.left_nav_mode .top_nav .search-form button').on('click',function () {
        if( ! $(this).closest('.search-form').hasClass('active') ){
            $(this).closest('.search-form').addClass('active');
            return false;
        }
    });

    $('body.left_nav_mode .top_nav .search-form').on('mouseleave',function () {
        $(this).removeClass('active');
    });

    $('#header div.top_nav').affix({
        offset: {
            top: $("#header").innerHeight()
        }
    });


});

function loadmore(that){
    "use strict";
    var $ = jQuery;
    var url = that.attr('href');
    that.parent().find('.fa-spinner').css({'opacity': 1});
    url = url + '&get_posts=1';
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (json) {
            that.parent().find('.fa-spinner').css({'opacity': 0});
            if( json['content'] ){
                $('.posts_grid, .posts_list').append( json['content'] );
            }
            if( json['button'] ){
                that.attr('href', $('<div/>').html(json['button']).text());
            }else{
                that.parent().text('');
            }
        }
    });
}

function load_testimonials(that,offset,per_page){
    "use strict";
    var $ = jQuery;
    that.parent().find('.fa-spinner').css({'opacity': 1});
    $.ajax({
        url: ajaxurl,
        data: { action: 'stm_load_testimonials', offset: offset, per_page: per_page, security: loadTestimponalNonce },
        method: 'POST',
        dataType: 'json',
        success: function (json) {
            that.parent().find('.fa-spinner').css({'opacity': 0});
            if( json['content'] ){
                $('.testimonials ul').append( json['content'] );
            }
            if( json['button'] ){
                that.replaceWith(json['button']);
            }else{
                that.parent().text('');
            }
        }
    });
}