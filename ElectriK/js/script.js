$(document).ready(function() {

	function work_width(){
		var total_w = 0;
		$('.work').each(function() {
			total_w += $(this).outerWidth() + 1;
		});

		$('.works_row').css('width', total_w);
	}

	function scroll_bar(){
		$('.works_container').mCustomScrollbar({
			axis:"x",
			mouseWheel:{ enable: false }
		});
	}

	function show_mobile_menu(){
		$('.mobile_menu').toggleClass('mobile_menu_open');
		$('.mobile_button').toggleClass('open_menu');
	}

	$(window).resize(function() {
		work_width();
		scroll_bar();
	});

	$('.mobile_button').click(function() {
		show_mobile_menu();
	});


	$(window).on('load', function(){
		work_width();
		scroll_bar();
	});

});