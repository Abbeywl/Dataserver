<template>
	<view class="wrap">
		<u-time-line >
			<u-time-line-item nodeTop="2">
				<template v-slot:node>
					<image  class="avatar" :src="data.timeLineImg==''?'../../static/issueSafety/headInit.png':data.timeLineImg"></image>
				</template>
				<template v-slot:content>
					<view  class="informBox">
						<view class="inform">
							<view>
								<text class="informCount">{{data.title}}</text>
								<view class="informPerson">
									<view class="informItem" v-for="(item1,index1) of data.desc" :key="'info'+index1">
										<image v-if="item1.src!='' && item1.src!=undefined" :src="item1.src"></image>
										<text>{{item1.descText}}</text>
									</view>
								</view>
							</view>
							<text class="sendTime">{{data.rightText}}</text>
						</view>
					</view>
				</template>
			</u-time-line-item>
			<!-- 整改前评论 -->
			<u-time-line-item nodeTop="2" v-for="(item2,index2) of data.children" :key="'info2'+index2">
				<template v-slot:content>
					<view class="talkBox">
						<view class="talkDesc">
							<view class="talkName">
								<text>{{item2.title}}</text>
								<text>{{item2.subTitle}}</text>
							</view>
							<text class="talkDescContent">{{item2.desc}}</text>
							<view class="talkImage">
								<view v-for="(item3,index3) of item2.timeLineImgs" :key="'info3'+index3">
									<image :src="item3" mode="aspectFit" @click="previewImg(index3,item2.timeLineImgs)"></image>
								</view>
							</view>
						</view>
						<text class="talkTime">{{item2.rightText}}</text>
					</view>
				</template>
			</u-time-line-item>
			
		
		</u-time-line>
	</view>
</template>

<script>
	export default {
		props:{
			data:{
				type:Object,
				default(){
					return {}
				}
			},
		},
		data() {
			return {
				
			}
		},
		created() {
			//console.log(this.data);
		},
		methods:{
			
			previewImg(index,data,state){
				uni.previewImage({
					current:index, //预览图片的下标
					urls: data//预览图片的地址，必须要数组形式
				})
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 0rpx 0rpx 0rpx 70rpx;
		margin:0px;
	}
	
	.avatar{
		width:88rpx;
		height:88rpx;
		border-radius:50%;
	}
	.u-time-axis-item{
		padding-left:40rpx;
		padding-bottom:30rpx;
		margin-bottom:0px;
	}
	.sendBox,.rectifyBox,.checkBox{
		display: flex;
		justify-content: space-between;
		font-family: PingFang SC;
		font-weight: 400;
		.sendApply,.rectifyApply{
			// color:red;
			display: flex;
			flex-direction: column;
			text{
				padding-bottom:10rpx;
			}
			& text:first-child{
				font-size: 30rpx;
				color: #222222;
			}
			& text:last-child{
				font-size: 24rpx;
				color: #666666;
			}
		}
		.checkApply{
			.checkTitle{
				font-size: 30rpx;
				color: #222222;
			}
			.checkPerson{
				width:60vw;
				font-size: 24rpx;
				color: #666666;
			}
		}
		.sendTime,.rectifyTime,.checkTime{
			min-width:150rpx;
			font-size: 22rpx;
			color: #BBBBBB;
		}
	}
	.informBox{
		font-family: PingFang SC;
		font-weight: 400;
		.inform{
			display: flex;
			// flex-wrap: wrap;
			justify-content: space-between;
			.sendTime{
				min-width:150rpx;
				font-size: 22rpx;
				color: #BBBBBB;
			}
			.informPerson{
				display: flex;
				flex-wrap: wrap;
				// justify-content: space-between;
				.informItem{
					display: flex;
					flex-direction: column;
					// width:100rpx;
					// text-align: center;
					padding-right:10rpx;
					image{
						width:60rpx;
						height:60rpx;
						margin:0 auto;
						
					}
					text{
						font-size: 24rpx;
						color: #666666;
					}
				}
				
			}
		}
	}
	.talkBox{
		display: flex;
		justify-content: space-between;
		font-family: PingFang SC;
		font-weight: 400;
		.talkDesc{
			.talkName{
				& text:first-child{
					font-size:30rpx;
					color:#236CB3;
					padding-right:10rpx;
				}
			}
			.talkDescContent{
				font-size: 24rpx;
				color:#666666;
			}
			.talkImage{
				display: flex;
				flex-wrap: wrap;
				view{
					width:150rpx;
					height:200rpx;
					background-color: #000;
					border-radius: 10rpx;
					display: flex;
					margin-right:10rpx;
					justify-content: center;
					align-items: center;
					image{
						height: 200rpx;
						border-radius: 10rpx;
					}
				}
				
			}
		}
		.talkTime{
			min-width:150rpx;
			font-size: 22rpx;
			color: #BBBBBB;
		}
	}
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-title.unacive {
		color: rgb(150, 150, 150);
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		// margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
	
	.tel {
		color: $u-type-primary;
	}
</style>
