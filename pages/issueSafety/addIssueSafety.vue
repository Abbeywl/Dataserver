<template>
	<view class="content">
		<u-toast ref="uToast" />
		<u-row>
			<u-col span="12"><u-cell-item :required="true" hover-class="none" title="选择类型" value="维修" :arrow="false"></u-cell-item></u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 详细分类 -->
		<u-row>
			<u-col span="12">
				<u-cell-item @click="kindsShow = true" :required="true" hover-class="none" title="详细分类" :value="kindsItem" :arrow="false"></u-cell-item>
				<u-picker mode="selector" v-model="kindsShow" :range="kindsArray" @confirm="kindsConfirm"></u-picker>
			</u-col>
		</u-row>
		<!-- 问题级别 -->
		<u-row>
			<u-col span="12">
				<u-cell-item @click="levelShow = true" :required="true" hover-class="none" title="问题级别" :value="levelItem" :arrow="false"></u-cell-item>
				<u-picker mode="selector" v-model="levelShow" :range="levelArray" @confirm="levelConfirm"></u-picker>
			</u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 分区 -->
		<u-row>
			<u-col span="12">
				<u-cell-item @click="areaShow = true" :required="true" hover-class="none" title="电话" :value="areaItem" :arrow="false"></u-cell-item>
				
					<u-input slot="right-icon" input-align="right" maxlength="30" height="60" v-model="issueTitle" type="text" :border="false" />
			</u-col>
		</u-row>
		<!-- 坐标来源 -->
		<u-row>
			<u-col span="12">
				<u-cell-item @click="modelShow = true" hover-class="none" title="坐标来源" :value="modelItem" :arrow="false"></u-cell-item>
				<u-picker mode="selector" v-model="modelShow" :range="modelArray" @confirm="modelConfirm"></u-picker>
			</u-col>
		</u-row>
		<!-- 模型 -->
		<u-row v-if="modelItem == '模型'">
			<u-col span="12"><u-cell-item hover-class="none" title="模型" value="关联模型" :arrow="false"></u-cell-item></u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 问题标题 -->
		<u-row class=" cellBg">
			<u-col span="12">
				<u-cell-item :required="true" hover-class="none" title="车牌号" :arrow="false">
					<u-input slot="right-icon" input-align="right" maxlength="30" height="60" v-model="issueTitle" type="text" placeholder="输入车牌信息" :border="false" />
				</u-cell-item>
			</u-col>
		</u-row>
		<!-- 问题描述 -->
		<u-row class=" cellBg">
			<u-col span="12"><u-cell-item :required="true" :border-bottom="false" hover-class="none" title="问题描述" :arrow="false"></u-cell-item></u-col>
			<u-col span="12" class="u-m-b-20"><u-input class="u-p-l-30" placeholder="输入问题内容..." height="140" v-model="issueDescription" type="textarea" /></u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 图片 -->
		<u-row class=" cellBg">
			<u-col span="12"><u-cell-item :border-bottom="false" hover-class="none" title="图片" :arrow="false"></u-cell-item></u-col>
			<u-col span="12" class="u-m-b-20">
				<u-upload class="u-p-l-30 u-p-r-20 u-p-b-20" ref="uUpload" :auto-upload="false" :file-list="fileList" @on-remove="onRemove"></u-upload>
			</u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 整改截止 -->
		<u-row>
			<u-col span="12">
				<u-cell-item @click="rectifyTimeShow = true" :required="true" hover-class="none" title="截止时间" :value="rectifyTime" :arrow="false"></u-cell-item>
				<u-picker mode="time" v-model="rectifyTimeShow" :params="paramsTime" @confirm="rectifyTimeConfirm"></u-picker>
			</u-col>
		</u-row>
		<u-gap height="20" bg-color="#f9f9f9"></u-gap>
		<!-- 维修地点 -->
		<u-row class="cellBg">
			<u-col span="12">
				<u-cell-item :required="true" hover-class="none" title="维修地点" :arrow="false">
					<view slot="right-icon" class="pickersRectify" @click="rectifyUnitShow = true">
						<text class="pickersRectify">{{ rectifyText }}</text>
					</view>
					<u-select v-model="rectifyUnitShow" mode="mutil-column-auto" :list="rectifyArray" @confirm="onConfirmRectify"></u-select>
				</u-cell-item>
			</u-col>
		</u-row>
		<!-- 抄送单位 -->
		<u-row class="cellBg">
			<u-col span="12">
				<u-cell-item :required="true" hover-class="none" title="维修单位" :arrow="false">
					<view slot="right-icon" class="u-text-right-i u-m-b-10 pickersRectify" style="width:300rpx">
						<view v-if="csText[0] == '请选择' || csText.length == 0" class="u-text-right-i" @click="csUnitShow = true"><view class="u-text-right-i">请选择</view></view>
						<u-swipe-action v-else :show="item.show" :index="index" v-for="(item, index) in csText" :key="item.value" @click="clickRemove" :options="options">
							<view @click="csUnitShow = true" class="u-row-right-i u-p-t-10 u-p-b-10">{{ item.value }}</view>
						</u-swipe-action>
					</view>
					<u-select v-model="csUnitShow" mode="mutil-column-auto" :list="csUnitArray" @confirm="onConfirmCs"></u-select>
				</u-cell-item>
			</u-col>
		</u-row>
		<!-- 发出按钮 -->
		<u-row class="sendBtn u-margin-auto">
			<u-col span="12"><u-button @click="sendProblem" type="primary" :ripple="true" shape="circle">发出</u-button></u-col>
		</u-row>
	</view>
</template>
<script>
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'; //引入二级联动
export default {
	components: {
		mpvuePicker //注册二级联动
	},
	data() {
		return {
			issueType: '维修', //保存从安全文明施工页面传来的字段
			modelArray: ['模型'], //保存坐标来源的数据
			modelShow: false, //控制picker是否显示
			modelItem: '请选择', //保存坐标来源的默认值
			kindsArray: [], //保存详细分类的数组
			kindsShow: false, //控制picker是否显示
			kindsItem: '请选择', //保存详细分类的默认值
			levelArray: [], //保存级别的数组
			levelShow: false, //控制picer是否显示
			levelItem: '请选择', //保存级别的默认值
			areaCurrent: 0, //分区数组的当前下标
			areaItem: '请选择', //保存分区的默认值
			areaArray: [], //保存分区的名称
			areaShow: false, //控制picker是否显示
			areaId: [], //保存分区id
			issueDescription: '', //问题描述
			issueTitle: '', //问题标题
			rectifyArray: [], //保存维修地点数据
			rectifyUnitShow: false, //控制picker是否显示
			rectifyPersonArr: [], //保存维修地点对应的人
			rectifyText: '请选择', //默认的维修地点的选择状态
			rectificationUserID: '',
			csUnitArray: [], //保存抄送单位对应的人
			csUnitShow: false,
			csPersonArr: [], //保存抄送单位对应的人
			csText: ['请选择'], //默认的抄送单位的选择状态
			csUserID: [],
			rectifyTime: '请选择', //保存整改截止时间
			rectifyTimeShow: false, //控制picker是否显示
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			paramsTime: {
				//picker时间的参数
				year: true,
				month: true,
				day: true
			},
			rectifyImageId: [], //保存添加图片的整改前图片ID
			name: '', //点击编辑跳转过来的字段
			jumpEditId: 0, //点击编辑跳转传来的id
			createTime: '', //创建时间
			sendPerson: '', //发起人
			sendTime: '', //发起时间
			fileList: [], // 保存编辑传过来的突变数据
			commonIP: uni.getStorageSync('commonIP') //保存ip地址
		};
	},
	// 监听页面的加载
	onLoad(options) {
		console.log(options);
		//获取级别
		this.loadMove({ nodeName: 'Issue', name: this.issueType }, '/api/Project/GetTypeOrStates', '级别');
		this.jumpEditId = options.id;
		if (this.jumpEditId != undefined) {
			//判断只有点击编辑过来的时候 在执行此方法
			this.loadIssue(); //获取点击编辑跳转过来的数据
		}
		// console.log(this.jumpEditId)
		// 获取详细分类的数据
		this.loadMove({}, '/api/Issue/GetIssueCateChildrenByParentName', '分类');
		this.loadMove({}, '/api/ProjectRegion/GetProjectRegions', '分区'); //获取分区的数据
		this.loadMove({}, '/api/Issue/GetAllUnits', '维修地点'); //获取维修地点的数据
		this.loadMove({}, '/api/Issue/GetAllUnits', '抄送单位'); //获取抄送单位的数据
	},
	//监听安卓手机实体的按钮和侧滑
	onBackPress(e) {
		if (e.from == 'backbutton') {
			this.backFunc();
			return true; // 必须return 为true才能执行自定义逻辑，否侧直接返回
		}
	},
	//监听导航栏返回的按钮
	onNavigationBarButtonTap(e) {
		this.backFunc();
	},

	methods: {
		backFunc() {
			let pages = getCurrentPages();
			let beforePage = pages[pages.length - 2];
			if (this.levelItem == '请选择' && this.areaItem == '请选择' && this.issueTitle == '' && this.rectifyTime == '请选择') {
				beforePage.$vm.loadIssueList('安全文明施工');
				uni.navigateBack();
			} else {
				uni.showModal({
					title: '提示',
					content: '是否保存相关内容',
					success: res => {
						if (res.confirm) {
							if (this.levelItem == '请选择') {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '请选择级别'
								});
								return;
							}
							if (this.areaItem == '请选择') {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '请选择分区'
								});
								return;
							}
							if (this.issueTitle == '') {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '请填写标题'
								});
								return;
							}
							if (this.rectifyTime == '请选择') {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '请填写整改截止时间'
								});
								return;
							}
							this.sendAjax('保存', 'Draft');
						} else if (res.cancel) {
							beforePage.$vm.loadIssueList('安全文明施工');
							uni.navigateBack();
						}
					}
				});
			}
		},
		//删除保存页面的数据
		onRemove(index, lists, name) {
			if (this.jumpEditId != undefined) {
				// lists.slice(index,1);
				var versionId = this.rectifyImageId[index];
				var removeId = this.rectifyImageId.splice(index, 1);
				this.$u
					.get('/api/Issue/RemoveDocument', {
						issueID: this.jumpEditId,
						docVersionID: versionId
					})
					.then(res => {
						// console.log(res);
					});
			}
		},
		//加载点击编辑跳转过来的数据
		loadIssue() {
			var jumpEditId = this.jumpEditId;
			this.$u
				.get('/api/Issue/GetIssueByID', {
					issueID: jumpEditId
				})
				.then(res => {
					var data = res.ResultData;
					this.issueTitle = data.Title; //标题
					this.issueDescription = data.Description; //问题描述
					//详细分类
					if (data.SecondaryCategoryName == '') {
						this.kindsItem = '请选择';
					} else {
						this.kindsItem = data.SecondaryCategoryName;
					}
					//问题级别
					this.levelItem = data.Severity;
					//分区
					this.areaItem = data.RegionName;
					this.areaId = [];
					this.areaId.push(data.RegionID);
					if (data.RequireDate == null) {
						//整改截止
						this.rectifyTime = '';
					} else {
						this.rectifyTime = data.RequireDate.split('T')[0];
					}
					if (data.ProcessUsers.RectificationOrg.length == 0) {
						//维修地点
						this.rectifyText = '请选择';
					} else {
						var organizationName = data.ProcessUsers.RectificationOrg[0].OrganizationName;
						var userName = data.ProcessUsers.RectificationOrg[0].UserName;
						this.rectifyText = organizationName + '-' + userName;
						this.rectificationUserID = data.ProcessUsers.RectificationOrg[0].UserID;
					}
					if (data.ProcessUsers.CctOrg.length == 0) {
						//抄送单位
						this.csText = []; // 如果草稿没有草送人数据，赋值为数组
					} else {
						this.csText = []; //如果草稿没有有抄送人数据，赋值为数组，因为初始值为不会是空数组
						for (var i = 0; i < data.ProcessUsers.CctOrg.length; i++) {
							var ccOrganizationName = data.ProcessUsers.CctOrg[i].OrganizationName;
							var ccUserName = data.ProcessUsers.CctOrg[i].UserName;
							var obj = {};
							obj.show = false;
							obj.value = ccOrganizationName + '-' + ccUserName;
							this.csText.push(obj);
							this.csUserID += data.ProcessUsers.CctOrg[i].UserID + ',';
						}
						console.log(this.csText);
					}
					this.createTime = data.CreationDate.split('T')[0]; //创建时间
					this.sendPerson = data.CreationUserName; //发起人
					this.sendTime = data.LastUpdate.split('T')[0]; //发起时间
					if (data.DocVersions == null) {
						//整改图片
						this.rectifyImageId = [];
					} else {
						for (var i = 0; i < data.DocVersions.length; i++) {
							var frontImg = data.DocVersions[i].ImageFileItem.ImageRelativePath;
							this.rectifyImageId.push(data.DocVersions[i].ImageFileItem.VersionID);
							var obj = {};
							obj.url = this.commonIP + frontImg;
							this.fileList.push(obj);
						}
					}
				});
		},
		//滑动删除
		clickRemove(index) {
			this.csText.splice(index, 1);
		},
		//发送问题的请求
		sendAjax(name, btnName) {
			uni.showLoading({});
			var state = btnName;
			var kindsItem = this.kindsItem; //详细分类
			if (kindsItem == '请选择') {
				kindsItem = '';
			}
			var levelItem = this.levelItem; //问题级别
			if (levelItem == '请选择') {
				levelItem = '';
			}
			var areaItem = '';
			if (this.areaItem == '请选择' || this.areaItem == null) {
				//分区
				areaItem = '';
			} else {
				areaItem = this.areaId[this.areaCurrent];
			}
			var title = this.issueTitle; //问题标题
			var desc = this.issueDescription; //问题描述
			var time = this.rectifyTime; //整改截止时间
			var rectificationUserID = this.rectificationUserID; //维修地点
			var CcUserID = this.csUserID + ','; //抄送人  18,52,176
			if (CcUserID == ',') {
				CcUserID = '';
			}
			if (kindsItem == '' || levelItem == '' || areaItem == '' || title == '' || desc == '' || time == '' || rectificationUserID == '' || CcUserID == '') {
				if (name == '发送') {
					uni.showModal({
						title: '提示',
						content: '有 * 标记的为必填项',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								// console.log('用户点击确定');
							}
						}
					});
					return;
				}
			}
			if (this.jumpEditId == undefined) {
				var data = {
					AxisX: '',
					RegionID: areaItem,
					LocationDes: '',
					Description: desc,
					Severity: levelItem,
					Title: title,
					// 'SelectDiscipline':majorItem,
					RequireDate: time,
					State: state,
					RectificationUserID: rectificationUserID,
					CcUserID: CcUserID,
					PrimaryCategoryName: this.issueType,
					SecondaryCategoryName: kindsItem,
					RemoveCcOrRectifiUserIDs: ''
				};
			} else {
				var data = {
					ID: this.jumpEditId,
					AxisX: '',
					RegionID: areaItem,
					LocationDes: '',
					Description: desc,
					Severity: levelItem,
					Title: title,
					// 'SelectDiscipline':majorItem,
					RequireDate: time,
					State: state,
					RectificationUserID: rectificationUserID,
					CcUserID: CcUserID,
					PrimaryCategoryName: this.issueType,
					SecondaryCategoryName: kindsItem,
					RemoveCcOrRectifiUserIDs: ''
				};
			}
			var imageObjs = [];
			if (this.$refs.uUpload.lists == 0) {
				imageObjs = [];
			} else {
				for (var i in this.$refs.uUpload.lists) {
					imageObjs.push({
						uri: this.$refs.uUpload.lists[i].url,
						name: this.$refs.uUpload.lists[i].url.substring(this.$refs.uUpload.lists[i].url.lastIndexOf('/') + 1, this.$refs.uUpload.lists[i].url.length)
					});
				}
			}
			// console.log(imageObjs)
			var title = '';
			if (name == '发送') {
				title = '发送成功';
			} else {
				title = '保存成功';
			}
			//获取页面栈
			let pages = getCurrentPages();
			let beforePage = pages[pages.length - 2];
			if (this.$refs.uUpload.lists.length == 0) {
				this.$u
					.post('/api/Issue/AddOrUpdateIssue', data, {
						'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					})
					.then(res => {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: title,
							position: 'bottom',
							type: 'success',
							// url: '/pages/issueSafety/issueSafety',
							back: true,
							callback: function() {
								beforePage.$vm.issueList = []; // 初始化列表数据
								beforePage.$vm.loadIssueList('安全文明施工');
								uni.navigateBack();
							}
						});
					})
					.catch(res => {});
			} else {
				uni.uploadFile({
					//此处用uploadFile发送请求   因为reques发送  图片后端无法收到
					url: this.commonIP + '/api/Issue/AddOrUpdateIssue', // 后端api接口
					files: imageObjs, //数组（[{},{}]）类型
					formData: data,
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
					},
					success: res => {
						uni.hideLoading();
						this.$refs.uToast.show({
							title: title,
							position: 'bottom',
							type: 'success',
							// url: '/pages/issueSafety/issueSafety',
							back: true,
							callback: function() {
								beforePage.$vm.issueList = []; // 初始化列表数据
								beforePage.$vm.loadIssueList('安全文明施工');
								uni.navigateBack();
							}
						});
					}
				});
			}
		},
		//发送问题
		sendProblem() {
			this.sendAjax('发送', 'Open');
		},
		// 整改时间
		rectifyTimeConfirm(e) {
			this.rectifyTime = e.year + '-' + e.month + '-' + e.day;
		},
		// 抄送单位选择的确定
		onConfirmCs(e) {
			console.log(e);
			var csText = e[0].label + '-' + e[1].label;
			var csId = e[1].value - '0';
			if (this.csText.indexOf('请选择') != -1) {
				this.csText = this.csText.slice(1);
			}
			var obj = {
				show: false,
				value: csText
			};
			if (this.csText.indexOf(obj) == -1) {
				this.csText.push(obj);
				this.csUserID += csId + ',';
			}
		},
		//维修地点选择的确定
		onConfirmRectify(e) {
			console.log(e);
			this.rectifyText = e[0].label + '-' + e[1].label;
			this.rectificationUserID = e[1].value - '0';
		},
		//分区的picker3
		areaConfirm(e) {
			console.log(this.areaItem);
			console.log(this.areaArray);
			this.areaItem = this.areaArray[e[0]];
		},
		//级别的picker
		levelConfirm(e) {
			this.levelItem = this.levelArray[e[0]];
		},
		//详情分类的picker
		kindsConfirm(e) {
			this.kindsItem = this.kindsArray[e[0]];
		},
		//专业的picker
		areaConfirm(e) {
			this.areaItem = this.areaArray[e[0]];
		},
		//模型的picker
		modelConfirm(e) {
			this.modelItem = this.modelArray[e[0]];
		},
		//加载更多的数据
		loadMove(data, api, name) {
			uni.showLoading({
				title: '正在加载...'
			});
			this.$u.get(api, data).then(res => {
				if (name == '级别') {
					var result = res.ResultData[0].Secondaries;
					for (var i = 0; i < result.length; i++) {
						this.levelArray.push(result[i].Value);
					}
				} else if (name == '分类') {
					var result = res.ResultData['安全文明施工'];
					for (var key in result) {
						this.kindsArray.push(result[key]);
					}
				} else if (name == '分区') {
					var result = res.ResultData.item;
					for (var i = 0; i < result.length; i++) {
						this.areaArray.push(result[i].Name);
						this.areaId.push(result[i].ID);
					}
				} else if (name == '维修地点') {
					var result = res.ResultData;
					var label = '';
					// console.log(res);
					for (var i = 0; i < result.length; i++) {
						var id = result[i].ID;
						// if(result[i].Abbreviation!==null){
						// 	label=result[i].Abbreviation
						// }else{
						label = result[i].Name;
						// }
						this.rectifyArray.push({
							label: label,
							// id:id,
							value: id,
							children: []
						});
					}
					this.getRectifyChild(this.rectifyArray);
				} else if (name == '抄送单位') {
					var result = res.ResultData;
					var label = '';
					for (var i = 0; i < result.length; i++) {
						var id = result[i].ID;
						// if(result[i].Abbreviation!==null){
						// 	label=result[i].Abbreviation
						// }else{
						label = result[i].Name;
						// }
						this.csUnitArray.push({
							label: label,
							// id:id,
							value: id,
							children: []
						});
					}
					this.getCsChild(this.csUnitArray);
				}
			});
		},
		//选择维修地点
		getRectifyChild(rectifyArray) {
			uni.hideLoading();
			rectifyArray.forEach((item, index) => {
				this.$u
					.get('/api/Issue/GetUnitUserIdsByGroupID', {
						groupID: item.value,
						type: 'RectifySafetyIssue'
					})
					.then(res => {
						var results = res.ResultData;
						// console.log(results)
						if (results.length > 0) {
							this.rectifyPersonArr = [];
							results.forEach((val, idx, results) => {
								this.rectifyPersonArr.push({
									label: val.DisplayName,
									value: val.UserID
								});
							});
							item.children = this.rectifyPersonArr;
						} else {
							item.children.push({ label: '暂无' });
							item.children = item.children.slice(0, 1);
						}
						this.rectifyArray = rectifyArray;
						// console.log(this.rectifyArray)
					});
			});
		},
		//选择抄送单位
		getCsChild(csArray) {
			uni.hideLoading();
			csArray.forEach((item, index) => {
				this.$u
					.get('/api/Issue/GetUnitUserIdsByGroupID', {
						groupID: item.value,
						type: 'ViewSafetyIssue'
					})
					.then(res => {
						var results = res.ResultData;
						if (results.length > 0) {
							this.csPersonArr = [];
							results.forEach((val, idx) => {
								this.csPersonArr.push({
									label: val.DisplayName,
									value: val.UserID
								});
							});
							item.children = this.csPersonArr;
						} else {
							item.children.push({ label: '暂无' });
							item.children = item.children.slice(0, 1);
						}
						this.csUnitArray = csArray;
					});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	background-color: #fff;
	.cellBg {
		// background-color: #fff;
	}
	.pickersRectify {
		color: #909399;
	}
	.sendBtn {
		width: 90vw;
		margin-top: 100rpx;
	}
	/deep/ {
		.mpvue-picker__action {
			font-size: 28rpx !important;
		}
	}
}
</style>
