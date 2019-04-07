$(document).ready(function() {

	function show_mobile_menu(){
		$('.mobile_menu').toggleClass('mobile_menu_open');
		$('.mobile_button').toggleClass('open_menu');
	}

	$('.mobile_button').click(function(){
		show_mobile_menu();
	});

	var mobile = navigator.userAgent.toLowerCase().match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i);
	if(mobile != null) {
		$(".scroll_animation").addClass("animated");
	} 
	else {		
		$(".scroll_animation").each(function() {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;
				top = top - $(window).height();
				var scroll_top = $(this).scrollTop();
				var block_center = block.offset().top + (block.height() / 2);
				var screen_center = scroll_top + ($(window).height() / 2);
				if(block.height() < $(window).height()) {
					if ((scroll_top > (top-(block.height()/2))) && ((scroll_top < bottom+(block.height()/2))) && (scroll_top + $(window).height() > (bottom-(block.height()/2))) && (scroll_top < (block.offset().top+(block.height()/2)))) {
						if (!block.hasClass("animated")) {
							block.addClass("animated");
						}
					}
				} else {
					if ((scroll_top > top) && (scroll_top < bottom) && (Math.abs(screen_center - block_center) < (block.height() / 4 ))) {
						if (!block.hasClass("animated")) {
							block.addClass("animated");
						}
					}
				}
			});
		});	
	}

	function show_popup(elem, e){
		e.preventDefault();
		$('body').addClass('popup_active');
		var popup = $('#popup_background');

		var popup_con = $(elem).parent().parent();
		popup.fadeIn(400);
		$('.mask').fadeIn(400);
		var height_window = $(window).height();
		var content = popup_con.find('.text_item').html();

		popup.find('.text_popup').html(content);

		var height_popup = popup.find('.popup_body').outerHeight();
		var pos_top = (height_window - height_popup) / 2;
		popup.find('.popup_body').css('top', pos_top);
		
	}

	function hide_popup(e){
		e.preventDefault();
		$('.mask').fadeOut(400);
		$('#popup_background').fadeOut(400);
		var time_out = setTimeout(function() {
			$('body').removeClass('popup_active');
		}, 400);
	}

	$(window).on('load', function() {
		setTimeout(
			function() {
				$(".scroll_animation").each(function() {
					var block = $(this);
					if ($(document).scrollTop() + $(window).height() > $(this).offset().top + 100 && $(document).scrollTop() - block.offset().top < $(this).height()){
						$(this).addClass("animated");
					}
				});
			}, 600);
	});

	$('.more a.underline').click(function(e) {
		show_popup($(this), e);
	});

	$('.close_button, .close a, .mask').click(function(e) {
		hide_popup(e);
	});

	$('html').keydown(function(e) {
		if(e.keyCode === 27){
			hide_popup(e);
		}
	});

	$('#slider_main').owlCarousel({
	    items: 1,
	    loop: true,
	    nav: true,
	    dots: true,
	    navContainer: $('#slider_main').parent().find('.nav_container'),
	    dotsContainer: $('#slider_main').parent().find('.nav_dots')
	});

	$('.slider_green').owlCarousel({
	    items: 1,
	    loop: true,
	    nav: true,
	    dots: true,
	    navContainer: $('.slider_green').parent().parent().find('.nav_container'),
	    dotsContainer: $('.slider_green').parent().parent().find('.nav_dots')
	});
});