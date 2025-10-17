<?php
/**
 * Plugin Name:       Date Block
 * Description:       Display a date.
 * Plugin URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=date-block&utm_campaign=plugin-uri
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Version:           0.7.2
 * Author:            Pixel Albatross
 * Author URI:        https://pixelalbatross.pt/?utm_source=wp-plugins&utm_medium=date-block&utm_campaign=author-uri
 * License:           GPL-3.0-or-later
 * License URI:       https://spdx.org/licenses/GPL-3.0-or-later.html
 * Update URI:        https://pixelalbatross.pt/
 * GitHub Plugin URI: https://github.com/pixelalbatross/date-block
 * Text Domain:       date-block
 */

namespace PixelAlbatross\WP\Blocks\Date;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'PIXELALBATROSS_DATE_BLOCK_PATH', plugin_dir_path( __FILE__ ) );

if ( file_exists( PIXELALBATROSS_DATE_BLOCK_PATH . 'vendor/autoload.php' ) ) {
	require_once PIXELALBATROSS_DATE_BLOCK_PATH . 'vendor/autoload.php';
}

PucFactory::buildUpdateChecker(
	'https://github.com/pixelalbatross/date-block/',
	__FILE__,
	'date-block'
)->setBranch( 'main' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function init() {

	$block_json_files = glob( PIXELALBATROSS_DATE_BLOCK_PATH . 'build/block.json' );

	foreach ( $block_json_files as $filename ) {

		$block_folder = dirname( $filename );
		$block_type   = register_block_type_from_metadata( $block_folder );

		if ( ! empty( $block_type->editor_script_handles ) ) {
			foreach ( $block_type->editor_script_handles as $handle ) {
				wp_set_script_translations(
					$handle,
					'date-block',
					PIXELALBATROSS_DATE_BLOCK_PATH . 'languages'
				);
			}
		}
	}
}
add_action( 'init', __NAMESPACE__ . '\init' );

/**
 * Registers the block textdomain.
 *
 * @return void
 */
function i18n() {
	load_plugin_textdomain( 'date-block', false, plugin_basename( PIXELALBATROSS_DATE_BLOCK_PATH ) . '/languages' );
}
add_action( 'init', __NAMESPACE__ . '\i18n' );
