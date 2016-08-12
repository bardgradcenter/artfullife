<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="user-scalable=no">
  <meta charset='UTF-8'>
  <title><?php bloginfo( 'name' ); ?></title>
  <link href='http://fonts.googleapis.com/css?family=Muli:400,400italic' rel='stylesheet' type='text/css'>
  <link rel="icon" href="<?php bloginfo('template_url'); ?>/images/favicon.ico" type="image/x-icon">
  <script>
    if (window.top!=window.self)
    {
      // In a Frame or IFrame
      document.write('<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_directory_uri() ?>/appStyles.css">');
    }
    </script>
  <?php wp_head(); ?>
</head>
<body>
  <div id="header">
    <div class="headLeft">
      <img class="browseBtn mastHead red" src="<?php bloginfo('template_url'); ?>/images/nessim_header_new.png">
      <img class="browseBtn mastHead white" src="<?php bloginfo('template_url'); ?>/images/nessim_header_white_new.png">
    </div>
    <div class="headRight">
      <?php
      $logoImage = get_field('bgc_logo', 'option');
      ?>
      <img class="logo black" style="display:block;" src="<?php echo $logoImage['url']; ?>" alt="<?php echo $logoImage['alt']; ?>">
      <img class="logo white" style="display:none;" src="<?php bloginfo('template_url'); ?>/images/bgc_logo_white.png">
    </div>
  </div>
  <div id="landing">
    <div class="landingContent">
      <?php the_field('landing_text', 'option'); ?>
      <div class="browseBtn">
        Browse Audio Selections
      </div>
    </div>
  </div>
  <div id="gallery">
    <div class="galleryWrapper">
      <?php
      $args = array(
          'post_type' => 'interviews'
        );
      $query = new WP_Query( $args );
      if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
          $query->the_post(); ?>
          <div class="singleItem">
            <div class="itemImage">
              <?php
              $image = get_field('image');
              if( !empty($image) ):
                $size = 'thumbnail';
                $thumb = $image['sizes'][ $size ];
              ?>
                <a href="<?php the_permalink(); ?>" class="post-link"><img src="<?php echo $thumb; ?>"></a>
              <?php endif; ?>
            </div>
            <div class="itemTitle">
              <?php the_title(); ?>
            </div>
            <div class="itemDate">
              <?php the_field('year'); ?>
            </div>
          </div>
        <?php }
      } else {
        // no posts found
      }
      wp_reset_postdata();
      ?>
    </div>
  </div>
  <div id="single" style="top:-100%; display: none;">
  </div>
  <div class="toTheLanding up">
    <div class="toTheLandingWrapper">
      <h2 id="toTheLanding">About the Exhibition</h2>
    </div>
  </div>
  <div id="loading">
    <div class="iconFont">o</div>
    Loading...
  </div>
  <?php wp_footer(); ?>
  <script>
  if (window.top!=window.self)
    {
      // In a Frame or IFrame
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-10183145-8', 'auto');
      if(window.location.hash) {
         ga('send', 'pageview', {
           'page': location.pathname + location.search  + location.hash
          });
        } else { 
          ga('send', 'pageview');
        }
        $(window).on('hashchange', function() {
          ga('send', 'pageview', {
           'page': location.pathname + location.search  + location.hash
          });
        });

    } else {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-10183145-7', 'artfullife.org');
        if(window.location.hash) {
         ga('send', 'pageview', {
           'page': location.pathname + location.search  + location.hash
          });
        } else { 
          ga('send', 'pageview');
        }
        $(window).on('hashchange', function() {
          ga('send', 'pageview', {
           'page': location.pathname + location.search  + location.hash
          });
        });
    }
  </script>
</body>
</html>
