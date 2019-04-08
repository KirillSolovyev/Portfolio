$(document).ready(function() {

	function showIndeces(graphName){
		let inx = parseInt($(graphName).attr("start-index"));
		let interval = parseInt($(graphName).attr("index-interval"));
		let rangeOfActive = [parseInt($(graphName).attr("range-of-active-start")), parseInt($(graphName).attr("range-of-active-end"))];
		$(graphName).find(".graph-index").each(function(){
			if($(this).find(".value-index").length < 1){
				$(this).append("<div class='value-index'>" + inx + "</div>");
				$(this).append("<div class='value-index'>" + inx + "</div>");
			}
			if(inRange(rangeOfActive, inx)){
				if(inx == rangeOfActive[1]){
					$(this).addClass("lastActive");
					if($(".lastActive").length > 1){
						$(this).prev(".graph-index").removeClass("lastActive");
					}
				}else{
					$(this).addClass("graph-index-hovered");
				}
			}else{
				$(this).removeClass("graph-index-hovered lastActive");
				if(inx == rangeOfActive[1]){
					$(this).addClass("lastActive");
				}
			}
			alignLeftIndeces(this);
			inx += interval;
		});
	}

	function alignLeftIndeces(parent){
		let widthIndex = $(parent).find(".value-index").width();
		$(parent).find(".value-index").css("left", (widthIndex / 2) * -1);
	}

	function getRangeOfActive(graphName){
		if($(graphName).is("[range-of-active]")){
			return $(graphName).attr("range-of-active").split(['-']);
		}else{
			return null;
		}
	}

	function inRange(rangeOfActive, inx){
		res = false;
		if(rangeOfActive != null && inx >= parseInt(rangeOfActive[0]) && inx <= parseInt(rangeOfActive[1])){
			res = true;
		}
		return res;
	}

	function drawDots(graphName){
		let maxValue = parseInt($(graphName).attr("max-value"));
		let startValue = parseInt($(graphName).attr("start-value"));
		let intervals = parseInt($(graphName).attr("scale-interval"));
		let graphHeight = $(graphName).height() - 42;
		$(graphName).find(".graph-index").each(function() {
			let currentValue = parseInt($(this).attr("value"));
			currentValue = (maxValue > currentValue ? currentValue : maxValue);
			let bottomPos = (currentValue - startValue + intervals) / (maxValue - startValue + intervals) * graphHeight;
			$(this).append("<div class='valueDot'><div class='realValue'>" + currentValue + "</div></div>");
			$(this).find(".valueDot").css("bottom", bottomPos);
		});
	}

	function drawHorizontalScale(graphName){
		let maxValue = parseInt($(graphName).attr("max-value"));
		let startValue = parseInt($(graphName).attr("start-value"));
		let intervals = parseInt($(graphName).attr("scale-interval"));
		let maxHeight = $(graphName).height() - 40;
		for(let num = startValue; num <= maxValue; num += intervals){
			let bottomPos = (num - startValue + intervals) / (maxValue - startValue + intervals) * maxHeight + 30;
			$(graphName).prepend("<div class='horizontal-scale' style='bottom: " + bottomPos + "px'><div class='scales'>" + num + "</div><div class='scales'>" + num + "</div></div>");
		}
	}

	function drawLines(graphName){
		$(graphName).find(".graph-index").each(function() {
			let height1 = parseInt($(this).find(".valueDot").css("bottom"));
			let height2 = parseInt($(this).next(".graph-index").find(".valueDot").css("bottom"));
			let cat1 = Math.abs(height1 - height2);
			let cat2 = parseInt($(this).width());
			let hyp = Math.sqrt(cat1 * cat1 + cat2 * cat2);
			let angle = Math.asin(cat1 / hyp) * (height1 > height2 ? 1 : -1);
			$(this).append("<div class='line-graph-line'><div></div></div>");
			$(this).find(".line-graph-line ").css("bottom", height1);
			$(this).find(".line-graph-line div").css({"width" : hyp + "px", "transform" : "rotate(" + angle + "rad)", "opacity" : 1});
		});
	}

	function drawHorizontalBars(graphName){
		$(graphName).find(".graph").prepend("<div class='graph-body'></div>");
		let maxValue = parseInt($(graphName).attr("max-value"));
		let ind = 1;
		$(graphName).find(".titles-container .graph-row-name").each(function(){
			let currentValue = (parseInt($(this).attr("value")) > maxValue ? maxValue : parseFloat($(this).attr("value")));
			let itemWidth = (currentValue / maxValue) * $(graphName).find(".graph").width();
			let currentStyles = $(this).attr("style") != undefined ? $(this).attr("style") : '';
			let currentColor = $(this).attr("color");
			$(this).attr("style", "");
			let ofTop = $(this).offset().top - $(graphName).find(".graph").offset().top - 30;
			$(graphName).find(".graph-body").append("<div class='horizontal-bar' style='top: " + ofTop + ";" + currentStyles + "'><div class='bar-value' style='color: " + currentColor + "; border-color: " + currentColor + "'>" + currentValue + "</div><div class='bar-index'>" + (ind > 9 ? ind : "0" + ind)+ "</div></div>");
			$(graphName).find(".graph-body .horizontal-bar").eq(ind - 1).css("width", itemWidth);
			ind++;
		});
	}

	function draw3DGraph(graphName){
		let maxValue = $(graphName).attr("max-value");
		let graphHeight = $(graphName).height() - 42.5;
		$(graphName).find(".threeD-column").each(function(){
			let currentValue = $(this).attr("value");
			$(this).css("height", currentValue / maxValue * graphHeight);
			$(this).append("<div class='currentValue'>" + currentValue + "</div>");
		});
	}

	function drawSetYear(graphName){
		let maxValue = parseInt($(graphName).attr("max-value"));
		let startValue = parseInt($(graphName).attr("start-index"));
		let interval = parseInt($(graphName).attr("index-interval"));
		let graphHeight = parseInt($(graphName).height());
		let intervalStart = parseInt($(graphName).attr("range-of-active-start"));
		let intervalEnd = parseInt($(graphName).attr("range-of-active-end"));
		let rangeOfActive = [intervalStart, intervalEnd];
		for(let i = startValue; i <= maxValue; i += interval){
			$(graphName).prepend("<div class='yearNotation " + (inRange(rangeOfActive, i) ? 'activeDot ' : '') + (i == startValue ? 'lastItem ' : '') + (i == rangeOfActive[0] ? 'lastActive ' : '') + (i == rangeOfActive[1] ? "first_active" : "") + "'>" + i
			+ "<div class='valueDot'></div><div class='mid'></div></div>");
		}
	}

	function draw3DGraphRange(graphName){
		let maxValue = $(graphName).attr("max-value");
		let graphHeight = $(graphName).height() - 42.5;
		let startVal = $(graphName).attr("range-of-active-start");
		let endVal = $(graphName).attr("range-of-active-end");
		let startYear = parseInt($(graphName).attr("start-year"));
		let inx = 0;
		$(graphName).find(".threeD-column").each(function(){
			if(inx >= startVal && inx <= endVal){
				let currentValue = parseFloat($(this).attr("value"));
				let prevValue = parseFloat($(this).attr("prev-value"));
				// console.log($(this).attr("value") + " " + prevValue);
				let percent = ((currentValue / prevValue - 1) * 100).toFixed(1);
				let labelTop;
				$(this).fadeIn();
				$(this).css("height", Math.min(currentValue, prevValue) / maxValue * graphHeight);
				if(prevValue <= currentValue){
					labelTop = (currentValue - prevValue) / maxValue * graphHeight;
				}else{
					labelTop = (prevValue - currentValue) / maxValue * graphHeight;
					$(this).addClass("decreaseStat");
				}
				if($(this).find(".dif3DGraph").length < 1){
					$(this).append("<div class='dif3DGraph' style='height: " + labelTop + "px; top: " + (-1) * labelTop + "'></div>");
					$(this).append("<div class='currentValue' style='top: " + (-1) * (Math.abs(currentValue - prevValue) / maxValue * graphHeight + 55) + "'>" + currentValue + "</div>");
					$(this).append("<div class='changeInValue' style='top: " + (-1) * (Math.abs(currentValue - prevValue) / maxValue * graphHeight) + "'><span>" + (percent >= 0 ? '+' : '') + percent + "%</span>" + (percent >= 0 ? 'прирост' : 'убыль') + "</div>");
				}
			}else{
				$(this).fadeOut(1);
			}
			$(this).append("<div class='labelYear'>" + (startYear + inx) +" год</div>");
			inx++;
		});
	}

	$(".column-graph").each(function(){
		showIndeces(this);
	});

	drawDots(".line-graph-draw");
	drawLines(".line-graph-draw");
	drawHorizontalScale(".line-graph-draw");
	drawHorizontalBars(".horizontal-bar-graph");
	draw3DGraph(".threeD-column-graph-draw");
	drawSetYear(".setYear");

	$(".switchGraph .radioCont").each(function() {
		if($(this).find("input").attr("checked") == "checked"){
			let graphHtml = $($(this).find("input").attr("for-graph")).html();
			$(".graphSpace").html(graphHtml);
			drawDots(".graphSpace .line-graph");
			drawLines(".graphSpace .line-graph");
			drawHorizontalScale(".graphSpace .line-graph");
			draw3DGraphRange(".graphSpace .threeD-from-set-graph");
		}
	});

	let minVal = parseInt($(".setYear").attr("start-index"));
	let maxVal = parseInt($(".setYear").attr("max-value"));
	let startVal = parseInt($(".setYear").attr("range-of-active-start"));
	let endVal = parseInt($(".setYear").attr("range-of-active-end"));
	let indexInt = parseInt($(".setYear").attr("index-interval"));
	$(".switchGraph .radioCont").on("change", function(){
		$(this).each(function(){
			if($(this).find("input").is(':checked')){
				let graphHtml = $($(this).find("input").attr("for-graph")).html();
				$(".graphSpace").html(graphHtml);
				let startVale = parseInt($(".setYear").attr("range-of-active-start"));
				let endVale = parseInt($(".setYear").attr("range-of-active-end"));
				$(".graphSpace .fromSetGraph").attr("range-of-active-start", startVale);
				$(".graphSpace .fromSetGraph").attr("range-of-active-end", endVale);
				$(".graphSpace .threeD-from-set-graph").attr("range-of-active-start", startVale - minVal);
      			$(".graphSpace .threeD-from-set-graph").attr("range-of-active-end", endVale - minVal);
				drawDots(".graphSpace .line-graph");
				drawLines(".graphSpace .line-graph");
				drawHorizontalScale(".graphSpace .line-graph");
				showIndeces(".graphSpace .line-graph");
				draw3DGraphRange(".graphSpace .threeD-from-set-graph");
			}
		});
	});

	function startSlider(){
		$(".rangeGraph").slider({
	      range: "max",
	      min: minVal,
	      max: maxVal,
	      values: [startVal, endVal],
	      orientation: "vertical",
	      range: true,
	      step: indexInt,
	      slide: function(event, ui){
	      	let indexTop = Math.abs(ui.values[1] - maxVal);
	      	let indexBot = Math.abs(ui.values[0] - maxVal);
	      	if($(".first_active").index() > indexTop){
	      		$(".first_active").removeClass("first_active");
	      		$(".setYear .yearNotation").eq(indexTop).addClass("activeDot first_active");
	      	}else if($(".first_active").index() < indexTop){
	      		$(".first_active").removeClass("first_active activeDot");
	      		$(".setYear .yearNotation").eq(indexTop).addClass("first_active");
	      	}else if($(".lastActive").index() < indexBot){
	      		$(".lastActive").removeClass("lastActive");
	      		$(".setYear .yearNotation").eq(indexBot).addClass("lastActive activeDot");
	      	}else if($(".lastActive").index() > indexBot){
	      		$(".lastActive").removeClass("lastActive activeDot");
	      		$(".setYear .yearNotation").eq(indexBot).addClass("lastActive");
	      	}
	      	$(".setYear").attr("range-of-active-start", ui.values[0]);
	      	$(".setYear").attr("range-of-active-end", ui.values[1]);
	      	$(".fromSetGraph").attr("range-of-active-start", ui.values[0]);
	      	$(".fromSetGraph").attr("range-of-active-end", ui.values[1]);
	      	$(".graphSpace .threeD-from-set-graph").attr("range-of-active-start", ui.values[0] - minVal);
	      	$(".graphSpace .threeD-from-set-graph").attr("range-of-active-end", ui.values[1] - minVal);
	      	showIndeces(".fromSetGraph");
	      	draw3DGraphRange(".graphSpace .threeD-from-set-graph");
	      }
	    });
	}
	startSlider();

    $(window).on("resize", function() {
		drawDots(".graphSpace .line-graph");
		drawLines(".graphSpace .line-graph");
		drawHorizontalScale(".graphSpace .line-graph");
		startSlider();
	});
});

$(window).on("load", function() {
	$(".rangeGraph").css("height", $(".setYear").height() - 35);
});