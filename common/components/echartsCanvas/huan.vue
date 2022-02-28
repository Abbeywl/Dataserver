<template>
	<!-- easyEcharts 实例页面 -->
	<view class="line-chart">
		<view class="mar-bot20">
			<canvas class="chart" id="huan" canvas-id="huan"></canvas>
		</view>
		<view style="text-align: center;width: 100%;color: #fff;font-size: 16px;position: absolute;bottom: 20rpx;left: 0;">
			<text>车速</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				huanArg: { //仪表通用参数
					lineWidth: 15,
					step: 100,
				},
				huanData: [ //仪表数据style参数
					{
						num: '30km/h',//‘12#’‘12%中文’number，string
						title: "车速",
						ids: "huan", //canvas -id
						bgColor: "#fff", //底下环的颜色 
						color: "#409EFF", //上层环的颜色
						part: 0.15 //环占整个圆的百分比
					}
				],
			}
		},
		beforeDestroy() {
			// #ifdef H5
			cancelAnimationFrame(this.timeR);
			// #endif
		
			// #ifdef APP-VUE || MP-WEIXIN
			clearInterval(this.timeR);
			// #endif
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.chart').boundingClientRect(dom => {
				//绘制环形带动画效果
				this.drawHuan(this.huanData[0].ids, this.huanData[0].bgColor, this.huanData[0].color, 
						this.huanData[0].part, this.huanData[0].num, false, 0, dom);
			}).exec()
		},
		methods:{
			//绘制环形进度
			drawHuan(ids, bgColor, setColor, part, textName, isTrue, indxs, data) {
				let domWidth = data.width,
					domHeight = data.height,
					huanR = domHeight / 2 - this.huanArg.lineWidth;
				let ctx = uni.createCanvasContext(ids);
				//上层环形的颜色宽度
				let drawHuan = () => {
					ctx.clearRect(0, 0, domWidth, domHeight);
					ctx.beginPath();
					ctx.setStrokeStyle(bgColor);
					ctx.setLineWidth(this.huanArg.lineWidth - 5);
					ctx.arc(domWidth / 2, domHeight / 2, huanR, 0, 2 * Math.PI);
					ctx.stroke();
					if (part > 0) {
						ctx.save();
						ctx.translate(domWidth / 2, domHeight / 2);
						ctx.rotate(Math.PI);
						ctx.beginPath();
						ctx.setLineCap('round');
						ctx.setStrokeStyle(setColor);
						ctx.setShadow(0, 0, 5, setColor);
						ctx.setLineWidth(this.huanArg.lineWidth);
						ctx.arc(0, 0, huanR, 0, 2 * Math.PI * (part * this.huanArg.step) / 100, isTrue);
						ctx.stroke();
						ctx.restore();
						ctx.setTextAlign('center');
						ctx.setTextBaseline('middle'); //绘制文字
						ctx.setFontSize(20);
						ctx.setFillStyle('#fff');
						ctx.fillText(textName, domWidth / 2, domHeight / 2);
						// #ifdef H5
						window.requestAnimationFrame(drawHuan);
						this.huanArg.step++;
						if (this.huanArg.step >= 100) {
							this.huanArg.step = 100;
							window.cancelAnimationFrame(this.timeR);
						}
						// #endif
					}
					ctx.draw();
				}
				// #ifdef H5
				drawHuan();
				// #endif
			
				// #ifdef APP-VUE || MP-WEIXIN
				this.timeR = setInterval(() => {
					drawHuan();
					this.huanArg.step++;
					if (this.huanArg.step >= 100) {
						this.huanArg.step = 100;
						clearInterval(this.timeR);
					}
				}, 100 / 60);
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
		height: 250rpx;
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
