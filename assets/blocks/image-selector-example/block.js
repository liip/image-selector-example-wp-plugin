/**
 * BLOCK: image-selector-example/image-selector
 */
// Import styles
import './style.scss';

import edit from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType( 'image-selector-example/image-selector', {
	title: __( 'Image Selector Example', 'image-selector-example' ),
	icon: 'format-image',
	category: 'common',
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
