var baseUrl = 'http://localhost:8888';

var progress = $.AMUI.progress;

// 获取地址栏中的字符串，并将其转化为对象
function addr_obj() {
	var search = location.search;
	var obj = {};
	var keyValues = search.slice(1).split("&");
	keyValues.forEach(function(keyValue) {
		var tempArr = keyValue.split("=");
		var key = tempArr[0];
		// var value = tempArr[1].indexOf("|") > 0 ? tempArr[1].split("|") : tempArr[1];
		var value = tempArr[1];
		obj[key] = value;
	});
	return obj;
}