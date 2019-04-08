$(document).ready(function() {

	function height_text(){
		$('.hand_made_row img').each(function(){
			var height = $(this).height();
			$(this).parent().find('.text').height(height);
		});
	}

	function show_mini(){
		$('.slider_ltl_nav').html('');
		var mini_galery = [];
		var index_current = $('.slider_ltl .slick-current').index();
		var slider_length = $('.slider_ltl .slick-slide').length;

		for(i = index_current + 1; i <= index_current + 3; i++){
			if( i >= slider_length){
				mini_galery.push($('.slider_ltl .slick-slide').eq(i - slider_length).find('img').attr('src'));
			}else{
				mini_galery.push($('.slider_ltl .slick-slide').eq(i).find('img').attr('src'));
			}
		}

		for(i = 0; i < mini_galery.length; i++){
			$('.slider_ltl_nav').prepend('<div class="slide_nav"><img src=' + mini_galery[i] + ' alt="picture" /></div>');
		}

	}

	function show_mobile_menu(){
		$('.mobile_menu').toggleClass('mobile_menu_open');
		$('.mobile_button').toggleClass('open_menu');
	}

	function scroll_to(elem, e){
		e.preventDefault();
		var dest = $(elem).attr('href');
		$('html, body').animate({scrollTop: $(dest).offset().top }, 1000);
	}

	$(window).resize(function() {
		height_text();
	});

	$('.slider').slick({
		dots: true
	});

	 $('.slider_ltl').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  fade: true,
	  appendArrows: $('.arrows_ltl_con'),
	  draggable: false, 
	  responsive: [
	    {
	      breakpoint: 500,
	      draggable: true
	    }
	  ]
	});

	$(window).on('load', function(){
		$('.slick-arrow').click(function() {
		 	show_mini();
		 });

		 $('.mobile_button').click(function() {
		 	show_mobile_menu();
		 });

		 $('.menu a').click(function(e) {
			scroll_to($(this), e);
		});

		 $('.mobile_menu a').click(function(e) {
			scroll_to($(this), e);
			show_mobile_menu();
		});

		height_text();
		show_mini();
	});
});