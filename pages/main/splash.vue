<template>
	<view class="m-page m-main-bgs">
		<view class="has-background bg-default">
			<view class="background opacity-30" style="background-image: url(../../static/interact-market/tomorrowland.jpg);">
				<image src="../../static/interact-market/tomorrowland.jpg" alt="" style="display: none;"></image>
			</view>
			<view class="login-container">
				<view class="row no-gutters" style="min-height: 100vh;">
					<view class="col-12 align-self-start">

					</view>
					<view class="col-12 align-self-center">
						<view class="row jutify-center align-center">
							<view class="col-12 text-center">
								<view class=" logo-landing mb-4 mx-auto">
									<image src="../../static/logo.png" alt=""></image>
								</view>
								<view class="text-uppercase font-weight-medium m-title">娱乐平台</view>
								<p>Make your own music logo for free</p>
							</view>
						</view>
					</view>
					<view class="col-12 align-self-end mb-4 text-center">
						<view class="row">
							<view class="col">
							</view>
							<view class="col">
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		methods: {

		},
		onLoad() {
			setTimeout(function(x) {
				uni.navigateTo({
					url: '/pages/main/setup'
				})
			}, 3000)
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

	.logo-landing {
		width: 400px;
		height: 400rpx;
		margin-bottom: 32rpx;
		image{
			width: 100%;
			height: 100%;
			vertical-align: middle;
		}
	}

	

	.m-title {
		margin-bottom: 32rpx;
		font-weight: bolder;
		font-size: 84rpx;
	}
</style>
