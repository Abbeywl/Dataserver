<template>
	<view class="content">
		<u-toast ref="uToast" />
		<u-row class="configlist">
			<u-col span='12'>
				<checkbox-group v-for="(item,index) in mobileAppMenusData" :key="index" @change="checkboxChange($event,index)">
					<u-row  class="parentTitle u-font-30" :parent-id="item.Id">
						{{item.DisplayName}}
					</u-row>
					<u-row v-for="(val,idx) in item.VisibleSubMenus" :key="idx" class="selectList u-flex u-row-between u-m-l-32 u-m-r-32">
						<u-col span="11"  class="childTitle u-font-26" :child-id="val.ID">
							{{val.DisplayName}}
						</u-col>
						<u-col span="1">
							<checkbox :value="val.ID" :checked="val.IsShow" color="#fff" style="transform:scale(0.7)" />
						</u-col>
					</u-row>
				</checkbox-group>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	// import platformdata from './platform.json'
	export default {
		onLoad(option) {
			//加载动画
			uni.showLoading({
				title: '加载中'
			})
			this.getMobileAppMenus();
		},
		data() {
			return {
				mobileAppMenusData:'',//按钮总数据
				resultDataList: [],
			}
		},
		onNavigationBarButtonTap(e) {
			//保存点击事件
			const index = e.index;
			if (index == 0) {
				// 此处用法为在js中调用，需要写this.$u.throttle() 节流
					this.$u.throttle(this.toThrottle, 500)
			}
		},
		methods: {
			toThrottle(){
				var arr=[];
				if(this.mobileAppMenusData.length!=0){
					this.mobileAppMenusData.forEach(function(item, index) {
						item.VisibleSubMenus.forEach(function(val, idx) {
							if(val.hasOwnProperty("isChecked")){
								let obj={};
								obj.MenuID=val.ID;
								obj.IsShow=val.isChecked;
								arr.push(obj)
							}
						})
					});
				}
				this.menuShowParams=arr;
				this.$u.post('/api/Menu/ChangeUserWorkConsoleSetting',{"items":arr}, {
				}).then(res => {
					uni.showModal({
						title: '提示',
						content: '配置成功',
						showCancel:false,
						success: function (res) {
							if (res.confirm) {
								let pages = getCurrentPages();
								let beforePage = pages[pages.length - 2];
								beforePage.$vm.getMobileAppMenus()
								uni.navigateBack()
							} 
						}
					});
				}).catch(res => {
					console.log(res)
				})
			},
			//获取按钮数据
			getMobileAppMenus(){
				uni.hideLoading();//隐藏加载动画
				// this.$u.get('/api/Menu/GetMobileAppMenus', {
				// }).then(res => {
				// 	uni.hideLoading();//隐藏加载动画
				// 	this.mobileAppMenusData=res.ResultData.item;
				// }).catch(res => {
				// 	console.log(res)
				// })
				
			},
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e))
			},
			checkboxChange: function(e, index) {
				var items = this.mobileAppMenusData[index].VisibleSubMenus,
					values = e.detail.value;
					this.resultDataList=items;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.ID)) {
						this.$set(item, 'IsShow', true)
						this.$set(item, 'isChecked', true)
					} else {
						this.$set(item, 'IsShow', false)
						this.$set(item, 'isChecked', false)
					}
				}
			},
			
		}

	}
</script>
<style  scoped lang="scss">
	.parentTitle {
		line-height: 60rpx;
		background-color: #f7f7f7;
		color: #222222;
		text-indent: 32rpx;
	}
	.selectList {
		border-bottom: 1px solid #E8E8E8;
		.childTitle {
			color: #656565;
			line-height: 100rpx;
		}
	}
	/deep/{
		.configlist{
			uni-checkbox{
				.uni-checkbox-input{
					border-radius: 50%;
					width: 52rpx;
					height: 52rpx;
					background-color: #E5E5E5;
					color: #fff;
					border: none;
					&:before{
						font: normal normal normal 14px/1 uni;
						content: "\EA08";
						font-size: 22px;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -48%) scale(.73);
						-webkit-transform: translate(-50%, -48%) scale(.73);
					}
				}
				.uni-checkbox-input-checked{
					background-color: #31AF67;
				}
			}
		}
	}
</style>
