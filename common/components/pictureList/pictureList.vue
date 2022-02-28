<template>
	<view class="content">
		<view class="mainList">
			<view class="leftList">
				<view class="firstLine">
					<text v-if="title!=''">{{title}}</text>
					<text class='text_indent' v-if="subTitle!=''">{{subTitle}}</text>
					<text class='text_indent' v-if="rightTitle!=''">{{rightTitle}}</text>
				</view>
				<view class="line" v-for="(item,index) of infoArr" :key='index'>
					<text v-if="item.leftText!=''">{{item.leftText}}</text>
					<text class='text_indent' v-if="item.centerText!=''">{{item.centerText}}</text>
					<text class='text_indent' v-if="item.rightText!=''">{{item.rightText}}</text>
				</view>
			</view>
			<view class="imgBox" v-if="listImg.isShow">
				<image mode='aspectFit' v-if="listImg.src && listImg.src!=''" :src="listImg.src"></image>
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
			//副标题
			subTitle:{
				type:String,
				default:''
			},
			//第三标题
			rightTitle:{
				type:String,
				default:''
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
				// src:'../../static/noimg.png'//默认图片
			}
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 0 30rpx;
		background-color: #fff;
		border-bottom: 1px solid #E8E8E8;
		.mainList{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0; 
			background-color: #fff;
			.leftList{
				width: 100%;
				view{
					display: flex;
					align-items: flex-start;
					text{
						flex: 1;
						display: inline-block;
						color: #666;
						font-size: 24rpx;
						line-height: 40rpx;
						width: 100%;
						word-break: break-word;
						&:first-child{
							flex: 1.5;
						}
					}
					.text_indent{
						text-indent: 10rpx;
					}
				}
				.firstLine{
					text{
						&:first-child{
							color: #222;
							font-weight: 500;
						}
						line-height: 42rpx;
						font-size: 30rpx;
						font-weight: 400;
						padding-bottom: 8rpx;
					}
				}
			}
			.imgBox{
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				background-color: #000;
				width: 132rpx;
				max-height: 162rpx;
				box-sizing: border-box;
				image{
					height: 162rpx;
				}
			}
		}
	}

</style>
