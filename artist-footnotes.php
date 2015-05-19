<?php

/*
Plugin Name: artist Footnotes
Plugin URI: http://github.com/kalaomer/artist-footnotes
Description: Foot Notes for artist
Version: 1.0
Author: kalaomer
Author URI: http://github.com/kalaomer
License: A "Slug" license name e.g. GPL2
*/

function artist_add_buttons( $plugin_array ) {
	$plugin_array['artist'] = plugins_url('/js/artist_footnotes_editor_buttons.js', __FILE__);

	return $plugin_array;
}

function artist_register_buttons($buttons) {
	array_push($buttons, 'addFootnote', 'removeFootnote'); // addFootnote, removeFootnote

	return $buttons;
}

function artist_add_editor_styles() {
	add_editor_style( plugins_url("/css/artist_footnotes.css", __FILE__));
    wp_dequeue_script("artist_footnotes_script");
}

function artist_footnotes_area($content) {

    if (is_single()) {
        $content .= '<div class="artist-footnotes-area"></div>';
    }

    return $content;
}

function artist_footnotes_activate() {

    if (is_admin() == false && is_single() == false) {
        echo <<<HTML
<script>
    jQuery(function() {
        window.artistFootnotes.disableNoteLinkElements();
    });
</script>
HTML;
    }

    elseif (is_single()) {
        echo <<<HTML
<script>
    jQuery(function() {
        window.artistFootnotes.setPostPage();
    });
</script>
HTML;

    }
}

function artist_footnotes() {
	add_filter("mce_external_plugins", "artist_add_buttons");
	add_filter("mce_buttons", "artist_register_buttons");
	add_action("admin_init", "artist_add_editor_styles");
    add_filter("the_content", "artist_footnotes_area");
    add_action("wp_footer", "artist_footnotes_activate");

	wp_enqueue_style("artist_footnotes_style", plugins_url("/css/artist_footnotes.css", __FILE__));
	wp_enqueue_script("artist_footnotes_script", plugins_url("/js/artist_footnotes.js", __FILE__), ["jquery"]);
}

add_action('init', 'artist_footnotes');
