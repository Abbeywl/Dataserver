<template>
	<view class="m-page m-main-bg" style="padding-bottom: 100rpx;">
		<!-- <cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
			<block slot="content">通知</block>
			<block slot="right">
				<view class="cuIcon cuIcon-noticefill m-settings"></view>
			</block>
		</cu-custom> -->
		<view class="m-content_">
			<scroll-view scroll-x class="nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub m-tab" :class="index==TabCur?'m-tab-selected cur':''" v-for="(item,index) in tabs"
					 :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
			<view class="m-notifications-list" v-show="TabCur==1">
				<view class="" v-for="index in 10" :key="index">
					<view class="m-notifications-item">

						<view class="m-notification-left">

							<view class="cu-avatar lg round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
							<view class="m-detail">
								<view class="m-notif-title">Vincent</view>
								<view class="m-notif-detail m-text-gray">Liked Your work today</view>
							</view>
						</view>
						<view class="m-notification-right">
							<view class="m-thumb-wrapper">
								<image src="../../static/image/kv1.jpg" mode=""></image>
								<text class="cuIcon cuIcon-playfill"></text>
							</view>
						</view>

					</view>
					<view class="" style="height: 1px; background-color: #21213C; margin-left: 150rpx;">

					</view>

				</view>

			</view>
			<view class="margin-top" v-show="TabCur==0">
				<view class="cu-list menu-avatar">
					<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in chats" :key="index"
					 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
					 @click="toChat(index)">
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
						<view class="content">
							<view class="text-grey">{{item.name}}</view>
							<view class="text-gray text-sm text-cut">{{item.desc}}</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">{{item.date}}</view>
							<view class="cu-tag round bg-grey sm" v-show="item.new">{{item.new}}</view>
						</view>
						<view class="move">
							<view class="bg-grey">置顶</view>
							<view class="bg-red">删除</view>
						</view>
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
				tabs: ['消息列表', '通知'],

				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,

				chats: [{
						"name": "不得了了",
						"desc": "检测了对面的智商，嘿嘿嘿，看来无法发挥全部实力啦",
						"date": "2022-02-01"
					},
					{
						"name": "鲁班大师",
						"desc": "请你们绕行，见识新发明的威力",
						"date": "2012-04-01"
					},
					{
						"name": "Zoe starr",
						"desc": "夜深了人静了经典语录 犹豫气质心情说说句子",
						"date": "2001-02-01"
					},
				]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			toChat(index) {
				uni.navigateTo({
					url: '/pages/main/chat'
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},

			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style lang="scss">
	.m-notifications-list {
		.m-notifications-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 200rpx;
			// border-bottom: 1px solid gray;

			.m-notification-left {
				display: flex;

				.m-detail {
					margin-left: 32rpx;

					.m-notif-title {
						color: #FFFFFF;
						margin-bottom: 8rpx;
					}

					.m-notif-detail {
						// color: ;
					}
				}
			}

			.m-notification-right {
				.m-thumb-wrapper {
					position: relative;
					width: 180rpx;
					height: 140rpx;
					margin-right: 32rpx;

					image {
						width: 100%;
						height: 100%;
						vertical-align: middle;
						border-radius: 16rpx;
					}

					text {
						position: absolute;
						top: 50rpx;
						left: 40%;
						color: rgba($color: #ffffff, $alpha: 0.8);
						width: 40rpx;
						height: 40rpx;
						border: 1px solid transparent;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;

						background-color: rgba($color: #000000, $alpha: 0.6);
					}
				}
			}
		}
	}

	.m-settings {
		margin-right: 32rpx;
		font-size: 36rpx;
	}

	.cu-list.menu-avatar>.cu-item {
		background-color: transparent !important;
	}
</style>
