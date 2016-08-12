var windowHeight;
var setGalleryHeight;
var setToTheGalleryBottom;
$(window).load(function() {
	var currentTallest = 0;
	var currentRowStart = 0;
	var rowDivs = new Array();

	$('div.itemImage').each(function(index) {

		if(currentRowStart != $(this).position().top) {

			// we just came to a new row.  Set all the heights on the completed row
			for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

			// set the variables for the new row
			rowDivs.length = 0; // empty the array
			currentRowStart = $(this).position().top;
			currentTallest = $(this).find('img').height();
			rowDivs.push($(this));

		} else {

			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($(this));
			currentTallest = (currentTallest < $(this).find('img').height()) ? ($(this).find('img').height()) : (currentTallest);

		}
		// do the last row
		for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

	});
	$('div.singleItem').each(function(index) {

		if(currentRowStart != $(this).position().top) {

			// we just came to a new row.  Set all the heights on the completed row
			for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

			// set the variables for the new row
			rowDivs.length = 0; // empty the array
			currentRowStart = $(this).position().top;
			currentTallest = ($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20;
			rowDivs.push($(this));

		} else {

			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($(this));
			currentTallest = (currentTallest < ($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20) ? (($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20) : (currentTallest);

		}
		// do the last row
		for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

	});

	/* LOOK FOR HAS ON PAGE LOAD */
	var cleanedHash = (window.location.hash).replace('#/', '').replace('/','').replace('#','');
	var theRoot = window.location.hostname;
	var loadThisPage = 'http://' + theRoot + '/interviews/' + cleanedHash;
	if(cleanedHash.length > 1){
		$('#loading').fadeIn(100);
		$.get(loadThisPage, {}, function(data){
			var $response = $('<div>').html(data);
			var $thePost = $response.find('#single').html();
			var theID = $response.find('.current .theImage').attr('id');
			soundManager.reboot();
			$('#single').html($thePost);
			$('#loading').fadeOut(100);
			$('#single').show().css('z-index','950').animate({
				top: '82px'
			}, 500, function(){
				$('#gallery').hide().css('top','-100%');
			});
			var windowHeight = $(window).height();
			var setGalleryHeight = windowHeight-82-33;
			var setToTheGalleryBottom = setGalleryHeight+33;
			$('.toTheLanding').show().animate({
				bottom: '0'
			}, 500, function() {
				$('.toTheLanding').addClass('down').removeClass('up');
			});
			$('body').css('overflow', 'hidden');
			$('#landing').animate({
				top: setGalleryHeight
			}, 500, function() {
				$('#landing').hide().addClass('hidden');
				$('body').css('overflow','auto');
			});
			$('.mastHead.red').fadeOut(500);
			$('.mastHead.white').fadeIn(500);
			$('.logo.black').fadeOut(500);
			$('.logo.white').fadeIn(500);
			$('#header').animate({
				backgroundColor: '#ed1b34'
			}, 500, function() {

			});
		},'html');
		var cleanedHash = null;
	}
	//LOAD APP SCRIPTS
	if (window.top!=window.self){
      $.getScript("http://artfullife.org/wp-content/themes/nessim/js/mapApp.js");
	} else {
	}
});
$(function() {
	if (Function('/*@cc_on return document.documentMode >= 8@*/')()) {
	    $('#loading .iconFont').css('height','58px');
	} else if (window.top!=window.self) {
		$('#loading .iconFont').css('height','58px');
	}
    var $rota = $('#loading .iconFont'),
        degree = 0,
        timer;


    function rotate() { 
    		if($('#loading').css('display') == 'none'){
    	    } else {
    	    	$rota.css({ transform: 'rotate(' + degree + 'deg)'});
    		}
	        // timeout increase degrees:
	        timer = setTimeout(function() {
	        	++degree;
	        	  
	        		rotate(); // loop it
	        	
	        },5);
    }

    rotate();    // run it!
});
$(document).ready(function(){
	var windowHeight = $(window).height();
	var setGalleryHeight = windowHeight-82-33;
	var setToTheGalleryBottom = setGalleryHeight+33;
	$('#gallery').css('min-height',setGalleryHeight);
	$('#single').css('height',setGalleryHeight);
	$('#landing').css('min-height',setGalleryHeight);
	$('#landing.hidden').css('top',setGalleryHeight);
	$('.toTheLanding.up').css('bottom',setToTheGalleryBottom);

	/* HIDE ITEM DETAILS AND ROTATE THE ARROW */
	$(document).on('click','.mini', function(event) {
		$('.current .mini').parent('form').parent('div').next('.theDetails').slideToggle(750,'easeOutCubic');
		if($('.current .mini').hasClass('detailsUp')) {
			$('.current .mini').animateRotate(180, 750, 'easeOutCubic', function(){
				$('.current .mini').addClass('detailsDown').removeClass('detailsUp');
	        });
		} else if ($('.current .mini').hasClass('detailsDown')) {
			$('.current .mini').animateRotateReturn(360, 750, 'easeOutCubic', function(){
				$('.current .mini').addClass('detailsUp').removeClass('detailsDown');
	        });
		}
	});

	/* CHANGE PLAY TO PAUSE AND VICE VERSA */
	$(document).on('click','#audioControl.play', function(event) {
		if($('#audioControl.play').hasClass('pause')){
			$('.play').html('p');
			$('.play').removeClass('pause');
		} else {
			$('.play').html('s');
			$('.play').addClass('pause');
		}
	});

	/* VIEW THE GALLERY FROM THE LANDING PAGE */
	$(document).on('click','.browseBtn', function(event) {
		var windowHeight = $(window).height();
		var setGalleryHeight = windowHeight-82-33;
		var setToTheGalleryBottom = setGalleryHeight+33;
		$('body').css('overflow', 'hidden');
		$('#gallery').show();
		var currentTallest = 0;
		var currentRowStart = 0;
		var rowDivs = new Array();

		$('div.itemImage').each(function(index) {

			if(currentRowStart != $(this).position().top) {

				// we just came to a new row.  Set all the heights on the completed row
				for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

				// set the variables for the new row
				rowDivs.length = 0; // empty the array
				currentRowStart = $(this).position().top;
				currentTallest = $(this).find('img').height();
				rowDivs.push($(this));

			} else {

				// another div on the current row.  Add it to the list and check if it's taller
				rowDivs.push($(this));
				currentTallest = (currentTallest < $(this).find('img').height()) ? ($(this).find('img').height()) : (currentTallest);

			}
			// do the last row
			for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

		});
		$('div.singleItem').each(function(index) {

			if(currentRowStart != $(this).position().top) {

				// we just came to a new row.  Set all the heights on the completed row
				for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

				// set the variables for the new row
				rowDivs.length = 0; // empty the array
				currentRowStart = $(this).position().top;
				currentTallest = ($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20;
				rowDivs.push($(this));

			} else {

				// another div on the current row.  Add it to the list and check if it's taller
				rowDivs.push($(this));
				currentTallest = (currentTallest < ($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20) ? (($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20) : (currentTallest);

			}
			// do the last row
			for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

		});
		$('#gallery').animate({
			top: '82px'
		}, 500, function() {
		});
		$('.toTheLanding').show().animate({
			bottom: '0'
		}, 500, function() {
			$('.toTheLanding').addClass('down').removeClass('up');
			$('#landing').hide().addClass('hidden');
		});
		$('#single').css('z-index',10).animate({
			top: '100%' 
		}, 500, function() {
			$('#single').hide();
			$('#single').css('top','-100%');
		});
		$('#landing').animate({
			top: '100%'
		}, 500, function() {
			$('body').css('overflow','auto');
		});
		$('.mastHead.red').fadeOut(500);
		$('.mastHead.white').fadeIn(500);
		$('.logo.black').fadeOut(500);
		$('.logo.white').fadeIn(500);
		$('#header').animate({
			backgroundColor: '#ed1b34'
		}, 500, function() {

		});
		window.theDirection = 'goingNowhere';
		window.location.hash = '';
		history.pushState('',document.title, window.location.pathname + window.location.search);
	});

	/* BRING UP THAT LANDING PAGE PLEASE */
	$('#toTheLanding').click(function(){
		var windowHeight = $(window).height();
		var setGalleryHeight = windowHeight-82-33;
		var setToTheGalleryBottom = setGalleryHeight+33;
		$('body').css('overflow', 'hidden');
		$('#landing').show();
		$('#gallery').animate({
			top: '-100%'
		}, 500, function() {
		});
		$('.toTheLanding').animate({
			bottom: setToTheGalleryBottom
		}, 500, function() {
			$('.toTheLanding').addClass('up').removeClass('down').hide();
		});
		$('#single').animate({
			top: '-100%' 
		}, 500, function() {
			$('#single').hide();
		});
		$('#landing').animate({
			top: '0px'
		}, 500, function() {
			$('#gallery').hide();
			$('body').css('overflow','auto');
			$('#landing').removeClass('hidden');
		});
		$('.mastHead.red').fadeIn(500);
		$('.mastHead.white').fadeOut(500);
		$('.logo.black').fadeIn(500);
		$('.logo.white').fadeOut(500);
		$('#header').animate({
			backgroundColor: '#ffffff'
		}, 500, function() {

		});
		window.theDirection = 'goingNowhere';
		window.location.hash = '';
		history.pushState('',document.title, window.location.pathname + window.location.search);
	});


	/* ON HASHCHANGE */

	var theRoot = window.location.hostname;
	function iWantToGoToThere(){
		if (theDirection == 'goingNowhere'){
		} else {
			var theHash = location.hash;
			var cleanedHash = theHash.replace('#','');
			var loadThisPage = 'http://' + theRoot + '/interviews/' + cleanedHash;
			if(theDirection == 'gallery'){
				$('#loading').fadeIn(100);
				$.get(loadThisPage, {}, function(data){
					var $response = $('<div>').html(data);
					var $thePost = $response.find('#single').html();
					var theID = $response.find('.current .theImage').attr('id');
					soundManager.reboot();
					$('#single').html($thePost);
					$('#loading').fadeOut(100);
					$('#single').show().css('z-index','950').animate({
						top: '82px'
					}, 500, function(){
						$('#gallery').hide().css('top','-100%');
					});
				},'html');
				window.theDirection = 'fromTheGallery';
			} else if (theHash == ''){
				$('.browseBtn').trigger('click');
			} else if (theDirection == 'right'){
				$('#loading').fadeIn(100);
				$.get(loadThisPage, {}, function(data) {
					var $response = $('<div>').html(data);
					var $detailsWrapper = $response.find('.current .detailsWrapper .theDetails').html();
					var $theImage = $response.find('.current .theImage').html();
					var theID = $response.find('.current .theImage').attr('id');
					var $prevPost = $response.find('.current .prevPost').html();
					var $nextPost = $response.find('.current .nextPost').html();
					$('.singleWrapper.new .zoomIn').attr('id','zoomIn' + theID);
					$('.singleWrapper.new .zoomOut').attr('id','zoomOut' + theID);
					soundManager.reboot();
					$('.singleWrapper.new .theImage').html($theImage);
					$('.singleWrapper.new .prevPost').html($prevPost);
					$('.singleWrapper.new .nextPost').html($nextPost);
					$('.singleWrapper.new .theDetails').html($detailsWrapper);
					$('#loading').fadeOut(100);
					$('.singleWrapper.current').css('position','absolute').animate({
						left: '-100%'
					}, 500, function(){
						$('.singleWrapper.current .theImage').html('');
						$('.singleWrapper.current .theDetails').html('');
						$('.singleWrapper.current #controls .zoomIn').attr('id','');
						$('.singleWrapper.current #controls .zoomOut').attr('id','');
						$('.singleWrapper.current').removeClass('current').addClass('old');
					});
					$('.singleWrapper.new').css('position','absolute').animate({
						left: '0'
					}, 500, function(){
						$('.singleWrapper.new').css('position','static').removeClass('new').addClass('current');
						if($('.singleWrapper.old').length == 1){
							$('#single').append('<div class="singleWrapper new"><div class="detailsWrapper"><div class="controlWrapper"><form name="controls" id="controls"><div class="magIcon"></div><input type="button" name="zoomIn" title="Zoom In" id="zoomIn" class="zoomIn" value="" /><input type="button" name="zoomOut" title="Zoom Out" id="zoomOut" class="zoomOut" value="" /><div class="mini detailsUp"></div></form></div><div class="theDetails"></div></div><div class="theImage"></div><div class="prevPost"></div><div class="nextPost"></div><div class="closePost browseBtn"><a href="#"></a></div></div></div>');
						} else if ($('.singleWrapper.old').length > 1) {
							$('.singleWrapper.old').first().addClass('new').removeClass('old').css('left','100%');
							if ($('.new .mini').hasClass('detailsDown')) {
								$('.new .mini').parent('form').parent('div').next('.theDetails').show();
								$('.new .mini').animateRotateReturn(360, 750, 'easeOutCubic', function(){
									$('.new .mini').addClass('detailsUp').removeClass('detailsDown');
					        	});
							}
						}
					});
				},'html');
			} else if (theDirection == 'left'){
				$('#loading').fadeIn(100);
				$.get(loadThisPage, {}, function(data) {
					var $response = $('<div>').html(data);
					var $detailsWrapper = $response.find('.current .detailsWrapper .theDetails').html();
					var $theImage = $response.find('.current .theImage').html();
					var theID = $response.find('.current .theImage').attr('id');
					var $prevPost = $response.find('.current .prevPost').html();
					var $nextPost = $response.find('.current .nextPost').html();
					$('.singleWrapper.old .zoomIn').attr('id','zoomIn' + theID);
					$('.singleWrapper.old .zoomOut').attr('id','zoomOut' + theID);
					soundManager.reboot();
					$('.singleWrapper.old .theImage').html($theImage);
					$('.singleWrapper.old .theDetails').html($detailsWrapper);
					$('.singleWrapper.old .prevPost').html($prevPost);
					$('.singleWrapper.old .nextPost').html($nextPost);
					$('#loading').fadeOut(100);
					$('.singleWrapper.current').css('position','absolute').animate({
						left: '100%'
					}, 500, function(){
						$('.singleWrapper.current .theImage').html('');
						$('.singleWrapper.current .theDetails').html('');
						$('.singleWrapper.current #controls .zoomIn').attr('id','');
						$('.singleWrapper.current #controls .zoomOut').attr('id','');
						$('.singleWrapper.current').removeClass('current').addClass('new');
					});
					$('.singleWrapper.old').css('position','absolute').animate({
						left: '0'
					}, 500, function(){
						$('.singleWrapper.old').css('position','static').removeClass('old').addClass('current');
						if($('.singleWrapper.new').length == 1){
							$('#single').append('<div class="singleWrapper old"><div class="detailsWrapper"><div class="controlWrapper"><form name="controls" id="controls"><div class="magIcon"></div><input type="button" name="zoomIn" title="Zoom In" id="zoomIn" class="zoomIn" value="" /><input type="button" name="zoomOut" title="Zoom Out" id="zoomOut" class="zoomOut" value="" /><div class="mini detailsUp"></div></form></div><div class="theDetails"></div></div><div class="theImage"></div><div class="prevPost"></div><div class="nextPost"></div><div class="closePost browseBtn"><a href="#"></a></div></div></div>');
						} else if ($('.singleWrapper.new').length > 1) {
							$('.singleWrapper.new').first().addClass('old').removeClass('new').css('left','-100%');
							if ($('.old .mini').hasClass('detailsDown')) {
								$('.old .mini').parent('form').parent('div').next('.theDetails').show();
								$('.old .mini').animateRotateReturn(360, 750, 'easeOutCubic', function(){
									$('.old .mini').addClass('detailsUp').removeClass('detailsDown');
					        	});
							}
						}
					});
				},'html');
			}
		}
	}

	window.onhashchange = iWantToGoToThere;

	/* CLICKING ON A THUMBNAIL */
	$(document).on('click','.post-link', function(event){
		var loadThisPage = $(this).attr('href');
		var thisHash = loadThisPage.replace('http://' + theRoot + '/interviews/','').replace('/','');
		if($('#single').hasClass('actingSingle')){
			window.location.replace('http://' + theRoot + '/#' + thisHash);
		} else {
			window.location.hash = thisHash;
			window.theDirection = 'gallery';
		}
		return false;
	});

	/* RIGHT ARROW TO THE PREV POST */
	$(document).on('click','.prevPost', function(event) {
		var loadThisPage = $('.singleWrapper.current .prevPost a').attr('href');
		var thisHash = loadThisPage.replace('http://' + theRoot + '/interviews/','').replace('/','');
		if($('#single').hasClass('actingSingle')){
			window.location.replace('http://' + theRoot + '/#' + thisHash);
		} else {
			window.location.hash = thisHash;
			window.theDirection = 'right';
		}
		return false;
	});

	/* LEFT ARROW TO THE NEXT POST */
	$(document).on('click','.nextPost', function(event) {
		var loadThisPage = $('.singleWrapper.current .nextPost a').attr('href');
		var thisHash = loadThisPage.replace('http://' + theRoot + '/interviews/','').replace('/','');
		if($('#single').hasClass('actingSingle')){
			window.location.replace('http://' + theRoot + '/#' + thisHash);
		} else {
			window.location.hash = thisHash;
			window.theDirection = 'left';
		}
		return false;
	});
});


$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
    });
};
$.fn.animateRotateReturn = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: 180}).animate({deg: angle}, args);
    });
};

/* DO THESE FUNCTIONS ON WINDOW RESIZE */
$(window).resize(function() {

	/* GET WINDOW HEIGHT AND SET MIN HEIGHT FOR GALLERY */
	var windowHeight = $(window).height();
	var setGalleryHeight = windowHeight-82-33;
	var setToTheGalleryBottom = setGalleryHeight+33;
	$('#single').css('height',setGalleryHeight);
	$('#gallery').css('min-height',setGalleryHeight);
	$('#landing').css('min-height',setToTheGalleryBottom);
	$('.toTheLanding.up').css('bottom',setToTheGalleryBottom);
	$('#landing.hidden').css('top',setGalleryHeight);


	/* SET EQUAL HEIGHTS FOR ITEM IMAGES AND SINGLE ITEMS */
	var currentTallest = 0;
	var currentRowStart = 0;
	var rowDivs = new Array();

	$('div.itemImage').each(function(index) {

		if(currentRowStart != $(this).position().top) {

			// we just came to a new row.  Set all the heights on the completed row
			for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

			// set the variables for the new row
			rowDivs.length = 0; // empty the array
			currentRowStart = $(this).position().top;
			currentTallest = $(this).find('img').height();
			rowDivs.push($(this));

		} else {

			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($(this));
			currentTallest = (currentTallest < $(this).find('img').height()) ? ($(this).find('img').height()) : (currentTallest);

		}
		// do the last row
		for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

	});
	$('div.singleItem').each(function(index) {

		if(currentRowStart != $(this).position().top) {

			// we just came to a new row.  Set all the heights on the completed row
			for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

			// set the variables for the new row
			rowDivs.length = 0; // empty the array
			currentRowStart = $(this).position().top;
			currentTallest = ($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20;
			rowDivs.push($(this));

		} else {

			// another div on the current row.  Add it to the list and check if it's taller
			rowDivs.push($(this));
			currentTallest = (currentTallest < ($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20) ? (($(this).find('.itemImage').height())+($(this).find('.itemTitle').height())+($(this).find('.itemDate').height())+20) : (currentTallest);

		}
		// do the last row
		for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) rowDivs[currentDiv].height(currentTallest);

	});
});