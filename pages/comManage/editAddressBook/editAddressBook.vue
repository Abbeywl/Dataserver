<template>
	<view class="container">
		<view class="card-list" v-for="(item, index) in addressbook" :key="index">
			<view class="contact-info">
				<view>{{ item.name }}</view>
				<view style="font-size: 20upx;color: #515151;">{{ item.tel }}</view>
			</view>
			<view class="checkbox" :data-index="index" @tap="checked">
				<view class="checked" v-if="!item.checked"></view>
				<icon type="success" v-if="item.checked" size="15"></icon>
			</view>
		</view>

		<view class="footer-menu">
			<button type="default" size="mini" class="btn" data-type="changeall" @tap="changeAll">全选</button>
			<button type="default" size="mini" class="btn" data-type="cancelall" @tap="changeAll">取消全选</button>
			<button type="default" size="mini" class="btn" @tap="del">删除</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressbook: []
		};
	},
	onLoad() {
		this.addressbook = uni.getStorageSync('addressbook');
	},
	methods: {
		changechecked(e) {
			console.log(e);
		},
		checked(e) {
			let index = e.currentTarget.dataset.index;
			this.$set(this.addressbook[index], 'checked', this.addressbook[index].checked ? false : true);
			// this.addressbook[index].checked = !this.addressbook[index].checked;
		},
		changeAll(e) {
			let _type = e.currentTarget.dataset.type;
			for (let i = 0; i < this.addressbook.length; i++) {
				if (_type == 'changeall') {
					this.$set(this.addressbook[i], 'checked', true);
					this.addressbook[i].checked = true;
				} else if (_type == 'cancelall') {
					this.$set(this.addressbook[i], 'checked', false);
					this.addressbook[i].checked = false;
				}
			}
		},
		del() {
			let that = this;
			uni.showModal({
				content: '删除将不可恢复，确认删除？',
				success: res => {
					if (res.confirm) {
						(function del() {
							that.addressbook.forEach((item, index) => {
								if (item.checked) {
									that.addressbook.splice(index, 1);
									del();
								}
							});
						})();
						uni.setStorageSync('addressbook', this.addressbook);
						uni.showToast({
							title: '删除成功'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="less">
.container {
	padding: 30upx 30upx 120upx;
	box-sizing: border-box;
	.card-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx;
		border-bottom: 1px solid #eeeeee;
	}
	.card-list:nth-last-child(1) {
		border: none;
	}
	.checked {
		width: 30upx;
		height: 30upx;
		border: 1px solid #cccccc;
		border-radius: 100%;
	}
	.checkbox {
		display: flex;
		align-items: center;
	}
	.footer-menu {
		position: fixed;
		width: 100%;
		padding: 30upx 30upx 50upx;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0 0 10px 1px #ccc;
		.btn {
			margin-right: 20upx;
		}
	}
}
</style>
