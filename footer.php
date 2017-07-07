<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package BITC
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="site-info">
			<span>&copy; Copyright <?= date('Y') ?> - <a href="<?= home_url() ?>"><?= bloginfo('name') ?> CIC</a></span>
			<span>
				<?php
					/* translators: 1: Theme name, 2: Theme author. */
					printf( esc_html__( 'Website by %1$s', 'bitc' ), '<a href="http://edwaindesign.co.uk/">Ed Wain</a>' );
				?>
			</span>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
