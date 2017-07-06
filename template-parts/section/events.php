<section id="events" class="block-section events">
    <article>
        <?php
            $id = get_page_id_by_slug('events');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
