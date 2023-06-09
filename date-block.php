<?php
/**
 * Plugin Name:       Date Block
 * Description:       Display a date.
 * Plugin URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=date-block&utm_campaign=plugin-uri
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           0.2.0
 * Author:            Pixel Albatross
 * Author URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=date-block&utm_campaign=author-uri
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        https://pixelalbatross.pt/
 * GitHub Plugin URI: https://github.com/pixelalbatross/date-block
 * Text Domain:       date-block
 *
 * @package           pixelalbatross/date-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function pixelalbatross_date_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'pixelalbatross_date_block_init' );
