<template>
	<view class="container">
	  <view class="input-box" style="position: fixed;width: 100%;">
	    <input style="margin:24rpx;" confirm-type="搜索" v-model="keyword" placeholder-class="input-placeholder" placeholder="输入姓名首字母、姓名拼音、姓名进行搜索" @input="handleSearch"></input>
	  </view> 
	  <view class="statement-list" v-if="result.length > 0" style="padding-top: 110rpx;">
	    <view class="item" v-for="(user, index) in result" :key="index">
	     <view class="dept-title" v-if="user.deptType" style="display: flex;">
				{{user.deptName}} 
				<view :hidden="user.deptPhone == '' || user.deptPhone == undefined" style="margin-left: 10rpx;">
				  ( {{user.deptPhone}} )
				</view>
	      </view>
	      <view class="statement" @tap="clickData(usered)" v-for="(usered, index) in user.meber" :key="index">
	        <view class="information">
	          <view class="icon">
	            <image :src="usered.avatarUrl"></image>
	          </view>
	          <view class="st-title">
	            <view class="title" style="width: 40%;">{{ usered.userName }}</view>
	            <view class="title" style="width: 30%;">{{ usered.extPhone }}</view>
	            <view class="title" style="width: 30%;">{{ usered.mobile }}</view>
	          </view>
	        </view>
	      </view>
	    </view>
	  </view>
	  
	</view>
</template>

<script>
	export default{
		data(){
			return {
				keyword: '',
				result: [
					{
						deptType: true,
						deptName: "市场部",
						deptPhone: 5523666,
						meber: [
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.bq233.com%2Fkanqq%2Fpic%2Fupload%2F2018%2F0807%2F1533622762937587.jpg&refer=http%3A%2F%2Fimg.bq233.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705176&t=032b02144b4be2e12fbb0b99aa2dbedc',
								userName: '经理',
								extPhone: '021-110',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-b37ae51099512ecc2f15f126a592c547_hd.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=434859f1967d373382f4268e28e3f38a',
								userName: '总监',
								extPhone: '021-123',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F80%2F5a%2Fd4%2F805ad49d1a4bc025cae4057104b70945.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=878088b1028715c509b6dae36728eac8',
								userName: '客服',
								extPhone: '021-666',
								mobile: '1833256989'
							},
						]
						
					},
					{
						deptType: true,
						deptName: "运营部",
						deptPhone: 5524512,
						meber: [
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F55%2F34%2F61%2F553461a1d8bb07b1026a7eeff17319e0.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=59d13f07ae9990a51b4fba76ab0a6d9d',
								userName: '组长',
								extPhone: '022-110',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_360_360%2Fa3%2Fb9%2F3b%2Fa3b93b276749f00014b2ac3fcaa2115a.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=cc559e733142b766340aa87a9ccf36f2',
								userName: '总监',
								extPhone: '022-123',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F29%2F20200429085932_jbzeq.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=e16e669c9ce3308ea747d966b014cf6f',
								userName: '运营实习生',
								extPhone: '022-666',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2Fd2%2F1f%2F49%2Fd21f492ceceb687a91a8e71cd8a86dde_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=6a40bc14d314f3c6752742b49e887ead',
								userName: '运营管培生',
								extPhone: '022-777',
								mobile: '1833256989'
							},
						]
						
					},
					{
						deptType: true,
						deptName: "总裁办公室",
						deptPhone: 5524512,
						meber: [
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F55%2F34%2F61%2F553461a1d8bb07b1026a7eeff17319e0.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=59d13f07ae9990a51b4fba76ab0a6d9d',
								userName: '总裁',
								extPhone: '023-110',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_360_360%2Fa3%2Fb9%2F3b%2Fa3b93b276749f00014b2ac3fcaa2115a.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=cc559e733142b766340aa87a9ccf36f2',
								userName: '副总裁',
								extPhone: '023-123',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F29%2F20200429085932_jbzeq.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=e16e669c9ce3308ea747d966b014cf6f',
								userName: '总裁办主任',
								extPhone: '023-666',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2Fd2%2F1f%2F49%2Fd21f492ceceb687a91a8e71cd8a86dde_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=6a40bc14d314f3c6752742b49e887ead',
								userName: '总裁助理',
								extPhone: '023-777',
								mobile: '1833256989'
							},
						]
						
					},
					{
						deptType: true,
						deptName: "采购部",
						deptPhone: 5524512,
						meber: [
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F55%2F34%2F61%2F553461a1d8bb07b1026a7eeff17319e0.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=59d13f07ae9990a51b4fba76ab0a6d9d',
								userName: '王一',
								extPhone: '024-110',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_360_360%2Fa3%2Fb9%2F3b%2Fa3b93b276749f00014b2ac3fcaa2115a.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=cc559e733142b766340aa87a9ccf36f2',
								userName: '王二',
								extPhone: '024-123',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F29%2F20200429085932_jbzeq.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=e16e669c9ce3308ea747d966b014cf6f',
								userName: '李一',
								extPhone: '024-666',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2Fd2%2F1f%2F49%2Fd21f492ceceb687a91a8e71cd8a86dde_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=6a40bc14d314f3c6752742b49e887ead',
								userName: '李二',
								extPhone: '024-777',
								mobile: '1833256989'
							},
						]
						
					},
					{
						deptType: true,
						deptName: "某车客户群",
						deptPhone: 5524512,
						meber: [
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F55%2F34%2F61%2F553461a1d8bb07b1026a7eeff17319e0.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=59d13f07ae9990a51b4fba76ab0a6d9d',
								userName: '王一',
								extPhone: '024-110',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_360_360%2Fa3%2Fb9%2F3b%2Fa3b93b276749f00014b2ac3fcaa2115a.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=cc559e733142b766340aa87a9ccf36f2',
								userName: '王二',
								extPhone: '024-123',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F29%2F20200429085932_jbzeq.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=e16e669c9ce3308ea747d966b014cf6f',
								userName: '李一',
								extPhone: '024-666',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2Fd2%2F1f%2F49%2Fd21f492ceceb687a91a8e71cd8a86dde_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=6a40bc14d314f3c6752742b49e887ead',
								userName: '李二',
								extPhone: '024-777',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F29%2F20200429085932_jbzeq.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=e16e669c9ce3308ea747d966b014cf6f',
								userName: '李一',
								extPhone: '024-666',
								mobile: '1833256989'
							},
							{
								avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2F2021%2Fedpic%2Fd2%2F1f%2F49%2Fd21f492ceceb687a91a8e71cd8a86dde_1.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640705177&t=6a40bc14d314f3c6752742b49e887ead',
								userName: '李二',
								extPhone: '024-777',
								mobile: '1833256989'
							}
						]
						
					},
				]
			}
		},
		methods:{
			handleSearch(e) {
			  
			},
			
			statement(key, id) {
			  uni.navigateTo({
			    url: `/pages/statements/detail?${key}=${id}`
			  });
			},
			
			handleOpen1(user) {
			  this.user = user;
			  this.actions1 = [{
			    name: '联系【' + user.userName + "】"
			  }, {
			    name: '拨打手机',
			    icon: 'mobilephone_fill',
			    size: 16
			  }, {
			    name: '拨打座机',
			    icon: 'mobilephone_fill',
			    size: 16
			  }];
			  this.visible1 = true;
			},
			
			handleCancel1() {
			  this.visible1 = false;
			},
			
			// 拨打电话
			callPhone(val) {
				if (!val) {
					uni.showToast({
						icon: 'none',
						title: '未找到联系人'
					});
					// 定时器用于兼容低版本安卓，否则toast不会自动关闭
					setTimeout(() => {
						uni.hideToast();
					}, 2500);
					return;
				}
				uni.makePhoneCall({
					phoneNumber: val
				});
			},
			// 发送短信
			sendMsg(val) {
				if (!val) {
					uni.showToast({
						icon: 'none',
						title: '未找到联系人'
					});
					// 定时器用于兼容低版本安卓，否则toast不会自动关闭
					setTimeout(() => {
						uni.hideToast();
					}, 2500);
					return;
				}
				let msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				msg.to = [val];
				plus.messaging.sendMessage(msg);
			},
			
			clickData(data) {
				uni.showActionSheet({
					itemList: ['查看详情', '拨打座机', '拨打电话', '发送短信'],
					success: res => {
						switch (res.tapIndex) {
							case 0:
								uni.navigateTo({
									url: './detail'
								});
								break;
							case 1:
								this.callPhone(data.extPhone);
								break;
							case 2:
								this.callPhone(data.mobile);
								break;
							case 3:
								this.sendMsg(data.mobile);
								break;
						}
					}
				});
			},
			
		}
	}
</script>

<style lang="scss">

	.input-box {
	  background: #f4f4f4;
	  z-index: 99999;
	  input {
	    background: white;
	    padding: 6px;
		height: 30px;
	  }
	}
	.dept-title{
		justify-content: flex-start;
		align-items: center;
		padding: 24rpx;
		font-size: 15px;
		font-weight: bold;
	}
	
	.statement{
		background-color: #fff;
		padding: 0 24rpx;
		.information{
			height: 40px;
			display: flex;
			border-bottom: 1px solid #ddd;
			align-items: center;
			.icon{
				width: 30px;
				height: 30px;
				border-radius: 10px;
				margin-right: 10px;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
			}
			.st-title{
				flex-grow: 1;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}
	}
	
</style>
