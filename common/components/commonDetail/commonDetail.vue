<template>
	<view :class="detailImg.isShow?'detailContent contentVerified':'detailContent'">
		<view class="u-flex u-col-top" v-for="item in detailArr">
			<view class="contentTitle">
				<text>{{item.name}}</text>
			</view>
			<view class="contentInfo">
				<text>{{item.value}}</text>
				<view v-if="item.name == '问题类型'&&operate.isShow==true" @click="openPage(operate.src)">
					<icon class="icon iconfont icon-i" style="color: #236CB3;font-size: 24rpx;"></icon>
					<text>{{operate.text}}</text>
				</view>
			</view>
		</view>
		<image v-if="detailImg.isShow" :src="detailImg.src"></image>
	</view>
</template>

<script>
	export default {
		props: {
			//详情具体数据
			detailArr:{
				type: Array,
				default(){
					return []
				}
			},
			detailImg:{
				type: Object,
				default(){
					return {}
				}
			},
			operate:{
				type: Object,
				default(){
					return {}
				}
			}
		},
		watch: {
		},
		methods:{
			openPage(page){
				uni.navigateTo({
					url:page
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detailContent{
		position: relative;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		.contentTitle{
			flex: 3;
			display: flex;
			& text{
				min-height: 48rpx;
				line-height: 38rpx;
				font-size: 26rpx;
				color: #999999;
			}
		}
		.contentInfo{
			flex: 9;
			display: flex;
			align-items: center;
			justify-content: space-between;
			& text{
				flex: 9;
				min-height: 48rpx;
				line-height: 38rpx;
				font-size: 26rpx;
				color: #222222;
			}
			&>view{
				flex: 3;
				min-height: 48rpx;
				line-height: 48rpx;
				& text{
					padding-left: 10rpx;
					font-size: 24rpx;
					color: #DDDDDD;
				}
			}
		}
		&>image{
			position: absolute;
			top: 0;
			right: 0;
			width: 200rpx;
			height: 125rpx;
		}
	}
	.contentVerified{
		&>view:nth-child(1),
		&>view:nth-child(2),
		&>view:nth-child(3){
			.contentInfo{
				&>text{
					padding-right: 220rpx!important;
				}
			}
		}
	}
</style>
