/**
 * ImageSelectorEdit component.
 *
 * This is an adapted copy of the PostFeaturedImage component.
 * Source: https://github.com/WordPress/gutenberg/blob/master/packages/editor/src/components/post-featured-image/index.js
 */

// Load dependencies
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck } = wp.editor;
const { PanelBody, Button, ResponsiveWrapper, Spinner } = wp.components;
const { compose } = wp.compose;
const { withSelect } = wp.data;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

class ImageSelectorEdit extends Component {
	render() {
		const { attributes, className, setAttributes, bgImage } = this.props;
		const { bgImageId } = attributes;
		const instructions = <p>{ __( 'To edit the background image, you need permission to upload media.', 'image-selector-example' ) }</p>;
		let bgImageWidth, bgImageHeight, bgImageSourceUrl;
		if ( bgImage ) {
			bgImageWidth = bgImage.media_details.width;
			bgImageHeight = bgImage.media_details.height;
			bgImageSourceUrl = bgImage.source_url;
		}

		let styles = {};
		if ( bgImageSourceUrl ) {
			styles = { backgroundImage: `url(${ bgImageSourceUrl })` };
		}

		const onUpdateImage = ( image ) => {
			setAttributes( {
				bgImageId: image.id,
			} );
		};

		const onRemoveImage = () => {
			setAttributes( {
				bgImageId: undefined,
			} );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Background settings', 'image-selector-example' ) }
						initialOpen={ true }
					>
						<div className="wp-block-image-selector-example-image components-base-control">
							<MediaUploadCheck fallback={ instructions }>
								<MediaUpload
									title={ __( 'Background image', 'image-selector-example' ) }
									onSelect={ onUpdateImage }
									allowedTypes={ ALLOWED_MEDIA_TYPES }
									render={ ( { open } ) => (
										<Button
											className={ ! bgImageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
											onClick={ open }>
											{ !! bgImageId && bgImage &&
												<ResponsiveWrapper
													naturalWidth={ bgImageWidth }
													naturalHeight={ bgImageHeight }
												>
													<img src={ bgImageSourceUrl } alt={ __( 'Background image', 'image-selector-example' ) } />
												</ResponsiveWrapper>
											}
											{ !! bgImageId && ! bgImage && <Spinner /> }
											{ ! bgImageId && ( __( 'Set background image', 'image-selector-example' ) ) }
										</Button>
									) }
									value={ bgImageId }
								/>
							</MediaUploadCheck>
							{ !! bgImageId && bgImage && ! bgImage.isLoading &&
								<MediaUploadCheck>
									<MediaUpload
										title={ __( 'Background image', 'image-selector-example' ) }
										onSelect={ onUpdateImage }
										allowedTypes={ ALLOWED_MEDIA_TYPES }
										render={ ( { open } ) => (
											<Button onClick={ open } isDefault isLarge>
												{ __( 'Replace background image', 'image-selector-example' ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
							}
							{ !! bgImageId &&
								<MediaUploadCheck>
									<Button onClick={ onRemoveImage } isLink isDestructive>
										{ __( 'Remove background image', 'image-selector-example' ) }
									</Button>
								</MediaUploadCheck>
							}
						</div>
					</PanelBody>
				</InspectorControls>
				<div
					className={ className }
					style={ styles }
				>
					<InnerBlocks />
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const { bgImageId } = props.attributes;

		return {
			bgImage: bgImageId ? getMedia( bgImageId ) : null,
		};
	} ),
)( ImageSelectorEdit );
