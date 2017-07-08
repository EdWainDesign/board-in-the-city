<section id="<?= $atts['slug'] ?>" class="block-section <?= $atts['slug'] ?>">
    <article>
        <?php
            $id = get_page_id_by_slug($atts['slug']);
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
