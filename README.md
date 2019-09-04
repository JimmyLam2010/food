## 目录结构
	admin 后台首页
		admin.html
	assets 静态文件 （js,css,fonts,images...
		home
			js
			css
			images
			fonts
		admin
			...
	views // 视图文件
		admin // 后台视图
			public 后台公共文件
				header.html
				footer.html
				sidebar.html
			...
		public // 公共文件
		index.html	//其他分离出去的文件		
		...
	controllers // 控制器文件
		home 
			indexController.js // 首页控制器
		admin 
			adminController.js // 后台控制器
	routers // 路由文件
		homeRouter.js // 前端路由
		adminRouter.js // 后台路由
	home-app.js // 启动文件 
	admin-app.js // 启动文件 
	index.html // 前台首页

## 思路

1. 分离头尾以及其他公共部分
2. 替换css、js、img路径
3. 在index.html引入其他分离出去的文件
4. 依次引入angular核心文件、依赖文件、启动文件、路由文件、控制器文件

### 后台

#### 添加页面
	
	一，前台页面设置
	1. food_add_edit.html 修改好添加页面样式
	2. routers/adminRouter.js 配置好路由和控制器 
	3. controllers/admin/foodController.js 控制器文件里面添加好路由里面设置的对应的控制器。
	打开添加页面查看是否报错。
	4. 前台food_add_edit.html页面设置好ng-model对应的字段名
	二、后台准备接口
	5. 后台api写好接口 
		food.php 添加数据接口 
		foodcate.php 查询分类接口
	三、回到控制器页面，开始做api请求。
	6. 控制器里面使用$http查询分类数据并展示。
	7. 添加功能，设置保存方法。具体查看 $scope.save() save()是使用ng-click事件触发的。
	8. 测试录入数据是否正确。

## 路由名称

### 前台路由名称

#### 列表型 
	news
	meishi
	shop
#### 详情型 
	news.detail
	meishi.detail
	shop.detail
#### 单页型
	pinpai
	about

### 后台路由名称

#### 列表页

	一个数据库表对应一个列表页面
	比如：news数据表
		news 不需要模板
		news.list 状态对应模板 admin-table.html

#### 添加和编辑页

	news.list.add  => admin-form.html
	news.list.edit
