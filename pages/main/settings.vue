<template>
	<view class="m-page " style="padding-bottom: 192rpx;">
		<!-- <cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
			<block slot="backText"></block>
			<block slot="content">设置</block>
		</cu-custom> -->
		<view class="m-content_">
			<view class=" menu m-bg-none">
				<!-- <view class="cu-item  ">
					<view class="content">
						<text class="cuIcon-emojifill "></text>
						<text class="">此刻心情</text>
					</view>
					<input placeholder="请输入..." />
				</view> -->
				<view class="cu-item ">
					<textarea placeholder="此刻想说什么呢..." ></textarea>
					
				</view>
				<!-- 图片 -->
				<view class=" cellBg">
					<u-upload class="u-p-l-30 u-p-r-20 u-p-b-20" ref="uUpload" :auto-upload="false" :file-list="fileList" @on-remove="onRemove"></u-upload>
				</view>
		
			</view>
			<view class="m-logout" @click="save">发布</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
				fileList:[]
			}
		},
		methods: {
			onRemove: function(e) {
			},
			save(){
				uni.showToast({
					title:"发布成功"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import  "static/interact-market/variables.scss";
	.m-bg-none .cu-item{
		background: none !important;
		color: $white !important;
		display: flex;
		justify-content: space-around;
	}
	.content{
		width: 120rpx;
	}
	.cu-item textarea{
		color: #333 !important;
		padding-top: 20rpx;
		min-height: 100rpx;
	}
	
	.m-logout{
		color: #ffffff !important;
		background-color: #2979ff !important;
		padding: 16rpx 32rpx;
		border-radius: 16rpx;
		text-align: center;
		width: 200rpx;
		margin: 192rpx auto 0 ;
	}
</style>
