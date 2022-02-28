<template>
	<view class="container">
		<view id="action-bar">
			<uni-segmented-control :current="current" :values="items" styleType="button" activeColor="#3c9cff" @clickItem="onClickItem"></uni-segmented-control>
			
		</view>
		<view class="infoView" v-show="current === 0">
			<scroll-view scroll-y="true" style="height: 85vh;">
				<uni-list>
					<uni-list-item
						:clickable="true"
						:item-data="item"
						@click="logEdit"
						v-for="(item, index) in content"
						:key="index"
						:title="item.name + '-' + item.type"
						:note="item.numberLocation + ' ' + item.mobile"
						:rightText="item.callTime"
					></uni-list-item>
				</uni-list>
			</scroll-view>
		</view>
		<view v-show="current === 1">
			<scroll-view scroll-y="true" style="height: 85vh;">
				<uni-search-bar @input="searchAddressBook" />
				<sort-picker-list ref="sortPickerList" @clickData="clickData"></sort-picker-list>
				<uni-fab :pattern="pattern" direction="vertical" :content="menucontent" :popMenu="true" vertical="bottom" horizontal="right" @trigger="setBook"></uni-fab>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import uniFab from '@/common/components/uni-fab/uni-fab.vue';
import sortPickerList from '@/common/components/nickro-sortPickerList/nickro-sortPickerList.vue';
import uniSegmentedControl from '@/common/components/uni-segmented-control/uni-segmented-control.vue';
import uniList from '@/common/components/uni-list/uni-list.vue';
import uniListItem from '@/common/components/uni-list-item/uni-list-item.vue';
import uniSearchBar from '@/common/components/uni-search-bar/uni-search-bar.vue';
import scyptojs from '@/utils/crypto.js';
const app = getApp();
export default {
	components: {
		uniFab,
		sortPickerList,
		uniSegmentedControl,
		uniList,
		uniListItem,
		uniSearchBar
	},
	data() {
		return {
			items: ['通话记录', '联系人'],
			current: 1,
			menuList: [],
			searchArr:[],
			pattern: {
				buttonColor: '#3c9cff'
			},
			menucontent: [
				{
					iconPath: '/static/comManage/add.png',
					selectedIconPath: '/static/comManage/add.png',
					text: '添加'
				},
				{
					iconPath: '/static/comManage/include.png',
					selectedIconPath: '/static/comManage/include.png',
					text: '导入'
				},
				{
					iconPath: '/static/comManage/output.png',
					selectedIconPath: '/static/comManage/output.png',
					text: '导出'
				},
				{
					iconPath: '/static/comManage/del.png',
					selectedIconPath: '/static/comManage/del.png',
					text: '编辑'
				}
			],
			content: [],
			callLog: [],
			addressbook: []
		};
	},
	onLoad() {
		let that = this;
		this.getData();
	},
	onShow() {
		this.getData();
		// this.saveFile();
	},
	onHide() {
		// this.saveFile();
	},
	onUnload() {
		// this.saveFile();
	},
	onPullDownRefresh() {
		this.readFile();
	},
	methods: {
		// 保存到本地文件
		async saveFile(e) {
			let obj = {
				type: 'contact',
				data:uni.getStorageSync('addressbook') || []
			};
			let str = scyptojs.encrypt(obj);
			return new Promise(async (resolve,reject)=>{
				let res = await this.fileWriter(str);
				resolve(res)
			})
			 
		},
		async readFile() {
			if (!this.addressbook || this.addressbook.length == 0) {
				let result = await this.fileReader();
				if (result) {
					let res = scyptojs.decrypt(result.target.result);
					if (typeof res == 'string') {
						try {
							let json = JSON.parse(res);
							if (json.type == 'contact') {
								this.addressbook = json.data;
							}
						} catch (e) {
							//TODO handle the exception
						}
					} else {
						if (res.type == 'contact') {
							this.addressbook = res.data;
						}
					}
					uni.setStorageSync('addressbook',this.addressbook)
					this.getData();
				}
			}
			uni.stopPullDownRefresh();
		},
		fileReader() {
			return new Promise((resolve, reject) => {
				const that = this;
				plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(fobject) {
					fobject.root.getFile('backups.txt', { create: true }, function(fileEntry) {
						fileEntry.file(function(file) {
							that.fullPath = file.fullPath;
							var fileReader = new plus.io.FileReader();
							fileReader.readAsText(file, 'utf-8');
							fileReader.onloadend = function(evt) {
								resolve(evt);
							};
							fileReader.onerror = function(err) {
								reject(err);
							};
						});
					});
				});
			});
		},
		fileWriter(str) {
			const that = this;
			return new Promise((resolve, reject) => {
				plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(fobject) {
					fobject.root.getFile('backups.txt', { create: true }, function(fileEntry) {
						fileEntry.file(function(file) {
							// console.log(JSON.stringify(file) )
							that.fullPath = file.fullPath;
							fileEntry.createWriter(
								function(writer) {
									// Write data to file.
									writer.write(str);
									resolve(true);
								},
								function(e) {
									reject(e);
									console.log('写入失败', JSON.stringify(e));
								}
							);
						});
					});
				});
			});
		},

		getCalllog() {
			//#ifdef APP-PLUS
			// 权限处理
			plus.android.requestPermissions(
				['android.permission.READ_CALL_LOG', 'android.permission.WRITE_CALL_LOG', 'android.permission.READ_SMS'],
				function(e) {
					if (e.deniedAlways.length > 0) {
						//权限被永久拒绝
						console.log('哎呀！被拒绝了', e.deniedAlways.toString());
					}
					if (e.deniedPresent.length > 0) {
						//权限被临时拒绝
						this.getCalllog();
						console.log('若即若离', e.deniedPresent.toString());
					}
					if (e.granted.length > 0) {
						//权限被允许
						this.getContent();
						console.log('她接受了', e.granted.toString());
					}
				},
				function(e) {
					console.log('获取失败', JSON.stringify(e));
				}
			);
			this.getContent();
			//#endif
		},
		getContent() {
			// 获取通话记录的主体代码 顺序不能够乱
			let CallLog = plus.android.importClass('android.provider.CallLog');

			let Activity = plus.android.runtimeMainActivity();
			let ContentResolver = plus.android.importClass('android.content.ContentResolver');
			let resolver = Activity.getContentResolver();
			plus.android.importClass(resolver);
			let String = plus.android.importClass('java.lang.String');

			let cs = resolver.query(CallLog.Calls.CONTENT_URI, null, null, null, CallLog.Calls.DEFAULT_SORT_ORDER);
			if (!cs) return;
			plus.android.importClass(cs);

			let count = 0; // 记录多少条 用于处理循环跳出
			let content = [];
			if (cs.moveToFirst()) {
				uni.showLoading({
					title: '导入通话记录中'
				});
				while (cs.moveToNext()) {
					count++;
					//号码
					let number = cs.getString(cs.getColumnIndex(CallLog.Calls.NUMBER));
					//呼叫类型
					let type;
					switch (parseInt(cs.getString(cs.getColumnIndex(CallLog.Calls.TYPE)))) {
						// 判断通话类型
						case CallLog.Calls.INCOMING_TYPE:
							type = '呼入';
							break;
						case CallLog.Calls.OUTGOING_TYPE:
							type = '呼出';
							break;
						case CallLog.Calls.MISSED_TYPE:
							type = '未接';
							break;
						default:
							type = '挂断';
							break;
					}
					// 获取时间
					let date = new Date(parseInt(cs.getString(cs.getColumnIndexOrThrow(CallLog.Calls.DATE))));
					// 联系人
					let Name_Col = cs.getColumnIndexOrThrow(CallLog.Calls.CACHED_NAME);
					let name = cs.getString(Name_Col);
					// 号码归属地 返回：北京 联通
					let numberLocation = cs.getString(cs.getColumnIndex(CallLog.Calls.GEOCODED_LOCATION));
					//通话时间,单位:s
					let Duration_Col = cs.getColumnIndexOrThrow(CallLog.Calls.DURATION);
					let duration = cs.getString(Duration_Col);
					// 存入数组

					content.push({
						name: name || '未知联系人',
						mobile: number,
						numberLocation: numberLocation || '未知的归属地',
						callTime: this.formatDate(date),
						talkTime: duration,
						type: type
					});
					// 只取50条记录
					if (count > 50) {
						uni.hideLoading();
						break;
					}
				}
				uni.hideLoading();
				for (let i = 0, len = content.length; i < len; i++) {
					for (let j = 0, len2 = this.addressbook.length; j < len2; j++) {
						if (content[i].mobile == this.addressbook[j].tel) {
							content[i].name = this.addressbook[j].name;
						}
					}
				}

				this.content = content;
			}
		},
		// 转日期
		formatDate(now) {
			const date = new Date(now);
			let y = date.getFullYear();
			let m = date.getMonth() + 1;
			let d = date.getDate();
			let h = date.getHours();
			let min = date.getMinutes();
			let s = date.getSeconds();
			return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
		},
		logEdit(e) {
			uni.showActionSheet({
				itemList: ['拨打该号码', '添加到新联系人'],
				success: res => {
					if (res.tapIndex == 0) {
						uni.makePhoneCall({
							phoneNumber: e.data.mobile
						});
					} else if (res.tapIndex == 1) {
						app.globalData.calllogdata = e.data;
						uni.navigateTo({
							url: '../ContactPerson/ContactPerson?logAdd=1'
						});
					}
				}
			});
		},
		// 删除
		del(val) {
			let addressbook = this.addressbook;
			addressbook.forEach((item, index) => {
				if (item.value == val) {
					addressbook.splice(index, 1);
				}
			});
			uni.setStorageSync('addressbook', addressbook);
			this.getData();
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
		// 获取数据
		getData() {
			this.addressbook = uni.getStorageSync('addressbook') || this.addressbook;

			setTimeout(() => {
				this.$refs.sortPickerList.initPage(this.addressbook);
			}, 500);
		},
		// 切换菜单
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
				if (e.currentIndex == 0) {
					this.getCalllog();
				}
			}
		},
		//设置点击菜单
		setBook(e) {
			let index = e.index;
			switch (index) {
				case 0:
					uni.navigateTo({
						url: '../ContactPerson/ContactPerson'
					});
					break;
				case 1:
					uni.showActionSheet({
						itemList: ['从通讯录导入', '从备份文件导入'],
						success: res => {
							if (res.tapIndex == 0) {
								this.includeContacts();
							} else if (res.tapIndex == 1) {
								if(!this.fullPath){
									uni.showModal({
										title: '提示',
										content: '没有找到备份文件'
									});
									this.readFile();
									return;
								}
								uni.showModal({
									title: '提示',
									content: '把文件命名为backups.txt放在' + this.fullPath + '路径下将会自动导入'
								});
								this.readFile();
							}
						}
					});

					break;
				case 2:
					this.outputContacts();
					break;
				case 3:
					uni.navigateTo({
						url: '../editAddressBook/editAddressBook'
					});
					// uni.removeStorageSync('addressbook');
					// this.addressbook = [];
					// this.getData();
					break;
				default:
					throw '未定义事件';
			}
		},
		// 导出联系人
		outputContacts() {
			let that = this;
			
			uni.showActionSheet({
				itemList: ['保存到备份文件', '保存到通讯录'],
				success:async res => {
					if (res.tapIndex == 0) {
						uni.showLoading({
							title:'导出中'
						})
						let result = await this.saveFile();
						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: '备份文件路径为' + this.fullPath
						});
					} else if (res.tapIndex == 1) {
						uni.showLoading({
							title: '导出到通讯录'
						});
						plus.contacts.getAddressBook(
							plus.contacts.ADDRESSBOOK_PHONE,
							function(addressbook) {
								// 向通讯录中添加联系人
								that.addressbook.forEach(item => {
									var contact = addressbook.create();
									contact.name = { givenName: item.name };
									contact.phoneNumbers = [{ type: '手机', value: item.tel, preferred: true }];
									contact.save();
								});
								uni.hideLoading();
								uni.showToast({
									title: '导出成功'
								});
								// 定时器用于兼容低版本安卓，否则toast不会自动关闭
								setTimeout(() => {
									uni.hideToast();
								}, 2500);
							},
							function(e) {
								alert('Get address book failed: ' + e.message);
							}
						);
					}
				}
			});
		},
		// 导入现有的联系人
		includeContacts() {
			uni.showLoading({
				title: '导入中'
			});
			let that = this;
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
				var contact = addressbook.find(null, function(contact) {
					if (contact.length > 0) {
						let arr = [];
						contact.forEach((item, index) => {
							let obj = {
								name: item.displayName || '未命名的联系人',
								tel: item.phoneNumbers.length > 0 ? '' + item.phoneNumbers[0].value : '',
								note: '' + item.note,
								value: '' + item.id,
								email: item.emails.length > 0 ? item.emails[0].value : ''
							};
							arr.push(obj);
						});
						let addressbook = uni.getStorageSync('addressbook');
						arr = that.MergeArray([...addressbook, ...arr]);
						uni.setStorageSync('addressbook', arr);
						that.getData();
					}

					uni.hideLoading();
					uni.showToast({
						title: '导入完成'
					});
					// 定时器用于兼容低版本安卓，否则toast不会自动关闭
					setTimeout(() => {
						uni.hideToast();
					}, 2500);
				});
			});
		},
		MergeArray(arr) {
			let result = [];
			let obj = {};
			for (let i = 0; i < arr.length; i++) {
				if (!obj[arr[i].tel]) {
					result.push(arr[i]);
					obj[arr[i].tel] = true;
				}
			}
			return result;
		},
		clickData(data) {
			uni.showActionSheet({
				itemList: ['查看详情', '拨打电话', '发送短信', '编辑', '删除'],
				success: res => {
					switch (res.tapIndex) {
						case 0:
							uni.navigateTo({
								url: '../detail/detail?val=' + data.value
							});
							break;
						case 1:
							this.callPhone(data.tel);
							break;
						case 2:
							this.sendMsg(data.tel);
							break;
						case 3:
							uni.navigateTo({
								url: '../ContactPerson/ContactPerson?val=' + data.value
							});

							break;
						case 4:
							this.del(data.value);
							break;
					}
				}
			});
		},
		// 搜索
		searchAddressBook(e){
			let val = e.value;
			let searchArr = []
			this.addressbook.forEach(item=>{
				if(item.name.indexOf(val)>-1||item.tel.indexOf(val)>-1){
					searchArr.push(item)
				}
			})
			this.$refs.sortPickerList.initPage(searchArr);
		}
	}
};
</script>

<style>
.container {
	padding: 40upx 30upx 30upx;

	box-sizing: border-box;
}
#action-bar {
	margin-bottom: 20upx;
	width: 100%;
	background-color: #ffffff;
	box-sizing: border-box;
	z-index: 3;
}
</style>
