/**切换**/
aBtn = jQuery(".user_navli");
aDiv = jQuery(".user_navmain");
for(i = 0; i < aBtn.length; i++) {
	aBtn[i].index = i;
	aBtn[i].onclick = function() {
		for(var i = 0; i < aBtn.length; i++) {
			aBtn[i].className = 'user_navli';
			aDiv[i].style.display = 'none';
		}
		this.className = 'user_navli active';
		aDiv[this.index].style.display = 'block';
	}

}

/**切换**/
oBtn = jQuery(".userImgTabLi");
oDiv = jQuery(".userImgBoxLi");
for(i = 0; i < oBtn.length; i++) {
	oBtn[i].index = i;
	oBtn[i].onclick = function() {
		for(var i = 0; i < oBtn.length; i++) {
			oBtn[i].className = ' userImgTabLi column-1_3';
			oDiv[i].style.display = 'none';
		}
		this.className = 'userImgTabLi column-1_3 active';
		oDiv[this.index].style.display = 'block';
	}

}
/**切换**/
mBtn = jQuery(".ml-li");
mDiv = jQuery(".ml-text");
for(i = 0; i < mBtn.length; i++) {
	mBtn[i].index = i;
	mBtn[i].onclick = function() {
		for(var i = 0; i < mBtn.length; i++) {
			mBtn[i].className = ' ml-li fl';
			mDiv[i].style.display = 'none';
		}
		this.className = 'ml-li active fl';
		mDiv[this.index].style.display = 'block';
	}

}
//弹出捐款框
var a = '<div class="jz_ck_warp" id="jz_ck_warp">';
a += '\t\t<div class="jz_ck_header">',
	a += '\t\t\t<div class="jz_ck_header_left fl">',
	a += '\t\t\t\t<span>单笔捐款项目  ── </span>',
	a += '\t\t\t\t<a href="#">患有心脏病的陈老</a>',
	a += '\t\t\t</div>',
	a += '\t\t\t<div class="jz_ck_header_right fr" onclick="gb()">关闭</div>',
	a += '\t\t</div>',
	a += '\t\t<form action="" method="post">',
	a += '\t\t\t<div class="jz_ck_main">',
	a += '\t\t\t\t<ul>',
	a += '\t\t\t\t<li class="jz_ck_num">',
	a += '\t\t\t\t\t<div class="dd_other fl">',
	a += '\t\t\t\t\t<label class="fl">捐款金额：</label>',
	a += '\t\t\t\t\t<a href="javascript:;" class="d_donate_money">50元</a>',
	a += '\t\t\t\t\t<a href="javascript:;" class="d_donate_money">100元</a>',
	a += '\t\t\t\t\t<a href="javascript:;" class="d_donate_money">200元</a>',
	a += '\t\t\t\t\t</div>',
	a += '\t\t\t\t\t<div id="dd_othernum" class="dd_othernum fl">',
	a += '\t\t\t\t<label for="" class="fl">其他金额：</label>',
	a += '\t\t<input id="amountelse" name="amountelse" value="" maxlength="8" type="text"><span>元</span>',
	a += '\t\t\t\t\t</div>',
	a += '\t\t\t\t</li>',
	a += '\t\t\t\t<li class="jz_ck_sj">',
	a += '\t\t\t\t\t<label for="sjNum" class="fl">手机号码：</label>',
	a += '\t\t\t\t\t<input name="qq" id="sj" value="" maxlength="11" type="text">',
	a += '\t\t\t\t\t<span class="dd_tips">（项目动态向此手机号码反馈）</span> </li>',
	a += '\t\t\t\t<li class="dd_bless">',
	a += '\t\t\t\t\t<label for="myBless" class="fl">我的祝福：</label>',
	a += '\t\t\t\t\t<textarea id="memo" name="memo" cols="40" rows="3"></textarea>',
	a += '\t\t\t\t</li>',
	a += '\t\t\t\t</ul>',
	a += '\t\t\t</div>',
	a += '\t\t\t<div class="jk_ck_btn">',
	a += '\t\t\t\t<span>',
	a += '\t\t\t\t<a class="">确认捐款</a>',
	a += '\t\t\t\t</span>',
	a += '\t\t\t\t<span>',
	a += '\t\t\t\t\t<a class="">快捷捐款</a>',
	a += '\t\t\t\t</span>',
	a += '\t\t\t</div>',
	a += '\t\t\t<div class="jk_ck_footer"> ',
	a += '\t\t\t\t<input checked="checked" type="checkbox"> ',
	a += '\t\t\t\t<span>同意并接受《<a href="term.html" target="_blank">小天使公益平台用户协议</a>》</span>',
	a += '\t\t\t</div>',
	a += '\t\t</form>',
	a += '\t</div>';
//alert(a)
jQuery(".btn_jk").on("click", function() {
	jQuery("#jz_ck_bg").toggle(), jQuery("#jz_ck_bg").after(a), jQuery(".jz_ck_warp").show();
	jkje();
	gb();
});
jQuery("#jz_ck_bg").on("click", function() {
	jQuery("#jz_ck_bg").toggle(), jQuery(".jz_ck_warp").remove();
});

function gb() {
	jQuery(".jz_ck_header_right").click(function() {
		jQuery(".jz_ck_warp").css("display", "none");
		jQuery("#jz_ck_bg").css("display", "none");
	});
}

function jkje() {

	var jkbtn = jQuery(".d_donate_money");

	for(i = 0; i < jkbtn.length; i++) {

		jkbtn[i].index = i;

		jkbtn[i].onclick = function() {

			for(var i = 0; i < jkbtn.length; i++) {

				jkbtn[i].className = 'd_donate_money';

			}

			this.className = 'd_donate_money active';

		}

	}

}
/*必须选中*/

btn(); //调用执行
function btn() { //封装一个btn() 获取checked复选框的状态返回ture/false
	var check = (jQuery(".radio").is(":checked")); //方法一、var check = jQuery(".radio")[0];
	//console.log(jQuery(".radio").is(":checked"));
	var chbtn = jQuery(".but");
	if(check == true) { //方法一 、改check为check.checked
		jQuery(".ycbtn").css("display", "none"); //如果是ture 禁用提交按钮隐藏
	} else {
		chbtn.css("display", "none"); //如果是false 提交按钮隐藏
	}
}
jQuery(".radio").click(function() { //复选框点击事件
	jQuery(".but").toggle(); //禁用按钮切换
	jQuery(".ycbtn").toggle(); //
});

//
jQuery(".btn-dj").hover(
	function() {
		jQuery(this).find(".jk_cneter").show();
	},
	function() {
		jQuery(this).find(".jk_cneter").hide();
	}
);

///*文字滚动*/
jQuery(function() {
	var num = 0;

	function goLeft() {
		//750是根据你给的尺寸，可变的
		if(num == -750) {
			num = 0;
		}
		num -= 1;
		jQuery(".scroll").css({
			left: num
		})
	}
	//设置滚动速度
	var timer = setInterval(goLeft, 20);
	//设置鼠标经过时滚动停止
	jQuery(".box").hover(function() {
			clearInterval(timer);
		},
		function() {
			timer = setInterval(goLeft, 20);
		})
})

/*计算捐款进度条*/

var znum = jQuery(".mb_je").text(); //获取
var xnum = jQuery(".jk_je").text();
var jdt = jQuery(".istrue");
var jdz = jQuery(".jdz");

znum = parseInt(znum); //类型转换
xnum = parseInt(xnum);

var bfb = ((xnum / znum) * 100) + '%';
var bfa = 100 + '%';

jdt.width(bfb);
jdz.html(((xnum / znum) * 100) + '%');

if(bfb >= bfa) {

	jdt.css("background", "red");

} else {

}