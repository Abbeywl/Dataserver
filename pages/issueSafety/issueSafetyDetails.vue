<template>
	<view class="content">
		<!-- 工单描述部分 -->
		<u-row>
			<u-col span="12">
				<commonDetail :detailArr="detailArr" :detailImg="finishImg" :operate="operate"></commonDetail>
			</u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 工单图片部分 -->
		<u-row class="imageBox u-p-l-30 u-p-r-30 u-col-top-important u-p-t-20 u-p-b-20 u-font-28">
			<u-col span="3"><text>照片</text></u-col>
			<u-col span="9" class="u-flex u-flex-wrap">
			<!-- 	<view class="u-m-r-10 u-m-b-10 imageBg" v-for="(item, index) in rectifyImage" :key="index">
						<u-image border-radius="10rpx" height="200rpx" @click="previewImg(index, '整改前')" src="@/static/image/ad.jpg"
							mode="aspectFit"></u-image>
				</view> -->
				<view class="u-m-r-10 u-m-b-10 imageBg">
						<u-image border-radius="10rpx" height="200rpx" src="@/static/image/ad.jpg"
							mode="aspectFit"></u-image>
				</view>
			</u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 流程节点图部分 -->
		<u-row class="timeLineBox u-p-t-20 u-p-l-20 u-m-b-30">
			<u-col span="12">
				<view>
					<timeLine v-for="(item, index) of timeLineData" :key="index" :data="item"></timeLine>
				</view>
			</u-col>
		</u-row>
		<!-- 整改验收评论部分-->
		<u-row>
			<u-col span="12">
				<view class="footerBar u-flex" v-if="issueState != '验收通过'">
					<view v-if="issueState != '验收通过'" :class="{ viewStyle: issueState != '验收' && issueState != '整改' }"
						@click="jumpPage('评论')">
						<u-icon class="icon iconfont icon-pinglun"></u-icon>
						<text>评论</text>
					</view>
					<view v-if="issueState == '验收'" class="btns u-flex u-font-30 u-m-l-20">
						<text class="u-text-center" @click="jumpPage('验收不通过')">不通过</text>
						<text class="u-text-center" @click="jumpPage('验收通过')">通过</text>
					</view>
					<view v-if="issueState == '整改'" class="btn">
						<u-button @click="jumpPage('整改')" shape="circle" type="primary">整改</u-button>
					</view>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import commonDetail from '../../common/components/commonDetail/commonDetail.vue';
	import timeLine from '../../common/components/timeLine/timeLine.vue'; //时间轴
	export default {
		components: {
			commonDetail,
			timeLine
		},
		data() {
			return {
				issueId: '', //跳转过来的工单id
				detailArr: [],
				operate: {}, //检查项
				sendObj: {}, //发送申请
				csObj: {}, //抄送
				rectifyObj: {}, //整改
				ysObj: {}, //验收
				finishImg: {},
				timeLineData: [],
				issueDetails: {}, //保存数据
				issueState: '', //工单的当前状态
				rectifyImage: [], //整改前的图片
				stepData: [], //保存流程数据
				ysData: [], //验收人
				csName: [], //抄送人
				rectifyName: '', //
				imageUrl: '', //y验收头像
				rectifyImageUrl: '', //整改人的头像
				creationDate: '', //创建时间
				talkZgBefore: [], //整改的评论内容
				talkZgAfter: [], //整改后的评论和整改内容
				talkYs: [], //验收通过和不通过的内容
				commonIP: uni.getStorageSync('commonIP'), //获取id地址
				navName: ''
			};
		},
		onLoad(options) {
			this.issueId = options.id;
			this.issueState = options.state;
			this.navName = options.navName;
			console.log(options)
			this.loadissueDetails(); //获取详情信息
			// this.loadMove();//获取获取整改评论的数据
		},
		onBackPress() {
			// let pages = getCurrentPages();
			// console.log(pages.length)
			// console.log(pages[pages.length - 2].$getAppWebview())
			// let beforePage = pages[pages.length - 2];
			// beforePage.$vm.onLoad();
		},
		methods: {
			//跳转检查项
			jumpDesc(state) {
				uni.navigateTo({
					url: './issueSafetyDesc?issueId=' + this.issueId + '&name=' + this.rectifyName + '&state=' +
						state
				});
			},
			//跳转评论，整改，验收页面
			jumpPage(btnName) {
				if (btnName == '整改') {
					uni.navigateTo({
						url: './issueSafetyRectify?btnName=' + btnName + '&id=' + this.issueDetails.ID +
							"&navName=" + this.navName
					});
				} else if (btnName == '验收通过') {
					uni.navigateTo({
						url: './issueSafetyCheck?btnName=' + btnName + '&id=' + this.issueDetails.ID +
							"&navName=" + this.navName
					});
				} else if (btnName == '验收不通过') {
					uni.navigateTo({
						url: './issueSafetyCheck?btnName=' + btnName + '&id=' + this.issueDetails.ID +
							"&navName=" + this.navName
					});
				} else if (btnName == '评论') {
					uni.navigateTo({
						url: './issueSafetyComment?btnName=' + btnName + '&id=' + this.issueDetails.ID +
							'&stateValue=' + this.issueDetails.State + "&navName=" + this.navName
					});
				}
			},

			//获取整改评论的数据
			loadMove() {
				// this.$u
				// 	.get('/api/issue/GetRectifiOrInspetedInfoByID', {
				// 		issueID: this.issueId
				// 	})
				// 	.then(res => {
						var data = [{
							"ID": 854,
							"IssueID": 216,
							"CreationUserID": 11,
							"Type": "Inspected",
							"Description": "osk",
							"State": "验收通过",
							"CreationDate": "2021-01-19T16:36:27.307",
							"RequireDate": "0001-01-01T00:00:00",
							"IsAgainInspect": false,
							"InspectPermission": null,
							"OnContract": null,
							"IsAppointInspect": false,
							"DocVersionDataInfos": [],
							"CreationUserName": "Bob",
							"CreationUserUnit": null,
							"IssueProcessRecordID": 854
						}, {
							"ID": 853,
							"IssueID": 216,
							"CreationUserID": 11,
							"Type": "Rectification",
							"Description": "s0",
							"State": "整改完成",
							"CreationDate": "2021-01-19T16:35:56.637",
							"RequireDate": "0001-01-01T00:00:00",
							"IsAgainInspect": false,
							"InspectPermission": null,
							"OnContract": null,
							"IsAppointInspect": false,
							"DocVersionDataInfos": [],
							"CreationUserName": "Bob",
							"CreationUserUnit": null,
							"IssueProcessRecordID": 853
						}]

						var subTitle = '';
						var title = '';
						data.forEach((item, index) => {
							var obj = {};
							var arr = [];
							if (item.State == '已发送' && item.Type == 'Comment') {
								this.talkZgBefore.push(item); //整改前评论数据
								var result = this.commonPush(subTitle, title, obj, arr, item);
								this.csObj.children.push(result);
							} else if (item.State == '整改完成' || (item.State == '验收不通过' && item.Type ==
									'Comment')) {
								this.talkZgAfter.push(item); //整改完成的数据和评论数据
								var result = this.commonPush(subTitle, title, obj, arr, item);
								this.rectifyObj.children.push(result);
							} else {
								//验收的数据
								this.talkYs.push(item);
								var result = this.commonPush(subTitle, title, obj, arr, item);
								this.ysObj.children.push(result);
							}
						});
						var rectifyBeforeComment = {};
						this.timeLineData = [this.sendObj, this.csObj, this.rectifyObj, this.ysObj];
					// });
			},
			//处理各个节点子子节点数据
			commonPush(subTitle, title, obj, arr, item) {
				if (item.DocVersionDataInfos.length != 0) {
					for (var i = 0; i < item.DocVersionDataInfos.length; i++) {
						arr.push(this.commonIP + item.DocVersionDataInfos[i].ImageFileItem.ImageRelativePath);
					}
				}
				if (item.Type == 'Comment') {
					subTitle = '添加评论';
					title = item.CreationUserName;
				} else if (item.Type == 'Rectification') {
					subTitle = '';
					title = '维修记录';
				} else if (item.Type == 'Inspected') {
					subTitle = '';
					title = '验收记录';
				}
				return (obj = {
					title: title,
					subTitle: subTitle,
					desc: item.Description,
					rightText: item.CreationDate.slice(5, 16).replace('T', ' '),
					timeLineImgs: arr
				});
			},
			//点击整改图片可以进行放大的预览
			previewImg(index, state, data) {
				if (state == '整改前') {
					//整改前的图片预览
					uni.previewImage({
						current: index, //预览图片的下标
						urls: this.rectifyImage //预览图片的地址，必须要数组形式
					});
				}
			},
			//获取详情的信息
			loadissueDetails() {
				// this.$u
				// 	.get('/api/Issue/GetIssueByID', {
				// 		issueID: this.issueId
				// 	})
				// 	.then(res => {
					var data={
							"ID": 216,
							"Title": "1649",
							"Type": "System.Data.Entity.DynamicProxies.Issue_EFE6558ABF33CCA2338BB42C1E9FD50DB1BD14C43F7D5338216DE97AE8D14464",
							"Discipline": "",
							"CategoryEx": null,
							"CategoryExText": "",
							"Severity": "一般缺陷",
							"CreationUserID": 11,
							"CreationUserName": "Bob",
							"CreationUserHeadImage": "/ImageCache/System/UserHeadProtrait/11_20201127151228834_.jpg",
							"CreationDate": "2021-01-19T16:35:46.247",
							"LocationDes": "",
							"LocationX": 0,
							"LocationY": 0,
							"LocationZ": 0,
							"Wx": 0,
							"Wy": 0,
							"Wz": 0,
							"AxisX": "",
							"AxisY": "",
							"Description": "46949",
							"BluePrintID": null,
							"ProjectID": 1,
							"State": "验收通过",
							"Level": "Normal",
							"DocVersions": [{
								"ID": 2517,
								"DocumentID": 622,
								"DocNumber": "",
								"Name": "16pic_111395_b.jpg",
								"CreationDate": "2021-01-19T16:35:46.347",
								"Suffix": ".jpg",
								"MD5": "8a18b0d0d6ab9bd8109e946ce07055a9",
								"Size": "81701",
								"SizeDisplay": "79.79 KB",
								"Version": 25,
								"CreationUser": "Bob",
								"CreationUserID": 11,
								"Status": "Created",
								"StatusStr": "已审核",
								"Properties": null,
								"RemotePath": "D:\\BIMSmartConstructionSite\\Application\\DocData\\2021_1_19\\e6dd230f-d546-4d4c-873b-6b0c228dcd34",
								"Base64Stream": "",
								"IsLinkDoc": false,
								"PreviewPath": null,
								"CanPreview": true,
								"Tags": null,
								"FolderID": 612,
								"FolderName": null,
								"DocumentComment": null,
								"ImageFileItem": {
									"VersionID": 2517,
									"ThumbnailPath": "D:\\BIMSmartConstructionSite\\Application\\ImageCache\\1\\Issue\\216\\2517_Thumb.jpg",
									"MediumImagePath": "D:\\BIMSmartConstructionSite\\Application\\ImageCache\\1\\Issue\\216\\2517_Medium.jpg",
									"ImagePath": "D:\\BIMSmartConstructionSite\\Application\\ImageCache\\1\\Issue\\216\\2517.jpg",
									"ThumbnailRelativePath": "/ImageCache/1/Issue/216/2517_Thumb.jpg",
									"MediumImageRelativePath": "/ImageCache/1/Issue/216/2517_Medium.jpg",
									"ImageRelativePath": "/ImageCache/1/Issue/216/2517.jpg"
								}
							}],
							"ListProcessUser": null,
							"IssueProcessRecord": null,
							"GetIssueMarkerByIssueID": null,
							"ProcessUsers": {
								"RectificationOrg": [{
									"UserID": 11,
									"IssueProcessRecordID": 2529,
									"UserName": "Bob",
									"OrganizationUserID": 7,
									"OrganizationName": "中铁城建",
									"UserHeadImgUrl": "../../static/headInit.png"
								}],
								"CctOrg": [{
									"UserID": 21,
									"IssueProcessRecordID": 2530,
									"UserName": "请假审批",
									"OrganizationName": "上海美车2店",
									"UserHeadImgUrl": null
								}],
								"CktOrg": [{
									"UserID": 11,
									"IssueProcessRecordID": 2532,
									"UserName": "Bob",
									"OrganizationUserID": 7,
									"OrganizationName": "中铁城建二公司",
									"UserHeadImgUrl": "/ImageCache/System/UserHeadProtrait/11_20201127151228834_.jpg"
								}, {
									"UserID": 21,
									"IssueProcessRecordID": 2534,
									"UserName": "请假审批",
									"OrganizationUserID": 10,
									"OrganizationName": "上海美车2店",
									"UserHeadImgUrl": null
								}, {
									"UserID": 23,
									"IssueProcessRecordID": 2535,
									"UserName": "验收",
									"OrganizationUserID": 11,
									"OrganizationName": "上海美车总店",
									"UserHeadImgUrl": null
								}, {
									"UserID": 94,
									"IssueProcessRecordID": 2536,
									"UserName": "测试01",
									"OrganizationUserID": 10,
									"OrganizationName": "上海美车2店",
									"UserHeadImgUrl": null
								}, {
									"UserID": 117,
									"IssueProcessRecordID": 2537,
									"UserName": "业主文秘",
									"OrganizationUserID": 10,
									"OrganizationName": "上海美车2店",
									"UserHeadImgUrl": null
								}, {
									"UserID": 152,
									"IssueProcessRecordID": 2538,
									"UserName": "wyt",
									"OrganizationUserID": 11,
									"OrganizationName": "上海美车总店",
									"UserHeadImgUrl": "/ImageCache/System/UserHeadProtrait/152_20201127171008793_.jpg"
								}]
							},
							"RectificationResult": null,
							"SourceType": "0",
							"StateColor": null,
							"RectificationResultColor": null,
							"IsOverdue": true,
							"PrimaryCategoryName": "安全文明施工",
							"SecondaryCategoryName": "安全管理",
							"PrimarySecondaryName": "安全文明施工/安全管理",
							"RequireDate": "2021-01-19T00:00:00",
							"ActualDate": "2021-01-19T16:35:56.637",
							"VerifiedDate": "2021-01-19T16:36:27.307",
							"Number": "DYWS-202101190006",
							"ModelID": null,
							"RemoveCcOrRectifiUserIDs": null,
							"IssueProcessType": "Receive",
							"IssuePermissions": null,
							"CreationUserOrganization": "中铁城建二公司",
							"IssueProcessRecordID": 849,
							"RectificationUserID": 0,
							"QRCode": "",
							"RectificationDescription": null,
							"RegionID": 4,
							"RegionName": "#01整体项目",
							"RegionCategory": null,
							"ModelIDs": "",
							"LastUpdate": "2021-01-19T16:36:27.307",
							"Progress": null,
							"RectificationUnitUser": null,
							"RectifyTimes": null,
							"Penalties": [],
							"RegionCategoryKey": 0
						}
				
					//	var data = res.ResultData;
						var rectifyUnit = ''; //保存维修地点
						if (data.ProcessUsers.RectificationOrg.length == 0) {
							rectifyUnit = '未确定(未确定)';
						} else {
							this.rectifyName = data.ProcessUsers.RectificationOrg[0].UserName;
							rectifyUnit = data.ProcessUsers.RectificationOrg[0].UserName + '(' + data.ProcessUsers
								.RectificationOrg[0].OrganizationName + ')';
						}
						this.issueDetails = data;
						// console.log(this.issueDetails)
						this.operate = {
							//检查项
							isShow: true,
							text: '检查项',
							src: './issueSafetyDesc?issueId=' + this.issueId + '&name=' + this.rectifyName +
								'&state=' + data.State
						};
						this.finishImg = {
							//是否有验收成功的图片
							isShow: this.issueState == '验收通过' ? true : false,
							src: '../../static/issueSafety/inspect.png'
						};
						this.detailArr = [
							//列表想起数据
							{
								name: '车牌号',
								value: '沪C·676755'
							},
							{
								name: '车型',
								value: '奥迪A7L'
							},
							{
								name: '电话',
								value: '18712124546'
							},
							{
								name: '维修地点',
								value: rectifyUnit
							},
							{
								name: '维修时间',
								value: data.RequireDate == null ? '' : data.RequireDate.split('T')[0]
							},
							{
								name: '问题类型',
								value: '后尾灯刮蹭修复'
							},
							{
								name: '分区',
								value: '请选择'
							},
							{
								name: '电话',
								value: ''
							},
							{
								name: '问题描述',
								value: '右侧后尾车灯刮蹭，掉漆'
							}
						];
						if (data.DocVersions == null || data.DocVersions.length == 0) {
							//需要整改的图片
							this.rectifyImage = [];
						} else {
							for (var i = 0; i < data.DocVersions.length; i++) {
								if (data.DocVersions.length != 0) {
									var frontImg = data.DocVersions[i].ImageFileItem.ImageRelativePath;
								}

								this.rectifyImage.push(this.commonIP + frontImg);
							}
						}
						data.ProcessUsers.CktOrg.forEach((item, index) => {
							//验收人放进一个数组
							item.ysName = item.UserName + '(' + item.OrganizationName + ')';
						});
						//获取整改头像
						var rectifyImageUrl = '';
						if (data.ProcessUsers.RectificationOrg[0].UserHeadImgUrl == null) {
							this.rectifyImageUrl = '../../static/issueSafety/headInit.png';
						} else {
							this.rectifyImageUrl = this.commonIP + data.ProcessUsers.RectificationOrg[0]
							.UserHeadImgUrl;
						}
						if (data.ProcessUsers.RectificationOrg[0].UserHeadImgUrl == null) {
							rectifyImageUrl = '../../static/issueSafety/headInit.png';
						} else {
							rectifyImageUrl = this.commonIP + data.ProcessUsers.RectificationOrg[0].UserHeadImgUrl;
						}
						//验收头像
						var ysImageUrl = '';
						
						if (data.ProcessUsers.CktOrg[0].UserHeadImgUrl == null) {
							ysImageUrl = '../../static/issueSafety/headInit.png';
						} else {
							for (var i = 0; i < data.ProcessUsers.CktOrg.length; i++) {
								if (data.ProcessUsers.CktOrg[i].UserHeadImgUrl != null) {
									ysImageUrl = this.commonIP + data.ProcessUsers.CktOrg[i].UserHeadImgUrl;
								}
							}
							// ysImageUrl=this.commonIP+data.ProcessUsers.CktOrg[0].UserHeadImgUrl
						}

						this.ysData = data.ProcessUsers.CktOrg; //验收人的信息
						this.csName = data.ProcessUsers.CctOrg; //抄送人
						var time = data.CreationDate;
						this.creationDate = time.slice(5, 16).replace('T', ' ');
						this.sendObj = {
							title: '发起申请',
							desc: [{
								descText: data.CreationUserName,
								src: ''
							}],
							rightText: this.creationDate,
							timeLineImg:'../../static/image/car2.jpg',
							children: []
						};
						var descArr = []; //保存抄送的人名和头像名字
						this.csName.forEach((item, index) => {
							//获取到后台的抄送信息
							var obj = {};
							obj.descText = item.UserName;
							obj.src = '../../static/image/car.jpg';
								this.commonIP + item.UserHeadImgUrl;
							descArr.push(obj);
						});
						this.csObj = {
							title: '已抄送' + this.csName.length + '人',
							desc: descArr,
							rightText: '',
							timeLineImg: '../../static/issueSafety/Ccimg.png',
							children: []
						};
						this.rectifyObj = {
							title: '整改',
							desc: [{
								descText: rectifyUnit,
								src: ''
							}],
							rightText: '',
							timeLineImg: '../../static/airport.png',
							children: []
						};
						var descYsArr = []; //保存抄送的人名和头像名字
						this.ysData.forEach((item, index) => {
							//获取到后台的抄送信息
							var obj = {};
							obj.descText = item.ysName;
							descYsArr.push(obj);
						});
						this.ysObj = {
							title: '验收',
							desc: descYsArr,
							rightText: '',
							timeLineImg: '../../static/issueSafety/headInit.png',
							children: []
						};
						this.loadMove();
					// });
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;

		.imageBox {
			color: #999;

			.imageBg {
				width: 150rpx;
				height: 200rpx;
				background-color: #000;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.timeLineBox {
			padding-bottom: 160rpx;
		}

		.footerBar {
			z-index: 1000000;
			width: 100vw;
			height: 150rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0px;
			font-family: PingFang SC;
			font-weight: 400;

			& view:first-child {
				width: 20vw;
				display: flex;
				flex-direction: column;
				text-align: center;

				icon {
					font-size: 38rpx;
				}

				text {
					font-size: 20rpx;
					color: #666666;
				}
			}

			& .btns {
				border: 1px solid #999;
				border-right: none;
				height: 80rpx;
				width: 70%;
				line-height: 80rpx;
				border-radius: 40rpx;

				text {
					display: inline-block;
					height: 80rpx;
					width: 50%;
					border-radius: 0 40rpx 40rpx 0;
					color: #0089ff;
				}

				text:last-child {
					background-color: #0089ff;
					color: #fefefe;
				}
			}

			& .btn {
				width: 70vw;
			}

			.viewStyle {
				margin-left: 40vw;
			}
		}
	}
</style>
