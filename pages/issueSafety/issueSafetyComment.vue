<template>
	<view class="content">
		<u-row class="rectifyContent u-p-l-35 u-p-r-35 ">
			<u-col span='12' class="rectifyDesc u-p-t-20 u-p-b-40 u-font-24">				
				<u-input class="u-w-100 u-h-100 u-font-24" v-model="description" type="textarea"  placeholder="请输入评论..." />
			</u-col>
		</u-row>
		<u-gap height="20" bg-color="#F1F1F1"></u-gap>
		<u-row class="rectifyContent u-p-l-35 u-p-r-35 ">
			<u-col span='12' class="rectifyImage u-p-b-20">
				<u-upload ref="uUpload" :auto-upload="false"></u-upload>
			</u-col>
		</u-row>
		<u-row class="btns u-p-l-35 u-p-r-35 u-m-b-30 u-w-100" >
			<u-button type="primary" class="u-font-30" @click="sendZg('onContract')" shape="circle">发布</u-button>
		</u-row>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				issueId:"",
				description:"",//整改结果的描述
				imageFile:[],//添加图片得路径
				imageObjs:[],//保存添加图片返回的对象数据
				requireDate:"",//整改截止时间
				finishTime:"",//完成时间
				btnName:'',//跳转来的操作状态
				commonIP:uni.getStorageSync("commonIP"),//保存ip地址
				content:'',
				stateValue:'',//当前页面的状态
			}
		},
		//监听页面的加载
		onLoad(options){
			this.issueId=options.id;
			this.btnName=options.btnName;
			this.stateValue=options.stateValue
		},
		methods: {
			//发送评论
			sendZg(name){
				uni.showLoading({});
				var issueRectifiDescription=this.description;
				var id=this.issueId;
				if(issueRectifiDescription==""){
					// this.content='评论不能为空';
					// this.isShowModal=true;
					uni.showModal({
						title: '提示',
						content: '评论不能为空',
						showCancel:false
					})
					return;
				}
				var data={
					Comment:issueRectifiDescription,
					issueID:id,
				}
				var getImg=this.$refs.uUpload.lists;
				for (var i in getImg) {
					this.imageObjs.push({
						uri: getImg[i].url,
						name: getImg[i].url.substring(getImg[i].url.lastIndexOf("/") + 1, getImg[i].url.length)
					})
				}
				if(getImg.length==0){
					this.$u.post('/api/Issue/AddIssueComment',data,{
					'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
					}).then(res => {
						var self=this;
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '评论成功',
							showCancel:false,
							success: function (res) {
							    if (res.confirm) {
									// if((this.stateValue='已发送'||this.stateValue='验收不通过')&&this.btnName=='评论'){
									// 	uni.redirectTo({
									// 	  url:'./issueSafetyDetails?state=整改&id='+this.issueId
									// 	});
									// }else if(this.stateValue='整改完成'&&this.btnName=='评论'){
									// 	uni.redirectTo({
									// 	  url:'./issueSafetyDetails?state=验收&id='+this.issueId
									// 	});
									// }
									// uni.redirectTo({
									// 	url: "./issueSafety"
							       	// });
									self.backPage()
							    } 
							}
						})
						return;
					})
				}else{
					uni.uploadFile({
						url:this.commonIP+"/api/Issue/AddIssueComment",    // 后端api接口
						// filePath:this.imageFile[0], // uni.chooseImage函数调用后获取的本地文件路劲
						// name:'EmployeeImage',     //后端通过'file'获取上传的文件对象(字段)
						files:this.imageObjs, //数组（[{},{}]）类型
						formData: data, 
						header: {
							'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
						},
						success:(res) => {
							// console.log(res);
							var self=this;
							if(res.statusCode==200){
								uni.hideLoading()
								uni.showModal({
									title: '提示',
									content: '评论成功',
									showCancel:false,
									success: function (res) {
									    if (res.confirm) {
											// uni.redirectTo({
											// 	url: "./issueSafety"
									  //      	});
											self.backPage()
									    } 
									}
								})
								return;
							}
						}
					});
				}
			},
			backPage() {
				let pages = getCurrentPages();
				let beforePage = pages[pages.length - 2];
				beforePage.$vm.loadissueDetails();
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.content{
		height: calc(100vh - 44px);
		position: relative;
		.rectifyContent{
			background-color: #FFFFFF;
			.rectifyDesc{
				height:280rpx;
				line-height: 88rpx;
				color:#222;
			}
		}
		.btns{
			margin:0px auto;
			button{
				width:90vw;
				margin-top:500rpx;
			}
		}
	}
</style>
