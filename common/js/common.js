
var nowTime = new Date();//当前时间
var thsiWeekFirstDay='';//第一天
var thisWeekLastDay='';//最后一天
var hanleValue='';
var dayInWeek='';
export default{
	// 根据对象中某一属性进行升序降序排序
	//prop 这里变量要加""
	// rev姓名按字符串编码降序排序
	//调用 compare('name',true)
	compare:function(prop,rev) {
		// 第二个参数没有传递，默认升序排序
		if(rev === undefined) {
			rev = 1;
		}else {
			rev = rev ? 1: -1;
		}
		return function(obj1,obj2) {
			// 方括号也是访问对象属性的一种方式，优点是可以通过变量访问。
			// 常规写法是 var val1 = obj1.prop;var val2 = obj2.prop;,但是这种不支持变量写法，所有这里不适用
			var val1 = obj1[prop],
				val2 = obj2[prop];

			// 若是升序排序，此时rev=1,rev*-1=-1,等价于return val1 < val2 ? -1 : 1,，即val1<val2时，val1放在val2前面，否则放后面
			// 若是降序排序，下面句子等价于return val1 < val2 ? 1 : -1，即val1<val2时，val1放在val2后面，否则放在val2前面
			return val1 < val2 ? rev*(-1) : rev*1;
		}
	},
	//获取当前时间  
	// 调用方法
	// const currentDate = commonJs.getDate({
	// 	format: true
	// })
	getDate:function(type) {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	},
	
	
	//初始话时间
	// 调用方式  commonJs.init(0);//初始化 type=0 代表当前时间 type=-1 上一周，type=1下一周  注：attendance.vue文件有使用
	init: function(type) {
		dayInWeek = nowTime.getDay();
		dayInWeek == 0 && (dayInWeek = 7);
		thsiWeekFirstDay =
		nowTime.getTime() - (dayInWeek - 1) * 86400000;
		thisWeekLastDay =
		nowTime.getTime() + (7 - dayInWeek) * 86400000;
		hanleValue = this.getWeekType(type);
	},
	//时间转为2020-11-09~2020-11-15  显示一周的周期时间
	getWeekType: function(type) {
		type = ~~type;
		var firstDay = thsiWeekFirstDay + type * 7 * 86400000;
		var lastDay = thisWeekLastDay + type * 7 * 86400000;
		return this.getWeekHtml(firstDay, lastDay);
	},
	getWeekHtml: function(f, l) {
		return this.formatDate(f) + "~" + this.formatDate(l);
	},
	//时间转为 2020-05-18
	formatDate: function(time) {
		var newTime = new Date(time);
		var year = newTime.getFullYear();
		var month = newTime.getMonth() + 1;
		var day = newTime.getDate();
		return (
			year +
			"-" +
			(month >= 10 ? month : "0" + month) +
			"-" +
			(day >= 10 ? day : "0" + day)
		);
		//return (month >= 10 ? month : "0" + month) + "." + (day >= 10 ? day : "0" + day);
	},
	//时间转为 2020年05月18日
	formatDateWord: function(time) {
		var newTime = new Date(time);
		var year = newTime.getFullYear();
		var month = newTime.getMonth() + 1;
		var day = newTime.getDate();
		return (
			year +
			"年" +
			(month >= 10 ? month : "0" + month) +
			"月" +
			(day >= 10 ? day : "0" + day) + 
			"日"
			
		);
		//return (month >= 10 ? month : "0" + month) + "." + (day >= 10 ? day : "0" + day);
	},
	// 2020-05-18T14:54:25.89日期转换为周
	formatWeek: function(time){
		 //获取当天是星期几
		 var ji = "一二三四五六日".charAt(new Date(time).getDay());
		 // alert(newDate+" 星期"+ji);
		 var week="星期"+ji
		 return week;
	 },
	 //获取当天时间和当天前n天的函数
	getBeforeDate:function(n){
	    var n = n;
	    var d = new Date();
	    var year = d.getFullYear();
	    var mon=d.getMonth()+1;
	    var day=d.getDate();
	    if(day <= n){
		    if(mon>1) {
			  mon=mon-1;
		   }else{
				year = year-1;
				mon = 12;
			}
		}
		d.setDate(d.getDate()-n);
		year = d.getFullYear();
		mon=d.getMonth()+1;
		day=d.getDate();
		var s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
		return s;
	},
	gethms(){
		const date = new Date();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let second = date.getSeconds();
		hour = hour > 9 ? hour : '0' + hour;;
		minute = minute > 9 ? minute : '0' + minute;
		second = second > 9 ? second : '0' + second;
		return	hour + ":" + minute + ":" + second;
	},
	getNongli(){
		
	}
}