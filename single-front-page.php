<?php
/**
 * Template Name: Single Front Page
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<?php
				require_once('template-parts/section/welcome.php');
				require_once('template-parts/section/info.php');
				require_once('template-parts/section/menu.php');
				require_once('template-parts/section/games.php');
				require_once('template-parts/section/events.php');
				require_once('template-parts/section/bookings.php');
				require_once('template-parts/section/about.php');
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
// get_sidebar();
get_footer();
