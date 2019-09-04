//导航当前项切换	
$(".nav-item").click(function(){
    $(this).parent("li").siblings().children().removeClass("nav-active");		
    //点击对象的父级（li）的兄弟级（li）的子集（a）移除类
    $(this).addClass("nav-active");												
    //给点击对象添加类
});

//美食系列当前项切换
$(".table-item").click(function () {
    $(this).siblings().removeClass("table-active");
    $(this).addClass("table-active");
});
//美食系列table切换
var oSpan = document.getElementById("tab-span");
var spans = oSpan.querySelectorAll("span");
var oDiv = document.getElementById("table-div");
var divs = oDiv.querySelectorAll("div");
var last = spans[0];
for (var i = 0; i < spans.length; i++) {
    spans[i].index = i;  //给每一个按钮添加一个自定义属性，存储的是他们对应的索引值；
    spans[i].onclick = function () {
        divs[last.index].style.display = "none"; //上一个对应的div，让他隐藏
        divs[this.index].style.display = "block"; //当前点击按钮对应的div显示			
        last = this; 	//把上一次点击的对象更新成当前点击的对象
    };
};