app.config(function($httpProvider, $stateProvider, $urlRouterProvider){

	// post 请求参数转为字符串
	$httpProvider.defaults.transformRequest = function(obj) {
			// console.log(obj)
			var arr = []
			for(var i in obj) {
				arr.push(i + "=" +obj[i])
			}
			// console.log(arr.join("&"))
			return arr.join("&") // id=1&fromid=2
	}
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

	$urlRouterProvider.when('', '/admin')
	$stateProvider
	.state({
		name: 'admin',
		url: '/admin',
		views: {
			'header': {
				templateUrl: '../views/admin/public/header.html',
			},
			'sidebar': {
				templateUrl: '../views/admin/public/sidebar.html',
				controller: 'adminCtrl'
			},
			'content': {
				templateUrl: '../views/admin/admin-index.html',
				controller: 'adminCtrl'
			},
			'footer': {
				templateUrl: '../views/admin/public/footer.html'
			}
		}
	})
	.state({
		name: 'admin.food',
		url: '/food',
		views: { 
			'content@': {
				templateUrl: '../views/admin/food.html',
				controller: 'foodCtrl'
			} 
		}
	})
	.state({
		name: 'admin.food.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/food_add_edit.html',
				controller: 'foodAddCtrl'
			}
		}
	})
	.state({
		name: 'admin.food.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/food_add_edit.html',
				controller: 'foodAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.food_cate',
		url: '/foodcate',
		views: { 
			'content@': {
				templateUrl: '../views/admin/food_cate.html',
				controller: 'foodCateCtrl'
			} 
		}
	})
	.state({
		name: 'admin.food_cate.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/foodcate_add_edit.html',
				controller: 'foodCateAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.food_cate.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/foodcate_add_edit.html',
				controller: 'foodCateAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.news',
		url: '/news',
		views: { 
			'content@': {
				templateUrl: '../views/admin/news.html',
				controller: 'newsCtrl'
			} 
		}
	})
	.state({
		name: 'admin.news.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/news_add_edit.html',
				controller: 'newsAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.news.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/news_add_edit.html',
				controller: 'newsAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.shop',
		url: '/shop',
		views: { 
			'content@': {
				templateUrl: '../views/admin/shop.html',
				controller: 'shopCtrl'
			} 
		}
	})
	.state({
		name: 'admin.shop.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/shop_add_edit.html',
				controller: 'shopAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.shop.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/shop_add_edit.html',
				controller: 'shopAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.region',
		url: '/region',
		views: { 
			'content@': {
				templateUrl: '../views/admin/region.html',
				controller: 'regionCtrl'
			} 
		}
	})
	.state({
		name: 'admin.region.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/region_add_edit.html',
				controller: 'regionAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.region.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/region_add_edit.html',
				controller: 'regionAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.company',
		url: '/company',
		views: { 
			'content@': {
				templateUrl: '../views/admin/company.html',
				controller: 'companyCtrl'
			} 
		}
	})
	.state({
		name: 'admin.company.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/company_add_edit.html',
				controller: 'companyAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.company.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/company_add_edit.html',
				controller: 'companyAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.friendly_link',
		url: '/friendly_link',
		views: { 
			'content@': {
				templateUrl: '../views/admin/friendly_link.html',
				controller: 'friendlyLinkCtrl'
			} 
		}
	})
	.state({
		name: 'admin.friendly_link.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/friendly_link_add_edit.html',
				controller: 'friendlyLinkAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.friendly_link.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/friendly_link_add_edit.html',
				controller: 'friendlyLinkAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.setting',
		url: '/setting',
		views: { 
			'content@': {
				templateUrl: '../views/admin/setting.html',
				controller: 'settingCtrl'
			} 
		}
	})
	.state({
		name: 'admin.setting.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/setting_add_edit.html',
				controller: 'settingAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.setting.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/setting_add_edit.html',
				controller: 'settingAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.banner',
		url: '/banner',
		views: { 
			'content@': {
				templateUrl: '../views/admin/banner.html',
				controller: 'bannerCtrl'
			} 
		}
	})
	.state({
		name: 'admin.banner.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/banner_add_edit.html',
				controller: 'bannerAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.banner.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/banner_add_edit.html',
				controller: 'bannerAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.adminList',
		url: '/adminList',
		views: { 
			'content@': {
				templateUrl: '../views/admin/admin.html',
				controller: 'adminListCtrl'
			} 
		}
	})
	.state({
		name: 'admin.adminList.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/admin_add_edit.html',
				controller: 'adminListAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.adminList.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/admin_add_edit.html',
				controller: 'adminListAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.nav',
		url: '/nav',
		views: { 
			'content@': {
				templateUrl: '../views/admin/nav.html',
				controller: 'navCtrl'
			} 
		}
	})
	.state({
		name: 'admin.nav.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/nav_add_edit.html',
				controller: 'navAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.nav.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/nav_add_edit.html',
				controller: 'navAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.page',
		url: '/page',
		views: { 
			'content@': {
				templateUrl: '../views/admin/page.html',
				controller: 'pageCtrl'
			} 
		}
	})
	.state({
		name: 'admin.page.add',
		url: '/add',
		views: { 
			'content@': {
				templateUrl: '../views/admin/page_add_edit.html',
				controller: 'pageAddCtrl'
			} 
		}
	})
	.state({
		name: 'admin.page.edit',
		url: '/edit/:id',
		views: { 
			'content@': {
				templateUrl: '../views/admin/page_add_edit.html',
				controller: 'pageAddCtrl'
			} 
		}
	})
}).run()