/* //获取公共APi地址
var commonIP=uni.getStorageSync('commonIP');
if(commonIP==''){
	commonIP='http://47.103.110.240:6299'
}else{
	commonIP='http://47.103.110.240:6299'
}
console.log(commonIP) */
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: "http://47.103.110.240:6299",
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json'
		},
	});
	// 响应拦截，如配置，每次请求结束都会执行本方法
	// Vue.prototype.$u.http.interceptor.response = (res) => {
	// 	if(res.code == 200) {
	// 		// res为服务端返回值，可能有code，result等字段
	// 		// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
	// 		// 如果配置了originalData为true，请留意这里的返回值
	// 		return res.result;
	// 	} else if(res.code == 201) {
	// 		// 假设201为token失效，这里跳转登录
	// 		vm.$u.toast('状态：201');
	// 		setTimeout(() => {
	// 			// 此为uView的方法，详见路由相关文档
	// 			console.log(res)
	// 		}, 1500)
	// 		return false;
	// 	} else {
	// 		console.log(res)
	// 		// 如果返回false，则会调用Promise的reject回调，
	// 		// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
	// 		return false;
	// 	}
	// }
}

export default {
	install
}