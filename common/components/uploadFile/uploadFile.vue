<template>
	<view class="upload">
		<!-- 上传 -->
		<popup-layer ref="popupRef" :direction="'top'">
			<view class="uploadType">
				<view @click="fileType('picture')">
					<icon class="icon iconfont icontupian"></icon>
					<br>
					<text>图片</text>
				</view>
				<view @click="fileType('video')">
					<icon class="icon iconfont iconmpflvavi"></icon>
					<br>
					<text>视频</text>
				</view>
				<view @click="fileType('allType')" v-show="isAndroid">
					<icon class="icon iconfont iconall"></icon>
					<br>
					<text>全部文件</text>
				</view>
			</view>
			<view class="uploadCancel">
				<button @click='cancel'>取消</button>
			</view>
		</popup-layer>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		pickFile
	} from '@/common/js/pickFile.js'
	export default {
		props: ['isPopshow', 'uploadparams'],
		components: {
			uniPopup,
			pickFile
		},
		data() {
			return {
				params: {},
				filsSize: 0,
				isAndroid: uni.getSystemInfoSync().platform == 'ios' ? false : true,
			}
		},
		watch: {
			//监听是否显示弹出层
			isPopshow(val) {
				if (val == true) {
					this.$refs.popupRef.show();
				} else {
					this.$refs.popupRef.close();
				}
			},
			//监听当前页面参数
			uploadparams: {
				handler(val) {
					this.params = val;
				},
				deep: true //深度监听才能监听对象具体参数
			}
		},
		methods: {
			cancel() {
				this.$refs.popupRef.close();
				this.$emit('cancelPop', false)
			},
			//上传文件类型
			fileType(type) {
				var self = this;
				var commonIP = uni.getStorageSync("commonIP");
				var files = [];
				var filesName = [];
				if (type == 'picture') {
					plus.gallery.pick(function(e) {
						for (var i = 0; i < e.files.length; i++) {
							var fileUrl = e.files[i];
							var fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length);
							files.push({
								path: fileUrl,
								name: fileName
							});
							filesName.push({
								uri: fileUrl,
								name: i
							})
						}

						for (var j = 0; j < files.length; j++) {
							self.uploadFile(files[j],filesName);
						}
					}, function(e) {
						console.log("取消选择")
					}, {
						filter: "image",
						multiple: true
					})
				} else if (type == 'video') {
					plus.gallery.pick(function(e) {
						for (var i = 0; i < e.files.length; i++) {
							var fileUrl = e.files[i];
							var fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length);
							files.push({
								path: fileUrl,
								name: fileName
							});
							filesName.push({
								uri: fileUrl,
								name: i
							})
						}
						for (var j = 0; j < files.length; j++) {
							self.uploadFile(files[j],filesName);
						}
					}, function(e) {
						console.log("取消选择")
					}, {
						filter: "video",
						multiple: true
					})
				} else if (type == 'allType') {
					console.log("全部文件")
					var deviceIsAndroid = uni.getSystemInfoSync().platform;
					var type = ""
					pickFile.PickFile(function(audioSrc) {
						// _this.audioSrc = 'file://' + audioSrc;  
						var fileUrl = "file://" + audioSrc;
						var fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length);
						files.push({
							path: fileUrl,
							name: fileName
						})
						filesName.push({
							uri: fileUrl,
							name: 0
						})
						// uploadList(files);
						// docFile.upLoadFile(files[0]);
						self.uploadFile(files[0],filesName)
					});
				}
			},
			//上传文件
			uploadFile(file,filesName) {
				var commonIP = uni.getStorageSync("commonIP");
				this.$refs.popupRef.close();
				this.$emit('cancelPop', false)
				/* uni.showToast({
					title: "正在上传...",
					position: "bottom"
				}) */
				uni.showLoading({
					title: '正在上传'
				})
				var uploadTask = uni.uploadFile({
					url: commonIP + "/api/DocManager/UploadFile", // 后端api接口
					files: filesName, //数组（[{},{}]）类型
					formData: {
						isLast: true,
						allfilelength: file.length,
						Files: file,
						currentNode: this.params.pageId,
						fileName: file.name
					},
					success: (res) => {
						uni.hideLoading();
						// var msg=JSON.parse(res.data)
						if (res.statusCode == 200) {
							uni.showToast({
								title: '上传成功',
								duration: 2000,
								position: "bottom",
								success: (data) => {
									var docName = file.name.split(".").slice(-1)[0];
									var iconName = this.$parent.documentType("." + docName)
									var uploadList=[]
									uploadList.push({
										iconName: iconName,
										documentName: file.name,
										size: this.filsSize,
										fileName: file.path
									})
									uni.navigateTo({
										url: "./transferList?uploadList="+JSON.stringify(uploadList)
									})
									//点击上传之后，在重新加载一次
									this.$parent.jumpDocument(this.params.pageId, this.params.curChild, this.params.curName)
									this.$parent.documentData.splice(this.$parent.index - 1, 1);
									this.$parent.breadData.splice(this.$parent.index - 1, 1)
									this.$parent.index--;
									// this.loadFile(this.pageId);
								}
							})
						}
					},
					fail: (e) => {
						uni.hideLoading();
						console.log("失败")
					}
				});
				uploadTask.onProgressUpdate((res) => {
					this.filsSize = res.totalBytesExpectedToSend
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.upload {

		/* 上传的选项 */
		.uploadType {
			display: flex;
			justify-content: space-around;
			padding: 20px 0px;

			& view {
				text-align: center;
			}

			& icon {
				font-size: 24px;
			}

			.icontupian {
				color: red;
			}

			.iconmpflvavi {
				color: aa55ff;
			}

			.iconall {
				color: blue;
			}

			& text {
				font-size: 14px;
			}
		}

		.uploadCancel {
			padding: 10px 0px;
		}
	}
</style>
