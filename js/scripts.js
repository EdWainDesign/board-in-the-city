jQuery(document).ready( function($) {
    'use strict';

    //////////////////////////////////////////
    //  Animate scrolling for local anchors
    //////////////////////////////////////////

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        let header = $('#masthead').outerHeight();
        let offset = $(href).offset().top - header;
        $('body').animate({ scrollTop: offset }, 600, 'easeOutExpo');
    });

    //////////////////////////////////////////
    //  Highlight menu on scroll (Scrollspy)
    //////////////////////////////////////////

    if ( $('body').hasClass('page-template-single-front-page') ) {

        let sections = $('#masthead').find('.menu-item a').map((i,el) => {
            return $(el).attr('href');
        });

        let a = $(window).innerHeight();
        let b = $('#masthead').outerHeight();
        let threshold = ((a-b)/2) + b;

        $(window).on('scroll', function(e) {

            let st = $(window).scrollTop();
            let active = null;

            $.each(sections, (i,el) => {
                let os = $(el).offset().top;
                if ( os - st - threshold <= 0 ) {
                    active = el;
                }
            });

            $('#masthead').find(`li a[href=${active}]`).closest('li')
            .siblings('.active').removeClass('active').end().addClass('active');
        });
    }

    //////////////////////////////////////////
    //  'Game Finder' ajax script
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
    });

    //////////////////////////////////////////
    //  'Game Finder' search script
    //////////////////////////////////////////

    $('#game_finder .game-list-container input[type="search"]').on('keypress', function(e) {
        if ( e.which !== 13 ) { return; }
        let value = e.target.value.toLowerCase();
        $('#game_finder .game-list .game').addClass('hide');
        $('#game_finder .game-list .game').filter((i,el) => {
            return $(el).data('search').toLowerCase().indexOf(value) > -1;
        }).removeClass('hide');
    });

});
