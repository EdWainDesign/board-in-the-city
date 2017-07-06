<?php

add_shortcode( 'opening-times', 'opening_times' );

function opening_times( $atts ) {
	ob_start();
    require ABSPATH . 'wp-content/themes/bitc/template-parts/shortcodes/opening-times.php';
    return ob_get_clean();
}
