<template>
	<view class="content">
		<u-toast ref="uToast" />
		<!-- 头部筛选部分 -->
		<u-row>
			<u-col span="12" >
				<view class="u-m-t-30 u-m-l-30 u-m-b-10" @click="screenShow=true">
					<text>筛选</text>
					<u-icon class="icon iconfont icon-test-down"></u-icon> 
				</view>
				<u-popup v-model="screenShow" mode="top" height="700">
					<u-row>
						<u-col span="12">
							<view class="u-p-t-20 u-p-b-20 u-text-center u-font-30 u-border-bottom">筛选条件</view>
						</u-col>
					</u-row>
					<!-- 时间 -->
					<u-row class="u-p-t-20 u-p-b-20">
						<u-col span="2">
							<view class="u-p-l-10 u-font-28" >时间:</view>
						</u-col>
						<u-col span="10">
							<view class="u-flex">
								<view class="u-m-r-40">
									<u-picker mode="time" v-model="startShow" :params="paramsTime" @confirm="startconfirm"></u-picker>
									<!-- <picker @change="startDate" mode=date></picker> -->
									<view @click="startShow=true">
										<text>{{startTime}}</text>
										<u-icon class="icon iconfont icon-test-down"></u-icon>
									</view>
								</view>
								<view>
									<u-picker mode="time" v-model="endShow" :params="paramsTime" @confirm="endconfirm"></u-picker>
									<!-- <picker @change="startDate" mode=date></picker> -->
									<text @click="endShow=true">{{endTime}}</text>
									<u-icon class="icon iconfont icon-test-down"></u-icon>
								</view>
							</view>
						</u-col>
					</u-row>
					<!-- 状态 -->
					<u-row class="u-p-t-20 u-p-b-20">
						<u-col span="2">
							<view class="u-p-l-10 u-font-28" >状态:</view>
						</u-col>
						<u-col span="10" class=" u-flex u-flex-wrap" >
							<view class="contentStyle u-p-t-10 u-p-b-10 u-p-l-20 u-p-r-20 u-m-r-20 u-m-b-10" @click="stateClick(index1)" :class="{'selected':item1.stateSel==true}"  v-for="(item1,index1) in stateList" :key="index1">
								<text>{{item1.state}}</text>
							</view>
						</u-col>
					</u-row>
					<!-- 级别 -->
					<u-row class="u-p-t-20 u-p-b-20">
						<u-col span="2">
							<view class="u-p-l-10 u-font-28" >级别:</view>
						</u-col>
						<u-col span="10" class=" u-flex u-flex-wrap" >
							<view class=" contentStyle u-p-t-10 u-p-b-10 u-p-l-20 u-p-r-20 u-m-r-20 u-m-b-10" @click="levelClick(index2)" :class="{'selected':item2.levelSel==true}" v-for="(item2,index2) in levelList" :key="index2" >
								<text>{{item2.Name}}</text>
							</view>
						</u-col>
					</u-row>
					<!-- 区域 -->
					<u-row class="u-p-t-20 u-p-b-20">
						<u-col span="2">
							<view class="u-p-l-10 u-font-28" >区域:</view>
						</u-col>
						<u-col span="10" class=" u-flex u-flex-wrap" >
							<view class=" contentStyle u-p-t-10 u-p-b-10 u-p-l-20 u-p-r-20 u-m-r-20 u-m-b-10" @click="areaClick(index3)" :class="{'selected':index3==areaIndex}"  v-for="(item3,index3) of areaList" :key="index3" >
								<text>{{item3.Name}}</text>
							</view>
						</u-col>
					</u-row>
					<!-- 整改 -->
					<u-row class="u-p-t-20 u-p-b-20">
						<u-col span="2">
							<view class="u-p-l-10 u-font-28" >维修地点:</view>
						</u-col>
						<u-col span="10" class=" u-flex u-flex-wrap" >
							<view class=" contentStyle u-p-t-10 u-p-b-10 u-p-l-20 u-p-r-20 u-m-r-20 u-m-b-10" @click="rectifyClick(index4)" :class="{'selected':index4==rectifyIndex}" v-for="(item4,index4) of rectifyList" :key="index4">
								<text>{{item4.Name}}</text>
							</view>
						</u-col>
					</u-row>
					
					<u-row class="u-m-t-20 u-m-b-10">
						<u-col span="6" class="u-text-center-important">
							<u-button @click="cancelClose" size="medium">取消</u-button>
						</u-col>
						<u-col span="6" class="u-text-center-important">
							<u-button @click="confirmClose"  size="medium" type="primary">确认</u-button>
						</u-col>
					</u-row>
				</u-popup>
			</u-col>
		</u-row>
		<!-- 问题列表 -->
		<u-row>
			<u-col span="12">
				<commonList v-for="(item,index) of issueList" :key="index" :title="item.Title" :rightTitleText="getStatus(item)" :infoArr="getInfo(item)" @click.native="jumpDetails(item.ID,item.State,item.ProcessUsers.RectificationOrg.length!=0?item.ProcessUsers.RectificationOrg[0].UserName:'')"></commonList>
			</u-col>
		</u-row>
		<!-- 上拉加载数据的样式 -->
		<u-row>
			<u-col span="12">
				<view :class="{'footText':downLoading==true}" v-if="downLoading">正在加载...</view>
				<view :class="{'footText':upLoading==true}" v-if="upLoading">没有更多数据了</view>
			</u-col>
		</u-row>
		<!-- 添加工单图标 -->
		<view class="addIssue" @click="jumpAddIssue">
			<span class="icon iconfont icon-add-select "></span>
		</view>
		<!-- 底部导航栏 -->
		<u-row>
			<u-col span="12">
				<tarbar :tarbarStatus="tarbarStatus" :tabbarMenu="tabbarMenu" :jumpPage1="'./issueSafetyCharts'"></tarbar>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import tarbar from '../../common/components/tarbar/tarbar.vue';//引入底部导航栏
	import popupLayer from '@/components/popup-layer/popup-layer';	//引入弹出层
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';	//引入日历插件
	import commonList from "../../common/components/commonList/commonList.vue"//引入列表组件
	import commonJs from '../../common/js/common.js'
	import safatyJson from './safety.json'
	export default {
		components:{tarbar,popupLayer,uniCalendar,commonList},
		data() {
			return {
				issueType:'安全文明施工',//工单类型
				tarbarStatus:false,
				tabbarMenu:[{
					name: '统计',
					icon: 'icon-tongji1'
				},{
					name: '工单',
					icon: 'icon-gongdan'
				}],
				issueList:[],//问题列表
				issueData:[],
				current:-1,//当前checkbox状态
				pageNumber:1,//默认加载页数
				downLoading:false,//下拉加载的状态
				upLoading:false, //上拉加载的状态
				addIssueShow:false,//添加权限
				startTime:commonJs.getBeforeDate(7),//筛选的开始时间
				endTime:commonJs.getBeforeDate(0),//筛选的结束时间
				stateList:[
					{state:"待维修",stateSel:false,stateNum:"1",stateGl:false},
					{state:"维修中",stateSel:false,stateNum:"2,3,6",stateGl:false},
					{state:"待验收",stateSel:false,stateNum:"4",stateGl:false},
					{state:"已完成",stateSel:false,stateNum:"5",stateGl:false},
				],
				levelList:[], //保存后台级别 
				areaList:[],  //保存区域
				rectifyList:[], //保存维修地点的数据 
				regionID:"",//区域
				issueTime:"",//时间
				searchResolved:"",//维修地点
				issueStatus:"",//问题状态
				issueLevel:"",//问题级别
				areaIndex:-1, //判断区域的当前状态
				rectifyIndex:-1, //判断维修地点的当前状态
				isSupport:true,//默认是够有下拉刷新状态值
				screenShow:false,//默认弹出层是关闭的
				startShow:false,//开始时间的选择
				endShow:false,//结束时间的选择
				paramsTime:{//picker时间的参数
					year: true,
					month: true,
					day: true,
				},
				commonIP:uni.getStorageSync("commonIP"),//保存ip地址
			}
		},
		onLoad(options){
			uni.showLoading({
				title:'正在加载...'
			})
			this.loadIssueList(this.issueType,'',this.regionID,this.searchResolved,this.issueTime,this.issueStatus,this.issueLevel)
			this.loadScreen('/api/Issue/GetAllUnits','维修地点',{})
			this.loadScreen('/api/ProjectRegion/GetProjectRegions','区域',{})
			this.loadScreen('/api/Project/GetTypeOrStates','级别',{nodeName:'Issue',name:''})
		},
		// onNavigationBarButtonTap(e){
		// 	uni.reLaunch({
		// 		url:"../index/index"
		// 	})
		// },
		//底部上拉加载信息
		onReachBottom(){
			this.downLoading=true;
			this.pageNumber++;
			this.loadIssueList(this.issueType,'',this.regionID,this.searchResolved,this.issueTime,this.issueStatus,this.issueLevel)
			this.$refs.uToast.show({
				title: '数据加载成功',
				position:'bottom'
			})
		},
		//下拉刷新
		onPullDownRefresh(){
			this.downLoading=false;
			this.upLoading=false;
			this.pageNumber=1;
			this.issueList=[];//清空数据  防止后面数据重复
			this.loadIssueList(this.issueType,'',this.regionID,this.searchResolved,this.issueTime,this.issueStatus,this.issueLevel)
			this.$refs.uToast.show({
				title: '刷新成功',
				position:'bottom'
			})
			uni.stopPullDownRefresh();
		},
		methods: {
			//传值给组件列表
			getInfo(data){
				var rectifyUnit='';//维修地点
				if(data.ProcessUsers.RectificationOrg.length==0){
					rectifyUnit='未确定(未确定)';
				}else{
					rectifyUnit=data.ProcessUsers.RectificationOrg[0].OrganizationName+'('+data.ProcessUsers.RectificationOrg[0].UserName+')';
					// obj.loginName=data.ProcessUsers.RectificationOrg[0].UserName;
				}
				var requireDate='';
				if(data.RequireDate!=null){
					requireDate=data.RequireDate.split('T')[0]
				}else{
					requireDate=''
				}
				return [
					{
						leftText:'车牌号:'+data.Number,//车牌号
						rightText:{//右侧文字
							type:'middleText',//有四种topText,colorText,middleText,bottomText
							value: '类型:'+data.State,//状态
						}
					},
					{
						leftText:'维修地点:'+rectifyUnit,//维修地点
						rightText:{//右侧文字
							type:'middleText',//有四种topText,colorText,middleText,bottomText
							value: '维修时间:'+requireDate,//文本值
						}
					}
				]
			},
			//列表右边的状态判断
			getStatus(data){
				if(data.IsOverdue==true){
					return {
						type:'topText',//文字样式类型，有四种,colorText,
						value: '已逾期',//文本值
						color: 'red'//设置颜色
					}
				}else{
					return {}
				}
				
			},
			//开始时间的确认
			startconfirm(e){
				this.startTime=e.year+'-'+e.month+'-'+e.day;
			},
			//结束时间的确认
			endconfirm(e){
				this.endTime=e.year+'-'+e.month+'-'+e.day;
			},
			// 取消并且关闭页面
			cancelClose(){
				this.screenShow=false;
				//把状态获取到的参数值得 最后一个，取消掉
				this.issueStatus=this.issueStatus.slice(0,-1);
				//把参数值取消掉，避免再次点击的时候影响
				this.issueStatus="";
				this.issueLevel=this.issueLevel.slice(0,-1);
				//把参数值取消掉，避免再次点击的时候影响
				this.issueLevel="";
				this.regionID="";
				this.searchResolved="";
				//点击取消的时候，吧所有的状态 级别的状态还原为默认的状态
				for(var i=0;i<this.stateList.length;i++){
					if(this.stateList[i].stateSel==true || this.stateList[i].stateGl==true){
						this.stateList[i].stateSel=false;
						this.stateList[i].stateGl=false;
					}
				};
				for(var i=0;i<this.levelList.length;i++){
					if(this.levelList[i].levelSel==true || this.levelList[i].levelGl==true){
						this.levelList[i].levelSel=false;
						this.levelList[i].levelGl=false;
					}
				}
				this.areaIndex=-1;
				this.rectifyIndex=-1;
			},
			// 确定并且关闭页面
			confirmClose(){
				this.issueList=[];
				this.loadIssueList(this.issueType,'',this.regionID,this.searchResolved,this.issueTime,this.issueStatus,this.issueLevel)
				this.screenShow=false;
			},
			//维修地点的选择
			rectifyClick(index){
				for(var i=0;i<this.rectifyList.length;i++){
					if(i==index){//如果下标和传来的值相同 则 判断高亮的状态为true 
						this.rectifyList[index].unitSel=!this.rectifyList[index].unitSel;
						if(this.rectifyList[index].unitSel==true){ //吐过为高亮 则赋值下标和id
							this.rectifyIndex=index;
							this.searchResolved=this.rectifyList[index].ID;
						}else{
							this.rectifyIndex=-1;
							this.searchResolved="";
						}
					}else if(this.rectifyList[i].unitSel){//如果传来的下标不相同且高亮状态为true
						this.rectifyList[i].unitSel=!this.rectifyList[i].unitSel;//则改为false
					}
				}
			},
			//区域的选择
			areaClick(index){
				for(var i=0;i<this.areaList.length;i++){
					if(i==index){
						this.areaList[index].areaSel=!this.areaList[index].areaSel;
						if(this.areaList[index].areaSel==true){
							this.areaIndex=index;
							this.regionID=this.areaList[index].ID;
						}else{
							this.areaIndex=-1;
							this.regionID="";
						}
					}else if(this.areaList[i].areaSel){
						this.areaList[i].areaSel=!this.areaList[i].areaSel;
					}
				}
				
			},
			//级别的选择
			levelClick(index){
				for(var i=0;i<this.levelList.length;i++){
					if(index==i){
						//点击状态取相反
						this.levelList[i].stateGl=!this.levelList[i].stateGl
						this.levelList[i].levelSel=true;
						if(this.issueLevel.indexOf(this.levelList[i].Value)==-1){
							this.issueLevel+=this.levelList[i].Value+",";
						}
						if(this.levelList[i].stateGl==false){
							this.levelList[i].levelSel=false;
							if(this.issueLevel.indexOf(this.levelList[i].Value)!=-1){
								this.issueLevel=this.issueLevel.replace(this.levelList[i].Value+",","")
							}
						}
					}
				}
			},
			stateClick(index){
				for(var i=0;i<this.stateList.length;i++){//循环确认当前i和index 相同则高亮
					if(index==i){
						//点击状态取相反   表示每次点击每个状态选项的当前状态去相反
						this.stateList[i].stateGl=!this.stateList[i].stateGl
						this.stateList[i].stateSel=true;
						//判断保存的数据里面是否已经包含了  如果没有包含菜想加
						if(this.issueStatus.indexOf(this.stateList[i].stateNum)==-1){
							this.issueStatus+=this.stateList[i].stateNum+",";
						}
						//如果点击第二次 取消高亮
						if(this.stateList[i].stateGl==false){
							this.stateList[i].stateSel=false;
							//第二次取消高亮的时候，吧原先添加上的参数，给取消掉
							if(this.issueStatus.indexOf(this.stateList[i].stateNum)!=-1){
								this.issueStatus=this.issueStatus.replace(this.stateList[i].stateNum+",","")
							}
						}
					}
				}
			},
			
			//跳转到添加问题详情的页面
			jumpAddIssue(){
				uni.navigateTo({
					url:'./addIssueSafety?issueType='+this.issueType
				})
			},
			// 跳转详情页
			jumpDetails(id,state,loginName){
				var disPlayName=uni.getStorageSync('DisPlayName')
				var myPermission=uni.getStorageSync('myPermission')
				if((state=='已发送'||state=='验收不通过'||state == '正在处理') && myPermission.indexOf('RectifySafetyIssue') && loginName==disPlayName){
					uni.navigateTo({
						url:'./issueSafetyDetails?state=整改&id='+id
					})
				}else if(state=='整改完成'&&myPermission.indexOf('InspectSafetyIssue')){
					uni.navigateTo({
						url:'./issueSafetyDetails?state=验收&id='+id
					})
				}else if(state=='验收通过'){
					uni.navigateTo({
						url:'./issueSafetyDetails?state=验收通过&id='+id
					})
				}else if(state=='草稿'&&myPermission.indexOf('CreateSafetyIssue')){
					uni.navigateTo({
						url:'./addIssueSafety?id='+id
					})
				}else {
					uni.navigateTo({
						url:'./issueSafetyDetails?state=&id='+id
					})
				}
				// if(){
				// 	uni.navigateTo({
				// 		url:'./addIssueSafety?id='+id
				// 	})
				// }
				
			},
			//获取筛选值
			loadScreen(api,name,data){
				this.$u.get(api,
					data
				).then(res=>{
					if(name=='维修地点'){
						var data=res.ResultData;
						for(var item of data){
							item.unitSel=false;//判断维修地点每个是否被选中的状态
						}
						this.rectifyList=data;
					}else if(name=='区域'){
						var data=res.ResultData.item
						for(var item of data){
							item.areaSel=false;//判断维修地点每个是否被选中的状态
						}
						this.areaList=data;
					}else if(name=='级别'){
						var data=res.ResultData;
						for(var item of data){
							if(item.Name=='安全文明施工'){
								for(var key of item.Secondaries){
									key.levelSel=false;
								}
								this.levelList=item.Secondaries;
							}
						}
					}
				})
			},
			//获取问题列表
			loadIssueList(issueType,searchText,regionID,searchResolved,issueTime,issueStatus,issueLevel){
				uni.showLoading({
					title:'正在加载...'
				})
				// this.$u.get('/api/Issue/GetIssues',{
				// 	type:issueType,
				// 	pageNumber:this.pageNumber,
				// 	searchText:searchText,
				// 	pageSize:10,
				// 	ViewAllPermissions:"ViewAllSafetyIssue,InspectSafetyIssue",
				// 	time:issueTime,
				// 	regionID:regionID,
				// 	searchResolved:searchResolved,
				// 	issuestatus:issueStatus,
				// 	level:issueLevel
				// }).then(res=>{
					//var data=res.ResultData.rows;
					// console.log(data)
					
				var	data=safatyJson
					this.issueList=this.issueList.concat(data);
					if(data.length==0){
						this.upLoading=true;
						this.downLoading=false;
						uni.hideLoading();
						return;
					}
					// this.downLoading=true;
					uni.hideLoading()
				// })
			}
		}
	}
</script>
<style>
@import url("../../static/iconfont/iconfont/iconfont.css");</style>
<style lang="scss" scoped>
	.content{
		.footText{
			text-align: center;
			font-size:30rpx;
			font-weight: 300;
			color:#999999;
			padding-bottom:120rpx;
		}
		.contentStyle{
			border:1rpx solid #eee;
			border-radius: 10rpx;
		}
		.selected{
			background-color: #007AFF;
			color:#fff;
			border:1rpx solid #007AFF;
		}
		.addIssue{
			position: fixed;
			right:58rpx;
			bottom:150rpx;
			padding:0;
			margin:0;
			background-color: #007AFF;
			width:88rpx;
			height:88rpx;
			border-radius: 50%;
			    display: flex;
			    align-items: center;
			    justify-content: center;
			span{
				font-size:88rpx;
				color:#fff;
			}
		}
	}
</style>
