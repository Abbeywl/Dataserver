<template>
	<!-- 底部导航栏 -->
	<view class="footTarbar">
		<!-- 统计报表 -->
		<view :class="{'active':tarbarStatus==true}" class="footChart" @click="transformation(jumpPage1)">
			<icon :class="iconClass1"></icon>
			<br/>
			<text>{{tabbarMenu[0].name}}</text>
		</view>
		<!-- 问题列表 -->
		<view :class="{'active':tarbarStatus==false}" class="footList" @click="transformation(jumpPage2)">
			<icon :class="iconClass2"></icon>
			<br/>
			<text>{{tabbarMenu[1].name}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:["tarbarStatus","jumpPage1","jumpPage2","tabbarMenu"],
		data() {
			return {
				iconClass1:'',
				iconClass2:''
			}
		},
		mounted() {
			this.iconClass1 = 'icon iconfont '+this.tabbarMenu[0].icon
			this.iconClass2 = 'icon iconfont '+this.tabbarMenu[1].icon
		},
		methods:{
			transformation(name){
				if(name==this.jumpPage2){
					uni.redirectTo({
						url:this.jumpPage2
					})
				}else{
					uni.redirectTo({
						// url:"../safetyCharts/safetyCharts"
						url:this.jumpPage1
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 底部tarbar */
	.footTarbar{
		width:100vw;
		height:100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom:0px;
		border-top:1px solid #AAACAE;
		background-color: #fff;
		box-sizing: border-box;
		z-index: 999;
		.footList, .footChart{
			text-align: center;
			font-size:12px;
			color:#AAACAE;
			icon{
				font-size:20px;	
			}
		}
		.active{
			color:#007AFF;
		}
	}
</style>
