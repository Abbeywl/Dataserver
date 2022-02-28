<template>
	<!-- 仪表盘 -->
	<view class="line-chart">
		<!-- <view class="mar-bot20">
			<canvas class="chart" id="Gauge" canvas-id="Gauge"></canvas>
		</view> -->
		<!-- 双仪表展示 -->
		<view class="mar-bot20">
			<canvas class="chart" id="Gauge2" canvas-id="Gauge2"></canvas>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				yuanArg: { //设置仪表盘的样式尺寸
					arcTextVal: "202.6V", //显示的刻度
					textValStyle: {
						color: "#34ED67"
					},
					textValStyleRight: {
						color: "#fff"
					},
					textTitleStyle: {
						color: "#fff"
					},
					arcTextTitle: "车内电压", //显示的title
					arcTextValRight: "20.7A", //显示的刻度 右侧电流
					arcTextTitleRight: "车内电量", //显示的title-右侧电流表
					totalVal: 260, //整个圆弧代表260
					dataVal: (202.6 / 260).toFixed(2), //圆弧270总弧度（0-270），val/270*100%数据占圆弧的百分比
					totalValRight: 30, //整个圆弧代表30
					dataValRight: (20.7 / 30).toFixed(2), //圆弧270总弧度（0-270），val/270*100%数据占圆弧的百分比【0~1】		
					arcOutLineWidth: 6, //外圆弧的线条宽
					arcOutRadius: 0.36, //设置仪表盘最外层圆弧的R半径
					arcUpColor: "#34ED67", //设置数据 上层 圆弧颜色
					arcDownColor: "#fff", //设置 最下层圆弧的底色
					arcUpColorRight: "#3c9cff", //设置数据 上层 圆弧颜色-右侧
					arcDownColorRight: "#fff", //设置 最下层圆弧的底色-右侧
					splitRadiusMax: [0.36, 0.32], //长刻度线条的在圆弧的半径R区间 外层 2R[0*canvas.height,1*canvas.height]
					splitRadiusMin: [0.32, 0.29], //短刻度线条的在圆弧的半径R区间	 内层
				}
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.chart').boundingClientRect(data => {
				//this.drawPanel("Gauge", data);
				this.drawPanel2("Gauge2", data);
			}).exec()
		},
		methods:{
			//绘制仪表盘
			drawPanel(ids, data) {
				let context = uni.createCanvasContext(ids);
				context.setStrokeStyle(this.yuanArg.arcDownColor); //地下灰色背景圆弧
				context.setLineWidth(this.yuanArg.arcOutLineWidth);
				context.setLineCap('round');
				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2 圆arc的半径R = h*0.4(圆的直径占整个canvas的高80%,默认顺时针方向3点钟为0°起始绘制弧形角度135，-45完整圆弧区间)
				context.arc(data.width / 2, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180,
					405 * Math.PI / 180);
				context.stroke();
			
				context.setStrokeStyle(this.yuanArg.arcUpColor); //数据  值占整个圆弧的百分比
				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2
				context.arc(data.width / 2, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180,
					(135 + this.yuanArg.dataVal * 270) * Math.PI / 180);
				context.stroke();
			
				context.setStrokeStyle("rgba(33,44,103,0.5)");
				context.setLineWidth(2);
			
				var R = data.height * this.yuanArg.splitRadiusMax[0] - this.yuanArg.arcOutLineWidth / 2 - 1,
					R2 = data.height * this.yuanArg.splitRadiusMax[1],
					parent = 12,
					O = {
						x: data.width / 2,
						y: data.height / 2
					};
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				var R = data.height * this.yuanArg.splitRadiusMin[0],
					R2 = data.height * this.yuanArg.splitRadiusMin[1],
					parent = 72,
					O = {
						x: data.width / 2,
						y: data.height / 2
					};
				context.setStrokeStyle("#999");
				context.setLineWidth(1);
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				context.setFontSize(20);
				context.setTextAlign("center");
				context.setTextBaseline("middle");
				context.setFillStyle(this.yuanArg.textValStyle.color);
				context.fillText(this.yuanArg.arcTextVal, data.width / 2, data.height / 2); //电压值在圆心中间位置
				context.setFillStyle(this.yuanArg.textTitleStyle.color);
				context.setFontSize(16);
				context.fillText(this.yuanArg.arcTextTitle, data.width / 2, data.height / 2 + data.height *
				0.3); //圆的下方位置30%
				context.draw();
			},
			//双仪表盘
			drawPanel2(ids, data) {
				let context = uni.createCanvasContext(ids);
				let leftSizeX = data.width / 4,
					rightSizeX = data.width / 4 * 3;
				context.setStrokeStyle(this.yuanArg.arcDownColor); //地下灰色背景圆弧
				context.setLineWidth(this.yuanArg.arcOutLineWidth); //设置线条宽度
				context.setLineCap('round');
			
				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2 圆arc的半径R = h*0.4(圆的直径占整个canvas的高80%,
				//默认顺时针方向3点钟为0°起始绘制弧形角度135，-45完整圆弧区间 共270deg)
				context.arc(leftSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, 405 *
					Math.PI / 180);
				context.stroke();
				context.setStrokeStyle(this.yuanArg.arcDownColorRight); //数据  值占整个圆弧的百分比
			
				context.beginPath();
				context.arc(rightSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180,
					405 * Math.PI / 180);
				context.stroke();
				context.setStrokeStyle(this.yuanArg.arcUpColor); //数据  值占整个圆弧的百分比
			
				context.beginPath();
				//在canvas中间建立圆心 w/2,h/2
				context.arc(leftSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, (
					135 + this.yuanArg.dataVal * 270) * Math.PI / 180);
				context.stroke();
			
				context.setStrokeStyle(this.yuanArg.arcUpColorRight); //数据  值占整个圆弧的百分比
				context.beginPath();
				context.arc(rightSizeX, data.height / 2, data.height * this.yuanArg.arcOutRadius, 135 * Math.PI / 180, (
					135 + this.yuanArg.dataValRight * 270) * Math.PI / 180);
				context.stroke();
				//左侧刻度尺 也是默认刻度尺
				this.drawSplitLine(context, leftSizeX, data, this.yuanArg.arcTextVal, this.yuanArg.arcTextTitle);
				//右侧刻度尺 电流
				this.drawSplitLine(context, rightSizeX, data, this.yuanArg.arcTextValRight, this.yuanArg
				.arcTextTitleRight);
				context.draw();
			},
			//刻度分离函数
			drawSplitLine(context, leftSizeX, data, val, title) {
				context.setStrokeStyle("rgba(33,44,103,0.5)");
				context.setLineWidth(2);
				var R = data.height * this.yuanArg.splitRadiusMax[0] - this.yuanArg.arcOutLineWidth / 2 - 1,
					R2 = data.height * this.yuanArg.splitRadiusMax[1],
					parent = 12,
					O = {
						x: leftSizeX,
						y: data.height / 2
					};
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				var R = data.height * this.yuanArg.splitRadiusMin[0],
					R2 = data.height * this.yuanArg.splitRadiusMin[1],
					parent = 72,
					O = {
						x: leftSizeX,
						y: data.height / 2
					};
				context.setStrokeStyle("#999");
				context.setLineWidth(1);
				for (var ix = 0; ix < parent; ix++) {
					var x = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R,
						y = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R,
						x2 = O.x + Math.cos(Math.PI / 180 * ix * 360 / parent) * R2,
						y2 = O.y + Math.sin(Math.PI / 180 * ix * 360 / parent) * R2;
					context.beginPath();
					if (135 < ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					} else if (45 > ix * 360 / parent && ix % 6 != 0) {
						context.moveTo(x, y, 1, 0, 2 * Math.PI);
						context.lineTo(x2, y2, 1, 0, 2 * Math.PI);
					}
					context.stroke();
				}
				context.setFontSize(20);
				context.setTextAlign("center");
				context.setTextBaseline("middle");
				context.setFillStyle(this.yuanArg.textValStyleRight.color);
				context.fillText(val, leftSizeX, data.height / 2); //电压值在圆心中间位置
				context.setFillStyle(this.yuanArg.textTitleStyle.color);
				context.setFontSize(16);
				context.fillText(title, leftSizeX, data.height / 2 + data.height * 0.3); //圆的下方位置30%
			},
		}
	}
</script>

<style scoped>
	.line-chart {
		padding: 20rpx;
	}
	.mar-bot20 {
		margin-bottom: 0;
	}
	.abs {
		height: 26px;
		width: 100%;
		text-align: right;
	}
	.chart {
		width: 100%;
		height: 300rpx;
		/* background: #f8f8f8; */
		border-radius: 10rpx;
	}
	.inline-block {
		display: inline-block;
		height: 26px;
		line-height: 26px;
		padding: 0 10rpx;
	}
</style>
