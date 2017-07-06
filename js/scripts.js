jQuery(document).ready( function($) {
    'use strict';

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
                $('.active-game').removeClass('loading').addClass('active');
                $('.active-game-title').html(result.post_title);
                $('.active-game-rating').html(result.post_rating[0].name);
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
