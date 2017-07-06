<?php

add_action( 'init', 'create_game_post_type' );

function create_game_post_type() {

    register_taxonomy(
        'players',
        'game',
        array(
            'label' => __( 'Players' ),
            'rewrite' => array( 'slug' => 'players' ),
            'hierarchical' => false,
        )
    );

    register_taxonomy(
        'rating',
        'game',
        array(
            'label' => __( 'Rating' ),
            'rewrite' => array( 'slug' => 'rating' ),
            'hierarchical' => false,
        )
    );

    register_post_type( 'game', array(
        'labels' => array(
            'name' => __( 'Games' ),
            'singular_name' => __( 'Game' )
        ),
        'public' => true,
        'has_archive' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-archive',
        'supports' => array( 'title', 'editor', 'thumbnail' )
    ) );

}
