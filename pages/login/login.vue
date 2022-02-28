<template>
	<view class="content">
		<!-- 消息提示框6 -->
		<u-toast ref="uToast" />
		<!-- logo图标 -->
		<image class="loginbg" src="@/static/login/loginbg.png"></image>
		<view class="logo u-flex u-row-center-important">
			<!-- <u-image width="361rpx" height="94rpx" src="@/static/login/loginLogo.png"></u-image> -->
		</view>
		<view class="u-flex u-row-center-important">
			<text class="textstyle">车联网智慧云</text>
		</view>
		<!-- 用户名 -->
		<view class="u-flex loginName u-border-bottom u-margin-auto">
			<view class="u-flex-1">
				<u-icon size="40" color="#fff" name="account-fill"></u-icon>
			</view>
			<view class="u-flex-11 inputColor">
				<u-input class="u-font-32" v-model="userName" placeholder="手机号" type="text" :border="false" />
			</view>
		</view>
		<!-- 密码 -->
		<view class="u-flex loginPassword u-border-bottom u-m-t-60 u-margin-auto">
			<view class="u-flex-1">
				<u-icon size="40" color="#fff" name="lock"></u-icon>
			</view>
			<view class="u-flex-11 inputColor">
				<u-input class="u-font-32" v-model="password" placeholder="密码" type="password" :password-icon="true"
					:border="false" />
			</view>
		</view>
		<!-- 注册账户 -->
		<view class="u-flex loginCheckbox u-margin-auto u-m-t-50 u-font-22 u-row-between-i">
			<view class="u-font-26" style="color: #FFF;width: fit-content;">
				<navigator hover-class="navigator-hover" @click="submitlogin()">
					一键登录
				</navigator>
			</view>
			<view class="u-font-26" style="color: #FFF;width: fit-content;">
				<navigator hover-class="navigator-hover" url="/pages/registered/registered">
					注册账户
				</navigator>
			</view>
		</view>
		<view class="loginBtn u-margin-auto">
			<u-button class='btn' @click="login" type="primary" :ripple="true" shape="square">登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoStatus: true,
				access_token:  uni.getStorageSync('access_token') ? uni.getStorageSync('access_token') : 'test',
				userName: uni.getStorageSync('userName') ? uni.getStorageSync('userName') : 'admin', // 用户名
				password: uni.getStorageSync('password') ? uni.getStorageSync('password') : '123456', //密码
			}
		},
		//进入页面及执行此函数
		onLoad(option) {
			this.isAutoLogin()
		},
		methods: {
			// 判断是否支持一键登陆
			isAutoLogin() {
				let _that = this
				uni.getProvider({ //获取可用的服务提供商
					service: 'oauth',
					success: function(res) {
						console.log(res.provider) // ['weixin', qq', 'univerify']
					}
				});
				uni.preLogin({ //预登录
					provider: 'univerify', //用手机号登录
					success() {
						_that.autoStatus = true
						console.log('预登录成功')
					},
			
					fail(err) { //预登录失败
						_that.autoStatus = false
						console.log('错误码：' + err.errCode)
						console.log(err.errMsg)
					}
				})
			},
			//注册登录
			submitlogin() {
				let _this = this;
				uni.login({ //正式登录，弹出授权窗
					provider: 'univerify',
					univerifyStyle: { // 自定义登录框样式
						"fullScreen": true, // 是否全屏显示，true表示全屏模式，false表示非全屏模式，默认值为false。
						"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff 
						"icon": {  
						    "path": "" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
						},
						"phoneNum": {
							"color": "#2281F5", // 手机号文字颜色 默认值：#000000   
						},
						"authButton": {
							"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5  
							"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
							"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
							"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff  
							"title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”  
						},
						"privacyTerms":{
							"privacyItems": [  // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
								{  
									"url": "https://", // 点击跳转的协议详情页面  
									"title": "车联网定位协议" // 协议名称 
								},
								{
									"url": "https://", // 点击跳转的协议详情页面  
									"title": "公司所有权协议" // 协议名称 
								}
							]  
						}
					},
					success(res) { // 正式登录成功
						console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
			
						// 在得到access_token后，通过callfunction调用云函数
						uniCloud.callFunction({
							name: 'login', // 云函数名称
							data: { //传给云函数的参数
								'access_token': res.authResult.access_token, // 客户端一键登录接口返回的access_token
								'openid': res.authResult.openid // 客户端一键登录接口返回的openid
							},
							success(callRes) {
								console.log('调用云函数成功' + JSON.stringify(callRes));
								var unires = eval('(' + JSON.stringify(callRes) + ')');
								console.log(unires.result.phoneNumber);
								uni.setStorageSync('access_token', res.authResult.access_token);
								uni.setStorageSync('userName', unires.result.phoneNumber);
								uni.setStorageSync('password', 'VC123456');
								
							},
							fail(callErr) {
								console.log('调用云函数出错' + callErr)
							},
							complete() {
								_this.$refs.uToast.show({
									title: '登录成功',
									position: 'bottom',
									type: "success",
									isTab: true,
									duration: 0,
									url: '/pages/index/index'
								})
								uni.closeAuthView() //关闭授权登录界面
							}
						})
					},
					fail(err) { // 正式登录失败
						console.log(err.errCode)
						console.log(err.errMsg)
						uni.closeAuthView() //关闭授权登录界面
					}
				})
			},	
			//账户密码登录
			login() {
				if(this.userName && this.password && this.access_token){
					let _this = this;
					uni.showLoading({
						mask: true,
						title: '登陆中....'
					});
					setTimeout(function(){
						uni.hideLoading();
						_this.$refs.uToast.show({
							title: '登录成功',
							position: 'bottom',
							type: "success",
							isTab: true,
							duration: 1000,
							url: '/pages/index/index'
						})	
					}, 1000);	
				}else{
					this.$refs.uToast.show({
						title: '账号或密码错误',
						position: 'bottom',
						type: "error",
					})
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	body{
		background-color: #FFFFFF;
	}
	
	.loginbg{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.logo {
		margin-top: 130px;

	}

	.textstyle {
		font-size: 60rpx;
		font-weight: 600;
		color: #FFFFFF
	}

	/deep/ uni-image>img {
		opacity: 1 !important;
	}

	/deep/uni-image>div,
	uni-image>img {
		height: auto !important;
	}

	.loginName,
	.loginPassword,
	.loginCheckbox {
		width: 90vw;
	}
	
	.inputColor{
		/deep/ input{
			color: #FFFFFF;
		}
	}

	.loginName {
		margin-top: 132rpx;
	}

	.loginBtn {
		width: 90vw;
		color: #fff;
		margin-top: 100rpx;

		.btn {
			color: #fff;
			
		}
	}
</style>
