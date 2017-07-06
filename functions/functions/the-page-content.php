<?php

function get_page_id_by_slug( $slug ) {
    $page = get_posts( array( 'post_type' => 'page', 'name' => $slug ) );
    $page = $page[0]->ID;
    return $page;
}

function the_page_content( $slug ) {

    $page = get_posts( array( 'post_type' => 'page', 'name' => $slug ) );
    $content = apply_filters( 'the_content', $page[0]->post_content );
    return $content;

}

function the_page_id( $slug ) {

    $page = get_posts( array( 'post_type' => 'page', 'name' => $slug ) );
    $content = apply_filters( 'the_content', $page[0]->post_content );
    return $content;

}

?>
