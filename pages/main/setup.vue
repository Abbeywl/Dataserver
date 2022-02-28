<template>
	<view class="m-page">
		<swiper class="screen-swiper swiper-container vh-100 bg-default swiper-container-horizontal" :indicator-dots="true"
		 :circular="true" :autoplay="true" interval="5000" duration="500">

			<swiper-item v-for="(item,index) in items" :key="index">
				<view class="m-skip" @click="toMain()">跳过</view>
				<view class="swiper-slide has-background vh-100">

					<view class="background opacity-30" :style="'background-image: url('+item.image+');'">
						<image :src="item.image" style="display: none;"></image>
					</view>
					<view class="container h-100 text-center">
						<view class="row h-100">
							<view class="col-10 col-md-6 col-lg-4 align-self-end mx-auto mb-5 pb-5">
								<view class="bottom-caption">
									<view class="m-title"><b>{{item.item}}</b></view>
									<view class="lead mt-3 m-help">{{item.desc}}</view>
								</view>
								<view class="cuIcon cuIcon-right m-button" @click="toMain()">&nbsp;</view>
							</view>
						</view>
					</view>
				</view>
				<image :src="item.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						"item": "有人需要技术支持吗",
						"image": "../../static/image/car.jpg",
						"desc": "啦哈哈哈哈，不得了了"
					},
					{
						"item": "正在思考，如何攻克地心引力",
						"image": "../../static/interact-market/music2.jpg",
						"desc": "怪兽在这，公主在哪"
					},
					{
						"item": "让我看见，开始直播冒险",
						"image": "../../static/interact-market/music3.jpg",
						"desc": "快按下健，上上下下，左左右右，BABA"
					},
				]
			}
		},
		methods:{
			toMain() {
				uni.navigateTo({
					url: '/pages/main/login'
				})
			}
		}
		
	}
</script>

<style>
	.container {
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}

	.bg-default {
		background-color: #111230 !important;
		color: #ffffff;
	}

	.swiper-container {
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		list-style: none;
		padding: 0;
		z-index: 1;
	}

	.vh-100 {
		height: 100vh !important;
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

	.row {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		margin-right: -15px;
		margin-left: -15px;
	}

	.ml-auto,
	.mx-auto {
		margin-left: auto !important;
	}

	.mr-auto,
	.mx-auto {
		margin-right: auto !important;
	}

	.pb-5,
	.py-5 {
		padding-bottom: 3rem !important;
	}

	.mb-5,
	.my-5 {
		margin-bottom: 3rem !important;
	}

	.align-self-end {
		-ms-flex-item-align: end !important;
		align-self: flex-end !important;
	}

	.col-10 {
		-ms-flex: 0 0 83.333333%;
		flex: 0 0 83.333333%;
		max-width: 83.333333%;
	}

	.h-100 {
		height: 100% !important;
	}

	.m-title {
		color: #FFFFFF;
		font-size: 48rpx;
		margin-bottom: 24rpx;
	}

	.m-help {
		font-weight: lighter;
	}

	.m-skip {
		position: absolute;
		top: 10%;
		right: 10%;
		color: white;
		z-index: 99;
		background-color: #000000;
		padding: 12rpx 32rpx;
		opacity: 0.6;
		border-radius: 16rpx;
	}

	.m-button {
		margin-top: 96rpx;
		margin-left: auto;
		margin-right: auto;
		height: 96rpx;
		width: 96rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		/* align-self: center; */
		border: 1px solid #FFFFFF;
		background-color: #FFFFFF;
		color: #111230;
		border-radius: 50%;

	}
</style>
