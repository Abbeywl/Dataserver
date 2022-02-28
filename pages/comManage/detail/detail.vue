<template>
	<view class="container">
		<view class="list-info">
			<view><uni-icons type="person" size="20"></uni-icons></view>
			<view class="enter-info-bd">
				<text :selectable="true" :data-text="val.name" @tap="copy">{{ val.name }}</text>
			</view>
		</view>
		<view class="list-info">
			<view><uni-icons type="phone" size="20"></uni-icons></view>
			<view class="enter-info-bd">
				<text :selectable="true" :data-text="val.tel" @tap="copy">{{ val.tel }}</text>
			</view>
		</view>
		<view class="list-info">
			<view><uni-icons type="bars" size="20"></uni-icons></view>
			<view class="enter-info-bd">
				<text :selectable="true" :data-text="val.note" @tap="copy">{{ val.note }}</text>
			</view>
		</view>
		<view class="list-info">
			<view><uni-icons type="email" size="20"></uni-icons></view>
			<view class="enter-info-bd">
				<text :selectable="true" :data-text="val.email" @tap="copy">{{ val.email }}</text>
			</view>
		</view>
		<view class="list-info">
			<view><uni-icons type="home" size="20"></uni-icons></view>
			<view class="enter-info-bd">
				<text :selectable="true" :data-text="val.address" @tap="copy">{{ val.address }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/common/components/uni-icons/uni-icons.vue';
export default {
	components:{
		uniIcons
	},
	data() {
		return {};
	},
	onLoad(options) {
		let val = options.val;		
		if (val) {
			let list = uni.getStorageSync('addressbook');
			list.forEach(item => {
				if (item.value == val) {
					this.val = item;
				}
			});
		}
	},
	methods:{
		copy(e){
			let text =e.currentTarget.dataset.text;
			uni.setClipboardData({
				data:text
			})
		}
	}
};
</script>

<style lang="less">
.menu {
	width: 100%;
	position: fixed;
	top: 50upx;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 40upx;
	box-sizing: border-box;
	.close-content {
		display: flex;
		align-items: center;
	}
}
.container {
	padding: 50upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	box-sizing: border-box;
	.list-info {
		display: flex;
		margin-bottom: 70upx;
		.enter-info-bd {
			width: 450upx;
			border-bottom: 1px solid #cccccc;
			margin-left: 30upx;
		}
	}
}
</style>
