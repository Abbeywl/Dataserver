<template>
	<view>
		<view class="mask" :style="{'opacity':show?'1':'0','visibility':show?'visible':'hidden'}"></view>
		<view class="modal-box" :style="{'display':show?'block':'none','width':modalWidth}">
			<view class="modal-title" :style="{'padding':titlePadding,'fontSize':titleSize,'color':titleColor}">
				{{titleText}}
			</view>
			<view class="modal-content" v-if="contentType==1" :style="{'fontSize':contentSize,'padding':contentPadding,'color':contentColor}">
				{{contentText}}
			</view>
			<view class="modal-content" v-if="contentType==2" :style="{'padding':contentPadding}">
				<input :placeholder="placeholderText" v-model="inputText" :maxlength="maxLength" :placeholder-style="placeholderStyleString" :style="{'borderColor':inputBorderColor,'fontSize':contentSize,'color':contentColor}" class="input-area"/>
			</view>
			<view class="modal-content" v-if="contentType==3" :style="{'padding':contentPadding}">
				<textarea :placeholder="placeholderText" v-model="textareaText" :maxlength="maxLength" :placeholder-style="placeholderStyleString" :style="{'borderColor':inputBorderColor,'fontSize':contentSize,'color':contentColor}"/>
			</view>
			<view class="model-bottom" :style="{'padding':bottomPadding,'justify-content':btnLength>1?'space-between':'center'}">
				<block v-for="(item,index) in btnGroup" :key='index'>
					<view class="modal-btn" :style="{'width':item.width,'height':item.height,'color':item.color,'background-color':item.bgColor,'font-size':bottomFontSize,'border-radius':shapeObj[item.shape]}" @tap="btnClick(index)">
						{{item.text}}
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "z-modal",
		props: {
			// **************** 使用配置项 ****************
			// 文本校验？
			check:{
				type:Boolean,
				default:false
			},
			checkItem:{
				// isRequired-是否必填/ isNumber-是否为纯数字 isChinese-是否为纯中文 isEnglish-是否为纯英文 isEmail-是否为邮箱格式 isIdNum-是否为身份证格式
				type:Array,
				default:()=>{
					return []
				}
			},
			/*
			支持自定义校验，格式为{
				key:正则
			}
			例如{
				'isNumber':/^\+?[0-9][0-9]*$/
			}
			*/
			selfCheckItem:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			// 控制modal的显示隐藏
			show:{
				type:Boolean,
				default:false
			},
			// 底部按钮组
			btnGroup: {
				type: Array,
				default: () => {
					return [{
						text: '取消',
						color: '#FFFFFF',
						bgColor: '#999999',
						width: '220rpx',
						height: '80rpx',
						shape: 'circle',
						eventName: 'cancle'
					}, {
						text: '确定',
						color: '#FFFFFF',
						bgColor: '#007AFF',
						width: '220rpx',
						height: '80rpx',
						shape: 'circle',
						eventName: 'sure'
					}]
				}
			},
			// 文本类型 1-展示文字 2-input 3-textarea
			contentType:{
				type:[Number,String],
				default:1
			},
			// contentType为2或3时的字数限制
			maxLength:{
				type:Number,
				default:20
			},
			// **************** 尺寸&大小 ****************
			// modal整体宽度 rpx
			modalWidth:{
				type:String,
				default:'580rpx'
			},
			// title区域文字大小
			titleSize:{
				type:String,
				default:'32rpx'
			},
			// content区域文字大小
			contentSize:{
				type:String,
				default:'28rpx'
			},
			// 底部（按钮）区域的字号
			bottomFontSize:{
				type:String,
				default:'28rpx'
			},
			// title(标题) 区域的padding
			titlePadding:{
				type:String,
				default:'20rpx 0'
			},
			// content(内容) 区域的padding
			contentPadding:{
				type:String,
				default:'10rpx 40rpx'
			},
			// 底部（按钮）区域的padding
			bottomPadding:{
				type:String,
				default:'30rpx 40rpx'
			},
			// **************** 颜色 ****************
			// 标题文字颜色
			titleColor:{
				type:String,
				default:'#333333'
			},
			// 内容文字颜色
			contentColor:{
				type:String,
				default:'#333333'
			},
			// placeholderColor-提示文字的颜色
			placeholderColor:{
				type:String,
				default:'#999'
			},
			inputBorderColor:{
				type:String,
				default:'#999'
			},
			// **************** 内容 ****************
			// 标题内容
			titleText:{
				type:String,
				default:'titleText'
			},
			// 文本内容
			contentText:{
				type:String,
				default:'Please type in your text'
			},
			// input或textarea的placeholder
			placeholderText:{
				type:String,
				default:'请输入你的内容'
			}
		},
		computed:{
			btnLength(){
				return this.btnGroup.length
			},
			placeholderStyleString(){
				return `color:${this.placeholderColor};font-size:${this.contentSize}`
			}
		},
		data() {
			return {
				// 底部按钮shape对应值
				shapeObj:{
					'circle':'1000rpx',
					'straight':'0',
					'fillet':'12rpx'
				},
				inputText:'',
				textareaText:'',
				// ***校验项，是否通过，true-通过，false不通过
				checkCollection: {
					isRequired :function(val){
						return !(val === null || val === '' || val === undefined)
					},
					isNumber :function(val){
						let reg = /^\+?[0-9][0-9]*$/
						return reg.test(val)
					},
					isChinese :function(val){
						let reg = /^[\u4e00-\u9fa5]+$/
						return reg.test(val)
					},
					isEnglish :function(val){
						let reg = /^[a-zA-Z]+$/
						return reg.test(val)
					},
					isEmail :function(val){
						let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
						return reg.test(val)
					},
					isIdNum :function(val){
						let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
						return reg.test(val)
					}
				}
			};
		},
		methods:{
			btnClick(index){
				let val = this.contentType==2?this.inputText:this.textareaText
				if(this.check && this.checkItem.length && this.contentType!=1){
					let err = false
					// 进入校验，如果不通过直接返回，通过则吐出按钮事件
					for(let item of this.checkItem){
						if(!this.checkCollection[item](val)){
							this.$emit('error',item)
							err = true
							break
						}
					}
					if(err) return
				}
				let selfCheckArr = Object.entries(this.selfCheckItem)
				if(this.check && selfCheckArr.length && this.contentType!=1){
					let err = false
					for(let item of selfCheckArr){
						let reg = new RegExp(item[1])
						if(!reg.test(val)){
							this.$emit('error',item[0])
							err = true
							break
						}
					}
					if(err) return
				}
				this.$emit(this.btnGroup[index]['eventName'],{
					inputText:this.inputText || '',
					textareaText:this.textareaText || ''
				})
				this.inputText = ''
				this.textareaText = ''
			}
		}
	}
</script>

<style>
	.mask {
		position: fixed;
		z-index: 98;
		background-color: rgba(0, 0, 0, .7);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: hidden;
		opacity: 0;
		transition: all .3s;
	}

	.modal-box {
		background-color: #FFFFFF;
		position: fixed;
		z-index: 99;
		border-radius: 12rpx;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.modal-title {
		box-sizing: border-box;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		box-sizing: border-box;
		color: #333333;
		word-break: break-all;
		display: flex;
		justify-content: center;
	}

	.model-bottom {
		display: flex;
		align-items: center;
	}

	.modal-btn {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.input-area{
		border: 1rpx solid #999;
		width: 100%;
		padding:0 16rpx;
		box-sizing: border-box;
		height: 60rpx;
		border-radius: 6rpx;
		outline: none;
	}
	
	textarea{
		border: 1rpx solid #999;
		width: 92%;
		padding:16rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		height: 200rpx;
	}

</style>
