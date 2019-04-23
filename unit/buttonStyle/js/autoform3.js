(function() {

	// ajax
	function formatQuery(data) {
		var arr = [];
		if (data) {
			for (var key in data) {
				var value = data[key];
				if (value !== undefined && value !== null) {
					arr.push(key + '=' + encodeURIComponent(data[key]));
				}
			}
		}
		return arr.join('&');
	}
	function ajax(args) {
		var method = 'get';
		if (args.method) {
			method = args.method.toLowerCase();
		}
		if (args.data && method == 'get') {
			if (args.url.indexOf('?') < 0) {
				args.url = args.url + '?' + formatQuery(args.data);
			} else {
				args.url = args.url + '&' + formatQuery(args.data);
			}
		}
		var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		xhr.open(method, args.url);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					if (args.success) {
						if (args.dataType == 'json') {
							args.success(AF.parseJson(xhr.responseText));
						} else {
							args.success(xhr.responseText);
						}
					}
				} else if (args.error) {
					args.error(xhr.status, xhr.statusText);
				}
			}
		}
		if (args.cache === false) {
			xhr.setRequestHeader('If-Modified-Since', '0');
		}
		if (method == 'post') {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
			xhr.send(formatQuery(args.data));
		} else {
			xhr.send(null);
		}
	}
	// 弹层
	var POP = {
		timer: 0,
		container: null,
		show: function (msg) {
			if (this.timer != 0) {
				clearTimeout(this.timer);
				this.timer = 0;
			}
			if (this.container == null) {
				this.initialise();
			}
			this.container.innerHTML = '<span class="popup_msg" style="min-width: 150px; display:inline-block; font-size: 15px; font-weight: bold; color:#ffffff; background:#000000; filter:alpha(opacity=70); opacity:0.7; border-radius:5px; padding:18px 20px;">' + msg + '</span>';
			this.container.style.display = 'block';
			this.timer = setTimeout(function () {
				POP.container.style.display = 'none';
			}, 2000);
		},
		initialise: function () {
			var container = document.createElement('div');
			container.style.position = 'fixed';
			container.style.width = '100%';
			container.style.top = '45%';
			container.style.textAlign = 'center';
			container.style.zIndex = 1999;
			container.style.display = 'none';
			this.container = container;
			document.body.appendChild(container);
		}
	}
	// 验证器
	var validate = {
		noempty: function(value) {
			return value != '';
		},
		nozero: function(value) {
			return value != '0';
		},
		name: function(value) {
			return /^[a-zA-Z0-9_\u4E00-\u9FA5]{0,30}$/.test(value);
		},
		zhname: function(value) {
			return /^[\u4E00-\u9FA5]{1,4}$/.test(value);
		},
		mobile: function(value) {
			if (value == '') {
				return true;
			}
			return /^1[3456789]\d{9}$/.test(value);
		},
		email: function(value) {
			if (value == '') {
				return true;
			}
			return /^[a-zA-Z0-9]([\._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9](-?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4}){1,2}$/.test(value);
		},
		integer: function(value) {
			return /^\d+$/.test(value);
		},
		number: function (value) {
			return /^\d+(\.\d+)?$/.test(value);
		}
	}
	// 默认验证
	var defaultValid = {
		name: function() {
			return 'noempty|请输入姓名&name|输入的姓名格式不正确';
		},
		mobile: function() {
			return 'noempty|请输入手机号&mobile|输入的手机号格式不正确';
		},
		sex: function() {
			return 'noempty|请选择性别';
		},
		email: function() {
			return 'noempty|请输入电子邮箱&email|输入的邮箱格式不正确';
		},
		province: function() {
			return 'noempty|请选择省份&nozero|请选择省份';
		},
		provinceid: function() {
			return 'noempty|请选择省份&nozero|请选择省份';
		},
		city: function() {
			return 'noempty|请选择城市&nozero|请选择城市';
		},
		cityid: function() {
			return 'noempty|请选择城市&nozero|请选择城市';
		},
		dealer: function() {
			return 'noempty|请选择经销商&nozero|请选择经销商';
		},
		dealerid: function() {
			return 'noempty|请选择经销商&nozero|请选择经销商';
		},
		intentcar: function() {
			return 'noempty|请选择意向车型&nozero|请选择意向车型';
		},
		buytime: function() {
			return 'noempty|请选择购车时间&nozero|请选择购车时间';
		},
		buybudget: function() {
			return 'noempty|请选择购车时间&nozero|请选择购车预算';
		},
		isdrive: function() {
			return 'noempty|请选择是否试驾';
		}
	}
	// 绑定元素
	var bindXElements = function(XElements, nodes) {
		for(var i = 0, len = nodes.length; i < len; i++) {
			var node = nodes[i];
			if (node.nodeType == 1) {
				var nodeName = node.nodeName.toLowerCase();
				if (nodeName == 'input' || nodeName == 'select' || nodeName == 'textarea') {
					if (node.name == '') {
						node.name = '_xx' + i;
					}
					var name = node.name.toLowerCase();
					var xe = XElements[name];
					if (xe) {
						xe.elements.push(node);
					} else {
						XElements[name] = new XElement(node);
					}
				} else if (node.hasChildNodes()) {
					bindXElements(XElements, node.childNodes);
				}
			}
		}
	}
	// 元素
	var XElement = function(node) {
		this.name = node.name;
		this.elements = [node]; // 初始元素列表
		this.valids = []; // 验证器 [{ fn: '', msg: '' }]
		this.disabled = false; // 是否失效
		var str = node.getAttribute('valid');
		if (str === 'def') {
			str = defaultValid[this.name.toLowerCase()]();
		}
		if (str) {
			var strArr = str.split('&');
			for(var i = 0, len = strArr.length; i < len; i++) {
				var item = strArr[i];
				if (item) {
					var arr = item.split('|');
					this.valids.push({ fn: validate[arr[0].toLowerCase()], msg: arr[1] });
				}
			}
		}
	}
	// 表单
	var XForm = function(form) {
		this.initialize(form);
	}
	// 属性
	var fp = XForm.prototype;
	fp.form = null;
	fp.action = null;
	fp.XElements = null;
	fp.isJsonp = false;
	fp.onsubmit = null;
	fp.onerror = null;
	fp.onpass = null;
	fp.oncall = null;
	// 构造
	fp.initialize = function(form) {
		var self = this;
		var url = form.action;
		var index = url.indexOf('$');
		if (index >= 0) {
			self.isJsonp = true;
			url = AF.api.apiPath + 'register.jsp?topicId=' + url.substring(index + 1);
		}
		self.form = form;
		self.action = url;
		self.XElements = {};
		form.onsubmit = function () {
			self.submit();
			return false;
		}
		bindXElements(self.XElements, form.childNodes);
	}
	// 关闭验证
	fp.off = function (arr) {
		var XElements = this.XElements;
		for (var i = 0, len = arr.length; i < len; i++) {
			var xe = XElements[arr[i].toLowerCase()];
			if (xe) {
				xe.disabled = true;
			}
		}
	}
	// 绑定验证
	fp.bindValid = function (name, fn) {
		var xe = this.XElements[name.toLowerCase()];
		if (xe) {
			xe.valids.push({ fn: fn, msg: '' });
		}
	}
	// 重置
	fp.reset = function () {
		this.form.reset();
	}
	// 提交
	fp.submit = function() {
		if (this.onsubmit) {
			if(!this.onsubmit()) {
				return;
			}
		}
		var err = []; // 错误列表 [{ name: '', msg: '' }]
		var data = {};
		var XElements = this.XElements;
		for(var name in XElements) {
			var xe = XElements[name];
			var elements = xe.elements;
			var valids = xe.valids;
			var value = null;
			for(var i = 0, len = elements.length; i < len; i++) {
				var element = elements[i];
				var elementType = element.nodeName.toLowerCase();
				if (elementType == 'input') {
					elementType = element.type.toLowerCase();
				}
				if (elementType == 'radio' || elementType == 'checkbox') {
					if (!element.checked) {
						continue;
					}
				}
				if (value === null) {
					value = AF.trim(element.value);
				} else {
					value = value + ',' + AF.trim(element.value);
				}
			}
			if (value === null) {
				value = '';
			}
			if (xe.disabled) {
				xe.disabled = false;
			} else {
				for(var i = 0, len = valids.length; i < len; i++) {
					var valid = valids[i];
					if (!valid.fn(value)) {
						err.push({ name: xe.name, msg: valid.msg });
						break;
					}
				}
			}
			data[xe.name] = value;
		}
		if (err.length > 0) {
			if (this.onerror) {
				this.onerror(err);
			} else {
				AF.alert(err[0].msg);
			}
			return;
		}
		// 额外参数
		data.pvareaId = 0;
		data.platform = 0;
		var pvareaId = AF.query('pvareaId');
		if (pvareaId) {
			data.pvareaId = pvareaId;
		}
		var url = window.location.href;
		if (url.indexOf('topic.m.autohome.com.cn') >= 0 || url.indexOf('m.mall.autohome.com.cn') >= 0) {
			if (AF.getCookie('app_platform')) {
				data.platform = 2;
			} else {
				data.platform = 1;
			}
		}
		if (window.pageLoadId) {
			data.pageLoadId = window.pageLoadId;
		}
		data.typeId = AF.getCookie('cookieCityId') + '|' + AF.getCookie('app_key') + '|' + AF.getCookie('app_platform') + '|' + AF.getCookie('app_deviceid');
		var sessionId = AF.getCookie('sessionId');
		if (sessionId) {
			data.sessionId = sessionId;
		}
		var pvidlist = AF.getCookie('pvidlist');
		if (pvidlist) {
			data.pvId = pvidlist.split(',')[0];
		}
		if (document.referrer) {
			data.referrer = document.referrer;
		}
		// 通过验证
		if (this.onpass) {
			if(!this.onpass(data)) {
				return;
			}
		}
		// 提交数据
		AF.api.register(this, data);
	}
	// http任务
	var HttpTask = function (url, callback) {
		this.url = url;
		this.index = 0;
		this.submitCount = 0;
		this.callback = callback;
		this.start = function () {
			this.submitCount++;
			if (this.submitCount > 1) {
				if (this.submitCount > 4) {
					AF.alert('请勿连续操作...');
				}
				return false;
			}
			return true;
		}
	}
	// 暴露
	window.AF = {
		form: {},
		forms: [],
		ajax: ajax,
		valid: validate,
		$: function (target) {
			if (typeof(target) == 'string') {
				return document.getElementById(target);
			}
			return target;
		},
		$dtext: function(id) {
			var val = '';
			var el = this.$(id);
			if (el) {
				val = el.options[el.selectedIndex].text;
			}
			return val;
		},
		trim: function (str) {
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},
		query: function (name, defValue, decodingFn) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg) || window.location.hash.substr(1).match(reg);
			if (r != null) {
				if (decodingFn) {
					return decodingFn(r[2]);
				}
				return unescape(r[2]);
			}
			return defValue;
		},
		parseJson: function (str) {
			return window.JSON ? JSON.parse(str) : new Function('return ' + str)();
		},
		alert: function (msg) {
			var url = window.location.href;
			if (url.indexOf('topic.m.autohome.com.cn') >= 0 || url.indexOf('m.mall.autohome.com.cn') >= 0) {
				POP.show(msg);
			} else {
				alert(msg);
			}
		},
		loadScript: function (url) {
			var s = document.createElement('script');
			s.src = url;
			document.body.appendChild(s);
		},
		getCookie: function (name) {
			var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)", "i");
			var r = document.cookie.match(reg);
			if (r != null) {
				return decodeURIComponent(r[2]);
			}
			return null;
		},
		initialize: function () {
			var formArray = document.getElementsByName('autoform');
			for (var i = 0, len = formArray.length; i < len; i++) {
				var xf = new XForm(formArray[i]);
				if (xf.form.id) {
					this.form[xf.form.id] = xf;
				}
				this.forms.push(xf);
			}
		},
		api: {
			topicId: 0,
			apiPath: 'https://topic.autohome.com.cn/new/service/',
			httpTasks: [],
			httpTaskCallbacks: {},
			getHttpTask: function (url, callback) {
				var httpTask = null;
				var arr = this.httpTasks;
				for (var i = arr.length - 1; i >= 0; i--) {
					httpTask = arr[i];
					if (httpTask.url == url) {
						httpTask.callback = callback;
						return httpTask;
					}
				}
				httpTask = new HttpTask(url, callback);
				httpTask.index = arr.push(httpTask);
				this.httpTaskCallbacks['callback' + httpTask.index] = function (re) {
					httpTask.submitCount = 0;
					if (httpTask.callback) {
						httpTask.callback(re);
					}
				}
				return httpTask;
			},
			jsonp: function(url, callback) {
				var httpTask = this.getHttpTask(url, callback);
				if (httpTask.start()) {
					if (url.indexOf('?') >= 0) {
						AF.loadScript(url + '&callback=AF.api.httpTaskCallbacks.callback' + httpTask.index + '&_t=' + new Date().getTime());
					} else {
						AF.loadScript(url + '?callback=AF.api.httpTaskCallbacks.callback' + httpTask.index + '&_t=' + new Date().getTime());
					}
				}
			},
			getlogin: function(fn) {
				this.jsonp(this.apiPath + 'getlogin.jsp?topicId=' + this.topicId, fn);
			},
			getuserinfo: function(fn) {
				this.jsonp(this.apiPath + 'getuserinfo.jsp', fn);
			},
			getlotterycount: function(fn) {
				this.jsonp(this.apiPath + 'getlotterycount.jsp?topicId=' + this.topicId, fn);
			},
			getsmscode: function(mobile, fn) {
				if (mobile == '') {
					fn({ status: 0, msg: "请输入手机号" });
				} else if (!AF.valid.mobile(mobile)) {
					fn({ status: 0, msg: "输入的手机号格式不正确" });
				} else {
					this.jsonp(this.apiPath + 'getsmscode.jsp?topicId=' + this.topicId + '&mobile=' + mobile, fn);
				}
			},
			login: function(name, mobile, fn) {
				if (name == '' || mobile == '') {
					fn({ status: 0, userId: 0, name: "", msg: "姓名或手机号不能为空" });
				} else if (!AF.valid.mobile(mobile)) {
					fn({ status: 0, userId: 0, name: "", msg: "输入的手机号格式不正确" });
				} else {
					this.jsonp(this.apiPath + 'login.jsp?topicId=' + this.topicId + '&name=' + encodeURIComponent(name) + '&mobile=' + mobile, fn);
				}
			},
			logout: function(fn) {
				this.jsonp(this.apiPath + 'logout.jsp?topicId=' + this.topicId, fn);
			},
			lottery: function(fn) {
				this.jsonp(this.apiPath + 'lottery.jsp?topicId=' + this.topicId, fn);
			},
			register: function(xform, data) {
				var httpTask = this.getHttpTask(xform.action, function (re) {
					if (re.status == 1) {
						xform.reset();
						try {
							// 日志1
							if ($$adConversionMethods) {
								$$adConversionMethods.sendHandler();
							}
							// 日志2
							var href = window.location.href,
							ref = document.referrer,
							track = new Image();
							track.src = 'https://l.autohome.com.cn/adfront/lands?u=' + encodeURIComponent(href) + '&r=' + encodeURIComponent(ref);
						} catch (e) {

						}
					}
					if (xform.oncall) {
						xform.oncall(re, data);
					} else if (re.status == 1) {
						AF.alert('提交成功，感谢您的参与');
					} else {
						AF.alert(re.msg);
					}
				});
				if (httpTask.start()) {
					if (xform.isJsonp) {
						data.callback = 'AF.api.httpTaskCallbacks.callback' + httpTask.index;
						data._t = new Date().getTime();
						if (xform.action.indexOf('?') >= 0) {
							AF.loadScript(xform.action + '&' + formatQuery(data));
						} else {
							AF.loadScript(xform.action + '?' + formatQuery(data));
						}
					} else {
						ajax({
							url: xform.action,
							method: 'POST',
							data: data,
							dataType: 'json',
							cache: false,
							success: function (re) {
								AF.api.httpTaskCallbacks['callback' + httpTask.index](re);
							}
						});
					}
				}
			} // register method
		} // api
	} // AF

	AF.initialize();
	AF.loadScript('https://x.autoimg.cn/business/platform-ct.js');

})();