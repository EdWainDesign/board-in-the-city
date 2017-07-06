<?php

add_action( 'after_setup_theme', 'social_links_menu' );

function social_links_menu() {

  register_nav_menu( 'social', __( 'Social Menu', 'bitc' ) );

}
