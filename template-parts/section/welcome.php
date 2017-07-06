<section id="welcome" class="block-section welcome">
    <article>
        <?php
            $id = get_page_id_by_slug('welcome');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
