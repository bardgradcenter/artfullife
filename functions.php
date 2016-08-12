<?php
function catalogue_scripts_and_styles() {
    wp_register_style( 'mainStyles', get_stylesheet_uri() );
    wp_register_style( 'icons', get_template_directory_uri() . '/icons/styles.css' );
    wp_register_style( 'jQueryUIcss', '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/themes/smoothness/jquery-ui.css', 'jQueryUI', '1.11.0', false );

    wp_enqueue_style( 'icons' );
    wp_enqueue_style( 'mainStyles', get_stylesheet_uri() );
    wp_enqueue_style( 'jQueryUIcss' );

    wp_register_script( 'jQuery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', false, '1.11.1', false );
    wp_register_script( 'jQueryUI', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.0/jquery-ui.min.js', false, '1.11.0', false );
    wp_register_script( 'nessim', get_template_directory_uri() . '/js/nessim.js', false, '0.1.0', false );
    wp_register_script( 'soundmanager2', get_template_directory_uri() . '/js/soundmanager2/script/soundmanager2-nodebug-jsmin.js', false, '', false );
    wp_register_script( 'mp3', get_template_directory_uri() . '/js/soundmanager2/script/mp3-player-button.js', false, '', false );
    wp_register_script( 'seadragon', get_template_directory_uri() . '/js/min/openseadragon.min-min.js', false, '', false );

    wp_enqueue_script( 'jQuery' );
    wp_enqueue_script( 'jQueryUI' );
    wp_enqueue_script( 'seadragon' );
    wp_enqueue_script( 'soundmanager2' );
    wp_enqueue_script( 'mp3' );
    wp_enqueue_script( 'nessim' );
}
add_action ('wp_enqueue_scripts', 'catalogue_scripts_and_styles');


add_filter('upload_dir', 'cgg_upload_dir');
function cgg_upload_dir($dir)
{
    // xxx Lots of $_REQUEST usage in here, not a great idea.

    // Are we where we want to be?
    if (!isset($_REQUEST['action']) || 'upload-attachment' !== $_REQUEST['action']) {
        return $dir;
    }

    // make sure we have a post ID
    if (!isset($_REQUEST['post_id'])) {
        return $dir;
    }

    // modify the path and url.
    $type = ($_REQUEST['post_id']);
    $uploads = apply_filters("{$type}_upload_directory", $type);
    $dir['path'] = path_join($dir['basedir'], $uploads);
    $dir['url'] = path_join($dir['baseurl'], $uploads);

    return $dir;
}
