<?php
/**
 * Plugin Name: Block Image Selector Example
 * Description: Example how to create an image selector for a Gutenberg block in WordPress.
 * Author: Liip AG
 * Author URI: https://liip.ch
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: image-selector-example
 * Domain Path: /languages/
 *
 * @package image-selector-example
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'enqueue_block_editor_assets', 'image_selector_example_enqueue_block_editor_assets' );

function image_selector_example_enqueue_block_editor_assets() {
	// Enqueue script
	wp_enqueue_script(
		'image-selector-example-js',
		esc_url( plugins_url( '/dist/block.js', __FILE__ ) ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor',
			'wp-components',
			'wp-compose',
			'wp-data',
		),
		'1.0.0',
		true // Enqueue the script in the footer.
	);

	// Enqueue styles
	wp_enqueue_style(
		'image-selector-example-styles',
		esc_url( plugins_url( '/dist/block.css', __FILE__ ) ),
		array( 'wp-editor' ),
		'1.0.0'
	);
}
