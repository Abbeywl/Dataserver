<template>
	<view class="m-page m-main-bg">
		<!-- <view class="m-fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content"></block>
			</cu-custom>
		</view> -->
		<view class="m-video">
			<video src="../../static/interact-market/fireworks.mp4" autoplay="true" controls></video>
		</view>
		<view class="m-hr"></view>
		<view class="m-content">
			<view class="m-video-info">
				<view class="m-info">
					<view class="m-title">
						JOJO 黑帮摇
					</view>
					<view class="m-date">
						2020-02-20 12:09
					</view>
				</view>
				<view class="m-views">
					184万次观看
				</view>
			</view>
			<view class="m-buttons">
				<view class="flex justify-between">
					<view class="margin-tb-sm text-center" v-for="(item,index) in buttons" :key="index">
						<button class="cu-btn round" :class="">
							<text :style="'color:'+item.color" class="cuIcon margin-right-xs" :class="'cuIcon-'+item.icon"></text>
							{{item.data}}
						</button>
					</view>
				</view>
			</view>
			<view class="m-hr"></view>
			<view class="m-mini-info">
				<view class="m-left">
					<view class="cu-avatar round margin-right-sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
					<view class="content">
						<view class="m-name">迪丽热巴</view>
						<view class="m-data">32万粉丝</view>
					</view>
				</view>
				<view class="m-right">
					<view class="m-follow">
						12万关注
					</view>
				</view>
			</view>
			<scroll-view scroll-x class="nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub m-tab" :class="index==TabCur?'m-tab-selected cur':''" v-for="(item,index) in tabs"
					 :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
			<view class="m-thumbs-list">
				<view class="m-cover-item" v-for="(item, index) in vids" :key="index">
					<view class="flex">
						<view class="m-thumb">
							<image :src="item.image" mode=""></image>
						</view>
						<view class="m-content">
							<view class="m-title">{{item.title}}</view>
							<view class="m-data">{{item.data}} views</view>
						</view>
					</view>
					<view class="flex flex-direction justify-center" style="align-self: center;">
						<text class="m-duration">3:44</text>
						<text class="cuIcon cuIcon-playfill m-play"></text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabs: ['下一个', '详情', '评论区'],
				buttons: [{
						"icon": "likefill",
						"data": "8万",
						"color": "#FF3465"
					},
					{
						"icon": "evaluate_fill",
						"data": "1万",
						"color": ""
					},
					{
						"icon": "share",
						"data": "657",
						"color": ""
					},
					{
						"icon": "commentfill",
						"data": "106",
						"color": ""
					}
				],
				vids: [{
						"image": "../../static/image/car5.jpg",
						"title": "有没有那样一个地方",
						"data": "122.567"
					},
					{
						"image": "../../static/interact-market/justin.jpg/justin.jpg",
						"title": "春天来到我们的战场上",
						"data": "34,222"
					},
					{
						"image": "../../static/interact-market/music3.jpg",
						"title": "声音的艺术",
						"data": "854,895"
					},
					{
						"image": "../../static/interact-market/music1.jpg",
						"title": "声音的艺术",
						"data": "123,432"
					}
				]

			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">
	@import "static/interact-market/variables.scss";

	.m-follow {
		color: $white !important;
		background-color: $pink !important;
		padding: 16rpx 32rpx;
		border-radius: 16rpx;
	}

	.m-video {
		width: 100%;

		video {
			width: 100%;

		}
	}

	.m-video-info {
		display: flex;
		// align-items: center;
		justify-content: space-between;
		color: $white;
		margin-bottom: 32rpx;

		.m-title {
			font-weight: 700;
			font-size: 32rpx;
			margin-bottom: 16rpx;
		}

		.m-date {
			color: $gray;
			font-weight: 300;
		}
	}

	.m-duration {
		color: $gray;
		margin-right: 16rpx;
		margin-bottom: 8rpx;
	}

	.m-play {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48rpx;
		height: 48rpx;
		font-size: 32rpx;
		color: $white;
		font-weight: bolder;
		border: 1px solid $white;
		border-radius: 50%;
	}
</style>
