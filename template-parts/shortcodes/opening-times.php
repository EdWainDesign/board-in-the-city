<div id="opening_times">
    <h2>Opening Times</h2>

    <?php
        echo do_shortcode( '[op-overview set_id="main" show_closed_days="true" time_format="ga" /]' );
        $open = do_shortcode( '[op-is-open set_id="main" show_next="true"]' );
        echo $open;
    ?>

</div>
