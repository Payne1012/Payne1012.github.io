 /*历史上的三局轮播*/
 	var curIndex = 0;
	var timeInterval = 3000;//时间设定
	var arr = new Array();
	arr[0] = "img/lssj1.png";
	arr[1] = "img/lssj2.png";
	arr[2] = "img/lssj3.png";
	arr[3] = "img/lssj4.png";
	setInterval(changeImg,timeInterval);
	function changeImg() {
	var obj = document.getElementById("obj");
	obj.style.transition = "all 1s";
	if (curIndex == arr.length-1) {
	curIndex = 0;
	} else {
	curIndex += 1;
	}
	obj.src = arr[curIndex];
	}
 /************************************************老党员下拉******************************************************/
$(document).ready(function(){
	
	$("#left_ico_arr").click(function(){
		var div=$("#left_ldy_content");
		var height=div.height();
		if(height==270){
		div.animate({height:'700px',},"slow");
		$("#left_ico_arr").addClass("f");
		}else{
		div.animate({height:'325px',},"slow");
		$("#left_ico_arr").removeClass("f");
		}								  
	});
	
	$("#main_arr").click(function(){
		var div=$("#main_content");
		var height=div.height();
		if(height==270){
		div.animate({height:'700px',},"slow");
		$("#main_arr").addClass("f");
		}else{
		div.animate({height:'325px',},"slow");
		$("#main_arr").removeClass("f");
		}									  
	});
	
	$("#right_arr").click(function(){
		var div=$("#right_content");
		var height=div.height();
		if(height==270){
		div.animate({height:'700px',},"slow");
		$("#right_arr").addClass("f");
		}else{
		div.animate({height:'325px',},"slow");
		$("#right_arr").removeClass("f");
		}									  
	});	
	
/************************************************老故事轮播******************************************************/
	var length, 
	currentIndex = 0, 
	interval, 
	hasStarted = false, //是否已经开始轮播 
	t = 30000000; //轮播时间间隔 
	length = $('.slider-panel').length; 
//将除了第一张图片隐藏 
	$('.slider-panel:not(:first)').hide(); 
//将第一个slider-item设为激活状态 
	$('.slider-item:first').addClass('slider-item-selected'); 
	$('.slider-item').hover(function(e) { 
	  stop(); 
	  var preIndex = $(".slider-item").filter(".slider-item-selected").index(); 
	  currentIndex = $(this).index(); 
	  play(preIndex, currentIndex); 
	}, function() { 
	  start(); 
	}); 
	$('.slider-pre').unbind('click'); 
	$('.slider-pre').bind('click', function() { 
	  pre(); 
	}); 
	$('.slider-next').unbind('click'); 
	$('.slider-next').bind('click', function() { 
	  next(); 
	}); 
/*** 向前翻页 ****/
	 function pre() { 
	  var preIndex = currentIndex; 
	  currentIndex = (--currentIndex + length) % length; 
	  play(preIndex, currentIndex); 
	 } 
/*** 向后翻页  ****/
	 function next() { 
	  var preIndex = currentIndex; 
	  currentIndex = ++currentIndex % length; 
	  play(preIndex, currentIndex); 
	 } 
/*** 从preIndex页翻到currentIndex页  * preIndex 整数，翻页的起始页  * currentIndex 整数，翻到的那页 ****/
	 function play(preIndex, currentIndex) { 
	  $('.slider-panel').eq(preIndex).fadeOut(100) 
	  .parent().children().eq(currentIndex).fadeIn(300); 
	  $('.slider-item').removeClass('slider-item-selected'); 
	  $('.slider-item').eq(currentIndex).addClass('slider-item-selected'); 
	 } 
/*** 开始轮播 ****/
	 function start() { 
	  if(!hasStarted) { 
	  hasStarted = true; 
	  interval = setInterval(next, t); 
	  } 
	 } 
/*** 停止轮播  ****/
	 function stop() { 
	  clearInterval(interval); 
	  hasStarted = false; 
	 } 
	 //开始轮播 
	 start(); 	 
/************************************************老故事透明背景字幕******************************************************/
if(!document.getElementsByClassName){
document.getElementsByClassName = function(className, element){
var children = (element || document).getElementsByTagName('*');
var elements = new Array();
for (var i=0; i<children.length; i++){
var child = children[i];
var classNames = child.className.split(' ');
for (var j=0; j<classNames.length; j++){
if (classNames[j] == className){ 
elements.push(child);
break;
}
}
} 
return elements;
};
}

var aBtn=document.getElementsByClassName("lgs_bottom_kow");//获取
var aDiv=document.getElementsByClassName("img_ary");//获取
for(i=0;i<aBtn.length;i++)//循环
{
	aBtn[i].index=i;
	aBtn[i].onmouseover=function()
	{
		aDiv[this.index].style.top='-177px';
		aDiv[this.index].style.transition = '0.3s';
	}
	aBtn[i].onmouseout=function()
	{
		aDiv[this.index].style.top='-35px';
		aDiv[this.index].style.transition = '0.3s';
	}
}				
/************************************************发展中三局下拉******************************************************/
$(".jzgd").click(function(){
		  	$(".about_lishi").animate({height:'1350px'});
		  	$(".jzgd").hide();
		  	$(".jzgb").show();
		  	
		});
		$(".jzgb").click(function(){
		  	$(".about_lishi").animate({height:'635px'});
		  	$(".jzgd").show();
		  	$(".jzgb").hide();
		  	
		});
});
			