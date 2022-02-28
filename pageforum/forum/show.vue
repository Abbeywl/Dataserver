<template>
	<view v-if="pageLoad">
		 
		<view class="main-body pd-5 bg-fff">
			
			<view class="d-title" style="text-align: center;">本田CR-V</view>
			<commonDetail :detailArr="detailArr" :detailImg="finishImg" :operate="operate"></commonDetail>
			
			<view class="d-content">

				<div class="flex-col flex-center mgb-5">
					<image class="wmax mgb-5" mode="widthFix" src="../../static/image/car4.jpg"></image> 
					<image class="wmax mgb-5" mode="widthFix" src="../../static/image/dd.jpg"></image> 
					<image class="wmax mgb-5" mode="widthFix" src="../../static/image/kv.jpg"></image> 
				</div>
				
			</view>
			<view class="flex flex-center mgb-10">
				<view class="btn-love btn-love-active mgr-10">
					喜欢
				</view>

			</view>
		</view>
		
	</view>
</template>

<script>
	import commonDetail from '../../common/components/commonDetail/commonDetail.vue';
	var app = require("../../common/common.js");
	var id;
	export default {
		components: {		
			commonDetail,
		},
		data:function(){
			return {
				pageLoad: true, 
				detailArr :[
					//列表想起数据
					{
						name: '厂商指导价',
						value: '40.00-52.2万'
					},
					{
						name: '厂商',
						value: '东风日产'
					},
					{
						name: '级别',
						value: '紧凑型SUV'
					},
					{
						name: '容量',
						value: '83.1kWh'
					},
					{
						name: '纯电续航',
						value: '560KM'
					},
					{
						name: '上市时间',
						value: "2021.09"
					},
					{
						name: '发动机',
						value: '2.0L 151马力L4'
					},
				],
				operate :{
					//检查项
					isShow: true,
					text: '检查项',
					src: ''
				},
				finishImg: {},
			}
			
		},
		onLoad: function (option) {
			id = option.id;	
		},
		methods: {},
	}
</script>
<style>
	@import "../../static/css/index-app.css";
	@import "../../common/iconfont.css";
	@import "../../common/dt-ui-uni.css";
	@import "../../common/forum.css";
</style>

 
