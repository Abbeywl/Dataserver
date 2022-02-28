3.1基本说明：

该组件可自定义行列数量（最多三列，行数不限）可自定义外边框颜色，字体颜色。第一标题行区分开，inforArr其他信息可以设置红色默认灰色，（对象中对应isWarning：true,为红色），可自定义底部iconfont图标，可更改外框颜色 默认灰色（:borderIsRed='true'，为红色），图片,卡片底部信息可隐藏。组件横向排列，按需填写，不填则不显示，无论两列还是三列都自动等分，溢出部分会自动换行


3.2参数说明：


参数	说明	类型	是否必填	数据格式
title	标题	String	是	字符串。
subTitle	副标题	String	否	字符串。
rightTitle	右边标题	String	否	字符串。
infoArr	所有行数据列表集合	Array	是
（注：不传不显示不影响布局）	[{
leftText:{
value:String，isWarning:boolean
},
centerText:{
value:String，isWarning:boolean
},
rightText:{
value:String，isWarning:boolean
}
}]
leftText:左侧文字对象，centerText：中间文字对象，getRightList：右侧文字对象，一个对象代表一行（注：flex布局） value为值,isWarning为该值是否变红警告（非必传，默认不传或者传false为灰色，传true为红色）
cardListImg	图片信息	Object	否
(注：不传不会影响布局，右边补齐)
	{isShow:boolean,src:’’}isShow为是否显示图片，src为图片路径（src=’’如为空显示默认图片）
cardBottom	卡片底部信息	Object	否
	{isShow:boolean,title:String,cardInfo:[{icon:"icon-wenhao",value:String,}]}
isShow为是否显示底部信息，title为底部左侧名称信息，cardInfo为右边信息+图标（icon自定义iconfont图标，value值）
borderIsRed	外边框是否显示红色	Boolean	否
	默认false,不传或者false为灰色，true为红色
使用模板：
<template>
		<view >
			<cardList :isShow="true" title='title' subTitle='subTitle' rightTitle="rightTitle"  :infoArr="infoArr()" :cardListImg='img()'/>
			<cardList title='title' subTitle='subTitle' :borderIsRed="true" rightTitle="rightTitle"  :infoArr="infoArr()" :cardBottom="cardBottom()" :cardListImg='img()'/>
			<cardList  title='title' subTitle='subTitle' :borderIsRed='false' rightTitle="rightTitle"  :cardBottom="cardBottom()" />
			<pictureList title='title' :infoArr="infoArr2()" :listImg="img()"rightTitle="rightTitle" subTitle='subTitle' />
			<pictureList title='title' :infoArr="infoArr2()"subTitle='subTitle' rightTitle="rightTitle"  />
		</view>
</template>
<script>
	import pictureList from '../../components/pictureList/pictureList.vue'
	import cardList from '../../components/cardList/cardList.vue'
	export default {
		components:{
			pictureList,
			cardList
		},
		methods: {
			infoArr2(){
				return[
					{leftText:"leftText",centerText:"centerText",rightText:"rightText"},
					{leftText:"leftText",centerText:"centerText",rightText:"rightText"},
					{leftText:"leftText",centerText:"centerText",rightText:"rightText"},
					]
			},
			// 设置图片
			img(){
				return {
					isShow: true,//显示图片
					src: ''
				}
			},
			// 获取所有数据列表
			infoArr(){
				// 获取所有数据列表
			return [{
						leftText:{
							value:'value',
						},
						centerText:{
							value:'value',
						},
						rightText:{
							value:'value',
						},
					},	{
						leftText:{
							value:'value',
						},
						centerText:{
							value:'value',
							isWarning:false
						},
						rightText:{
							value:'value',
							isWarning:true
						},
					},{
						leftText:{
							value:'value',
						},
						centerText:{
							value:'value',
						},
						rightText:{
							value:'value',
							isWarning:""
						},
					}]
			},
			
			// 设置卡片底部信息
			cardBottom(){
				return	{
					isShow:true,
					title:"title",
					cardInfo:[
						{
							icon:"icon-wenhao",//icon class
							value:"value",
						},
						{
							icon:"icon-wenhao",//icon class
							value:"value",
						},
						{
							icon:"icon-wenhao",//icon class
							value:"value",
						}
					]
				}
			}
		}
	}
</script>
