app.factory('Form', function(){
    return{
        checkedAction: function(scope, ids){
            scope.is_checked = false;
            scope.selectAll = function(){
                scope.is_checked = true;
            }

            scope.cancelAll = function(){
                scope.is_checked = false;
            }

            scope.reverse = function(){
                $(ids).prop('checked', function(k, v){
                    return !v;
                })
            }
        },
        checkedValToJson: function(cl){
			// 数组好操作
			var idsArr = []
			$.each($(cl), function(i , v){ 
				if($(v).prop('checked') ) {
					idsArr.push($(v).val()) 
				}
			})
			// 为了最终格式化为json字符串，方便地址栏上传递数据
			// 这里将数组装入对象中
			idsStr = idsArr.join(',')
			var idsObj = { ids: idsStr} // {"ids":"5,4,3,2,1"}
			// idsJson = angular.toJson(idsObj)
			// 转为json传参请求后台API
			idsJson = JSON.stringify(idsObj)
			console.log(idsJson)
			return idsJson;
		}
    }
})