<template>
	<view class="content">
		<u-toast ref="uToast" />
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="证件类型" prop="IDType" label-width="150">
				<u-input :border="border" type="select" v-model="model.IDType" placeholder="请选择证件类型"
					@click="IDTypeIsShow = true"></u-input>
				<u-action-sheet :list="IDradioList" v-model="IDTypeIsShow" @click="IDTypeCallback"></u-action-sheet>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="" label-width="150"
				:label-position="labelPosition" label="证件号码" prop="IDNumber">
				<u-input :border="border" placeholder="请输入证件号码" v-model="model.IDNumber" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150"
				:label-position="labelPosition" label="姓名" prop="DisplayName">
				<u-input :border="border" placeholder="请输入姓名" v-model="model.DisplayName" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="性别" prop="Sex" label-width="150">
				<u-input :border="border" type="select" :select-open="SexShow" v-model="model.Sex" placeholder="请选择性别"
					@click="SexShow = true"></u-input>
				<u-action-sheet :list="actionSheetList" v-model="SexShow" @click="actionSheetCallback">
				</u-action-sheet>
			</u-form-item>
			<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" :label-position="labelPosition"
				label="手机号码" prop="MobilePhone" label-width="150">
				<u-input :border="border" placeholder="请输入手机号" v-model="model.MobilePhone" type="number"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="车辆信息" prop="WorkCompany" label-width="150">
				<u-input :border="border" type="select" v-model="model.WorkCompany" placeholder="请选择车辆信息"
					@click="WorkCompanyIsShow = true"></u-input>
				<u-action-sheet :list="WorkCompanyList" v-model="WorkCompanyIsShow" @click="WorkCompanyCallback"></u-action-sheet>
			</u-form-item>

			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label-width="150"
				:label-position="labelPosition" label="详细地址" prop="DetailedAddress">
				<u-input :border="border" placeholder="请输入详细地址" v-model="model.DetailedAddress" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="是否对接物联网终端信息？" prop="WorkInDangerousPost" label-width="150">
				<u-radio-group v-model="danger" @change="dangerChange" :wrap="false">
					<u-radio shape="circle" v-for="(item, index) in dangerList" :key="index" :name="item.value">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<u-button @click="submit" type="primary" class='u-p-t-100 submit_btn'>提交</u-button>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				model: {
					// ID:uni.getStorageSync('ID'),
					// LoginName:uni.getStorageSync('LoginName'),
					DisplayName: '',
					Sex: '',
					MobilePhone: '',
					IDType: '',
					IDNumber: '',
					WorkCompany: '',
					DetailedAddress: '',			
					WorkInDangerousPost: '',
					// UserType:'',
					Password:''
				},
				rules: {
					IDNumber: [{
							required: true,
							message: '请输入证件号码',
							trigger: 'blur',
						},
						{
							validator: (rule, value, callback) => {
								const _IDRe18 =
									/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
								const _IDre15 =
									/^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
								let state=false;
								switch(this.model.IDType){
									case '居民身份证':
										(_IDRe18.test(value) || _IDre15.test(value))?state=true:state=false;
										break;
									case '护照':
										(!value || !/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(value))?state=false:state=true;
										break;
									default:
										(!value)?state=false:state=true;
										break;
								}
									// (_IDRe18.test(value) || _IDre15.test(value))?state=true:state=false;
								 return state;
							},
							message: '证件号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
					DisplayName: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur',
						},
						{
							min: 2,
							max: 5,
							message: '姓名长度在2到5个字符',
							trigger: ['change', 'blur'],
						},
						{
							// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						},
					],
					Sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					IDType: [{
						required: true,
						message: '请选择任意证件类型',
						trigger: 'change',
					}],
					WorkCompany: [{
						required: true,
						message: '请选择车辆信息',
						trigger: 'change'
					}],
					MobilePhone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur'],
						}
					],
					DetailedAddress: [{
						required: true,
						message: '请输入详细地址',
						trigger: ['change', 'blur'],
					}],
					WorkInDangerousPost: [{
						required: true,
						message: '请选择是否在高风险岗位工作',
						trigger: ['change'],
					}]
				},
				border: false,
				check: false,
				selectStatus: 'close',
				SexShow: false,
				IDTypeIsShow: false,
				WorkCompanyIsShow: false,
				dangerList: [
					{
						name: '是',
						value:'Dangerous',
						checked: true,
						disabled: false
					},
					{
						name: '否',
						value:'NotDangerous',
						checked: false,
						disabled: false
					},
				],
				IDradioList: [
					{
						text: '居民身份证',
					},
					{
						text: '护照',
					},
					{
						text: '其他',
					},
				],
				WorkCompanyList: [
					{
						text: '车辆信息1',
					},
					{
						text: '车辆信息2',
					},
					{
						text: '车辆信息3',
					},
				],
				radio: '',
				danger: '',
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
				],
				labelPosition: 'top',
				errorType: ['message'],
			}
		},
		onLoad() {
			
		},
		computed: {},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {	
				let _this = this;
				uni.showLoading({
					mask:true,
					title:'加载中'
				});
				setTimeout(function(){
					uni.hideLoading();
					_this.$refs.uToast.show({
						title: '注册成功',
						position: 'bottom',
						type: "success",
						isTab: true,
						duration: 0,
						url: '/pages/index/index'
					})		
				},1000)	
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.model.Sex = this.actionSheetList[index].text;
			},
			// 点击证件类型回调
			IDTypeCallback(index) {
				uni.hideKeyboard();
				this.model.IDType = this.IDradioList[index].text;
			},
			// 点击单位回调
			WorkCompanyCallback(index) {
				uni.hideKeyboard();
				this.model.WorkCompany = this.WorkCompanyList[index].text;
			},
			//是否在高风险岗位工作
			dangerChange(e) {
				this.model.WorkInDangerousPost = e;
			},
		}
	};
</script>

<style scoped lang="scss">
	.content {
		padding: 0 50rpx;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
	.submit_btn{
		margin: 100rpx 0;
	}
</style>
