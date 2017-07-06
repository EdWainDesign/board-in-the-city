<section id="info" class="block-section info">
    <article>
        <?php
            $id = get_page_id_by_slug('info');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
