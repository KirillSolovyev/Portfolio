$(document).ready(function() {

	function width_menu_line(){
		var offset_left = $('.menu').offset().left;
		$('.menu_line').css('width', $(window).width() - offset_left);
	}

	function show_mobile_menu(){
		$('.mobile_menu').toggleClass('mobile_menu_open');
		$('.mobile_button').toggleClass('open_menu');
	}

	function des_owl(){
		if($(window).width() <= 500 && $('.news_slider').length != 0){
			$('.news_slider').trigger('destroy.owl.carousel').removeClass('owl-carousel');
		}
	}

	function show_hidden(elem){
		$(elem).parent().parent().toggleClass('show_items');
	}

	function show_popup(e){
		e.preventDefault();
		$('#popup_background').fadeIn(400);
		var popup = $('#popup_background');
		var height_popup = popup.find('.popup_body').outerHeight();
		var height_window = $(window).height();
		var pos_top = (height_window - height_popup) / 2;
		popup.find('.popup_body').css('top', pos_top);
	}

	function hide_popup(e){
		e.preventDefault();
		$('#popup_background').fadeOut(400);
	}

	function validate_input(){
		var valide_input = true;
		$('.get_con_form').find('input').each(function() {
			if($(this).val() == ''){
				valide_input = false;
			}
		});
		return valide_input;
	}

	function error_message(){
		$('.error_form').fadeIn(400);
		var hide_error = setTimeout(function(){
			$('.error_form').fadeOut(400);
		}, 5000);
	}

	function success_send(form){
		$(form).find('input:not(input[type="submit"])').val('');
		$(form).find('textarea').val('');
		$(form).find('.error_form p').text('Письмо отправлено');
		$(form).find('.error_form').addClass('success_send');
		error_message();
	}

	$('.mobile_button').click(function(){
		show_mobile_menu();
	});

	width_menu_line();

	$('.news_slider').owlCarousel({
		center: true,
	    items: 3,
	    loop: true,
	    nav: true,
	    dots: false,
	    autoWidth: true,
	    navText: ['Предыдущие', 'Следующие'],
	    responsive : {
		    768 : {
		        items: 1,
		    }
		}
	});

	des_owl();

	$(window).resize(function() {
		width_menu_line();
		des_owl();
	});

	$('.read_all .read_all_link').click(function(e) {
		e.preventDefault(); 
		$(this).parent().toggleClass('read_all_opened');
		if($(this).parent().hasClass('read_all_opened')){
			$(this).text('Свернуть');
		}else{
			$(this).text('Читать далее');
		}
	});

	$('.owl-carousel .owl-nav button.owl-next').click(function() {
		$('.read_all_opened').find('.read_all_link').text('Читать далее');
		$('.read_all_opened').removeClass('read_all_opened');
	});

	var text_link = 0;
	
	$('.events_hide .show_hidden, .review_hidden .show_hidden, .video_hidden .show_hidden').click(function(e) {
		e.preventDefault();
		if($(this).text() != 'Свернуть'){
			text_link = $(this).text();
		}
		show_hidden($(this));
		if($(this).parent().parent().hasClass('show_items') != 1){
			$(this).text(text_link);
		}else{
			$(this).text('Свернуть');
		}
	});

	$('a[data-rel^=lightcase]').lightcase({
		showCaption: false
	});

	$('.get_consultation').click(function(e) {
		show_popup(e);
	});

	$('.mask, .close_button').click(function(e) {
		hide_popup(e);
	});

	$('.get_con_form').submit(function(e) {
		e.preventDefault();
		var valide = validate_input();
		if(valide == false){
			e.preventDefault();
			error_message();
		}else{
			var data = $(this).serialize();
			var email_send = $('.email_send').text();
			email_send = email_send.replace('Email:','');
			data += '&email_send=' + email_send;
			$.ajax({
				type: "POST",
				url: "/wp-content/themes/AMP/js/send_message.php",
				dataType: "html",
				data: data,
				success: success_send($(this)),
				error: function() {
					console.log('error');
				}
			});
		}
	});

});