class common {
	videoPlayer = null;
	optOption = {
		title: '返回',
		callback: function() {}
	};
	showOpt(options) {
		let opts = $.extend(true, {}, this.optOption, options);
		let zIndex = this.getMaxZIndex();
		let html = [];
		html.push('<div class="opt-area" style="z-index:'+zIndex+'">');
		html.push('<a href="javascript:;" data-opt-ele>' + opts.title + '</a>');
		html.push('</div>');
		let $optEl = $(html.join('')).appendTo($('body'));
		$optEl.find('a[data-opt-ele]').click(function() {
			opts.callback.call(opts);
			$optEl.remove();
		});
	};
	getMaxZIndex() {
		var maxZ = Math.max.apply(null, $.map($('body *'), function(e, n) {　　
			if($(e).css('position') != 'static')　　 return parseInt($(e).css('z-index')) || -1;
		}));
		return maxZ;
	}
	getDpr() {
		var winWidth = window.innerWidth;
		var fontSize = 12;
		if(winWidth < 800) {
			fontSize = 12;
		} else if(winWidth >= 800 && winWidth < 1367) {
			fontSize = 14;
		} else if(winWidth >= 1367 && winWidth < 1920) {
			fontSize = 16;
		} else if(winWidth >= 1920) {
			fontSize = 18;
		}
		return fontSize;
	};
	getCategoryBarWidth() {
		var winWidth = window.innerWidth;
		var barWidth = 8;
		if(winWidth < 800) {
			barWidth = 8;
		} else if(winWidth >= 800 && winWidth < 1367) {
			barWidth = 10;
		} else if(winWidth >= 1367 && winWidth < 1920) {
			barWidth = 12;
		} else if(winWidth >= 1920) {
			barWidth = 14;
		}
		return barWidth;
	};
	getGaugeWidth() {
		var winWidth = window.innerWidth;
		var barWidth = 6;
		if(winWidth < 800) {
			barWidth = 6;
		} else if(winWidth >= 800 && winWidth < 1367) {
			barWidth = 8;
		} else if(winWidth >= 1367 && winWidth < 1920) {
			barWidth = 10;
		} else if(winWidth >= 1920) {
			barWidth = 12;
		}
		return barWidth;
	};
	getGaugeDistance() {
		var winWidth = window.innerWidth;
		var distance = -25;
		if(winWidth < 800) {
			distance = -20;
		} else if(winWidth >= 800 && winWidth < 1367) {
			distance = -25;
		} else if(winWidth >= 1367 && winWidth < 1920) {
			distance = -30;
		} else if(winWidth >= 1920) {
			distance = -35;
		}
		return distance;
	};
}
export default common;