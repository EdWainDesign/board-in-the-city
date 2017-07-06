<?php

add_action("wp_ajax_get_game", "get_game");
add_action("wp_ajax_nopriv_get_game", "get_game");

function get_game() {

    if ( !$_POST['post_id']) { return; }

    $game = get_post( $_POST['post_id'] );
    $game->post_image   = get_the_post_thumbnail($game);
    $game->post_rating  = wp_get_post_terms( $_POST['post_id'], 'rating',  array('fields' => 'all') );
    $game->post_players = wp_get_post_terms( $_POST['post_id'], 'players', array('fields' => 'all') );
    echo json_encode( $game );
    wp_die();

}
