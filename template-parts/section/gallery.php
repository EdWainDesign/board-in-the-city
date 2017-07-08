<section id="gallery" class="block-section gallery">
    <article>
        <?php
            $id = get_page_id_by_slug('photos');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
