<?php

add_shortcode( 'contact-card', 'contact_card' );

function contact_card( $atts ) {
	ob_start();
    require ABSPATH . 'wp-content/themes/bitc/template-parts/shortcodes/contact-card.php';
    return ob_get_clean();
}
