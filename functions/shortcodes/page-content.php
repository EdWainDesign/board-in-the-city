<?php

add_shortcode( 'page-content', 'page_content' );

function page_content( $atts ) {
	ob_start();
    require ABSPATH . 'wp-content/themes/bitc/template-parts/shortcodes/page-content.php';
    return ob_get_clean();
}
