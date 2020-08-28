var commonService = require('../../services/common.js');
var MusicService = require('../../services/music');
var util = require('../../utils/util.js')
var app = getApp();

Page({
	data: {
		songList: [],
		imgUrl: '',
		id: 0,
		listName: '',
		topinfo: {},
		update_time: '',
		listBgColor: '',
		mainView: 1,
		playType: 0,
		listHeight: 0,
		listbg: 'https://wx1.sbimg.cn/2020/08/23/3I4xK.jpg',
		startX: 0, //开始坐标
		startY: 0,
		page: 1


	},
	onLoad: function(options) {
		// 页面初始化 options为页面跳转所带来的参数
		var self = this;
		var id = app.globalData.topListId;
		this.setData({
			id: id
		});
		MusicService.getTopListInfo(id, this.getTopListCallback);
		var value = wx.getStorageSync('userId')
		if (!value) {
			wx.navigateTo({
				url: '../login/login'
			});
		}
	},
	getTopListCallback: function(data) {
		console.log(data);
		var imgUrl = data.topinfo.pic_album;
		this.setData({
			topinfo: data.topinfo,
			update_time: data.update_time
		});
		this.setSongList(data.songlist);
		this.setListBgColor(data.color);
		this.onQueryHeight('.song-list-warp');
	},
	setSongList: function(songs) {
		var list = [];
		for (var i = 0; i < songs.length; i++) {
			var item = songs[i];
			var song = {};
			var album = {};

			album.mid = item.data.albummid
			album.id = item.data.albumid
			album.name = item.data.albumname;
			album.desc = item.data.albumdesc

			song.id = item.data.songid;
			song.mid = item.data.songmid;
			song.name = item.data.songname;
			song.title = item.data.songorig;
			song.subTitle = '';
			song.singer = item.data.singer;
			song.album = album;
			song.time_public = item.time_public;
			song.url = 'http://ws.stream.qqmusic.qq.com/C100' + song.mid + '.m4a?fromtag=38';
			song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + album.mid + '.jpg?max_age=2592000'
			list.push(song);
		}

		this.setData({
			songList: list
		})

	},
	mainTopTap: function(e) {
		var list = this.data.songList;
		app.setGlobalData({
			playList: list,
			playIndex: 0
		});
		wx.navigateTo({
			url: '../play/play'
		});
	},
	musicItemTap: function(e) {
		var dataSet = e.currentTarget.dataset;
		var index = dataSet.index;
		var list = this.data.songList;
		app.setGlobalData({
			playList: list,
			playIndex: index
		});
		wx.navigateTo({
			url: '../play/play'
		});
	},
	setListBgColor: function(color) {
		var a = util.dealColor(color);

		this.setData({
			listBgColor: a
		});
	},
	swichNav: function(e) {
		var _dataSet = e.currentTarget.dataset;
		this.setData({
			mainView: _dataSet.view
		});
	},
	changePlayType: function(e) { //循环类型按钮
		var dataSet = e.currentTarget.dataset;
		if (dataSet.type == 0) { //随机
			wx.showToast({
				title: '随机播放',
				icon: 'none',
				duration: 1500
			})
			this.setData({
				playType: 2
			});
		}
		if (dataSet.type == 2) { //列表
			wx.showToast({
				title: '列表循环',
				icon: 'none',
				duration: 1500
			})
			this.setData({
				playType: 0
			});
		}

	},
	playAll: function() {
		wx.showToast({
			title: '播放全部',
			icon: 'none',
			duration: 1500
		})
	},
	onQueryHeight: function(classname) {
		var query = wx.createSelectorQuery();
		var that = this
		query.select(classname).boundingClientRect()
		query.exec((res) => {
			that.setData({
				listHeight: res[0].height
			});
		})
	},
	touchE: function(e) {
		// console.log(e);
		var that = this
		if (e.changedTouches.length == 1) {
			//手指移动结束后触摸点位置的X坐标
			var endX = e.changedTouches[0].clientX;
			//触摸开始与结束，手指移动的距离
			var disX = that.data.startX - endX;
			var delBtnWidth = that.data.delBtnWidth;
			//如果距离小于删除按钮的1/2，不显示删除按钮
			var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";

			//获取手指触摸的是哪一项
			var index = e.currentTarget.dataset.index;
			var songList = that.data.songList;
			songList[index].txtStyle = txtStyle;
			//更新列表的状态
			that.setData({
				songList: songList
			});
		}
	},
	//手指触摸动作开始 记录起点X坐标
	touchstart: function(e) {
		//开始触摸时 重置所有删除
		this.data.songList.forEach(function(v, i) {
			if (v.isTouchMove) //只操作为true的
				v.isTouchMove = false;
		})
		this.setData({
			startX: e.changedTouches[0].clientX,
			startY: e.changedTouches[0].clientY,
			songList: this.data.songList
		})
	},
	//滑动事件处理
	touchmove: function(e) {
		var that = this,
			index = e.currentTarget.dataset.index, //当前索引
			startX = that.data.startX, //开始X坐标
			startY = that.data.startY, //开始Y坐标
			touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
			touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
			//获取滑动角度
			angle = that.angle({
				X: startX,
				Y: startY
			}, {
				X: touchMoveX,
				Y: touchMoveY
			});
		that.data.songList.forEach(function(v, i) {
			v.isTouchMove = false
			//滑动超过30度角 return
			if (Math.abs(angle) > 30) return;
			if (i == index) {
				if (touchMoveX > startX) //右滑
					v.isTouchMove = false
				else //左滑
					v.isTouchMove = true
			}
		})
		//更新数据
		that.setData({
			songList: that.data.songList
		})
	},
	/**
	 * 计算滑动角度
	 * @param {Object} start 起点坐标
	 * @param {Object} end 终点坐标
	 */
	angle: function(start, end) {
		var _X = end.X - start.X,
			_Y = end.Y - start.Y
		//返回角度 /Math.atan()返回数字的反正切值
		return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
	},
	del: function() {
		wx.showToast({
			title: '删除成功',
			icon: 'none',
			duration: 1500
		})
	}
})
