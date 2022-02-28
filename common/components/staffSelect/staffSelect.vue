<template>
	<view class="listContent">
		<view class="listIcon">
			<view :style="'background-color:'+((headStyle=='first'||headStyle=='single')?'#FFFFFF':'')" class="lineTop"></view>
			<view class="circle"></view>
			<view :style="'background-color:'+((headStyle=='last'||headStyle=='single')?'#FFFFFF':'')" class="lineBtm"></view>
		</view>
		<view class="listBox" :style="'border:'+(headStyle=='first'?'none':'')">
			<view>
				<text>{{nameText}}</text>
				<text>{{desc}}</text>
			</view>
			<view>
				<view v-for="item in staffArr">
					<image :src="commonIP+item.img"></image>
					<icon @click="deleteStaff(item.ID)" class="icon iconfont icon-close"></icon>
				</view>
			</view>
			<icon :style="'background-image:url('+picture+')'" @click="selectStaff()"></icon>
		</view>
		<u-popup v-model="isShowSelect" height="80%" mode="bottom">
			<view class="confirmBtn">
				<text @click="cancelSelect">取消</text>
				<text @click="confirmSelect">确定</text>
			</view>
			<view class="absenceStafflist">
				<u-search class='u-m-t-15 u-m-b-15' placeholder="请输入" shape='square' :show-action='false'
				></u-search>
				<uni-collapse class="absenceCollapse">
					<checkbox-group @change="pickStaff">
						<uni-collapse-item v-for="item in listData" :showArrow="true" :showAnimation="true">
							<view class="realNametitle" slot="collapseTitle">
								<view>{{item.Name+'（'+item.DepartmentUsers.length+'）'}}</view>
							</view>
							<view v-for="item2 in item.DepartmentUsers" slot="collapseContent" class="absenceList">
								<checkbox :value="{'ID':item2.ID,'img': item2.UserHeadImgUrl}"></checkbox>
								<image :src="commonIP+item2.UserHeadImgUrl"></image>
								<view>
									<text>{{item2.DisplayName}}</text>
									<text>{{item2.JobTitle}}</text>
								</view>
							</view>
						</uni-collapse-item>
					</checkbox-group>
				</uni-collapse>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			headStyle: {
				type: String,
				default: ''
			},
			nameText: {
				type: String,
				default: ''
			},
			desc: {
				type: String,
				default: ''
			},
			picture: {
				type: String,
				default: ''
			},
			listData: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				commonIP: uni.getStorageSync('commonIP'), //获取ip地址
				staffArr:[],
				isShowSelect:false,
			}
		},
		watch: {
			listData: {
				handler: function(newValue, oldValue) {
					this.listData = newValue
				},
				deep: true,
			},
		},
		methods: {
			selectStaff() {
				this.isShowSelect = true;
			},
			deleteStaff(id) {
				this.staffArr.splice(this.staffArr.findIndex(e => e.ID === id), 1)
				this.$forceUpdate() 
			},
			pickStaff(event) {
				this.staffArr = event.detail.value
			},
			cancelSelect(){
				this.isShowSelect = false;
			},
			confirmSelect(){
				this.$emit('selectedStaff', this.staffArr)
				this.isShowSelect = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.listContent {
		display: flex;
		min-height: 100rpx;

		.listIcon {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;

			.lineTop {
				width: 1rpx;
				height: 50%;
				background-color: #D5D5D5;
			}

			.circle {
				width: 20rpx;
				height: 20rpx;
				background-color: #D5D5D5;
				border-radius: 100%;
			}

			.lineBtm {
				width: 1rpx;
				height: 50%;
				background-color: #D5D5D5;
			}
		}

		.listBox {
			flex: 7;
			display: flex;
			align-items: center;
			padding: 10rpx 0;
			border-top: 1px solid #E8E8E8;

			&>view:nth-child(1) {
				flex: 2;
				display: flex;
				flex-direction: column;
				justify-content: center;
				word-break: break-word;
				padding-left: 5rpx;

				& text {
					font-size: 22rpx;
					color: #666666;
				}

				& text:first-child {
					margin-bottom: 5rpx;
					font-size: 28rpx;
					color: #222222;
				}
			}

			&>view:nth-child(2) {
				flex: 5;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				flex-wrap: wrap;
				padding-right: 10rpx;

				&>view {
					position: relative;
					margin-right: 20rpx;

					& image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}

					& icon {
						position: absolute;
						right: -5rpx;
						top: -5rpx;
						width: 22rpx;
						height: 22rpx;
						font-size: 20rpx;
						color: #FFFFFF;
						background-color: #222222;
						border-radius: 50%;
					}
				}
			}

			&>icon {
				flex: 1;
				width: 60rpx;
				height: 60rpx;
				background: url(../../../static/absence/addCc.png) center center no-repeat;
				background-size: 60rpx 60rpx;
			}
		}
		.confirmBtn{
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			& text{
				width: 100rpx;
				height: 50rpx;
				font-size: 28rpx;
				color: #666666;
				text-align: center;
				line-height: 50rpx;
				border: 1px solid #E8E8E8;
				border-radius: 10rpx;
			}
		}
		.absenceStafflist {
			padding: 0 20rpx;
			background-color: #FFFFFF;
			overflow: hidden;
			border-top: 1px solid #E8E8E8;
	
		
			.absenceCollapse {
				/deep/ {
					.uni-collapse-cell {
						min-height: 100rpx;
					}
		
					.uni-collapse-cell__title {
						height: 100rpx;
						font-size: 26rpx;
						box-sizing: border-box;
						border-radius: 6rpx;
						border-bottom: 1px solid #E8E8E8;
					}
		
					.uni-collapse-cell__title-text {
						padding-left: 22rpx;
						font-size: 26rpx;
						color: #222222;
					}
		
					.uni-collapse-cell--open {
						background-color: #FFFFFF;
					}
		
					.uni-collapse-cell__title:active {
						background-color: #FFFFFF;
					}
		
					.uni-collapse-cell--hover {
						background-color: #FFFFFF;
					}
				}
		
				.absenceList {
					display: flex;
					align-items: center;
					height: 100rpx;
		
					& checkbox {
						flex: 1;
						display: flex;
						justify-content: center;
					}
		
					/deep/ {
						uni-checkbox .uni-checkbox-input {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							border-color: #d1d1d1;
						}
		
						uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
							color: #FFFFFF !important;
							background-color: #007aff !important;
						}
		
						uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
							font-size: 34rpx;
						}
					}
		
					& image {
						width: 60rpx;
						height: 60rpx;
						margin-right: 30rpx;
						border-radius: 50%;
					}
		
					&>view {
						flex: 5;
						display: flex;
						flex-direction: column;
						justify-content: center;
						height: 100%;
						line-height: 36rpx;
						border-bottom: 1px solid #E8E8E8;
		
						& text:nth-child(1) {
							font-size: 26rpx;
							color: #222222;
						}
		
						& text:nth-child(2) {
							font-size: 22rpx;
							color: #999999;
						}
					}
				}
			}
		}
	}
</style>
