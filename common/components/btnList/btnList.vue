<template>
	<view >
		<view class="listBox">
			
			<view class="titleText">
				<text class="tLeftText">{{title}}</text>
				<text v-if="subTitle!=''" class="tCenteText">{{subTitle}}</text>
				<text v-if="rightTitle!=''" class="tRightText">{{rightTitle}}</text>
			</view>
			<view  class="colText" v-for="(item,index) in infoArr" :key="index">
				<text class="leftText" :style="{color:item.leftText.color,fontSize:item.leftText.size+'rpx'}">{{item.leftText.value}}</text>
				<text class="centerText" v-if="item.centerText.value!=''">{{item.centerText.value}}</text>
				<text class="rightText" v-if="!item.rightText.isBtn&&item.rightText.value!=''">{{item.rightText.value}}</text>
				<view style="flex:1;text-align: right;" v-if="item.rightText.isBtn">
					<!-- <button  :style="{backgroundColor:(item.rightText.isClick==true?item.rightText.bgColor:'#ddd'),color:(item.rightText.isClick==true?item.rightText.color:'#aaa')}" @click="onClick(item.rightText.value,item.rightText.isClick)" class="btn" size="mini">{{item.rightText.value}}</button> -->
					<!-- <button  :style="{backgroundColor:item.rightText.bgColor,color:item.rightText.color}" @click="onClick(item.rightText.value)" class="btn" size="mini">{{item.rightText.value}}</button> -->
					<u-button :style="{backgroundColor:item.rightText.bgColor,color:item.rightText.color}" @click="onClick(item.rightText.value)" :ripple="true" shape="circle" size="mini">{{item.rightText.value}}</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title:{
				type:String,
				default: ''
			},
			subTitle:{
				type:String,
				default: ''
			},
			rightTitle:{
				type:String,
				default: ''
			},
			infoArr:{
				type: Array,
				default(){
					return []
				}
			},
		},
		data() {
			return {
				// isClick:true
			}
		},
		onLoad() {
			
		},
		methods: {
			onClick(btnName){
				// if(btnName=='确认'){
					// console.log(isClick)
					// if(isClick==true){
						// this.isClick=false;
						// console.log(isClick)
						this.$emit('btnClick');
					// }else {
					// 	// console.log("809809980")
					// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listBox{
		padding:10rpx 20rpx;
		border-bottom:1rpx solid #eee;
		background-color: #FFFFFF;
		.titleText{
			font-family: PingFang SC;
			font-weight: 400;
			display: flex;
			text{
				flex:1;
			}
			.tLeftText{
				font-size: 28rpx;
				color: #000;
				line-height:50rpx;
				font-weight: 500;
				// white-space: wrap;
				// text-overflow: ellipsis;
				// font-weight: bold;
			}
			.tCenteText{
				color: #999999;
				line-height:50rpx;
				font-size: 24rpx;
			}
			.tRightText{
				text-align: right;
				font-size: 24rpx;
				color: #999999;
				line-height:50rpx;
			}
			
		}
		.colText{
			display: flex;
			font-family: PingFang SC;
			font-weight: 400;
			text,.btns{
				flex:1;
			}
			
			.leftText{
				display: inline-block;
				line-height: 50rpx;
				font-size:26rpx;
				color:#666666;
			}
			.centerText{
				line-height: 50rpx;
				font-size: 26rpx;
				color: #999999;
			}
			.rightText{
				text-align: right;
				line-height: 50rpx;
				font-size: 26rpx;
				color: #999999;
			}
			
			/deep/{
				.u-size-mini{
					padding:0 18rpx;
					padding-top:5rpx;
				}
			}
		}
	}
	
</style>
