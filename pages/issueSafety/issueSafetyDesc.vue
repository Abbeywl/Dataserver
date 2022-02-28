<template>
	<view class="content">
		<u-toast ref="uToast" />
		<!-- 手风琴部分 -->
		<u-row>
			<u-col span="12">
				<uni-collapse class="checkCollapse" :accordion="true">
					<checkbox-group  @change="checkboxChange($event,index)" v-for="(item,index) in checkData"  :key="index" >
						<uni-collapse-item :showAnimation="true" :showIcon="false" :showArrow="true">
							<view class="checktitle u-flex u-row-between u-p-l-30" slot="collapseTitle">
								<text class="u-font-30">{{item.CheckItemName}}</text>
								<label >
									<view>
										<checkbox style="opacity: 0.5" v-if="isDisabled" :disabled="isDisabled"    @click.stop :value="item.CheckItemName" :checked="item.IsPassed" />
										<checkbox v-if="!isDisabled" @click="chooseCheck"  @click.stop :value="item.CheckItemName" :checked="item.IsPassed" />
									</view>
								</label>
							</view>
							<view slot="collapseContent" class="checkContent" >
								<text class="u-font-28 u-p-t-10 u-p-b-10" v-for="(item2,index2) in item.SubItemContent">{{item2}}</text>
							</view>
						</uni-collapse-item>
					</checkbox-group>
				</uni-collapse>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components:{
			uniCollapse,uniCollapseItem
		},
		data() {
			return {
				issueId:'',//id
				checkData:[],//保存检查项数据
				checkTitle:'',//checkBox的选择项标题
				isCheck:false,//设置成功与不成功
				isDisabled:true,//是否被禁用
				rectifyName:'',//整改人员名字
				issueState:'',//工单状态
				commonIP:uni.getStorageSync('commonIP'),//获取ip
			}
		},
		onLoad(options) {
			this.issueId=options.issueId
			console.log(options)
			this.rectifyName=options.name;
			this.issueState=options.state;
			this.loadCheckData()//获取检查项数据
			this.loadPermission()//获取是否有操作检查项的权限
		},
		methods: {
			//获取是否有操作检查项的权限
			loadPermission(){
				var disPlayName=uni.getStorageSync('DisPlayName')
				console.log(disPlayName);
				var myPermission=uni.getStorageSync('myPermission')
				if(this.rectifyName==disPlayName && this.issueState!=='验收通过'){
					this.isDisabled=false;
				}
			},
			//选择标题名和状态
			checkboxChange(e,index){
				this.checkTitle=this.checkData[index].CheckItemName;
				this.isCheck=!this.checkData[index].IsPassed;
				console.log(this.isCheck)
			},
			//改变检查项状态
			chooseCheck(){
				this.$u.get('/api/Issue/CheckedIssueCheckItem',{
					issueID:this.issueId,
					isPassed:this.isCheck,
					checkitem:this.checkTitle
				}).then(res=>{
					this.$refs.uToast.show({
						title: '设置成功',
						position:'bottom'
					})
				})
			},
			//获取检查项数据
			loadCheckData(){
				this.$u.get('/api/Issue/GetIssueCategoryCheckItemByCategory',{
					issueID:this.issueId
				}).then(res=>{
					this.checkData=res.ResultData.CheckItems
				})
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../common/css/checkStyle.css");
	.content{
		.checkCollapse{
			/deep/{
				.uni-collapse-cell__title-arrow{
					right:20rpx;
				}
				.uni-collapse-cell__title {
					border-bottom: 1px solid #DDDDDD;
					box-sizing: border-box;
					border-radius: 6rpx;
				}
			}
			.checktitle{
				width:85%;
				height:100rpx;
				checkbox{
					transform: scale(0.9);
				}
			}
			.checkContent{
				background-color:#f9f9f9 ;
				display: flex;
				flex-direction: column;
				padding:10rpx 30rpx 10rpx 60rpx;
				text{
					display: inline-block;
					font-family: PingFang SC;
					font-weight: 400;
					color: #444444;
				}
			}
		}
	}
	
</style>
