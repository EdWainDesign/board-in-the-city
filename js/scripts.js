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
    //  Menu options auto-styles
    //////////////////////////////////////////

    $('#menu .tablepress tbody tr td:first-of-type').each((i,el) => {
        let text = $(el).text().replace(/\[/g, '<span class="option">').replace(/\]/g, '</span>');
        $(el).html(text);

        $('.option').each((i,opt) => {
            let option = $(opt).text();
            switch ( true ) {
                case option.indexOf('Vgn') > -1:
                    $(opt).addClass('vegan'); break;
                case option.indexOf('GF') > -1:
                    $(opt).addClass('gluten-free'); break;
                case option.indexOf('V') > -1:
                    $(opt).addClass('vegetarian'); break;
                    break;
            }
        });
    });

    //////////////////////////////////////////
    //  'Game Finder' ajax script
    //////////////////////////////////////////

    $('.game').on('click', function(e) {

        let post_id = $(this).data('id');
        $(e.target).siblings('.active').removeClass('active').end().addClass('active');
        $('.active-game').addClass('active loading').scrollTop(0);

        $.ajax({
            type: 'POST',
            url: bitc.ajaxurl,
            dataType: 'json',
            data: {
                'post_id': post_id,
                'action': 'get_game' //this is the name of the AJAX method called in WordPress
            }, success: function (result) {
                $('.game-list .game').removeClass('active');
                $('.game-list').find(`.game[data-id=${result.ID}]`).addClass('active');
                $('.active-game').removeClass('loading');
                $('.active-game-title').html(result.post_title);
                $('.active-game-rating').html(result.post_rating[0].name);
                $('.active-game-time').html(result.post_gametime[0].name);
                $('.active-game-players').html(result.post_players[0].name);
                $('.active-game-image').html(result.post_image);
                $('.active-game-content').html(result.post_content);
            },
            error: function () {
                console.error('error');
            }
        });
    });

    $('#game_finder .active-game .close').on('click', function(e) {
        $('#game_finder .game-list .active').removeClass('active');
        $('#game_finder .active-game').removeClass('active');
    });

    //////////////////////////////////////////
    //  'Game Finder' search script
    //////////////////////////////////////////

    $('#game_finder .game-list-container input[type="search"]').on('keyup', function(e) {
        let value = e.target.value.toLowerCase();
        console.log(value);
        if ( value ) { $(e.target).removeClass('empty'); }
        else         { $(e.target).addClass('empty'); }
        $('#game_finder .game-list .game').addClass('hide');
        $('#game_finder .game-list .game').filter((i,el) => {
            return $(el).data('search').toLowerCase().indexOf(value) > -1;
        }).removeClass('hide');
    });

    $('#game_finder .game-list-container .clear').on('click', function(e) {
        $('#game_finder .game-list-container input').val('').trigger('keyup');
    });

    //////////////////////////////////////////
    //  Remove <p> tags from "Contact Form 7"
    //////////////////////////////////////////

    $(".wpcf7-form").find("p").contents().unwrap();

});
