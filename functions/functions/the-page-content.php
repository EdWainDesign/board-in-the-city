<?php

function the_page_content( $slug ) {

    $page = get_posts( array( 'post_type' => 'page', 'name' => $slug ) );
    $content = apply_filters( 'the_content', $page[0]->post_content );
    return $content;

}

?>
