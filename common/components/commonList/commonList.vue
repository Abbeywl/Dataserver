<template>
	<view class="mainList">
		<view class="imgBox" v-if="listImg.isShow">
			<image :src="listImg.src" mode=""></image>
		</view>
		<view class="leftList">
			<view class="firstLine">
				<text v-if="title && title!=''">{{title}}</text>
				<view class="topText" v-if="rightTitleText.type == 'topText'">
					<icon :type="rightTitleText.iconType"></icon>
					<text :style="'color:'+rightTitleText.color">{{rightTitleText.value}}</text>
				</view>
				<view class="colorText" v-if="rightTitleText.type == 'colorText'">
					<icon :type="rightTitleText.iconType"></icon>
					<text :style="'color:'+rightTitleText.color">{{rightTitleText.value}}</text>
				</view>
				<view class="middleText" v-if="rightTitleText.type == 'middleText'">
					<icon :type="rightTitleText.iconType"></icon>
					<text :style="'color:'+rightTitleText.color">{{rightTitleText.value}}</text>
				</view>
				<view class="bottomText" v-if="rightTitleText.type == 'bottomText'">
					<icon :type="rightTitleText.iconType"></icon>
					<text :style="'color:'+rightTitleText.color">{{rightTitleText.value}}</text>
				</view>
			</view>
			<view class="line" v-for="(item,index) of infoArr" :key='index'>
				<text v-if="item.leftText && item.leftText!=''">{{item.leftText}}</text>
				<text v-if="item.centerText && item.centerText!=''">{{item.centerText}}</text>
				<view class="topText" v-if="item.rightText && item.rightText.type == 'topText'">
					<icon :type="item.rightText.iconType"></icon>
					<text :style="'color:'+item.rightText.color">{{item.rightText.value}}</text>
				</view>
				<view class="colorText" v-if="item.rightText && item.rightText.type == 'colorText'">
					<icon :type="item.rightText.iconType"></icon>
					<text :style="'color:'+item.rightText.color">{{item.rightText.value}}</text>
				</view>
				<view class="middleText" v-if="item.rightText && item.rightText.type == 'middleText'">
					<icon :type="item.rightText.iconType"></icon>
					<text :style="'color:'+item.rightText.color">{{item.rightText.value}}</text>
				</view>
				<view class="bottomText" v-if="item.rightText && item.rightText.type == 'bottomText'">
					<icon :type="item.rightText.iconType"></icon>
					<text :style="'color:'+item.rightText.color">{{item.rightText.value}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			//标题
			title:{
				type:String,
				default:''
			},
			//第三标题
			rightTitleText:{
				type:Object,
				default(){
					return {}
				}
			},
			//所有详细信息数据
			infoArr:{
				type: Array,
				default(){
					return []
				}
			},
			//设置图片
			listImg:{
				type: Object,
				default(){
					return {
						}
				}
			}
		},
		data() {
			return {
				src:'../../static/noimg.png'//默认图片
			}
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	.mainList{
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #E8E8E8;
		padding: 20rpx 30rpx; 
		background-color: #fff;
		.leftList{
			flex:10;
			&>view{
				display: flex;
				align-items: flex-start;
				&>text{
					flex: 1;
					display: inline-block;
					color: #666;
					font-size: 24rpx;
					line-height: 40rpx;
					width: 100%;
					word-break: break-word;
				}
				view{
					flex: 1;
					display: flex;
					line-height: 40rpx;
					justify-content: flex-end;
					&>text{
						padding-left: 10rpx;
					}
				}
			}
			.firstLine{
				text{
					&:first-child{
						color: #222;
						font-weight: 500;
					}
					line-height: 42rpx;
					font-size: 28rpx;
					font-weight: 400;
					padding-bottom: 8rpx;
				}
				
			}
			/deep/{
				.uni-icon-success {
					font-size: 26rpx !important;
					color: #32B067;
				}
				
				.uni-icon-warn {
					font-size: 26rpx !important;
					color: #999999;
				}
			}
			.topText {
				& text{
					font-size: 20rpx !important;
				}
				color: #999999;
				display: flex;
				justify-content: flex-end;
			}
			
			.colorText {
				display: flex;
				justify-content: flex-end;
				font-size: 28rpx;
			}
			.middleText{
				display: flex;
				justify-content: flex-end;
				font-size: 26rpx;
				color: #666666;
				box-sizing: border-box;
			}
			.bottomText{
				display: flex;
				justify-content: flex-end;
				font-size: 24rpx;
				color: #999999;
			}
		}
		.imgBox{
			display: flex;
			flex: 2;
			image{
				display: inline-block;
				width: 88rpx;
				height: 88rpx;
			}
		}
	}
</style>
