<template>
	<view class="content">
		<view class="shebei">
			<text>车辆定位</text>
			<view class="share">
				<map
					id='map'
					ref='map'
					style="width: 100%;height: 40vh;" 
					:latitude="latitude" 
					:longitude="longitude"
					:markers="markers">
				</map>
			</view>
			
		</view>
		<view class="shebei">
			<text>数据监控</text>
			<view class="share">
				<gauge />
			</view>
			
			<view class="second share">
				<waterColumn></waterColumn>
				<bollarc></bollarc>
			</view>
			<view class="second share">
				<wdj></wdj>
				<huan></huan>
			</view>
		</view>
		
		<view class="main">
			<view class="row_block">
				<view class="the_title" style="justify-content: space-between;">
					<view class="left_title">
						<view class="title_icon"></view>
						<text class="margin_stand-samll font-big wide">历史趋势</text>
					</view>
					<view class="right_btn">
						<view v-for="(item,index) in historyBtn" :key="index" :class="item.state ? 'active_btn':''"
							@click="changeHistoryBtn(item.type)">{{item.name}}</view>
					</view>
				</view>
				<view class="charts-box" style="height: 200px;">
					<qiun-data-charts type="line" canvasId="finance_a" :canvas2d="isCanvas2d" :resshow="delayload"
						:opts="{xAxis:{itemCount:12,disableGrid:true},yAxis:{disableGrid:true,data:[{disabled:true}]}}"
						:chartData="historyData" />
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import gauge from '@/common/components/echartsCanvas/gauge.vue';
	import waterColumn from '@/common/components/echartsCanvas/waterColumn.vue';
	import wdj from '@/common/components/echartsCanvas/wdj.vue';
	import bollarc from '@/common/components/echartsCanvas/bollarc.vue';
	import huan from '@/common/components/echartsCanvas/huan.vue';
	import dataOne from './1.json';
	export default {
		components: {
			gauge,
			waterColumn,
			wdj,
			bollarc,
			huan
		},
		data() {
			return {		 
				longitude: 0,        
				latitude: 0,	
				dataOne,
				isCanvas2d: this.$Config.ISCANVAS2D,
				delayload: false,
				historyData: {},
				markers: [
					{
						id: 1,
						latitude: 0.00011111,
						longitude: 0.00011111,
						iconPath: 'https://s2.ax1x.com/2020/03/10/8CvKmt.png',
						callout:{//自定义标记点上方的气泡窗口 点击有效  
					   　　content:'XX车辆',//文本
					   　　color:'#ffffff',//文字颜色
					   　　fontSize:14,//文本大小
					   　　borderRadius:2,//边框圆角
					  　　 bgColor:'#00c16f',//背景颜色
					   　　display:'ALWAYS',//常显
					   }
					}
				],
				historyBtn: [{
						name: "油耗量",
						state: 1,
						type: "expend"
					},
					{
						name: "违规数",
						state: 0,
						type: "income"
					},
					{
						name: "里程数",
						state: 0,
						type: "remaining"
					},
				],
			}
		},
		watch: {
			"historyBtn": {
				deep: true,
				handler: function(newVal, oldVal) {
					this.filterHistoryData();
				}
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			async getData() {
				uni.showLoading();
				this.filterHistoryData();
				await setTimeout(() => {
					this.delayload = true;
					uni.hideLoading();
				}, 1000)
			},
			changeHistoryBtn(type) {
				console.log(type)
				for (let i = 0; i < this.historyBtn.length; i++) {
					if (this.historyBtn[i].type == type) {
						this.historyBtn[i].state = 1
					} else {
						this.historyBtn[i].state = 0
					}
				}
			},
			filterHistoryData() {
				let type = this.historyBtn.filter(x => x.state == 1)[0].type;
				switch (type) {
					case "expend":
						this.historyData = this.dataOne.expend;
						break;
					case "income":
						this.historyData = this.dataOne.income;
						break;
					case "remaining":
						this.historyData = this.dataOne.remaining;
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		.shebei{
			padding: 10px;
			background-color: rgb(0,0,0);
			text{
				color: #ddd;
				font-weight: bold;
				margin-bottom: 5px;
				display: inline-block;
			}
		}
		.share{
			background-color: rgb(26,26,26);
			border-radius: 10px;
			margin-bottom: 10px;
		}
		.second{
			display: flex;
			justify-content: space-between;
		}
			
		.main {
			width: 100%;
			padding: 0 10rpx;
			box-sizing: border-box;
			margin-top: 20rpx;
			.right_btn {
				float: right;
				display: flex;
				color: #ccc;
				font-size: 22rpx;
		
				view {
					line-height: 50rpx;
					height: 50rpx;
					margin: 0 20rpx;
				}
		
				.active_btn {
					padding: 0rpx 20rpx;
					border: 1px solid #ccc;
					border-radius: 40rpx;
				}
			}
		
			.row_block {
				width: 100%;
				box-sizing: border-box;
				background-color: #fff;
				border-radius: 12rpx;
				position: relative;
				padding: 20rpx;
		
				&::after {
					content: "";
					height: 0px;
					width: 92%;
					position: absolute;
					transform: translateX(-50%);
					left: 50%;
					bottom: 0;
					border-top: 1px dashed #ccc;
				}
			}
			.the_title {
				display: flex;
				align-items: center;
			
				.left_title {
					display: flex;
					align-items: center;
				}
			
				.title_icon {
					background-color: #7E7E7E;
					height: 40rpx;
					width: 10rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
					font-size: 16px;
					font-weight: 600;
				}
			}
		}		
		
	}
</style>
