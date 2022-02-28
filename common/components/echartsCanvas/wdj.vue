<template>
	<!-- easyEcharts 实例页面 -->
	<view class="line-chart">
		<view>
			<view class="mar-bot20">
				<canvas class="chart" canvas-id="wdj" id="wdj"></canvas>
			</view>
			<view style="text-align: center;width: 100%;color: #fff;font-size: 16px;position: absolute;bottom: 10rpx;left: 0;">
				<text>车内温度</text>
			</view>
		</view>
	</view>		
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.chart').boundingClientRect(data => {
				this.wdjDraw("wdj",data);
			}).exec();
		},
		methods:{
			wdjDraw(ids,dom){//温度计
				let ctx = uni.createCanvasContext(ids),
					grid = {
						tube:{//上侧管子
							fillColor: "#fff",
							x: dom.width/2,//管子距离左侧的 间隔值
							y: 15,//管子最上侧距离顶端 间隔值
							width: 12,//管子的宽度值
							val: 10,//每个刻度代表多少°C
							positive: 0.5,//正数所占管子的长度 0.7 0~1
							negative: 0.5,//负数所占管子的长度 0.3 0~1
						},
						splitLine:{//刻度参数
							len: 9,//长度值
							numer: 10,//切割几份
							color: '#fff'
						},
						waterColor: "#3c9cff",//温度计中间管子 水银颜色
						ball:{//底侧球形
							fillColor: "#3c9cff",//底部大球水银的颜色
							x: dom.width/2,//底侧球形的圆心x轴距离左侧的 值
							y: dom.height-15- 10,// 15是半径 距离最低端 间隔值 10
							R: 15,//半径
						},
					};
				let timeR = null, nowC = 35,
					totalC = (grid.splitLine.numer*grid.tube.positive)*grid.tube.val,
					nowLen = null,
					onTimeC = 35;//当前要显示的温度 35℃
				let drawC = ()=>{
					ctx.clearRect(0,0,dom.width,dom.height);
					//管子刻度
					ctx.beginPath();ctx.setLineWidth(1);
					ctx.setTextAlign("right");ctx.setTextBaseline("middle");
					ctx.setLineCap("round");
					let zDist = grid.ball.y - grid.ball.R - grid.tube.y,//值 总长
						zSplit = zDist/grid.splitLine.numer;
					for(let n = 0; n <= grid.splitLine.numer;n++){
						if(n >= grid.splitLine.numer*grid.tube.positive){// 0 °C的界限 以下是负数
							let maxLen = n==grid.splitLine.numer*grid.tube.positive? 3:0;
							ctx.setFillStyle(grid.splitLine.color);
							ctx.setStrokeStyle(grid.splitLine.color);
							ctx.moveTo(grid.tube.x - grid.splitLine.len-maxLen, grid.tube.y + n*zSplit);
							ctx.lineTo(grid.tube.x, grid.tube.y + n*zSplit);
							ctx.fillText((grid.splitLine.numer*grid.tube.positive-n)*grid.tube.val,grid.tube.x - grid.splitLine.len-5, grid.tube.y + n*zSplit);
						}else{//以下是正数
							ctx.setFillStyle(grid.splitLine.color);
							ctx.setStrokeStyle(grid.splitLine.color);
							ctx.moveTo(grid.tube.x - grid.splitLine.len, grid.tube.y + n*zSplit);
							ctx.lineTo(grid.tube.x, grid.tube.y + n*zSplit);
							ctx.fillText((grid.splitLine.numer*grid.tube.positive-n)*grid.tube.val,grid.tube.x - grid.splitLine.len-5, grid.tube.y + n*zSplit);
						}
					}
					ctx.stroke();
					
					//上侧管子	
					ctx.beginPath();ctx.setLineWidth(grid.tube.width);ctx.setLineCap("round");
					ctx.setStrokeStyle(grid.tube.fillColor);
					ctx.moveTo(grid.tube.x, grid.tube.y);
					ctx.lineTo(grid.ball.x,grid.ball.y - grid.ball.R);
					ctx.stroke();
					//下侧
					ctx.beginPath();ctx.setLineWidth(1);ctx.setFillStyle(grid.ball.fillColor);
					ctx.arc(grid.ball.x,grid.ball.y,grid.ball.R,0,2*Math.PI);
					ctx.fill();
					//水柱上升 显示温度
					nowLen = nowC/totalC*grid.tube.positive;
					
					ctx.beginPath();ctx.setLineWidth(grid.tube.width);ctx.setLineCap("butt");
					ctx.setStrokeStyle(grid.waterColor);ctx.setFontSize(12);ctx.setTextAlign("left");
					ctx.moveTo(grid.ball.x, grid.ball.y - grid.ball.R+2);
					ctx.lineTo(grid.tube.x, 
						grid.ball.y - grid.ball.R -(grid.ball.y - grid.ball.R - grid.tube.y)*grid.tube.negative -(grid.ball.y - grid.ball.R - grid.tube.y)*nowLen);
					ctx.fillText(nowC+"°C", grid.tube.x + grid.tube.width, 
						grid.ball.y - grid.ball.R -(grid.ball.y - grid.ball.R - grid.tube.y)*grid.tube.negative -(grid.ball.y - grid.ball.R - grid.tube.y)*nowLen);
					ctx.stroke();
					ctx.draw();	
				}
				//当onTimeC 超出显示温度时显示最大值
				if(onTimeC > totalC){
					uni.showToast({
					    title: "温度超出显示范围,只显示最大值"+totalC,
						icon:"none",
					    duration: 2000
					});
					onTimeC = totalC;
				}
				//定时器 动态显示温度
				timeR = setInterval(()=>{
					drawC();
					clearInterval(timeR);
					// if(onTimeC>0){
					// 	nowC++;
					// 	drawC();
					// 	if(nowC >= onTimeC){
					// 		nowC = onTimeC;
					// 		clearInterval(timeR);
					// 	}
					// }else{
					// 	nowC--;
					// 	drawC();
					// 	if(nowC <= onTimeC){
					// 		nowC = onTimeC;
					// 		clearInterval(timeR);
					// 	}
					// }
				},60)
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
		margin-bottom: 20rpx;
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
