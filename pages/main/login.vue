<template>
	<view class="">
		<view class="ui-rounded">
			
			<!-- page content starts -->
			<view class="has-background bg-default">
				<view class="background opacity-30" style="background-image: url(../../static/interact-market/music3.jpg);">
					<image src="../../static/interact-market/music3.jpg" alt="" style="display: none;"></image>
				</view>

				<view class="login-container">
					<view class="row no-gutters" style="min-height: 100vh;">
						<view class="col-12 align-self-center margin-top-xl" >
							<view class="row justify-center">
								<view class="col-12" style="padding: 128rpx 32rpx; !important">
									<view class="h1 text-center font-weight-normal mb-5">欢迎回来<br></view>
									<view class="form-group float-label style-light active">
										<input type="text" class="form-control" v-model="account" placeholder="用户名/手机号码">
										<!-- <label class="form-control-label" v-show="!account">Username/Email</label> -->
									</view>
									<view class="form-group float-label style-light position-relative">
										<view class="bottom-right mb-2">
											<text class="text-white">Forgot?</text>
										</view>
										<input type="password" class="form-control" placeholder="密码" v-model="pwd">
										<!-- <label class="form-control-label" v-show="!pwd">Password</label> -->
									</view>
									<view class="m-button my-4 m-bg-pink" @click="login()">登录</view>
								</view>
							</view>
						</view>
						<view class="col-12 align-self-end mb-4 text-center">
							还没有账号?<br>
							请点这里即使<text class="text-white text-bold margin-sm">注册</text>
						</view>
					</view>
				</view>
			</view>
			<!-- page content ends -->



		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				account: "subzero",
				pwd: "123456"
			}
		},
		methods:{
			login(){
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.has-background {
		overflow: hidden;
		display: block;
		position: relative;
	}

	.bg-default {
		background-color: #111230 !important;
		color: #ffffff;
	}

	.opacity-30 {
		opacity: 0.3;
	}

	.background {
		height: 100%;
		width: 100%;
		position: absolute;
		margin: 0;
		padding: 0;
		top: 0;
		left: 0;
		z-index: 1;
		background-position: center top;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.background+* {
		position: relative;
		z-index: 1;
	}

	.login-container {
		min-height: 100vh;
		padding: 0 15px;
		height: auto;
	}

	.row {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		margin-right: -15px;
		margin-left: -15px;
	}

	.no-gutters {
		margin-right: 0;
		margin-left: 0;
	}

	.float-label {
		padding-top: 15px;
		position: relative;
	}

	.form-group {
		margin-bottom: 20px;
	}

	.form-control {
		display: block;
		width: 100%;
		height: calc(1.5em + .75rem + 2px);
		padding: .375rem .75rem;
		padding-right: 0.75rem;
		padding-left: 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #FFFFFF;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-top-width: 1px;
		border-right-width: 1px;
		border-bottom-color: rgb(206, 212, 218);
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-left-width: 1px;
		border-radius: .25rem;
		transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
	}

	.float-label .form-control,
	.float-label .chosen-container .chosen-choices,
	.float-label .chosen-container .chosen-single {
		background-color: transparent;
		border-width: 0 0 1px 0;
		border-bottom-width: 1px;
		border-radius: 0;
		z-index: 1;
		position: relative;
		padding-left: 0;
		padding-right: 0;
		background-image: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	}

	.float-label .form-control-label {
		opacity: 0.5;
		position: absolute;
		left: 0;
		top: 22px;
		margin: 0;
		font-size: 15px;
		line-height: 20px;
		color: #000000;
		font-size: 15px;
		transition: ease all 0.5s;
		-webkit-transition: ease all 0.5s;
		-ms-transition: ease all 0.5s;
		-moz-transition: ease all 0.5s;
		z-index: 0;
	}

	.float-label.active .form-control-label {
		top: 0;
		font-size: 11px;
		line-height: 16px;
	}

	.float-label.style-light .form-control-label {
		color: #ffffff;
	}

	.font-weight-normal {
		font-weight: 400 !important;
	}

	.text-center {
		text-align: center !important;
	}

	.mb-5,
	.my-5 {
		margin-bottom: 3rem !important;
	}

	.h1,
	h1 {
		font-size: 2.5rem;
	}

	.text-center {
		text-align: center !important;
	}

	.mb-4,
	.my-4 {
		margin-bottom: 1.5rem !important;
	}

	.position-relative {
		position: relative !important;
	}

	.bottom-right {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 2;
		padding-bottom: env(safe-area-inset-bottom);
		line-height: 1rem;
	}

	.mb-2,
	.my-2 {
		margin-bottom: .5rem !important;
	}

	.m-button {
		margin-top: 128rpx;
		padding: 32rpx 32rpx;
		border: none;
		border-radius: 16rpx;
		text-align: center;
		font-weight: bold;
	}
</style>
