<?php

add_shortcode( 'game-finder', 'game_finder' );

function game_finder( $atts ) {
	ob_start();
    require ABSPATH . 'wp-content/themes/bitc/template-parts/shortcodes/game-finder.php';
    return ob_get_clean();
}
