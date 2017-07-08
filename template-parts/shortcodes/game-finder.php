<div id="game_finder">
    <div class="game-list-container">
        <input class="empty" type="search" placeholder="Search games..." />
        <i class="zmdi zmdi-close clear"></i>
        <ul class="game-list">

            <?php
                $loop = new WP_Query(
                    array( 'post_type' => 'game', 'posts_per_page' => -1, 'orderby' => 'name', 'order' => 'ASC' )
                );
                while ( $loop->have_posts() ) : $loop->the_post();
            ?>

            <li class="game" data-id="<?= the_id() ?>" data-search="<?= the_title() ?>">
                <?php the_title(); ?>
            </li>

            <?php
                endwhile;
                wp_reset_query();
            ?>

        </ul>
    </div>
    <div class="active-game-container">
        <i class="zmdi zmdi-close close"></i>
        <div class="active-game">
            <div class="active-game-image" data-insert="image"></div>
            <header class="active-game-header">
                <h2 class="active-game-title" data-insert="title">Game Finder</h2>
                <div class="active-game-meta">
                    <span class="active-game-rating"  data-insert="rating"></span>
                    <span class="active-game-time"    data-insert="gametime"></span>
                    <span class="active-game-players" data-insert="players"></span>
                </div>
            </header>
            <div class="active-game-body">
                <p class="active-game-content" data-insert="content">Find out more about a game by selecting it on the left.</p>
            </div>
        </div>
    </div>
</div>
