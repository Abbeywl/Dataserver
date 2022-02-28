<template>
	<view style='text-align: center'>
		<image style="width: 100%;height: 360upx;" src="../../../static/login/select/company.png" @click="goPage('/pages/login/register/company')"></image>
		<image style="width: 100%;height: 360upx;" src="../../../static/login/select/person.png" @click="goPage('/pages/login/register/person')"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

           goPage(url){
			   uni.navigateTo({
			   	url
			   });
		   }
		}
	}
</script>

<style>
	.person {
		font-size: 20px;
		padding: 60px 16px;
		color: #FFFFFF;
		text-align: center;
		background: #C8C7CC;
		margin-top: 30px;
		border-radius: 8px;
	}

	.company {
		margin-top: 16px;
		font-size: 20px;
		padding: 60px 16px;
		color: #FFFFFF;
	
		text-align: center;
		background: #0055b8;
		border-radius: 8px;
	}
</style>
