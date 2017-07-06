<section id="about" class="block-section about">
    <article>
        <?php
            $id = get_page_id_by_slug('about');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
