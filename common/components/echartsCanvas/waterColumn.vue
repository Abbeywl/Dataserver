<template>
	<!-- easyEcharts 实例椭圆柱页面 -->
	<view class="line-chart">
		<view class="mar-bot20">
			<canvas class="chart" id="yuan" canvas-id="yuan"></canvas>
		</view>
		<view style="text-align: center;width: 100%;color: #fff;font-size: 16px;position: absolute;bottom: 20rpx;left: 0;">
			<text>油箱量</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				count: 0,
				timR: null,
			}
		},
		beforeDestroy() {
			// #ifdef H5
			cancelAnimationFrame(this.timR);
			// #endif
		
			// #ifdef APP-VUE || MP-WEIXIN
			clearInterval(this.timR);
			// #endif
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.chart').boundingClientRect(data => {
				this.drawYuanBar("yuan", data);
			}).exec();	
		},
		methods:{
			toFixedNumber(n = 2, val) { //去小数点后2位
				if (typeof val == "number") {
					return val.toFixed(n) * 1
				}
			},
			//绘制圆柱水球特效
			drawYuanBar(ids, canvas) {
				let ctx = uni.createCanvasContext(ids),
					w = canvas.width,
					h = canvas.height;
				//圆柱参数
				let grd = null, //canvas渐变样式
					angle = 0, //初始的位置变量 0
					A = 3, //A振幅
					cylinderArg = {
						lineWidth: 2,
						R: 40, //半径
						wave: {
							x: 0,
							y: 0
						}, //波浪的x,y坐标
						O: {
							x: 0,
							y: 0
						}, //圆柱中心 x,y坐标
						height: 70, //圆柱的总高度
						fillColor: {
							start: "#08466d",
							end: "#3397d6"
						}, //闭合wave波浪渐变颜色
						strokeColor: "#fff", //线条颜色
						waveStep: 0, //水波上升的初始位置
						waveHeight: 60, //水波所占圆柱高度的百分比【1 - 99】
						textStyle: { //文字样式
							fillColor: "#fff",
							fontSize: 16
						}
					};
				let eye = () => {
					ctx.translate(w / 2, h / 2);
					ctx.clearRect(-w / 2, -h / 2, w, h);
					ctx.setLineWidth(cylinderArg.lineWidth);
					ctx.setStrokeStyle(cylinderArg.strokeColor);
					ctx.beginPath();
					ctx.moveTo(cylinderArg.O.x - cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.quadraticCurveTo(cylinderArg.O.x, cylinderArg.O.y + cylinderArg.R + cylinderArg.height / 2,
						cylinderArg.O.x + cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.stroke();
					ctx.save();
					ctx.beginPath();
					ctx.setLineDash([3, 5]);
					ctx.moveTo(cylinderArg.O.x - cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.quadraticCurveTo(cylinderArg.O.x, cylinderArg.O.y - cylinderArg.R + cylinderArg.height / 2,
						cylinderArg.O.x + cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.stroke();
					ctx.restore();
					ctx.beginPath();
					ctx.moveTo(cylinderArg.O.x - cylinderArg.R, cylinderArg.O.y - cylinderArg.height / 2);
					ctx.quadraticCurveTo(cylinderArg.O.x, cylinderArg.O.y + cylinderArg.R - cylinderArg.height / 2,
						cylinderArg.O.x + cylinderArg.R, cylinderArg.O.y - cylinderArg.height / 2);
					ctx.moveTo(cylinderArg.O.x - cylinderArg.R, cylinderArg.O.y - cylinderArg.height / 2);
					ctx.quadraticCurveTo(cylinderArg.O.x, cylinderArg.O.y - cylinderArg.R - cylinderArg.height / 2,
						cylinderArg.O.x + cylinderArg.R, cylinderArg.O.y - cylinderArg.height / 2);
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(cylinderArg.O.x - cylinderArg.R, cylinderArg.O.y - cylinderArg.height / 2);
					ctx.lineTo(cylinderArg.O.x - cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.moveTo(cylinderArg.O.x + cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.lineTo(cylinderArg.O.x + cylinderArg.R, cylinderArg.O.y - cylinderArg.height / 2);
					ctx.stroke();
					cylinderArg.waveStep++;
					if (cylinderArg.waveStep >= cylinderArg.waveHeight) {
						cylinderArg.waveStep = cylinderArg.waveHeight;
					}
					grd = ctx.createLinearGradient(0, cylinderArg.height / 2, 0, -cylinderArg.height / 2);
					grd.addColorStop(0, cylinderArg.fillColor.start);
					grd.addColorStop(1, cylinderArg.fillColor.end);
					ctx.save();
					ctx.beginPath();
					ctx.setStrokeStyle(grd);
					ctx.setFillStyle(grd);
					for (angle = cylinderArg.O.x - cylinderArg.R; angle <= cylinderArg.O.x + cylinderArg.R; angle +=
						5) {
						cylinderArg.wave.y = A * Math.sin((angle + this.count) * 0.12 * Math.PI / A) + cylinderArg.R -
							cylinderArg.height * (cylinderArg.waveStep / 100);
						cylinderArg.wave.x = angle;
						ctx.lineTo(cylinderArg.wave.x, cylinderArg.wave.y);
					}
					ctx.lineTo(cylinderArg.O.x + cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.quadraticCurveTo(cylinderArg.O.x, cylinderArg.O.y + cylinderArg.R + cylinderArg.height / 2,
						cylinderArg.O.x - cylinderArg.R, cylinderArg.O.y + cylinderArg.height / 2);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();
					//---end 圆柱内侧水流动 
					ctx.beginPath();
					ctx.setTextAlign("center");
					ctx.setTextBaseline("middle");
					ctx.setFillStyle(cylinderArg.textStyle.fillColor);
					ctx.setFontSize(cylinderArg.textStyle.fontSize);
					ctx.fillText(this.toFixedNumber(1, cylinderArg.waveStep) + "%", cylinderArg.O.x, cylinderArg.O.y +
						cylinderArg.waveHeight / 2);
					ctx.fill();
					ctx.draw();
					// #ifdef H5
					this.count++;
					this.timR = requestAnimationFrame(eye);
					if (this.count > 2021) {
						this.count = 0;
					}
					// #endif
				}
				// #ifdef H5
				eye();
				// #endif
				// #ifdef APP-VUE || MP-WEIXIN
				this.timR = setInterval(() => {
					eye();
					this.count++;
					if (this.count > 15) {
						this.count = 0;
						clearInterval(this.timR);
					}
				}, 1)
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
