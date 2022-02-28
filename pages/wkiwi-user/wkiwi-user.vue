<template>
	<view>
		<view class="personal">
			<view class="personal-main">
				<u-avatar :src="avatar" mode="square" size="120" class="u-avatar"></u-avatar>
				<view class="personal-info">
					<view class="">张晓明</view>
					<view class="">手机号:12345678901</view>
				</view>
			</view>
			<u-icon name="arrow-right" size="30" class="p-right-icon"></u-icon>
		</view>
		<view class="n-p" v-for="(item,index) in list" :key="index" hover-class="hover-class" @click="onClick(item)">
			<view style="position: relative">
				<view class="p-left">
					<u-icon :name="item.icon" size="45" color="#757575"></u-icon>
				</view>
			</view>
			<view class="p-right">
				<view class="p-right-main">
					<view class="p-right-main-name">{{item.name}}</view>
				</view>

				<view class="lfet-a">
					<view style="position: relative">
					</view>
					<u-icon name="arrow-right" size="30" class="p-right-icon"></u-icon>
				</view>
			</view>
		</view>
		<u-button class="u-m-30" type="primary" shape="circle" @click="logOut">退出登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg',
				list: [{
					name: '收藏',
					id: 'favorites',
					icon: 'star-fill',
					iconBackground: '#398c0c',
				}, {
					name: '相册',
					id: 'photoAlbum',
					icon: 'photo-fill',
					iconBackground: '#5e2d88',
				}, {
					name: '卡包',
					id: 'cardPackage',
					icon: 'grid-fill',
					iconBackground: '#33696c',
				}, {
					name: '表情',
					id: 'expression',
					icon: 'gift-fill',
					iconBackground: '#833456',
				}, {
					name: '设置',
					id: 'setUp',
					icon: 'setting-fill',
					iconBackground: '#3b2021',
				}],
			}
		},
		methods: {
			onClick(item) {},
			logOut() {
			    uni.showModal({
			        title: '提示',
			        content: '确认退出吗？',
			        success: function(res) {
			            if (res.confirm) {
			                uni.clearStorage();
			                uni.reLaunch({
			                    url: '../login/login/login'
			                })
			            }
			        }
			    });
			}
		}
	}
</script>

<style>
	
	page {
		background-color: #f7f7f7;
	}
	.personal {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0 40rpx 30rpx;
	}

	.personal-main {
		display: flex;
		align-items: center;
	}

	.personal-info {
		display: flex;
		flex-direction: column;
	}

	.u-avatar {
		margin-right: 30rpx;
	}

	.navbar-right {
		padding: 0 40rpx;
	}

	.navbar-right-icon {
		margin-left: 50rpx;
	}

	.hover-class {
		background-color: #efefef;
	}

	.n-p {
		display: flex;
		align-items: center;
		background-color: #ffffff;
		margin-bottom: 20rpx;
	}

	.p-right-icon {
		padding: 0 40rpx;
	}

	.p-left {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		padding: 10rpx;
		margin: 20rpx;
		color: #FFFFFF;
		border-radius: 10rpx;

	}

	.p-right {
		height:90rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.p-right-main-name {
		font-size: 36rpx;
		font-weight: 500;
	}

	.p-right-main-time {
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #9d9d9d;
	}
</style>
