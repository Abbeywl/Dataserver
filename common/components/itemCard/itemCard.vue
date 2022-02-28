<template>
	<view :class="'attendanceNum '+(isShowRadius?'isShowRadius ':'')+(isShowShadow?'isShowShadow':'')">
		<view v-for="item in cardArr.slice(0,4)">
			<text :style="'color: '+ item.color">{{item.num}}</text>
			<text>{{item.name}}</text>
			<text v-if="isShowDes">{{item.des}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			//数据数组
			cardArr:{
				type: Array,
				default(){
					return []
				}
			},
			//是否显示为圆角
			isShowRadius:{
				type: Boolean,
				default: false
			},
			//是否显示阴影
			isShowShadow:{
				type: Boolean,
				default: false
			},
			//是否显示描述
			isShowDes:{
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.attendanceNum{
		display: flex;
		min-height: 100rpx;
		padding: 30rpx 0;
		justify-content: space-between;
		background-color: #FFFFFF;
		&>view{
			flex: 1;
			text-align: center;
			display: flex;
			align-items: center;
			flex-direction: column;
			font-size: 28rpx;
			border-left: 1px solid #E8E8E8;
			& text{
			}
			&>text:first-child{
				font-size: 36rpx;
				font-weight: bold;
			}
			&>text:nth-child(3){
				font-size: 22rpx;
				color: #999999;
				min-height: 22rpx;
			}
		}
		&>view:first-child{
			border-left: none;
		}
	}
	.isShowRadius{
		border-radius: 10rpx;
	}
	.isShowShadow{
		box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
	}
</style>
