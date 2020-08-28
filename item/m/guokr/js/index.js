"use strict";
new Swiper(".swiper-container", {
	autoplay: 500,
	speed: 500,
	pagination: ".swiper-pagination",
	prevButton: ".swiper-button-prev",
	nextButton: ".swiper-button-next",
	keyboardControl: !0,
	mousewheelControl: !0,
	loop: !0
});
const app = angular.module("app", []);
app.controller("news", ["$scope", "$http", function(t, e) {
	t.list = [{
		title: "解读科学观点时，你应该知道的20个",
		href: "https://www.baidu.com/"
	}, {
		title: "运动出点汗，更好来谈判",
		href: "https://www.baidu.com/"
	}, {
		title: '"关掉"旧习惯，本性不在难移',
		href: "https://www.baidu.com/"
	}, {
		title: "男女搭配，破案不累",
		href: "https://www.baidu.com/"
	}, {
		title: "腰窝，性感无误？",
		href: "https://www.baidu.com/"
	}, {
		title: '有7000多种语言，就有7000多个"平行"',
		href: "https://www.baidu.com/"
	}, {
		title: "久坐杀精—— ——今天，你坐多久了？",
		href: "https://www.baidu.com/"
	}]
}]);