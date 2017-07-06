<div id="game_finder">
    <div class="game-list-container">
        <input type="search" placeholder="Search our games..." />
        <ul class="game-list">

            <?php
                $loop = new WP_Query(
                    array( 'post_type' => 'games', 'posts_per_page' => 100, 'order' => 'ASC' )
                );
                while ( $loop->have_posts() ) : $loop->the_post();
            ?>

            <li class="game" data-id="<?= the_id() ?>">
                <?php the_title(); ?>
            </li>

            <?php
                endwhile;
                wp_reset_query();
            ?>

        </ul>
    </div>
    <div class="active-game-container">
        <div class="active-game">
            <h2 class="active-game-title">Game Finder</h2>
            <p class="active-game-description">Find out more about a game by selecting it on the left.</p>
        </div>
    </div>
</div>
