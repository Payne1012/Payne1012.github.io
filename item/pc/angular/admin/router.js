// admin/router.js
'use strict';

app
	.run(
	
	 
		function ($rootScope, $state, $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			$rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
							$rootScope.previousState = from;
							$rootScope.previousStateParams = fromParams;
						});
		}
	)
	.config(
		function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider
				.otherwise('/auth/loading');
			$stateProvider
			$urlRouterProvider
					.otherwise('/app/dashboard');
			$stateProvider
					.state('app', {
							abstract: true,
							url: '/app',
							templateUrl: 'admin/app.html',
					})
					.state('app.dashboard', {
							url: '/dashboard',
							templateUrl: 'admin/dashboard.html',
								ncyBreadcrumb: {
								label: '首页'
							},
							
					})
			//auth 模块路由
				.state('auth', {
					abstract: true,
					url: '/auth',
					template: '<div ui-view class="fade-in"></div>',
					resolve: {
						deps: ['$ocLazyLoad',
							function ($ocLazyLoad) {
								return $ocLazyLoad.load('admin/auth/ctrl.js');
							}
						]
					}
				})
				.state('auth.loading', {
					url: '/loading',
					templateUrl: 'admin/auth/loading.html',
				})
				.state('auth.login', {
					url: '/login',
					templateUrl: 'admin/auth/login.html',
				})
				//news 模块路由
				.state('app.news', {
					abstract: true,
					url: '/news',
					template: '<div ui-view class="fade-in"></div>',
					resolve: {
						deps: ['$ocLazyLoad',
							function ($ocLazyLoad) {
								return $ocLazyLoad.load('admin/news/ctrl.js');
							}
						]
					}
				})
				.state('app.news.list', {
					url: '/list?page&search',
					templateUrl: 'admin/news/list.html ',
					ncyBreadcrumb: {
										parent:'app.dashboard',
										label: '新闻列表',
									},
				})
				.state('app.news.detail', {
					url: '/detail/{id}',
					templateUrl: 'admin/news/detail.html',
					ncyBreadcrumb: {
										parent:'app.news.list',
										label: '编辑',
									},
				})
				.state('app.news.create', {
					url: '/create',
					templateUrl: 'admin/news/detail.html',
					ncyBreadcrumb: {
										parent:'app.news.list',
										label: '新增',
									},
				})
				
				//comment 模块路由
			 .state('app.comment', {
					abstract: true,
					url: '/comment',
					template: '<div ui-view class="fade-in"></div>',
					resolve: {
							deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
									return $ocLazyLoad.load('admin/comment/ctrl.js');
							}]
					}
				})         
				.state('app.comment.list', {
						url: '/list?page&search',
						templateUrl: 'admin/comment/list.html',
						ncyBreadcrumb: {
										parent:'app.dashboard',
										label: '评论列表',
									},
				})
				.state('app.comment.detail', {
						url: '/detail/{id}',
						templateUrl: 'admin/comment/detail.html',
						ncyBreadcrumb: {
										parent:'app.comment.list',
										label: '编辑',
									},
				})
				.state('app.comment.create', {
						url: '/create',
						templateUrl: 'admin/comment/detail.html',
						ncyBreadcrumb: {
											parent:'app.comment.list',
											label: '新增',
										},
				})
				//colligate 模块路由
				.state('app.colligate', {
						abstract: true,
						url: '/colligate',
						template: '<div ui-view class="fade-in"></div>',
				})
				.state('app.colligate.index', {
						url: '/index',
						templateUrl: 'admin/colligate/index.html',
						ncyBreadcrumb: {
										parent:'app.dashboard',
										label: '综合管理',
									},
				})
				//live 模块路由
				.state('app.live', {
					abstract: true,
					url: '/live',
					template: '<div ui-view class="fade-in"></div>',
					resolve: {
							deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
									return $ocLazyLoad.load('admin/live/ctrl.js');
							}]
					}
				})         
				.state('app.live.list', {
						url: '/list?page&search',
						templateUrl: 'admin/live/list.html',
						ncyBreadcrumb: {
										parent:'app.dashboard',
										label: '直播间列表',
									},
				})
				.state('app.live.detail', {
						url: '/detail/{id}',
						templateUrl: 'admin/live/detail.html',
						ncyBreadcrumb: {
										parent:'app.live.list',
										label: '编辑',
									},
				})
				.state('app.live.create', {
						url: '/create',
						templateUrl: 'admin/live/detail.html',
						ncyBreadcrumb: {
											parent:'app.live.list',
											label: '新增',
										},
				})
				//video 模块路由
				.state('app.video', {
					abstract: true,
					url: '/video',
					template: '<div ui-view class="fade-in"></div>',
					resolve: {
							deps: ['$ocLazyLoad',
								function( $ocLazyLoad ){
									return $ocLazyLoad.load('admin/video/ctrl.js');
							}]
					}
				})         
				.state('app.video.list', {
						url: '/list?page&search',
						templateUrl: 'admin/video/list.html',
						ncyBreadcrumb: {
										parent:'app.dashboard',
										label: '视频列表',
									},
				})
				.state('app.video.detail', {
						url: '/detail/{id}',
						templateUrl: 'admin/video/detail.html',
						ncyBreadcrumb: {
										parent:'app.video.list',
										label: '编辑',
									},
				})
				.state('app.video.create', {
						url: '/create',
						templateUrl: 'admin/video/detail.html',
						ncyBreadcrumb: {
											parent:'app.video.list',
											label: '新增',
										},
				})	
			//brand 模块路由
			.state('app.brand', {
				abstract: true,
				url: '/brand',
				template: '<div ui-view class="fade-in"></div>',
				resolve: {
						deps: ['$ocLazyLoad',
							function( $ocLazyLoad ){
								return $ocLazyLoad.load('admin/brand/ctrl.js');
						}]
				}
			})         
			.state('app.brand.list', {
					url: '/list?page&search',
					templateUrl: 'admin/brand/list.html',
					ncyBreadcrumb: {
									parent:'app.dashboard',
									label: '品牌列表',
								},
			})
			.state('app.brand.detail', {
					url: '/detail/{id}',
					templateUrl: 'admin/brand/detail.html',
					ncyBreadcrumb: {
									parent:'app.brand.list',
									label: '编辑',
								},
			})
			.state('app.brand.create', {
					url: '/create',
					templateUrl: 'admin/brand/detail.html',
					ncyBreadcrumb: {
										parent:'app.brand.list',
										label: '新增',
									},
			})
		}
	);
