/**
 * BLOCK: image-selector-example/image-selector
 */
// Import styles
import './style.scss';

import edit from './edit';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor;

registerBlockType( 'image-selector-example/image-selector', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Image Selector Example', 'image-selector-example' ), // Block title.
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Image Selector', 'image-selector-example' ),
	],

	supports: {
		align: [ 'full' ],
	},

	attributes: {
		bgImageId: {
			type: 'number',
		},
	},

	edit,

	save() {
		return (
			<InnerBlocks.Content />
		);
	},
} );
