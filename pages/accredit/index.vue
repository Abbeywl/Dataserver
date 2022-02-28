<template>
	<view style="padding: 20px 10px;">
		<navigator url="./accreditDetail">
			<cardList title='张晓明' subTitle='' :borderIsRed="true" rightTitle="皖N·565778" :infoArr="infoArr()"
				:cardBottom="cardBottom()" :cardListImg='img()' />
		</navigator>
		<!-- <cardList  title='title' subTitle='subTitle' :borderIsRed='false' rightTitle="rightTitle"  :cardBottom="cardBottom()" /> -->
		<!-- <pictureList title='title' :infoArr="infoArr()" :listImg="img()"rightTitle="rightTitle" subTitle='subTitle' /> -->
		<!-- <pictureList title='title' :infoArr="infoArr()"subTitle='subTitle' rightTitle="rightTitle"  /> -->
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
						value: '车载信息服务提供商权限',
						isWarning: true
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
						// isWarning: true
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
