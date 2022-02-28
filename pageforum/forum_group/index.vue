<template>
	<view v-if="pageLoad">
	<view class="flexlist">
		<view class="flexlist-item bg-fff" v-for="(item,key) in pageData.list" :key="key">
			<navigator class="flexlist-imgbox" url="../forum/show">
				<img class="flexlist-img" :src="item.imgurl">
			</navigator>
			<view class="flex-1">
				<navigator class="flexlist-title" url="../forum/show">
					<span>{{item.title}}</span>
					<span style='padding-right: 10px; color: red;' >{{item.view_num}}</span>
				</navigator>
				<view class="flexlist-row">
					<text class="cl-num mgl-5 mgr-10">{{item.topic_num}}-{{item.comment_num}}万</text> 
				</view>
				
				<!-- <view class="flexlist-desc">{{item.description}}</view> -->
				<view class="flexlist-desc">
				推荐指数：
					<uni-rate :readonly="true" :value="5" />
				</view>
			</view>

		</view>
		
	</view>
	
	<!-- <mt-footer tab="group"></mt-footer> -->
	</view>
</template>
 

<script>
	var app = require("../../common/common.js");
	import mtFooter from "../../components/forumfooter.vue";
	import hotData from './hot.json'
	export default {
		components: {
			mtFooter
		},
		data:function(){
			return {
				pageLoad:false, 
				pageHide:false,
				pageData:{},
			}
			
		},

		onLoad: function (option) {
			uni.showNavigationBarLoading();
			this.getPage();
		},
		onReady: function () {
			uni.setNavigationBarTitle({
				title: "热卖榜单",
			});
		},
		onShow: function () {
			if (this.pageHide) {
				this.pageHide = false;
				this.getPage();
			}
		},
		onHide: function () {
			this.pageHide = true;
		},
		onPullDownRefresh:function(){
			this.refresh();
		} ,
		 
		methods: {
			getPage: function () {
				var that = this;
				that.pageLoad = true;
				that.pageData = hotData;
				console.log(that.pageData)
				uni.hideNavigationBarLoading();
			},
			refresh:function(){
				this.getPage();
				setTimeout(function(){
					uni.stopPullDownRefresh();
				},1000)
			},
		
		},
	}
</script>
<style>
	@import "../../common/iconfont.css";
		@import "../../common/dt-ui-uni.css";
		@import "../../common/forum.css";
</style>