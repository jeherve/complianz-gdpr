<?php

defined('ABSPATH') or die("you do not have acces to this page!");

if (!class_exists("cmplz_document")) {
    class cmplz_document extends cmplz_document_core
    {
        private static $_this;

        function __construct()
        {
            if (isset(self::$_this))
                wp_die(sprintf(__('%s is a singleton class and you cannot create a second instance.', 'complianz'), get_class($this)));

            self::$_this = $this;

            $this->init();


        }

        static function this()
        {

            return self::$_this;
        }

        public function enqueue_assets()
        {

            if ($this->is_shortcode_page()) {
                $min = (defined('WP_DEBUG') && WP_DEBUG) ? '' : '.min';
                $load_css = cmplz_get_value('use_document_css');
                if ($load_css) {
                    wp_register_style('cmplz-document', cmplz_url . "core/assets/css/document$min.css", false, cmplz_version);
                    wp_enqueue_style('cmplz-document');
                }
            }

        }


        /*
          * Get the region for a post id, based on the post type.
          *
          * */

        public function get_region($post_id = false){

            if ($post_id) {
                $term = wp_get_post_terms($post_id,'cmplz-region');
                if (is_wp_error($term)) return false;

                if (isset($term[0])) return $term[0]->slug;

                return false;
            }

            $regions = cmplz_get_regions();

            if (isset($_GET['page'])){
                $page = sanitize_title($_GET['page']);
                foreach($regions as $region => $label){
                    if (strpos($page, '-'.$region)!==false){
                        return $region;
                    }
                }
            }

            return false;
        }


        public function set_region($post_id, $region=false){
            if (!$region) $region = $this->get_region();

            $term = get_term_by('slug', $region,'cmplz-region');
            if (!$term) {
                wp_insert_term(COMPLIANZ()->config->regions_labels[$region], 'cmplz-region',array(
                    'slug' => $region,
                ));
                $term = get_term_by('slug', $region,'cmplz-region');
            }

            if (empty($term)) return;

            $term_id = $term->term_id;

            wp_set_object_terms( $post_id, array($term_id), 'cmplz-region' );
        }


        /*
         * Check if legal documents should be updated, and send mail to admin if so
         *
         *
         * */

        public function cron_check_last_updated_status(){

            if ($this->not_updated_in(MONTH_IN_SECONDS*12) && !get_option('cmplz_update_legal_documents_mail_sent')){
                update_option('cmplz_update_legal_documents_mail_sent', true);
                $to = get_option('admin_email');

                $headers = array();
                if (empty($subject)) $subject = sprintf(_x('Your legal documents on %s need to be updated.','Subject in notification email', 'complianz'), home_url());

                $message = sprintf(_x('Your legal documents on %s have not been updated in 12 months. Please log in and run the wizard to check if everything is up to date.', 'Email message in notification email', 'complianz'), home_url());

                add_filter('wp_mail_content_type', function ($content_type) {
                    return 'text/html';
                });

                wp_mail($to, $subject, $message, $headers);

                // Reset content-type to avoid conflicts -- http://core.trac.wordpress.org/ticket/23578
                remove_filter('wp_mail_content_type', 'set_html_content_type');
            }
        }


        public function revoke_link($atts = [], $content = null, $tag = '')
        {

            // normalize attribute keys, lowercase
            $atts = array_change_key_case((array)$atts, CASE_LOWER);

            ob_start();

            // override default attributes with user attributes
            $atts = shortcode_atts(['text' => false,], $atts, $tag);

            echo cmplz_revoke_link($atts['text']);

            return ob_get_clean();

        }


        /*
         * This class is extended with pro functions, so init is called also from the pro extension.
         * */

        public function init()
        {
            add_shortcode('cmplz-document', array($this, 'load_document'));
            add_shortcode('cmplz-revoke-link', array($this, 'revoke_link'));
            add_shortcode('cmplz-do-not-sell-personal-data-form', array($this, 'do_not_sell_personal_data_form'));

            //clear shortcode transients after post update
            add_action('save_post', array($this, 'clear_shortcode_transients'), 10, 1);
            add_action('save_post', array($this, 'set_page_url_on_save_post'), 10, 1);
            add_action('cmplz_wizard_add_pages_to_menu', array($this, 'wizard_add_pages_to_menu'), 10, 1);
            add_action('admin_init', array($this, 'assign_documents_to_menu'));
            add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));

        }

        public function do_not_sell_personal_data_form($atts = [], $content = null, $tag = '')
        {

            // normalize attribute keys, lowercase
            $atts = array_change_key_case((array)$atts, CASE_LOWER);

            ob_start();

            // override default attributes with user attributes
            $atts = shortcode_atts(['text' => false,], $atts, $tag);

            echo cmplz_do_not_sell_personal_data_form();

            return ob_get_clean();

        }

        public function wizard_add_pages_to_menu()
        {
            //get list of menus
            $locations = get_theme_mod('nav_menu_locations');

            $link = '<a href="' . admin_url('nav-menus.php') . '">';
            if (!$locations) {
                cmplz_notice(sprintf(__("No menus were found. Skip this step, or %screate a menu%s first."), $link, '</a>'));
                return;
            }

            $pages_not_in_menu = $this->pages_not_in_menu();
            if ($pages_not_in_menu) {
                if (COMPLIANZ()->company->sells_personal_data()){
                    cmplz_notice(__('You sell personal data from your customers. This means you are required to put the "Do Not Sell My Personal Data" page clearly visible on your homepage.', 'complianz'));
                }

                $docs = array_map('get_the_title', $pages_not_in_menu);
                $docs = implode(", ", $docs);
                cmplz_notice(sprintf(esc_html(_n('The generated document %s has not been assigned to a menu yet, you can do this now, or skip this step and do it later.',
                    'The generated documents %s have not been assigned to a menu yet, you can do this now, or skip this step and do it later.', count($pages_not_in_menu), 'complianz')), $docs));
            } else {
                _e("Great! All your generated documents have been assigned to a menu, so you can skip this step.", 'copmlianz');
            }
            $menus = array();
            //search in menus for the current post
            foreach ($locations as $location => $menu_id) {
                if (has_nav_menu($location)) {
                    $menus[$location] = wp_get_nav_menu_name($location);
                }
            }
            $pages = $this->get_required_pages();
            echo '<table>';
            foreach ($pages as $page_id) {
                echo "<tr><td>";
                echo get_the_title($page_id);
                echo "</td><td>";
                ?>

                <select name="cmplz_assigned_menu[<?php echo $page_id ?>]">
                    <option value=""><?php _e("Select a menu", 'complianz'); ?></option>
                    <?php foreach ($menus as $location => $menu) {
                        $selected = ($this->is_assigned_this_menu($page_id, $location)) ? "selected" : "";
                        echo '<option ' . $selected . ' value="' . $location . '">' . $menu . '</option>';
                    } ?>

                </select>
                <?php
                echo "</td></tr>";
            }
            echo "</table>";

        }

        public function assign_documents_to_menu()
        {
            if (isset($_POST['cmplz_assigned_menu'])) {
                foreach ($_POST['cmplz_assigned_menu'] as $page_id => $location) {
                    if (empty($location)) continue;
                    if ($this->is_assigned_this_menu($page_id, $location)) continue;

                    $page = get_post($page_id);
                    $menu_id = $this->get_menu_id_by_location($location);
                    wp_update_nav_menu_item($menu_id, 0, array(
                        'menu-item-title' => get_the_title($page),
                        'menu-item-object-id' => $page->ID,
                        'menu-item-object' => get_post_type($page),
                        'menu-item-status' => 'publish',
                        'menu-item-type' => 'post_type',
                    ));
                }
            }
        }


        /*
         * Get all pages that are not assigned to any menu
         *
         *
         * */

        public function pages_not_in_menu()
        {
            $locations = get_theme_mod('nav_menu_locations');

            if (!$locations) return false;

            //search in menus for the current post

            $pages = $this->get_required_pages();
            $pages_in_menu = array();

            foreach ($locations as $location => $menu_id) {
                if (has_nav_menu($location)) {
                    $menu_items = wp_get_nav_menu_items($menu_id);
                    foreach ($menu_items as $post) {
                        if (in_array($post->object_id, $pages)) {
                            $pages_in_menu[] = $post->object_id;
                        }
                    }
                }
            }
            $pages_not_in_menu = array_diff($pages, $pages_in_menu);
            if (count($pages_not_in_menu) == 0) return false;

            return $pages_not_in_menu;
        }

        public function get_menu_id_by_location($location)
        {
            $theme_locations = get_nav_menu_locations();
            $menu_obj = get_term($theme_locations[$location], 'nav_menu');
            if (!$menu_obj) return false;
            return $menu_obj->term_id;
        }

        public function is_assigned_this_menu($page_id, $location)
        {
            $locations = get_theme_mod('nav_menu_locations');

            if (!$locations) return false;

            foreach ($locations as $location_key => $menu_id) {
                if ($location_key !== $location) continue;
                if (has_nav_menu($location_key)) {

                    if (has_nav_menu($location_key)) {
                        $menu_items = wp_get_nav_menu_items($menu_id);

                        foreach ($menu_items as $post) {
                            if ($post->object_id == $page_id) return true;
                        }
                    }
                }
            }

            return false;
        }


        public function create_page($type)
        {
            $pages = COMPLIANZ()->config->pages;

            if (!isset($pages[$type])) return false;

            //only insert if there is no shortcode page of this type yet.
            $page_id = $this->get_shortcode_page_id($type);
            if (!$page_id) {

                $page = $pages[$type];

                $page = array(
                    'post_title' => $page['title'],
                    'post_type' => "page",
                    'post_content' => '[' . $this->get_shortcode($type) . ']',
                    'post_status' => 'publish',
                );

                // Insert the post into the database
                $page_id = wp_insert_post($page);
            }

            do_action('cmplz_create_page', $page_id, $type);

//            if ($type == 'cookie-statement') {
//                COMPLIANZ()->cookie->set_cookie_statement_page();
//            }
//
//            if ($type == 'cookie-statement-us') {
//                COMPLIANZ()->cookie->set_cookie_statement_us_page();
//            }

            $this->set_page_url($page_id, $type);

        }

        public function delete_page($type)
        {
            $page_id = $this->get_shortcode_page_id($type);
            if ($page_id) {
                wp_delete_post($page_id, false);
            }
        }

        public function page_exists($type)
        {
            if ($this->get_shortcode_page_id($type)) return true;

            return false;
        }


        public function get_shortcode($type)
        {
            return 'cmplz-document type="' . $type . '"';
        }

        public function get_document_type($post_id){

            $pattern = '/cmplz-document type="(.*?)"/i';
            $post = get_post($post_id);

            $content = $post->post_content;
            if (preg_match_all($pattern, $content, $matches, PREG_PATTERN_ORDER)) {
                if (isset($matches[1][0])) return $matches[1][0];
            }

            return false;
        }


        public function get_required_pages()
        {
            $required_pages = COMPLIANZ()->config->pages;
            $pages = array();

            foreach ($required_pages as $type => $page) {
                if (!$page['public']) continue;

                if ($this->page_required($page)) {
                    $pages[] = $this->get_shortcode_page_id($type);
                }
            }
            return $pages;
        }




        public function load_document($atts = [], $content = null, $tag = '')
        {
            // normalize attribute keys, lowercase
            $atts = array_change_key_case((array)$atts, CASE_LOWER);

            ob_start();

            // override default attributes with user attributes
            $atts = shortcode_atts(['type' => false,], $atts, $tag);
            $type = $atts['type'];
            if ($type) {
                $html = get_transient("complianz_document_$type");

                if ($this->use_cache($type)) {
                    if (!$html) $html = $this->get_document_html($type);
                    set_transient("complianz_document_$type", $html, WEEK_IN_SECONDS);
                } else {
                    $html = $this->get_document_html($type);
                }

                //basic color style for revoke button
                $background_color = cmplz_get_value('brand_color');
                $custom_css = "#cmplz-document a.cc-revoke-custom {background-color:".$background_color.";border-color: ".$background_color.";}#cmplz-document a.cc-revoke-custom:hover {color: ".$background_color.";border-color: ".$background_color.";}";
                if (cmplz_get_value('use_custom_document_css')) {
                    $custom_css .= cmplz_get_value('custom_document_css');
                }
                $custom_css = '<style>' . $custom_css . '</style>';
                $html = $custom_css . $html;
                echo $html;
            }

            return ob_get_clean();
        }

        private function use_cache($type)
        {

            //do not cache on multilanguage environments
            if (function_exists('pll__') || function_exists('icl_translate')) {
                return false;
            }

            if (defined('WP_DEBUG') && WP_DEBUG) return false;

            //do not cache for these types
            if (($type === 'processing') || ($type === 'dataleak')) return false;

            return true;

        }


        /*
          checks if the current page contains the shortcode.
        */

        public function is_shortcode_page($post_id = false)
        {
            $shortcode = 'cmplz-document';
            if ($post_id){
                $post = get_post($post_id);
            } else {
                global $post;
            }

            if ($post) {
                if (has_shortcode($post->post_content, $shortcode)) return true;
            }
            return false;
        }

        /*
          gets the  page that contains the shortcode.
        */

        public function get_shortcode_page_id($type)
        {
            $shortcode = 'cmplz-document';

            $page_id = get_transient('cmplz_shortcode_' . $type);

            if (!$page_id) {
                $pages = get_pages();
                foreach ($pages as $page) {

                    if (has_shortcode($page->post_content, $shortcode) && strpos($page->post_content, 'type="' . $type.'"')!==FALSE) {
                        set_transient('cmplz_shortcode_' . $type, $page->ID, DAY_IN_SECONDS);
                        return $page->ID;
                    }
                }
            } else {
                return $page_id;
            }
            return false;
        }


        /*
         *
         *
         * clear shortcode transients after page update */

        public function clear_shortcode_transients($post_id=false, $post = false)
        {
            $pages = COMPLIANZ()->config->pages;
            foreach ($pages as $type => $page) {
                //if a post id is passed, this is from the save post hook. We only clear the transient for this specific post id.
                if ($post_id) {
                    if (get_transient('cmplz_shortcode_' . $type)==$post_id){
                        delete_transient('cmplz_shortcode_' . $type);
                        delete_transient("complianz_document_$type");
                    }

                } else {
                    delete_transient('cmplz_shortcode_' . $type);
                    delete_transient("complianz_document_$type");
                }

            }
        }


        /*
         * @hooked save_post
         *
         * updates the stored cmplz url for this post.
         *
         *
         * */

        public function set_page_url_on_save_post($post_id){
            if ($this->is_shortcode_page($post_id)) {
                $type = $this->get_document_type($post_id);
                $this->set_page_url($post_id, $type);
            }
        }


        public function get_page_url($type){
            return get_option('cmplz_url_'.$type);
        }

        /*
         *
         * updates the stored cmplz url for a post
         *
         * */

        public function set_page_url($post_id, $type){
            $pages = COMPLIANZ()->config->pages;
            if (isset($pages[$type])){
                $url = get_permalink($post_id);
                update_option('cmplz_url_'.$type, $url);
            }
        }


    }
} //class closure
