jQuery(document).ready( function($) {
    'use strict';

    //////////////////////////////////////////
    //  Smooth Scrolling on Single Front Page
    //////////////////////////////////////////

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        let header = $('#masthead').outerHeight();
        let offset = $(href).offset().top - header;
        $('body').animate({ scrollTop: offset }, 600, 'easeOutExpo');
    });

    //////////////////////////////////////////
    //  Menu highlight on scroll (Scrollspy)
    //////////////////////////////////////////

    // let header = $('#masthead').outerHeight();
    // let screen = $(window).innerHeight();
    let sections = $('#masthead').find('.menu-item a').map((i,el) => {
        return $(el).attr('href');
    });

    let a = $(window).innerHeight();
    let b = $('#masthead').outerHeight();
    let threshold = ((a-b)/2) + b;
    console.log('threshold:'+threshold);

    $(window).on('scroll', function(e) {

        //  Get the current scroll position
        let st = $(window).scrollTop();
        // let info = $('#info').offset().top - st - threshold;
        let active = null;

        $.each(sections, (i,el) => {
            if ( $(el).offset().top - st - threshold <= 0 ) {
                active = el;
            }
        });

        console.log(active);

        let navitem = $('#masthead').find(`li a[href=${active}]`).closest('li')
            .siblings('.active').removeClass('active').end().addClass('active');
        console.log( navitem );
        // $('#masthead').find(`a[href="${active}"]`).closest('li').addClass('active');

        // console.log(active);

        // console.log(info);

        //  Compare the current scroll position against each sections offset top
        // let offsets = sections.map((i,el) => {
        //     return $(el).offset().top - st - header;
        // });

        // console.log( `screen:${screen-header} half:${screen/2+header} info-offset:` + offsets[0] );
    });

    //////////////////////////////////////////
    //  Game Finder Ajax Script
    //////////////////////////////////////////

    $('.game').on('click', function() {

        let post_id = $(this).data('id');
        $('.active-game').addClass('loading').scrollTop(0);

        $.ajax({
            type: 'POST',
            url: bitc.ajaxurl,
            dataType: 'json',
            data: {
                'post_id': post_id,
                'action': 'get_game' //this is the name of the AJAX method called in WordPress
            }, success: function (result) {
                // console.log(result);
                console.log(result);
                $('.active-game').removeClass('loading').addClass('active');
                $('.active-game-title').html(result.post_title);
                $('.active-game-rating').html(result.post_rating[0].name);
                $('.active-game-time').html(result.post_gametime[0].name);

                console.log( $('.active-game-time') );
                console.log( result.post_gametime[0].name );

                $('.active-game-players').html(result.post_players[0].name);
                $('.active-game-image').html(result.post_image);
                $('.active-game-content').html(result.post_content);
            },
            error: function () {
                console.error('error');
            }
        });
    })

});
