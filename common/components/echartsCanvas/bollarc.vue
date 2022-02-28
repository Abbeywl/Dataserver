<template>
	<!-- easyEcharts 实例页面 -->
	<view class="line-chart">
		<view class="mar-bot20">
			<canvas class="chart" canvas-id="boll" id="boll"></canvas>
		</view>
		<view style="text-align: center;width: 100%;color: #fff;font-size: 16px;position: absolute;bottom: 20rpx;left: 0;">
			<text>水箱量</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				bollStep: 0,
				bollTimeR: null,
			}
		},
		beforeDestroy() {
			// #ifdef H5
			cancelAnimationFrame(this.bollTimeR);
			// #endif
			
			// #ifdef APP-VUE || MP-WEIXIN
			clearInterval(this.bollTimeR);
			// #endif
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
				query.select('.chart').boundingClientRect(data => {
					this.drawBollWave("boll", data);
				}).exec();
		},
		methods:{
			toFixedNumber(n = 2, val) { //去小数点后2位
				if (typeof val == "number") {
					return val.toFixed(n) * 1
				}
			},
			//绘制原型水球
			drawBollWave(ids, elem) {
				let ctx = uni.createCanvasContext(ids),
					w = elem.width,
					h = elem.height,
					grd = null, //渐变色grd
					angle = 0,
					x = 0,
					y = 0,
					y2 = 0,
					part = 0; //part声波初始位置
				let grid = {
					top: 15 * h / 100, //水球距离顶的 15%
				};
				let bollArg = {
					R: h / 2 - grid.top, //圆半径
					O: {
						x: w / 2,
						y: h / 2
					}, //圆心坐标 x, y
					A: 3, //振幅
					vs: 20, //声波运动速度 越大值 越慢
					lineWidth: 2,
					waveOpacity: 1, //水波的透明度
					waveHeight: 60, // 80百分之80%（占整个水球的百分比高度）
					angleStep: 5, //声波上圆点间隔的距离
					waveLen: 60, //波长
					waveStyle: {
						fillColor: {
							start: "#34EDA3",
							end: "#212C67"
						},
						strokeColor: "#212C67"
					}, //波浪颜色样式
					oStyle: {
						fillColor: "#212C67",
						strokeColor: "#999"
					}, //圆的颜色样式
					textStyle: {
						fillColor: "#fff",
						fontSize: 26
					},
				}
				let drawBoll = () => {
					ctx.clearRect(0, 0, w, h);
					ctx.save();
					ctx.beginPath();
					ctx.setLineWidth(bollArg.lineWidth);
					ctx.setStrokeStyle(bollArg.oStyle.strokeColor);
					ctx.setFillStyle(bollArg.oStyle.fillColor);
					ctx.arc(bollArg.O.x, bollArg.O.y, bollArg.R, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					ctx.clip();
					grd = ctx.createLinearGradient(0, 0, bollArg.O.y - bollArg.R, bollArg.O.y + bollArg.R);
					grd.addColorStop(0, bollArg.waveStyle.fillColor.start);
					grd.addColorStop(1, bollArg.waveStyle.fillColor.end);
					ctx.globalAlpha = bollArg.waveOpacity;
					ctx.beginPath();
					ctx.setStrokeStyle(bollArg.waveStyle.strokeColor);
					ctx.setFillStyle(grd);
					ctx.moveTo(bollArg.O.x - bollArg.R, bollArg.O.y + bollArg.R + bollArg.A);
					for (angle = bollArg.O.x - bollArg.R; angle < bollArg.O.x + bollArg.R + bollArg.angleStep; angle +=
						bollArg.angleStep) {
						y = bollArg.A * Math.sin(this.bollStep / bollArg.vs + angle / bollArg.waveLen * Math.PI * 2);
						// y2 = bollArg.A * Math.cos(this.bollStep / bollArg.vs + angle / bollArg.waveLen * Math.PI * 2);
						x = angle;
						ctx.lineTo(x, (y + bollArg.R * 2 + bollArg.A + grid.top) - part * 0.01 * (bollArg.R * 2 *
							bollArg.waveHeight / 100));
						// ctx.lineTo(x, (y2 + bollArg.R * 2 + bollArg.A + grid.top) - part * 0.01 * (bollArg.R * 2 *
						// 		bollArg.waveHeight / 100));
					}
					ctx.lineTo(bollArg.O.x + bollArg.R, bollArg.O.y + bollArg.R + bollArg.A);
					ctx.fill();
					ctx.restore();
			
					ctx.beginPath();
					ctx.setTextAlign("center");
					ctx.setTextBaseline("middle");
					ctx.setFillStyle(bollArg.textStyle.fillColor);
					ctx.setFontSize(bollArg.textStyle.fontSize);
			
					ctx.fillText(this.toFixedNumber(2, bollArg.waveHeight * 0.01 * part) + "%", bollArg.O.x, bollArg.O
						.y);
					ctx.fill();
					ctx.draw();
			
					part++;
					if (part >= 100) {
						part = 100;
					}
			
					// #ifdef H5
					this.bollStep++;
					if (this.bollStep > 2012) {
						this.bollStep = 0;
					}
					this.bollTimeR = requestAnimationFrame(drawBoll);
					// #endif
				}
				// #ifdef H5
				drawBoll();
				// #endif
				// #ifdef APP-VUE || MP-WEIXIN
				this.bollTimeR = setInterval(() => {
					drawBoll();
					this.bollStep++;
					if (this.bollStep > 15) {
						this.bollStep = 0;
						clearInterval(this.bollTimeR);
					}
				}, 1);
				// #endif
			},
		}
	}
</script>
<style scoped>
	.line-chart {
		padding: 20rpx;
		width: 50%;
		position: relative;
	}
	.mar-bot20 {
		
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
