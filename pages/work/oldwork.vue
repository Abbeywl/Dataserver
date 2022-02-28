<template>
	<view class="content">
		<u-row class="wrap" v-for="(item,index) in mobileAppMenusData" :key="index" >
			<u-col span='12'>
				<u-row class='navTitle u-font-30 u-p-l-30 u-p-r-30' v-if="item.IsShow">{{item.DisplayName}}</u-row>
			</u-col>
			<u-col span='12'>
				<u-row class="u-flex u-col-top u-col-top-important u-row-left u-flex-wrap u-m-l-40 u-m-r-20">
					<u-col span="3" class="u-flex u-row-center-important u-m-b-40" v-for="(val,idx) in item.VisibleSubMenus" :key="idx" v-if="val.IsShow">
						<view class="" @click="redirectToPage(val.Name)">
							<view class="u-margin-auto u-block imgBox" style="">
								<image class="u-margin-auto u-block" style="width: 88rpx;height: 88rpx;" :src="'../../static/work/'+val.Name+'.png'" mode=""></image>
							</view>
							<text class="txt u-margin-auto u-font-26 u-inline-block u-text-center u-break-word">{{val.DisplayName}}</text>
						</view>
					</u-col>
				</u-row>
			</u-col>
		</u-row>
		<view class="popView" v-show="play">
			<view class="password-set-page">
				<view class="text-xxl text-center text-bold margin-top-xl" style="font-size: 20px;text-align: center;font-weight: bold;margin-top: 40px;">内部平台密码</view>
				<view class="text-df text-center text-gray margin-tb" style="color: gray;text-align: center;font-size: 14px;margin-top: 10px;">请输入密码，进入内部工作平台</view>
				<view class="code flex align-center justify-center" style="margin-top: 10vh;display: flex;align-items: center;justify-content: center;">
					<view class="flex align-center justify-center" style="display: flex;align-items: center;justify-content: center;">
						<view v-for="(item, index) in 6" :key="index">{{ password[index] && '●' || '' }}</view>
					</view>
				</view>
				<view class="keyboard flex flex-wrap">
					<button v-for="(item, index) in 9" :key="index" @click="key(index + 1)">
						<text>{{ index + 1 }}</text>
					</button>
					<button class="hide"></button>
					<button @click="key(0)">
						<text>0</text>
					</button>
					<button @click="del()">
						<u-icon name="arrow-leftward" size="40"></u-icon>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import browser from '../../common/js/browser.js';
	export default {
		components: {
		},
		onLoad(option) {
			
		},
		onNavigationBarButtonTap(e){
			const index=e.index;
			console.log(index)
			if(index==0){
				uni.navigateTo({
					url:'platformconfig'
				})
			}
		},
		data() {
			return {
				password: '',
				play: uni.getStorageSync('inPassword') ? false : true,
				mobileAppMenusData: [
					{
						"ID": 86,
						"Name": "Service",
						"WebClass": "laowuguanli",
						"LinkHerf": "",
						"ParentId": null,
						"Sort": 2,
						"RequireProject": true,
						"VisibleSubMenus": [
							{
								"ID": 131,
								"Name": "comManage",
								"WebClass": "",
								"LinkHerf": "/KnowledgeLibrary/AddressList",
								"ParentId": 128,
								"Sort": 1,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "身份认证",
								"Type": null
							},
							{
								"ID": 88,
								"Name": "Leave",
								"WebClass": "",
								"LinkHerf": "/LaborManage/Left",
								"ParentId": 86,
								"Sort": 2,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "授权功能",
								"Type": null
							},
							{
								"ID": 89,
								"Name": "SheWolf",
								"WebClass": "",
								"LinkHerf": "/LaborManage/RealName",
								"ParentId": 86,
								"Sort": 3,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "参数保护",
								"Type": null
							}
						],
						"Module": "",
						"Location": null,
						"IsShow": true,
						"DisplayName": "信息管理",
						"Type": null
					},
					{
						"ID": 96,
						"Name": "Equipment",
						"WebClass": "shebeiguanli",
						"LinkHerf": "",
						"ParentId": null,
						"Sort": 3,
						"RequireProject": true,
						"VisibleSubMenus": [
							{
								"ID": 99,
								"Name": "Video",
								"WebClass": "",
								"LinkHerf": "/Equipment/customerAnalysis",
								"ParentId": 96,
								"Sort": 1,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "加密功能",
								"Type": null
							},
							{
								"ID": 101,
								"Name": "netTerminal",
								"WebClass": "",
								"LinkHerf": "/Equipment/Car",
								"ParentId": 96,
								"Sort": 3,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "配置管理",
								"Type": null
							}
						],
						"Module": "",
						"Location": null,
						"IsShow": true,
						"DisplayName": "设备管理",
						"Type": null
					},
					{
						"ID": 90,
						"Name": "Order",
						"WebClass": "gongziguanli",
						"LinkHerf": "",
						"ParentId": null,
						"Sort": 4,
						"RequireProject": true,
						"VisibleSubMenus": [							
							{
								"ID": 91,
								"Name": "SafetyManagement",
								"WebClass": "",
								"LinkHerf": "/ConstructionSupervision/HSE",
								"ParentId": 90,
								"Sort": 3,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "敏感数据保护",
								"Type": null
							},
							{
								"ID": 92,
								"Name": "QualityManagement",
								"WebClass": "",
								"LinkHerf": "/ConstructionSupervision/Quality",
								"ParentId": 90,
								"Sort": 4,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "会话管理",
								"Type": null
							}
						],
						"Module": "",
						"Location": null,
						"IsShow": true,
						"DisplayName": "办公管理",
						"Type": null
					},
					{
						"ID": 94,
						"Name": "ProductiveForces",
						"WebClass": "shengchanliguanli",
						"LinkHerf": "",
						"ParentId": null,
						"Sort": 5,
						"RequireProject": true,
						"VisibleSubMenus": [
							{
								"ID": 87,
								"Name": "Attendance",
								"WebClass": "",
								"LinkHerf": "/LaborManage/Index",
								"ParentId": 86,
								"Sort": 1,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "输入输出验证",
								"Type": null
							},
							{
								"ID": 95,
								"Name": "EfficiencyAnalysis",
								"WebClass": "",
								"LinkHerf": "/server/index",
								"ParentId": 94,
								"Sort": 1,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "异常管理",
								"Type": null
							}
						],
						"Module": "",
						"Location": null,
						"IsShow": true,
						"DisplayName": " 云车联",
						"Type": null
					},
					{
						"ID": 128,
						"Name": "KnowledgeBase",
						"WebClass": "zhishiku",
						"LinkHerf": "/KnowledgeLibrary/Index",
						"ParentId": null,
						"Sort": 8,
						"RequireProject": true,
						"VisibleSubMenus": [
							{
								"ID": 129,
								"Name": "QA",
								"WebClass": "",
								"LinkHerf": "/KnowledgeLibrary/QA",
								"ParentId": 128,
								"Sort": 2,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "日志功能",
								"Type": null
							},
							{
								"ID": 130,
								"Name": "regulation",
								"WebClass": "",
								"LinkHerf": "/KnowledgeLibrary/Regulation",
								"ParentId": 128,
								"Sort": 3,
								"RequireProject": true,
								"VisibleSubMenus": [],
								"Module": "",
								"Location": null,
								"IsShow": true,
								"DisplayName": "反调试技术",
								"Type": null
							}
						],
						"Module": "",
						"Location": null,
						"IsShow": true,
						"DisplayName": "营销管理",
						"Type": null
					}
				]
			}
		},
		methods: {
			//跳转页面点击
			redirectToPage(subName){
				console.log(subName)
				switch(subName){
					case 'Attendance'://考勤
						this.navigateByName('../cloudComputing/index');
						break;
					case 'SafetyManagement'://安全
						this.navigateByName('../issueSafety/issueSafetyCharts');
						break;
					case 'QualityManagement'://质量
						this.navigateByName('../server/index');
						break;
					case 'SheWolf'://实名制
						this.toBrowser('https://m.baidu.com');
						break;
					case 'Leave'://请假
						this.navigateByName('../newMedia/index');
						break;
					case 'EfficiencyAnalysis'://功效分析
						this.navigateByName('../cloudPlatfrom/index');
						break;
					case 'SupervisorLog':
						this.navigateByName('../log/log');
						break;
					case 'QA':
						this.navigateByName('../contactCenter/index');
						break;
					case 'comManage':
						this.navigateByName('../comManage/index/index');
						break;
					case 'regulation':
						this.navigateByName('../interactMarket/index');
						break;
					case 'netTerminal':
						this.navigateByName('../netTerminal/index');
						break;
					case 'Video':
						this.navigateByName('../customerAnalysis/index');
						break;
					default:
						break;
				}
			},
			//跳转方法
			navigateByName(url){
				uni.navigateTo({
					url:url
				})
			},
			key(key) {
				if (this.password.length < 6) {
					this.password += key
					if (this.password.length === 6) {
						if(this.password == '123456'){
							uni.setStorageSync('inPassword', true);
							this.play = false;
						}
					}
				}
			},
			del() {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1)
				}
			},
			toBrowser: function(url){
				var options = {
					'data': '123' // 自定义参数
				}
				browser.init(options)
				browser.show(url)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		font-weight: 400;
		.navTitle{
			line-height: 90rpx;
			color: #222222;
		}
		.imgBox{
			border-radius:36rpx;
			overflow: hidden; 
			width: 88rpx;
			height: 88rpx;
		}
		
	}
	
	.popView{
		background: #FFFFFF;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		z-index: 99999;
	}
	
	.password-set-page {
        .code {
            >view {
                border: 1px solid #DDDDDD;
                border-radius: 8rpx;
                overflow: hidden;
                view {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100rpx;
                    height: 100rpx;
                    background: #FAFAFA;
                    font-size: 60rpx;
                    &:not(:last-child) {
                        border-right: 1px solid #DDDDDD;
                    }
                }
            }
        }
        .keyboard {
			display: flex;
			flex-wrap: wrap;
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #EEEEEE;
            button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: calc(100vw / 3 - 1px);
                background: #FFFFFF;
                border-radius: 0;
                margin-top: 1px;
                font-size: 50rpx;
                height: 120rpx;
                &.button-hover:not(.hide) {
                    background: #EEEEEE;
                }
                image {
                    width: 52rpx;
                    height: 38rpx;
                }
            }
        }
    }

</style>
