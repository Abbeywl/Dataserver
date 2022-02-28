<template>
	<view class="content">
		<!-- 环形图 -->
		<u-row class="u-m-t-20">
			<u-col span="12">
				<view class="echarts"> 
					<histogram-chart :dataAs="histogramData" canvasId="ht0" />
				</view>
			</u-col>
		</u-row>
		<!-- 环形图问题 -->
		<u-row>
			<u-col span="12" >
				<itemCard :isShowShadow="true" :isShowRadius="true" :isShowDes="true" :cardArr="annularData"></itemCard>
			</u-col>
		</u-row>
		<!-- 工单统计 -->
		<!-- <u-row class="u-m-t-20 u-p-b-20">
			<u-col span="12">
				<view>
					<line-chart
					canvasId="index_line_1"
					:dataAs="lineData"
					:yAxisAs="{
						formatter: {
							type: 'percent', //type:number percent String,额外参数:fixed:NUmber,name:String
							fixed: 2
						}
					}"
				/>
				</view>
			</u-col>
		</u-row> -->
		<!-- 底部导航 -->
		<u-row>
			<u-col span="12">
				<tarbar :tarbarStatus="tarbarStatus" :tabbarMenu="tabbarMenu" :jumpPage2="'./issueSafety'"></tarbar>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import tarbar from '../../common/components/tarbar/tarbar.vue';	//引入底部导航栏
	import itemCard from '../../common/components/itemCard/itemCard.vue'//引入问题列表
	import HistogramChart from '@/components/stan-ucharts/HistogramChart.vue';
	import ArcbarChart from '@/components/stan-ucharts/ArcbarChart.vue';
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	import PieChart from '@/components/stan-ucharts/PieChart.vue';
	import RingChart from '@/components/stan-ucharts/RingChart.vue';
	export default {
		components:{
		tarbar,
		itemCard,	
		HistogramChart,
		ArcbarChart,
		LineChart,
		PieChart,
		RingChart},
		data() {
			return {
				tarbarStatus:true,
				tabbarMenu:[{
					name: '统计',
					icon: 'icon-tongji1'
				},{
					name: '工单',
					icon: 'icon-gongdan'
				}],
				annularOption: {},//环形图数据
				annularData:[],//保存环形图所有数据
				issueCountOption:{},
				flag:false,
				commonIP:uni.getStorageSync("commonIP"),//保存ip地址
				histogramData: {
					//总模板
					categories: ['2042', '2013', '2014', '2015', '2016', '2017', '2018'],
					series: [
						{
							name: '成交量1', //数据名称
							data: [
								15,
								{
									//(饼图、圆环图、玫瑰图为Number) 数据，如果传入null图表该处出现断点
									value: 20, //	仅针对柱状图有效，主要作用为柱状图显示数值
									color: '#f04864' //仅针对柱状图有效，主要作用为柱状图自定义颜色,可覆盖外框定义主题颜色
								},
								45,
								37,
								43,
								34,
								45
							],
							show: true, //图形显示状态，配合点击图例显示状态，也可默认指定是否显示
							color: '#FF7600', //	图形颜色 不传入则使用系统默认配色方案 即统一柱状图颜色
							textSize: 12 //图形上方标注文字的字体大小
							//如涉及混合图表请看 http://doc.ucharts.cn/1172126
						},
						{
							name: '成交量2',
							data: [
								30,
								{
									value: 40,
									color: '#facc14'
								},
								25,
								14,
								34,
								18,
								20
							]
						}
					]
				},
			lineData: {
				//带百分比的图--折线图数据
				categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
				series: [
					{ name: '成交量A', data: [0.3511, 0.8233, 0.25, 0.37, 0.4, 0.2] },
					{ name: '成交量B', data: [0.7, 0.4, 0.65, 0.1, 0.44, 0.68] },
					{ name: '成交量C', data: [0.1, 0.8, 0.95, 0.15, 0.112, 0.132] }
				]
			},
			}
		},
		//监听页面
		onLoad(options) {
			this.loadAnnularChart()
			this.loadlLine();
		},
		methods: {
			//获取折线图
			loadlLine(){
			
				
			},
			loadAnnularChart(){
				this.annularData=[
					{num:23,name:'客户总量',des:'(近一个月)',color:'#F7A831'},
					{num:85+'%',name:'购买率',color:'#F75676'},
					{num:9,name:'待沟通',color:'#3CC9E2'}
				]
				
			},
			echartsClick(params) {
				// console.log('点击数据', params)
			},
		}
	}
</script>
<style>
@import url("../../static/iconfont/iconfont/iconfont.css");</style>
<style lang="scss" scoped>
	.content{
		.echarts {
			width: 100%;
			height: 800rpx;
			overflow: auto;
			margin-bottom: 40px;
		}	
		.echartsLine {
			width: 100%;
			height: 600rpx;
		}
	}
		
</style>
