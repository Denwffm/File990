var isMobileDevice = false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) isMobileDevice = true;


/* Запускаем когда страница готова | trigger when page is ready */
$(document).ready(function(){

	// Добавляйте Ваши функции сюда | your functions go here
	
	$('.is-scaled').each( function(){
		$(this).removeClass('is-scaled');
	});
	$('.is-skewed').each( function(){
		$(this).removeClass('is-skewed');
	});
	$('.is-animated').each( function(){
		$(this).removeClass('is-animated');
	});
	
	if($('#tourModule').length) {
		$('#tourModule').fullpage({
			anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
			menu: '#navigation',
			responsiveHeight: 600
		});
	}
	
	//hamburger menu func 
	$(document).on('click', '.js-hamburger-link', function() {
		var ths = $(this),
			hamburgerMenu = $('#hamburgerMenu');
			
		hamburgerMenu.fadeToggle('500').toggleClass('open');
		ths.toggleClass('open');
		
	});

	//Checkbox stylization
    $('label input[type=checkbox]').each(function () {
        if ($(this).is(':checked')) $(this).closest('label').addClass('checked');
        $(this).change(function () {
            $(this).closest('label').toggleClass('checked');
        });
    });


	//Radio stylization
	$('label input[type=radio]').each(function(){
		if ($(this).is(':checked')) $(this).closest('label').addClass('checked');
		$(this).change(function(){
			var nm = $(this).attr('name');
			$('label input[name='+nm+']').each(function(){
				if ($(this).is(':checked')){
					$(this).closest('label').addClass('checked');
				} else {
					$(this).closest('label').removeClass('checked');
				}
			});
		});
	});	
	
	
	//Input focused 
	$('label.with-plholder').each(function(){
		var ths = $(this),
			input = ths.find(':input');
		
		if (!input.val() == ''){
			ths.addClass('with-value');	
		}
		
		input.on('focus', function(){
			ths.addClass('focused');
		}).on('blur', function(){
			if (input.val() == ''){
				ths.removeClass('focused');
				ths.removeClass('with-value');
			} else {
				ths.removeClass('focused');
				ths.addClass('with-value');
			}
		});
	});


	//toggle block 
	$(document).on('click', '.js-toggle-link', function(){
		var ths = $(this),
			wrap = ths.closest('.js-toggle-wrap'),
			block = wrap.find('.js-toggle-block');
			
		block.slideToggle(150);
		ths.toggleClass('active');
	});
	
	//Dropdown
	$(document).on('click', '.js-dropdown-link', function(){
		var ths = $(this),
			wrap = ths.closest('.js-dropdown-wrap'),
			dropdown = wrap.find('.js-dropdown-block');
			
		dropdown.slideToggle(150);
		ths.toggleClass('active');
		wrap.toggleClass('active');
	});
	
	
	//show box depending on radio
	showBoxes($("input[type='radio']:checked").attr("value"));
	$('input[type="radio"]').click(function(){
    	showBoxes($(this).attr("value"));
	});
	
	//dropzone config
	if($('form.dropzone').length) {
		Dropzone.options.fileDropzone = {
	  		addRemoveLinks: true
		};
	}

	//show element when scrolled into view
	var scrollListener = function () {
		$(window).one("scroll", function () { //unbinds itself every time it fires
			
			if(isMobileDevice) {
				$('.is-transparent').addClass('visible');
				return false;
			}

			var offset = $(this).scrollTop();
			
			$('.is-transparent').each( function(){
				var ths = $(this),
		        	bottom_of_object = ths.offset().top + ths.outerHeight(),
					bottom_of_window = offset + $(window).height();
		
		        /* If the object is completely visible in the window, fade it in*/ 
		        if( bottom_of_window > bottom_of_object ){
		            ths.addClass('visible');
		        }
		    });
    
			setTimeout(scrollListener, 30); //rebinds itself after 30ms
		});
	}; // end scrollListener
	
	$('.is-transparent').each( function(){
		var ths = $(this),
		    bottom_of_object = ths.offset().top + ths.outerHeight(),
			bottom_of_window = $(window).scrollTop() + $(window).height();
		
		if( bottom_of_window > bottom_of_object ){
		    ths.addClass('visible');
		} else {
			scrollListener(); // Run
		}
	});
	
	//animate form
	$(document).on('click', '.js-switch-link.enterprise-link', function(){
		var ths = $(this),
			sForm = ths.closest('.js-switch-form'),
			enUnit = sForm.find('.js-switch-unit.enterprise-unit'),
			stUnit = sForm.find('.js-switch-unit.startfile-unit'),
			stLink = sForm.find('.js-switch-link.startfile-link');
			
		enUnit.addClass('en-totop');
		stUnit.addClass('st-animated');
		ths.removeClass('active');
		stLink.addClass('active');
		
		setTimeout(function(){
			enUnit.addClass('is-totop').removeClass('is-tobottom en-totop');
			stUnit.removeClass('st-animated');
		}, 500);
		
	});
	
	$(document).on('click', '.js-switch-link.startfile-link', function(){
		var ths = $(this),
			sForm = ths.closest('.js-switch-form'),
			enUnit = sForm.find('.js-switch-unit.enterprise-unit'),
			stUnit = sForm.find('.js-switch-unit.startfile-unit'),
			enLink = sForm.find('.js-switch-link.enterprise-link');
		
		enUnit.addClass('en-tobottom');
		stUnit.addClass('st-animated');
		ths.removeClass('active');
		enLink.addClass('active');
		
		setTimeout(function(){
			enUnit.addClass('is-tobottom').removeClass('is-totop en-tobottom');
			stUnit.removeClass('st-animated');
		}, 500);
		
	});
	
	

	/* Select stylization */
	$('.js-select-wrap').each(function(){
		$(this).find('input[type=hidden]').val($(this).find('.js-option-list li:first').attr('data-value')).trigger('change');		
	});
		
	$('.js-select').on('click', function() {
		var selectWrap = $(this).closest('.js-select-wrap');
		var optionList = selectWrap.find('.js-option-list');
		  
		if (optionList.is(':visible')){
			optionList.hide();
			$(this).find('.arrow').removeClass('active');
		} else {
			if ($('.js-select-wrap .js-option-list:visible').length){
				$('.js-select-wrap .js-option-list:visible').hide();
				$('.js-select-wrap .arrow').removeClass('active');
			}
			optionList.slideDown(150);
			$(this).find('.arrow').addClass('active');
		}
	});
		
	$('.js-option-list li').on('click', function() {
		var ths = $(this),
			optionList = ths.closest('.js-option-list'),
			title = ths.closest('.js-select-wrap').find('.js-select .js-select-title');
			option = ths.html();
		ths.closest('.js-select-wrap').find('input[type=hidden]').val($(this).attr('data-value')).trigger('change');	
		title.empty();
		title.html(option);
		optionList.find('.selected').removeClass('selected');
		ths.addClass('selected');
		optionList.hide();
		ths.closest('.js-select-wrap').addClass('active');
		ths.closest('.js-select-wrap').find('.arrow').removeClass('active');
	});

	// Popup 	
	
	$('.js-add-popup-link').on('click', function(e){
		$('#shadow').fadeIn(300);
		$('.js-add-popup').fadeIn(300);
		e.preventDefault();
	});
	$('.js-edit-contacts-popup-link').on('click', function(e){
		$('#shadow').fadeIn(300);
		$('.js-edit-contacts-popup').css({top: $(window).scrollTop() +50}).fadeIn(300);
		e.preventDefault();
	});
	
	$('.popup .close-popup').on('click', function(e){
		$(this).closest('.popup').fadeOut(300);		
		$('#shadow').fadeOut(300);
		e.preventDefault();
	});


	//Click anywhere outside the element
	$(document).click(function(e){
		if ($('.js-dropdown-wrap .js-dropdown-block:visible').length && !$(e.target).closest('.js-dropdown-wrap').length){
			$('.js-dropdown-wrap .js-dropdown-block').hide();
			$('.js-dropdown-wrap').removeClass('active');
			$('.js-dropdown-wrap .js-dropdown-link').removeClass('active');
		}
		
		if ($('.js-select-wrap .js-option-list:visible').length && !$(e.target).closest('.js-select-wrap').length){
			$('.js-select-wrap .js-option-list').hide();
			$('.js-select-wrap .arrow').removeClass('active');
		}	
		
		if ($('.popup:visible').length && !($(e.target).closest('.container').length || $(e.target).closest('.for-popup-link').length || $(e.target).closest('.dz-hidden-input').length) ) {
			$('.popup .close-popup').click();
		}			
	});
	
	//Press esc
	$(document).keyup(function(e){
		if (e.keyCode == 27) {
			$('.js-dropdown-wrap .js-dropdown-block').slideUp(300);
			$('.js-dropdown-wrap').removeClass('active');
			$('.js-dropdown-wrap .js-dropdown-link').removeClass('active');
			
			$('.js-select-wrap .js-option-list').hide();
			$('.js-select-wrap .arrow').removeClass('active');
			
			$('.popup .close-popup').click();
		}
	});


	$(document).on('click', 'a[href=#]', function(e){ e.preventDefault(); });

});




// Другие события | optional triggers

$(window).load(function() { // Когда страница полностью загружена
	$('.decor-img').addClass('visible');
});



$(window).resize(function() { // Когда изменили размеры окна браузера
	if($(window).width() > 767) {
		$('#hamburgerMenu').hide().removeClass('open');
		$('.js-hamburger-link').removeClass('open');
	}
});


function showBoxes(value) {
	if(value == "file990nz"){
    	$(".file-panel").hide();
		$("#file990nz-panel").fadeIn(300);
  	}
  	if(value == "file990ez"){
    	$(".file-panel").hide();
		$("#file990ez-panel").fadeIn(300);
  	}
}
