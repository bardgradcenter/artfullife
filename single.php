<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="user-scalable=no">
	<meta charset='UTF-8'>
	<title><?php bloginfo( 'name' ); ?></title>
	<link href='http://fonts.googleapis.com/css?family=Muli:400,400italic' rel='stylesheet' type='text/css'>

</head>
<body>
	<div id="header" style="background-color:#ed1b34;">
		<div class="headLeft">
			<img class="browseBtn mastHead red" style="display:none;" src="<?php bloginfo('template_url'); ?>/images/nessim_header.png">
			<img class="browseBtn mastHead white" style="display:block" src="<?php bloginfo('template_url'); ?>/images/nessim_header_white.png" alt="Interviews with Barbara Nessim">
		</div>
		<div class="headRight">
			<?php
			$logoImage = get_field('bgc_logo', 'option');
			?>
			<img class="logo black" style="display:none;" src="<?php echo $logoImage['url']; ?>" alt="<?php echo $logoImage['alt']; ?>">
			<img class="logo white" style="display:block;" src="<?php bloginfo('template_url'); ?>/images/bgc_logo_white.png">
		</div>
	</div>
	<div id="landing" class="hidden">
		<div class="landingContent">
			<?php the_field('landing_text', 'option'); ?>
			<div class="browseBtn">
				Browse Interviews
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
	<div id="single" class="actingSingle">
		<div class="singleWrapper current">
			<?php
			if ( have_posts() ) {
				while ( have_posts() ) {
					the_post(); ?>
					<?php $upload_dir = wp_upload_dir(); ?>

					<div class="detailsWrapper">
						<div class="controlWrapper">
							<form name="controls" id="controls">
								<div class="magIcon iconFont">z</div>
								<input type="button" name="zoomIn<?php the_ID(); ?>" title="Zoom In" id="zoomIn<?php the_ID(); ?>" class="zoomIn iconFont" value="+" />
								<input type="button" name="zoomOut<?php the_ID(); ?>" title="Zoom Out" id="zoomOut<?php the_ID(); ?>" class="zoomOut iconFont" value="-" />
								<div class="mini detailsUp iconFont">v</div>
							</form>
						</div>
						<div class="theDetails">
							<h1><?php the_title(); ?></h1>
							<?php the_field('tombstone'); ?>
							<?php the_field('extra_information'); ?>
							<?php
							$audio = get_field('audio_file');
							if( !empty($audio)): ?>
								
								<script>
									var sound<?php the_ID(); ?> = soundManager.setup({
										// required: path to directory containing SM2 SWF files
										url: 'http://nessim.dreamhosters.com/wp-content/themes/nessim/js/soundmanager2/swf',
										onready: function(){
											var theDuration<?php the_ID(); ?>;
											soundManager.createSound({
												id: 'sound<?php the_ID(); ?>',
												url: '<?php echo $audio["url"]; ?>',
												autoLoad: true,
												onload: function() {
													var theDuration<?php the_ID(); ?> = (millisToMinutesAndSeconds<?php the_ID(); ?>(this.duration));
													$('.duration<?php the_ID(); ?>').text(theDuration<?php the_ID(); ?>);
												},
												whileplaying: function() {
													var thePosition<?php the_ID(); ?> = (millisToMinutesAndSeconds<?php the_ID(); ?>(this.position));
													var thisPosition<?php the_ID(); ?> = (this.position);
													$('.position').text(thePosition<?php the_ID(); ?>);
													if((thisPosition<?php the_ID(); ?> > '20000') && (thisPosition<?php the_ID(); ?> < '20250')){
														ga('send', 'event', 'audio', 'listen', '<?php the_title(); ?>');
													}
												},
												onfinish: function() {
													$('.duration<?php the_ID(); ?>').text(theDuration<?php the_ID(); ?>);
													$('.play').html('p');
													$('.play').removeClass('pause');
													this.destruct();
												}
											});
										},
										ontimeout: function(){
											alert('it is a no go');
										}
									});
									function millisToMinutesAndSeconds<?php the_ID(); ?>(millis) {
										var minutes = Math.floor(millis / 60000);
										var seconds = ((millis % 60000) / 1000).toFixed(0);
										return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
									}
								</script>
								<div id="audioControl" class="play play<?php the_ID(); ?> iconFont" onclick="soundManager.togglePause('sound<?php the_ID(); ?>')">p</div>
								<div class="timer">
									<div class="position position<?php the_ID(); ?>">0:00</div>
									<div class="slash">/</div>
									<div class="duration duration<?php the_ID(); ?>">0:00</div>
								</div>
							<?php endif; ?>
							<br clear="all">
						</div>
					</div>
					<div class="theImage" id="<?php the_ID(); ?>">
						<div id="myContainer<?php the_ID(); ?>" class="myContainer"></div>
						<script type='text/javascript'>
							if ( viewer<?php the_ID(); ?> ) {
                				destroyViewer();
            				}
							var viewer<?php the_ID(); ?> = OpenSeadragon({
						        id: 'myContainer<?php the_ID(); ?>',
						        prefixUrl: '/openseadragon/images/',
						        zoomInButton: 'zoomIn<?php the_ID(); ?>',
						        zoomOutButton: 'zoomOut<?php the_ID(); ?>',
						        showFullPageControl: false,
						        showHomeControl: false,
						        useCanvas: true,
						        debugMode: false,
					            tileSources: '<?php echo $upload_dir["baseurl"]; ?>/<?php the_ID(); ?>/GeneratedImages/dzc_output.xml',
						    });
						    function destroyViewer() {
				            if ( viewer<?php the_ID(); ?> ) {
				                viewer<?php the_ID(); ?>.destroy();
				            }
            					viewer<?php the_ID(); ?> = null;
        					}
						</script>
					</div>
					<!--div class="theImage">
						<?php 
						$image = get_field('image');
						if( !empty($image) ): ?>
							<img src="<?php echo $image['url']; ?>">
						<?php endif; ?>
					</div -->
					<div class="prevPost iconFont">
						<?php previous_post_link('%link', '>'); ?> 
					</div>
					<div class="nextPost iconFont">
						<?php next_post_link('%link', '<'); ?> 
					</div>
					<div class="closePost browseBtn iconFont">
						x
					</div>
				<?php }
			} else {
				// no posts found
			}
			wp_reset_postdata();
			?>
		</div>
		<div class="singleWrapper old">
			<div class="detailsWrapper">
				<div class="controlWrapper">
					<form name="controls" id="controls">
						<div class="magIcon iconFont">z</div>
						<input type="button" name="zoomIn" title="Zoom In" id="zoomIn" class="zoomIn iconFont" value="+" />
						<input type="button" name="zoomOut" title="Zoom Out" id="zoomOut" class="zoomOut iconFont" value="-" />
						<div class="mini detailsUp iconFont">v</div>
					</form>
				</div>
				<div class="theDetails">
				</div>
			</div>
			<div class="theImage">
			</div>
			<div class="prevPost iconFont">
			</div>
			<div class="nextPost iconFont">
			</div>
			<div class="closePost browseBtn iconFont">
				x
			</div>
		</div>
		<div class="singleWrapper new">
			<div class="detailsWrapper">
				<div class="controlWrapper">
					<form name="controls" id="controls">
						<div class="magIcon iconFont">z</div>
						<input type="button" name="zoomIn" title="Zoom In" id="zoomIn" class="zoomIn iconFont" value="+" />
						<input type="button" name="zoomOut" title="Zoom Out" id="zoomOut" class="zoomOut iconFont" value="-" />
						<div class="mini detailsUp iconFont">v</div>
					</form>
				</div>
				<div class="theDetails">
				</div>
			</div>
			<div class="theImage">
			</div>
			<div class="prevPost iconFont">
			</div>
			<div class="nextPost iconFont">
			</div>
			<div class="closePost browseBtn iconFont">
				x
			</div>
		</div>
	</div>
	<div class="toTheLanding down">
		<div class="toTheLandingWrapper">
			<h2 id="toTheLanding">About the Exhibition</h2>
		</div>
	</div>
	<?php wp_footer(); ?>
</body>
</html>
