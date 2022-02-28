<template>
	<view>
		<SortPickerList ref="sortPickerList" @clickData="clickData"></SortPickerList>
	</view>
</template>
<script>
	import SortPickerList from "@/common/components/nickro-sortPickerList.vue"
	export default {
		name:"contury",
		components: {SortPickerList},
		data() {
			return {
				dataArr: [
					{ name: '中国', value: 'China'},
					{ name: '俄罗斯', value: 'Russia' },
					{ name: '美国', value: 'America' },
					{ name: '澳大利亚', value: 'Australia' },
					{ name: '巴西', value: 'Brazil' },
					{ name: '韩国', value: 'Korea' },
					{ name: '朝鲜', value: 'North Korea' },
					{ name: '英国', value: 'Britain' },
					{ name: '德国', value: 'Germany' },
					{ name: '加拿大', value: 'Canada' },
					{ name: '非洲', value: 'New Zealand' },
				]
			}
		},
		onShow() {
			var that = this
			uni.setNavigationBarTitle({
					title: '自动处理索引列表'
			});
		},
		onReady() {
			var that = this
			that.$refs["sortPickerList"].initPage(that.dataArr)
		},
		methods: {
			clickData(data) {
				console.log('获取名：' + data.label)
				console.log('获取值：' + data.value)
			}
		}
	}
</script>

<style>
	
</style>
