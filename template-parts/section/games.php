<section id="games" class="block-section games">
    <article>
        <?php
            $id = get_page_id_by_slug('games');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
