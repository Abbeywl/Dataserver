<template>
	<view class="content">
		<mineInfo></mineInfo>
	</view>
</template>

<script>
	//引入tabbar组件
	import mineInfo from './mineInfo.vue'
	export default {
		components: {
			mineInfo
		},
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.content {}
</style>
<style>
	page {
		background-color: #F8F8F8;
	}
</style>
