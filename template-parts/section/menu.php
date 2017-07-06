<section id="menu" class="block-section menu">
    <article>
        <?php
            $id = get_page_id_by_slug('menu');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
