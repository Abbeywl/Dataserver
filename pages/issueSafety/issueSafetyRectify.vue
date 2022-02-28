<template>
	<view class="content u-h-100">
		<u-toast ref="uToast" />
		<u-row class="rectifyContent u-p-l-35 u-p-r-35 ">
			<u-col span="12" class="rectifyDesc u-p-t-20 u-p-b-40 u-font-24">
				<u-input class="u-w-100 u-h-100 u-font-24" v-model="description" type="textarea" placeholder="输入整改情况..." />
			</u-col>
			<u-col span="12" class="rectifyImage u-p-b-20"><u-upload ref="uUpload" :auto-upload="false"></u-upload></u-col>
		</u-row>
		<u-gap height="20" bg-color="#F1F1F1"></u-gap>
		<u-row class="finishTime u-p-l-35 u-p-r-35 u-flex u-font-26" v-if="btnName !== '评论'">
			<u-col span="6" class="finishTitle ">
				<icon class="icon iconfont iconxinghao u-font-28"></icon>
				<text class="u-font-28">整改时间</text>
			</u-col>
			<u-col span="6" class="specificTime u-flex u-text-right-i">
				<u-picker v-model="isShowTime" mode="time" @confirm="finishDate"></u-picker>
				<u-col span="10" class="u-font-28">{{ finishTime }}</u-col>
				<u-col span="2" class="u-text-right-i" @click="showTime"><icon class="icon iconfont icon-rili u-font-32"></icon></u-col>
			</u-col>
		</u-row>
		<u-row class="btns u-p-l-35 u-p-r-35 u-m-b-30 u-w-100">
			<!-- <button v-if="btnName=='评论'" type="primary" @click="sendZg('')">评论</button> -->
			<u-button v-if="btnName == '整改'" class="u-font-30" type="primary" @click="sendZg('onContract')" shape="circle">整改</u-button>
			<!-- <button v-if="btnName=='整改'" type="primary" @click="sendZg('onContract')">整改</button> -->
		</u-row>
	</view>
</template>

<script>
export default {
	data() {
		return {
			issueId: '',
			description: '', //整改结果的描述
			imageFile: [], //添加图片得路径
			imageObjs: [], //保存添加图片返回的对象数据
			requireDate: '', //整改截止时间
			finishTime: '', //完成时间
			btnName: '', //跳转来的操作状态
			commonIP: uni.getStorageSync('commonIP'), //保存ip地址
			isShowTime: false,
			navName: '' // 从待办页面传来当前侧边栏的状态
		};
	},
	//监听页面的加载
	onLoad(options) {
		this.issueId = options.id;
		this.btnName = options.btnName;
		this.navName = options.navName;
	},
	methods: {
		showTime() {
			this.isShowTime = true;
		},
		//发送整改
		sendZg(name) {
			uni.showLoading({});
			var issueRectifiDescription = this.description;
			var time = this.finishTime;
			var reTime = this.requireDate;
			var id = this.issueId;
			if (issueRectifiDescription == '') {
				uni.showModal({
					title: '提示',
					content: '整改情况不能为空',
					showCancel: false
				});
				return;
			}
			if (time == '') {
				uni.showModal({
					title: '提示',
					content: '整改时间不能为空',
					showCancel: false
				});
				return;
			}
			var data = {
				IssueRectifiDescription: issueRectifiDescription,
				RDate: time,
				ReOrInIssueID: id,
				InspectOnContract: name,
				InspectPermission: 'InspectSafetyIssue',
				ReOrInsType: 'Rectification',
				ReOrInsState: 'Resolved',
				IsAppointInspect: '',
				IsAgainInspect: '',
				ReDate: reTime
			};
			var getImg = this.$refs.uUpload.lists;
			for (var i in getImg) {
				this.imageObjs.push({
					uri: getImg[i].url,
					name: getImg[i].url.substring(getImg[i].url.lastIndexOf('/') + 1, getImg[i].url.length)
				});
			}
			var navName = this.navName;
			if (getImg.length == 0) {
				this.$u
					.post('/api/Issue/AddRectifiOrInspectedIssue', data, {
						'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					})
					.then(res => {
						var self = this;
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: '整改成功',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									// uni.redirectTo({
									// 	url: "./issueSafety"
									//      	});
									self.backPage(navName);
								}
							}
						});
						return;
					});
			} else {
				uni.uploadFile({
					url: this.commonIP + '/api/Issue/AddRectifiOrInspectedIssue', // 后端api接口
					// filePath:this.imageFile[0], // uni.chooseImage函数调用后获取的本地文件路劲
					// name:'EmployeeImage',     //后端通过'file'获取上传的文件对象(字段)
					files: this.imageObjs, //数组（[{},{}]）类型
					formData: data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					success: res => {
						uni.hideLoading();
						var msg = JSON.parse(res.data);
						if (msg.MessageModel.Type == 1) {
							var self = this;
							uni.showModal({
								title: '提示',
								content: '整改成功',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										// uni.redirectTo({
										// 	url: './issueSafety'
										// });
										self.backPage(navName);
									}
								}
							});
							return;
						}
					}
				});
			}
		},
		// 监听返回按钮 刷新上一页和上上一页
		backPage(navName) {
			let pages = getCurrentPages();
			let beforePage = pages[pages.length - 2];
			let beforePage2 = pages[pages.length - 3];
			beforePage.$vm.issueState = '验收';
			beforePage.$vm.rectifyImage=[];// 初始化整改前图片
			beforePage.$vm.loadissueDetails();
			let currentWebview = pages[pages.length - 3].$getAppWebview();
			if (currentWebview.__uniapp_route == 'pages/issueSafety/issueSafety') {
				beforePage2.$vm.issueList=[]; // 初始化数据
				beforePage2.$vm.loadIssueList('安全文明施工');
			} else {
				beforePage2.$vm.sendData=[];// 初始化数据
				beforePage2.$vm.waitData=[];
				beforePage2.$vm.finishData=[];
				beforePage2.$vm.loadSendData('/api/Notification/GetCurrentUserSendItem', navName);
				beforePage2.$vm.loadMove('/api/Notification/QueryProcessedNotification', navName, '已处理');
				beforePage2.$vm.loadMove('/api/Notification/QueryTodoNotification', navName, '待处理');
			}

			uni.navigateBack();
		},
		//日历的确定
		finishDate(e) {
			//开始时间picker绑定
			this.finishTime = e.year + '-' + e.month + '-' + e.day;
		}
	}
};
</script>

<style lang="scss">
.content {
	height: calc(100vh - 44px);
	position: relative;
	.rectifyContent {
		background-color: #ffffff;
		.rectifyDesc {
			height: 280rpx;
			line-height: 88rpx;
			color: #222;
		}
	}
	.finishTime {
		height: 88rpx;
		background-color: #ffffff;
		.finishTitle {
			color: #999;
		}
		.specificTime {
			.u-col {
				line-height: 40rpx;
			}
		}
	}
	.btns {
		margin: 0px auto;
		button {
			width: 90vw;
			margin-top: 450rpx;
		}
	}
}
</style>
