$(function () {

	////////////////
	// ページ内リンク
	////////////////
	$('a[href^="#"]').click(function (event) {
		var offset = 0;
		if ($('.pc').css('display') === 'block') {
			// PC
			offset = 0;
		} else {
			// SP
			offset = 0;
		}

		var id = $(this).attr("href");
		var target = $(id).offset().top - offset;
		if ($(this).attr("href") === "#contents") {
			target = 0;
		}
		$('html, body').animate({ scrollTop: target }, 500, 'easeOutCubic');
		event.preventDefault();
		return false;
	});


	////////////////
	// スクロール
	////////////////
	function scroll(e) {
		var wt = $(window).scrollTop();
		var wb = wt + $(window).height();

	}




});

