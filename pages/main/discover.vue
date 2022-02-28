<template>
	<view class="m-page m-main-bg" style="padding-bottom: 100rpx;">
		
		<view class="m-content" style="padding-top: 10rpx;">
			<view class="cu-bar search m-bar">
				<view class="m-title">
					<text>丰田</text>
					<text class="cuIcon-triangledownfill"></text>
				</view>
				<view class="search-form round" v-show="is_show_search">
					<text class="cuIcon cuIcon-">&nbsp;</text>
					<input :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
				</view>
				<view class="flex align-center">
					<view class="cuIcon cuIcon-search m-search" @click="is_show_search = !is_show_search"></view>
					<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big11010.jpg"></view>
				</view>
			</view>

			<view class="m-recommendations">
				<view class="m-recom-item" v-for="(item, index) in trends" :key="index">
					<!-- <view class="m-thumbnail"  style="background-size: cover; background-repeat: no-repeat; background-position: 0;" :style="'background-image:url('+item.image+');'"> -->
						<view class="m-thumbnail">
							<image :src="item.image" mode=""></image>
						<text class="m-extra">{{item.extra}}</text>
					</view>
					<view class="m-recom-detail">
						<view class="m-recom-left">
							<view class="m-recom-title">{{item.title}}</view>
							<view class="m-recom-views">{{item.data}} 建议零售价</view>
						</view>
						<view class="m-recom-right flex">
							<view class="margin-right-sm">
								<view class="m-recom-info-name">{{item.name}}</view>
								<view class="m-recom-info-sub">{{item.follow}} 到手</view>
							</view>
							<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big11010.jpg"></view>
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
				is_show_search: false,
				trends: [
					{"image": "../../static/image/car.jpg", "extra": "22:33", "title": "全新明锐PRO 旗舰版", "data": "157,900元", "name": "Meagan Good", "follow": "157,900元"},
					{"image": "../../static/image/Caroluse2.jpg", "extra": "11:22", "title": "House of Rolls-Royce ", "data": "5654,321万", "name": "Paul george", "follow": "122,255万"},
					{"image": "../../static/image/car2.jpg", "extra": "44:99", "title": "全新别克昂科威Plus", "data": "321,654万", "name": "新款热卖", "follow": "12,122万"},
					]
			}
		}
	}
</script>

<style lang="scss">
	@import "static/interact-market/variables.scss";

	.m-bar {
		.m-title {
			font-size: 36rpx;
			font-weight: bold;
			color: $white;
		}

		.m-search {
			font-weight: bold;
			color: $white;
			margin-right: 16rpx;
			font-size: 32rpx;
		}
	}
	.m-recommendations{
		.m-recom-item{
			margin-top: 64rpx;
			.m-thumbnail{
				position: relative;
				// width: 100%;
				height: 450rpx;
				margin-bottom: 32rpx;
				image{
					width: 100%;
					height: 100%;
					vertical-align: middle;
					border-radius: 8rpx;
				}
				.m-extra{
					position: absolute;
					top: 5%;
					right: 5%;
					padding: 6rpx 14rpx;
					border-radius: 8rpx;
					background-color: rgba($color: #000000, $alpha: 0.4);
				}
			}
			.m-recom-detail{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.m-recom-left{
					.m-recom-title{
						// width: 80%;
						color: $white !important;
						font-weight: 500;
						font-size: 32rpx;
						margin-bottom: 16rpx;
					}
					.m-recom-views{
						color: $gray !important;
						font-size: 22rpx;
					}
				}
				.m-recom-right{
					.m-recom-info-name{
						color: $white !important;
						font-weight: 500;
						font-size: 24rpx;
						margin-bottom: 16rpx;
					}
					.m-recom-info-sub{
						color: $gray !important;
						font-size: 18rpx;
					}
				}
			}
		}
	}
</style>
