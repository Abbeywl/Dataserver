<template>
	<view>
		<view class="ring_chart">
			<ring-chart :dataAs="pieData" ref="ringChart0" canvasId="index_ring_1" :titleAs="{
								title: {
									name: '购买率'
								},
								subtitle: {
									name: '70%'
								}
							}" />
			<view style="text-align: center;line-height: 40px;">2021车辆购买比例</view>
		</view>
		<!-- <cardList :isShow="true" title='title' subTitle='subTitle' rightTitle="rightTitle"  :infoArr="infoArr()" :cardListImg='img()'/> -->
		<navigator url="./analysisDetail">
			<cardList title='张三' subTitle='' :borderIsRed="true" rightTitle="皖N·565778" :infoArr="infoArr()"
				:cardBottom="cardBottom()" :cardListImg='img()' />
		</navigator>
		<navigator url="./analysisDetail">
			<cardList title='黎是' subTitle='' :borderIsRed="true" rightTitle="皖N·565778" :infoArr="infoArr()"
				:cardBottom="cardBottom()" :cardListImg='img1()' />
		</navigator>
		<navigator url="./analysisDetail">
			<cardList title='鲁大师' subTitle='' :borderIsRed="true" rightTitle="皖N·565778" :infoArr="infoArr()"
				:cardBottom="cardBottom()" :cardListImg='img()' />
		</navigator>
		<navigator url="./analysisDetail">
			<cardList title='陈小春' subTitle='' :borderIsRed="true" rightTitle="皖N·565778" :infoArr="infoArr()"
				:cardBottom="cardBottom()" :cardListImg='img1()' />
		</navigator>
		<navigator url="./analysisDetail">
			<cardList title='柴桑' subTitle='' :borderIsRed="true" rightTitle="皖N·565778" :infoArr="infoArr()"
				:cardBottom="cardBottom()" :cardListImg='img()' />
		</navigator>
		<navigator url="./analysisDetail"></navigator>
		<!-- 			<cardList  title='title' subTitle='subTitle' :borderIsRed='false' rightTitle="rightTitle"  :cardBottom="cardBottom()" />
			<pictureList title='title' :infoArr="infoArr2()" :listImg="img()"rightTitle="rightTitle" subTitle='subTitle' />
			<pictureList title='title' :infoArr="infoArr2()"subTitle='subTitle' rightTitle="rightTitle"  /> -->
	</view>
</template>
<script>
	import pictureList from '../../common/components/pictureList/pictureList.vue'
	import cardList from '../../common/components/cardList/cardList.vue'
	import RingChart from '@/components/stan-ucharts/RingChart.vue';
	export default {
		components: {
			pictureList,
			cardList,
			RingChart
		},

		data() {
			return {
				pieData: {
					//饼状图数据
					series: [{
							name: '小型车',
							data: 50
						},
						{
							name: 'SUV',
							data: 30
						},
						{
							name: '微型车',
							data: 20
						},
						{
							name: '紧凑车型',
							data: 18
						},
						{
							name: 'MPV车型',
							data: 8
						}
					]
				}
			};
		},
		methods: {
			// 设置图片
			img() {
				return {
					isShow: true, //显示图片
					src: '../../static/interact-market/cover2.jpg'
				}
			},
			// 设置图片
			img1() {
				return {
					isShow: true, //显示图片
					src: '../../static/interact-market/cover1.jpg'
				}
			},
			// 获取所有数据列表
			infoArr() {
				// 获取所有数据列表
				return [{
					leftText: {
						value: '一汽大众',
					},
					// centerText:{
					// 	value:'',
					// },
					rightText: {
						value: '电话：1562154544',
					},
				}, {
					leftText: {
						value: '行驶里程: 55公里',
					},
					// centerText:{
					// 	value:'',
					// 	isWarning:false
					// },
					rightText: {
						value: '购买地址:上海枝江市公司',
						isWarning: true
					},
				}, {
					leftText: {
						value: '保养周期：2个月',
					},
					// centerText:{
					// 	value:'value',
					// },
					rightText: {
						value: '行驶时间：3.5h',
						isWarning: ""
					},
				}]
			},

			// 设置卡片底部信息
			cardBottom() {
				return {
					isShow: true,
					title: "动力类型：油电混合动力",
					cardInfo: [{
							icon: "icon-wenhao", //icon class
							value: "排量：1.5L",
						},
						{
							icon: "icon-wenhao", //icon class
							value: "变速箱：手动",
						},
						{
							icon: "icon-wenhao", //icon class
							value: "质保:2年",
						}
					]
				}
			},

		}
	}
</script>
