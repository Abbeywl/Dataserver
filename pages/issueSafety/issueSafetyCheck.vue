<template>
	<view class="content u-h-100">
		<u-toast ref="uToast" />
		<u-row class="checkContent u-p-l-35 u-p-r-35 ">
			<u-col span="12" class="checkDesc u-p-t-20 u-p-b-40 u-font-24">
				<u-input class="u-w-100 u-h-100 u-font-24" v-model="description" type="textarea" placeholder="输入验收情况..." />
			</u-col>
			<u-col span="12" class="checkImage u-p-b-20"><u-upload ref="uUpload" :auto-upload="false"></u-upload></u-col>
		</u-row>
		<u-gap height="20" bg-color="#F1F1F1"></u-gap>
		<!-- 验证状态 -->
		<u-row class="checkState u-p-l-35 u-p-r-35 u-flex u-font-26">
			<u-col span="6" class="checkTitle ">
				<icon class="icon iconfont iconxinghao u-font-28"></icon>
				<text class="u-font-28">验证状态</text>
			</u-col>
			<u-col span="6" class="u-text-right-i">
				<text class="u-font-28 ">{{ checkState }}</text>
				<!-- <picker class="pickers" @change="changeType" :value="index" :range="checkArray">
					<view class="">{{checkArray[index]}}</view>
					<icon class="icon iconfont iconarr-right"></icon>
				</picker> -->
			</u-col>
		</u-row>
		<!-- 截止时间 -->
		<u-row class="stopTime u-p-l-35 u-p-r-35 u-flex u-font-26" v-if="checkState == '验收不通过'">
			<u-col span="6" class="checkTitle ">
				<icon class="icon iconfont iconxinghao u-font-28"></icon>
				<text class="u-font-28">维修时间</text>
			</u-col>
			<u-col span="6" class="specificTime u-flex u-text-right-i">
				<u-picker v-model="isShowTime" mode="time" @confirm="finishDate"></u-picker>
				<u-col span="10" class="u-font-28">{{ newTime }}</u-col>
				<u-col span="2" class="u-text-right-i" @click="showTime"><icon class="icon iconfont icon-rili u-font-32"></icon></u-col>
			</u-col>
		</u-row>
		<u-row class="btns u-p-l-35 u-p-r-35 u-m-b-30 u-w-100"><u-button type="primary" class="u-font-30" @click="sendCheck('onContract')" shape="circle">验收</u-button></u-row>
	</view>
</template>

<script>
export default {
	components: {
		// uniCalendar,
	},
	data() {
		return {
			issueId: '',
			description: '', //验收结果的描述
			imageFile: [], //添加图片得路径
			imageObjs: [], //保存添加图片返回的对象数据
			requireDate: '', //整改截止时间
			newTime: '', //新的截止时间
			index: 0, //验证状态的当前下表
			checkArray: ['请选择', '验收通过', '验收不通过'], //验证状态的选择数组
			checkState: '请选择', //验收状态的初始状态
			commonIP: uni.getStorageSync('commonIP'), //保存ip地址
			isShowTime: false,
			content: '',
			navName: ''  // 从待办页面传来当前侧边栏的状态
		};
	},
	//监听页面的加载
	onLoad(options) {
		this.issueId = options.id;
		// this.requireDate=options.requireDate;
		this.checkState = options.btnName;
		this.navName=options.navName
		// this.index=1;
		this.index = this.checkArray.indexOf(this.checkState);
	},
	//监听导航栏按钮
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: './issueSafetyDetails?id=' + this.issueId
		});
	},
	methods: {
		showTime() {
			this.isShowTime = true;
		},
		//发送验收
		sendCheck(name) {
			uni.showLoading({});
			var issueRectifiDescription = this.description;
			var time = this.newTime;
			var checkState = this.checkState;
			var title;
			if (checkState == '验收不通过') {
				checkState = 'UnVerified';
			} else {
				checkState = 'Verified';
			}
			var reTime = this.requireDate;
			var id = this.issueId;
			if (issueRectifiDescription == '') {
				uni.showModal({
					title: '提示',
					content: '验收结果不能为空',
					showCancel: false
				});
				return;
			}
			if (this.checkState == '请选择') {
				// this.content='请选择验证状态';
				// this.isShowModal=true;
				uni.showModal({
					title: '提示',
					content: '验收结果不能为空',
					showCancel: false
				});
				return;
			}
			if (time == '' && this.checkState == '验收不通过') {
				uni.showModal({
					title: '提示',
					content: '整改截止时间不能为空',
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
				ReOrInsType: 'Inspected',
				ReOrInsState: checkState,
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
			var checkState = this.checkState;
			if (checkState == '验收不通过') {
				checkState = '整改';
			}
			if (getImg.length == 0) {
				this.$u
					.post('/api/Issue/AddRectifiOrInspectedIssue', data, {
						'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					})
					.then(res => {
						// this.content='验收成功';
						// this.isShowModalConfirm=true;
						uni.hideLoading();
						var self = this;
						uni.showModal({
							title: '提示',
							content: '验收成功',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									// uni.redirectTo({
									// 	url: "./issueSafety"
									//     	});
									self.backPage(navName, checkState);
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
								content: '验收成功',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										// uni.redirectTo({
										// 	url: "./issueSafety"
										//     	});
										self.backPage(navName, checkState);
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
		backPage(navName, checkState) {
			let pages = getCurrentPages();
			let beforePage = pages[pages.length - 2];
			let beforePage2 = pages[pages.length - 3];
			beforePage.$vm.issueState = checkState;
			beforePage.$vm.rectifyImage=[];// 初始化整改前图片
			beforePage.$vm.loadissueDetails();
			let currentWebview = pages[pages.length - 3].$getAppWebview();
			console.log(currentWebview.__uniapp_route);
			if (currentWebview.__uniapp_route == 'pages/issueSafety/issueSafety') {
				beforePage2.$vm.issueList=[];// 初始化数据
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
		//验证状态
		changeType(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
			this.checkState = this.checkArray[this.index];
		},
		//日历的确定
		finishDate(e) {
			//开始时间picker绑定
			this.newTime = e.year + '-' + e.month + '-' + e.day;
		}
	}
};
</script>
<style lang="scss">
.content {
	.checkContent {
		background-color: #ffffff;
		.checkDesc {
			height: 280rpx;
			line-height: 88rpx;
		}
	}
	.checkState {
		height: 88rpx;
		line-height: 88rpx;
		margin-top: 20rpx;
		background-color: #ffffff;
		.checkTitle {
			color: #999;
		}
	}
	.stopTime {
		height: 88rpx;
		line-height: 88rpx;
		background-color: #ffffff;
		.checkTitle {
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
			margin-top: 350rpx;
		}
	}
}
</style>
