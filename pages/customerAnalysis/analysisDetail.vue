<template>
	<view class="content">
		<!-- 工单描述部分 -->
		<u-row>
			<u-col span="12">
				<commonDetail :detailArr="detailArr" :detailImg="finishImg" :operate="operate"></commonDetail>
			</u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<u-row class="imageBox u-p-l-30 u-p-r-30 u-col-top-important u-p-t-20 u-p-b-20 u-font-28">
			<u-col span="3"><text>照片</text></u-col>
			<u-col span="9" class="u-flex u-flex-wrap">
				<view class="u-m-r-10 u-m-b-10 imageBg">
						<u-image border-radius="10rpx" height="200rpx" src="@/static/image/ad.jpg"
							mode="aspectFit"></u-image>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import commonDetail from '../../common/components/commonDetail/commonDetail.vue';
	export default {
		components: {
			commonDetail,
		},
		data() {
			return {
				issueId: '', //跳转过来的工单id
				detailArr: [
							//列表想起数据
							{
								name: '车牌号',
								value: '沪C·676755'
							},
							{
								name: '车型',
								value: '一汽大众'
							},
							{
								name: '电话',
								value: '18712124546'
							},
							{
								name: '购买地址',
								value: '上海枝江市公司'
							},
							{
								name: '保养周期',
								value: '2021-02-12'
							},{
								name: '行驶时间',
								value: '3.5h'
							},
							{
								name: '问题类型',
								value: '后尾灯刮蹭修复'
							},
							{
								name: '分区',
								value: '请选择'
							},
							{
								name: '电话',
								value: ''
							},
							{
								name: '问题描述',
								value: '右侧后尾车灯刮蹭，掉漆'
							}
						],
				operate: {}, //检查项
				finishImg: {//是否有验收成功的图片
					isShow: true ,
					src: '../../static/interact-market/cover2.jpg'},
				operate : {
					//检查项
					isShow: true,
					text: '张三',
					src: '../../static/interact-market/cover2.jpg'
				},
			
			};
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;

		.imageBox {
			color: #999;

			.imageBg {
				width: 150rpx;
				height: 200rpx;
				background-color: #000;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.timeLineBox {
			padding-bottom: 160rpx;
		}

		.footerBar {
			z-index: 1000000;
			width: 100vw;
			height: 150rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0px;
			font-family: PingFang SC;
			font-weight: 400;

			& view:first-child {
				width: 20vw;
				display: flex;
				flex-direction: column;
				text-align: center;

				icon {
					font-size: 38rpx;
				}

				text {
					font-size: 20rpx;
					color: #666666;
				}
			}

			& .btns {
				border: 1px solid #999;
				border-right: none;
				height: 80rpx;
				width: 70%;
				line-height: 80rpx;
				border-radius: 40rpx;

				text {
					display: inline-block;
					height: 80rpx;
					width: 50%;
					border-radius: 0 40rpx 40rpx 0;
					color: #0089ff;
				}

				text:last-child {
					background-color: #0089ff;
					color: #fefefe;
				}
			}

			& .btn {
				width: 70vw;
			}

			.viewStyle {
				margin-left: 40vw;
			}
		}
	}
</style>
