<section id="bookings" class="block-section bookings">
    <article>
        <?php
            $id = get_page_id_by_slug('bookings');
            echo \Elementor\Plugin::$instance->frontend->get_builder_content( $id );
        ?>
    </article>
</section>
