//20180613志愿项目-检索-地区-更多收起控制*****************/
var pro_wrap = document.getElementById("project_search_wrap_js");
var more_city_js = document.getElementById("more_city_js");
var caret_js = document.getElementById("more_city_caret_js");

function onHeight() {
	if(pro_wrap.style.height == 176 + "px") {
		onTop();
	} else {
		onBottom();
	}

};

function onTop() {
	pro_wrap.style.height = 44 + "px";
	more_city_js.innerHTML = "<a href='JavaScript:;'>更多</a>";
	caret_js.className = "caret";
}

function onBottom() {
	pro_wrap.style.height = 176 + "px";
	more_city_js.innerHTML = "<a href='JavaScript:;'>收起</a>";
	caret_js.className = "caret active";
}

//tab切换

function tab(titId, conId, titClass, conClass) {
	var tabTits = document.getElementById(titId).children;
	var tabCons = document.getElementById(conId).children;
	len = tabTits.length;
	for(var i = 0; i < len; i++) {
		//关键在于此处，为相应数组元素添加一个索引值属性
		tabTits[i].index = i;
		tabTits[i].onclick = function() {
			for(var i = 0; i < len; i++) {
				tabTits[i].className = '';
				tabCons[i].className = '';
			};
			//此处利用this找到被点击的标题元素，然后获取到原来存储到这个元素（对象）身上的index属性
			tabTits[this.index].className = titClass;
			tabCons[this.index].className = conClass;
		}
	}
}
tab('tabTit', 'tabCon', 'select', 'show');

//返回顶部函数
function pageScroll(){
    //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
    window.scrollBy(0,-100);
    //延时递归调用，模拟滚动向上效果
    scrolldelay = setTimeout('pageScroll()',100);
    //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
    var sTop=document.documentElement.scrollTop+document.body.scrollTop;
    //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
    if(sTop==0) clearTimeout(scrolldelay);
}
document.getElementById("to_top").onclick=function(){pageScroll()};
