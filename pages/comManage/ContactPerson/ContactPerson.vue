<template>
	<view class="container">
		<block v-if="!val">
			<view class="menu">
				<view class="close-content">
					<uni-icons type="closeempty" size="30" color="#cccccc" @click="close"></uni-icons>
					<view style="margin-left: 15upx;transform: translateY(-10%);">新建联系人</view>
				</view>
				<view><uni-icons type="checkmarkempty" size="30" @click="confirm"></uni-icons></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="person" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" :value="username" placeholder="姓名" data-name="username" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="phone" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="number" :value="tel" placeholder="手机" data-name="tel" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="bars" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" value="" placeholder="备注" data-name="note" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="email" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" value="" placeholder="邮件" data-name="email" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="home" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" value="" placeholder="地址" data-name="address" @input="enter" /></view>
			</view>
		</block>
		<block v-else>
			<view class="menu">
				<view class="close-content">
					<uni-icons type="closeempty" size="30" color="#cccccc" @click="close"></uni-icons>
					<view style="margin-left: 15upx;transform: translateY(-10%);">编辑联系人</view>
				</view>
				<view><uni-icons type="checkmarkempty" size="30" @click="confirm"></uni-icons></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="person" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" :value="val.name" placeholder="姓名" data-name="username" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="phone" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="number" :value="val.tel" placeholder="手机" data-name="tel" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="bars" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" :value="val.note" placeholder="备注" data-name="note" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="email" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" :value="val.email" placeholder="邮件" data-name="email" @input="enter" /></view>
			</view>
			<view class="list-info">
				<view><uni-icons type="home" size="20"></uni-icons></view>
				<view class="enter-info-bd"><input type="text" :value="val.address" placeholder="地址" data-name="address" @input="enter" /></view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniIcons from '@/common/components/uni-icons/uni-icons.vue';
const app = getApp();
export default {
	components:{
		uniIcons
	},
	data() {
		return {
			val: null,
			tel:'',
			username:''
		};
	},
	onLoad(options) {
		let val = options.val;
		let logAdd = options.logAdd;
		if (val) {
			let list = uni.getStorageSync('addressbook');
			list.forEach(item => {
				if (item.value == val) {
					this.val = item;
				}
			});
		}
		if(logAdd){
			this.username = app.globalData.calllogdata.name;
			this.tel = app.globalData.calllogdata.mobile;
		}
	},
	methods: {
		close() {
			uni.navigateBack({
				delta: 1
			});
		},
		enter(e) {
			let name = e.currentTarget.dataset.name;
			this[name] = e.detail.value;
		},
		confirm() {
			let addressbook = uni.getStorageSync('addressbook') || [];
			if (!this.val) {
				if(!this.tel&&!this.username){
					uni.showToast({
						icon:'none',
						title:'联系人信息为空'
					})
					return;
				}
				let obj = {
					name: this.username || '',
					value:
						'uid:' +
						Math.random()
							.toString()
							.replace('.', '') +
						Date.now(),
					tel: this.tel || '',
					note: this.note || '',
					email: this.email || '',
					address: this.address || ''
				};
				addressbook.push(obj);
				uni.setStorageSync('addressbook', addressbook);
				uni.navigateBack({
					delta: 1
				});
			} else {
				let obj = {
					name: this.username || this.val.name,
					value: this.val.value,
					tel: this.tel || this.val.tel,
					note: this.note || this.val.note,
					email: this.email || this.val.email,
					address: this.address || this.val.address
				};
				addressbook.forEach((item, index) => {
					if (item.value == this.val.value) {
						addressbook[index] = obj;
					}
				});
				uni.setStorageSync('addressbook', addressbook);
				uni.navigateBack({
					delta: 1
				});
			}
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
