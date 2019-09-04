app.config(function($stateProvider, $urlRouterProvider){ // 配置服务
	// $urlRouterProvider.otherwise('') // 默认页面
	$urlRouterProvider.when('', '/index') // 默认页面
	$stateProvider // 设置路由
	.state({ // 编写路由状态
		name: 'index',
		url:'/index',
		views: {
			"nav":{
				templateUrl: "views/public/nav.html",
				controller: 'navCtrl'
			},
			"banner":{
				templateUrl: "views/public/banner.html",
				controller: 'bannerCtrl'
			},
			"content":{
				templateUrl: "views/index.html",
				controller: 'indexCtrl'
			},
			"footer":{
				templateUrl: "views/public/footer.html",
				controller: 'footerCtrl'
			},
		}
	})
	.state({
		name: 'index.news', // 状态嵌套 又继承
		url:'/news',
		views: {
			"content@":{
				templateUrl: "views/news.html"
			}
		}
	})
	.state({
		name: 'index.news.detail',
		url:'/detail/',
		views: { 
			"content@":{
				templateUrl: "views/news-con.html"
			} 
		}
	})
	.state({
		name: 'index.pinpai', // 状态嵌套 又继承
		url:'/pinpai',
		views: {
			"content@":{
				templateUrl: "views/pinpai.html"
			}
		}
	})
	.state({
		name: 'index.meishi', // 状态嵌套 又继承
		url:'/meishi',
		views: {
			"content@":{
				templateUrl: "views/meishi.html"
			}
		}
	})
	.state({
		name: 'index.meishi.detail',
		url:'/detail/',
		views: { 
			"content@":{
				templateUrl: "views/meishi-con.html"
			} 
		}
	})
	.state({
		name: 'index.about-us', // 状态嵌套 又继承
		url:'/about-us',
		views: {
			"content@":{
				templateUrl: "views/about-us.html"
			}
		}
	})
	.state({
		name: 'index.shop', // 状态嵌套 又继承
		url:'/shop',
		views: {
			"content@":{
				templateUrl: "views/shop.html"
			}
		}
	})
	.state({
		name: 'index.shop.detail',
		url:'/detail/',
		views: { 
			"content@":{
				templateUrl: "views/shop-con.html"
			} 
		}
	})

}).run()