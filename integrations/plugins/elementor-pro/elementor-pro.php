<?php

use Elementor\Controls_Manager;
use \Elementor\TemplateLibrary\Source_Local;

defined( 'ABSPATH' ) or die( "you do not have access to this page!" );


/**
 * Main Plugin Class
 *
 * Register new elementor widget.
 *
 * @since 1.0.0
 */
class CMPLZ_Elementor_Pro {
	public $banner_active;
	public $create_legal_hub = false;
	public $create_cookiebanner = false;
	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function __construct() {
		add_action( 'elementor/init', array( $this, 'maybe_import_templates' ), 10 );
		add_filter( 'cmplz_fields', [ $this, 'filter_elementor_pro_fields' ], 100, 1);
		add_action( "cmplz_after_save_field", [$this, "update_legal_banner" ], 10, 4 );
	}



	/**
	 * Add fields for elementor
	 * @param array $fields
	 *
	 * @return array
	 */
	public function filter_elementor_pro_fields( $fields ) {
		$fields = array_merge( $fields,
			[
				[
					'id'       => 'create_legal_hub_elementor',
					'menu_id'  => 'plugins',
					'label' => __('Do you want to create a Legal Hub with Elementor Pro?', "complianz-gdpr"),
					'type' => 'radio',
					'options' => [
						'yes' => __('Yes', "complianz-gdpr"),
						'no'  => __('No', "complianz-gdpr"),
					],
					'required' => false,
					'help'                    => [
						'label' => 'default',
						'title' => __( "Legal Hub", 'complianz-gdpr' ),
						'text'  => __( 'If you choose to create your Legal Hub with Elementor Pro we will import our default template.', 'complianz-gdpr' ),
						'url'   => 'https://complianz.io/creating-the-legal-hub/',
					],
				],
			]
		);
		return $fields;
	}

	public function update_legal_banner( string $name, $value, $prev_value, $type){
		if ( !cmplz_user_can_manage() ) {
			return;
		}
		if ($value === $prev_value){
			return;
		}

		if ( $name==='create_legal_hub_elementor' && $value==='yes'){
			$this->create_legal_hub = true;
		}

	}
	/**
	 *
	 */
	public function maybe_import_templates() {
		if ( !cmplz_user_can_manage() ) {
			return;
		}

		if ( $this->create_legal_hub ) {
			$post_id = get_option( 'cmplz_elementor_hub_autogenerated' );
			$post = get_post($post_id);
			if ( ! $post || $post->post_status === 'trash') {
				if ( file_exists( cmplz_path . 'integrations/plugins/elementor-pro/legal-hub-template.json' ) ) {
					//create backup. Elementor deletes the file
					copy( cmplz_path . 'integrations/plugins/elementor-pro/legal-hub-template.json', cmplz_path . 'integrations/plugins/elementor-pro/legal-hub-template-bkp.json' );
					require_once WP_PLUGIN_DIR . '/elementor/includes/template-library/sources/local.php';
					$local = new \Elementor\TemplateLibrary\Source_Local();
					$import = $local->import_template( 'legal-hub-template.json', cmplz_path . 'integrations/plugins/elementor-pro/legal-hub-template.json' );

					//restore backup
					copy( cmplz_path . 'integrations/plugins/elementor-pro/legal-hub-template-bkp.json', cmplz_path . 'integrations/plugins/elementor-pro/legal-hub-template.json' );
					unlink( cmplz_path . 'integrations/plugins/elementor-pro/legal-hub-template-bkp.json');
					if ( is_array( $import ) && isset( $import[0] ) && isset( $import[0]['template_id'] ) ) {
						$post_id = $import[0]['template_id'];
					}
				}

				//set to draft by default
				$args = array(
					'post_status' => 'draft',
					'ID' => $post_id,
				);
				wp_update_post($args);
				update_option('cmplz_elementor_hub_autogenerated', $post_id, false );
			}
		}
	}

}

new CMPLZ_Elementor_Pro();
