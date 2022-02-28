<template>
	<view class="cardBox" :class="[borderIsRed?'redBorder':'defaultBorder']">
		<view class="mainList">
			<view class="leftList">
				<view class="firstLine">
					<text v-if="title!=''">{{title}}</text>
					<text v-if="subTitle!=''">{{subTitle}}</text>
					<text v-if="rightTitle!=''">{{rightTitle}}</text>
				</view>
				<view class="line" v-for="(item,index) of infoArr" :key='index'>
					<text :class="[item.leftText.isWarning ?'redColor':'']" v-if="item.leftText && item.leftText!=''&&item.leftText.length!=0">{{item.leftText.value}}</text>
					<text :class="[item.centerText.isWarning?'redColor':'']" v-if="item.centerText && item.centerText!='' && item.centerText.length!=0">{{item.centerText.value}}</text>
					<text :class="[item.rightText.isWarning?'redColor':'']"  v-if="item.rightText && item.rightText!=''&& item.rightText.length!=0">{{item.rightText.value}}</text>
				</view>
			</view>
			<view class="imgBox" v-if="cardListImg.isShow">
				<image v-if="cardListImg.src && cardListImg.src!=''" :src="cardListImg.src" mode=""></image>
			</view>
		</view>
		<view class="bottom" v-if="cardBottom && cardBottom.isShow">
			<view class="inforName">
				<text>{{cardBottom.title}}</text>
			</view>
			<view class="infor" v-for="(item,index) in cardBottom.cardInfo" :key="index">
				<icon class="icon iconfont" :class="[item.icon]"></icon>
				<text>{{item.value}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		mounted() {
		},
	  methods:{
		
	   },
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
			//外边框颜色是否警告
			borderIsRed:{
				type:Boolean,
				default:false
			},
			//所有详细信息数据
			infoArr:{
				type: Array,
				default(){
					return []
				}
			},
			// 设置图片
			cardListImg:{
				type: Object,
				default(){
					return {
						}
				}
			},
			// 卡片底部信息
			cardBottom:{
				type: Object,
				default(){
					return {
						}
				}
			},
		},
		data() {
			return {
				src:'../../static/noimg.png',
				iconClass:{
					icon:"icon iconfont"
				},
			}
		},
		watch: {
		}
	}
</script>

<style lang="scss" scoped>
	.redBorder{
		border: 1rpx solid #FF0000;
	}
	.defaultBorder{
		border: 1rpx solid #DDDDDD;
	}
	.redColor{
		color: #E82222!important;
		font-weight: 500!important;
	}
	
	.cardBox{
		box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.mainList{
			display: flex;
			justify-content: space-between;
			padding-bottom: 14rpx;
		
			
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
				image{
					display: inline-block;
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
				}
			}
		}
		.bottom{
			display: flex;
			justify-content: space-between;
			padding:26rpx 0 ;
			padding-bottom: 0;
			border-top: 1px solid #E8E8E8;
			color: #666;
			text,icon{
				font-size: 22rpx;
				line-height: 28rpx;
			}
			.infor{
				padding: 0 10rpx;
				border-left: 1rpx solid #e8e8e8;
				display: flex;
				justify-content: space-around;
				align-items: center;
				icon{
					color: #ccc;
				}
				text{
					color: #0089FF;
					text-indent: 10rpx;
				}
				&:last-child{
					text{
						color: #E82222;
					}
				}
			}
		}
	}
	
</style>
