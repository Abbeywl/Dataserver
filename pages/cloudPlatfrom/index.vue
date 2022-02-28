<template>
	<div>
		<div v-if="!pageLoad" class="">
			<page-loading></page-loading>
		</div>
		<div v-if="pageLoad">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,key) in imgList" :key="key">
					<view class="swiper-item">
						<image :src="item.imgurl" style="width:100%" mode="widthFix"></image>
					</view>
				</swiper-item>

			</swiper>
			<view class="m-navPic mgt-5 mgb-5">
				<view class="title">强者无惧丨东风日产年累销量超92万!!!!!</view>
				<view class="imgbox">
					<image src="../../static/image/1.jpg" @click="gourl('../../pageforum/forum/show')"></image>
					<image src="../../static/image/car4.jpg" @click="gourl('../../pageforum/forum/show')"></image>
					<image src="../../static/image/kv3.jpg" @click="gourl('../../pageforum/forum/show')"></image>
				</view>
				
			<!-- 	<navigator v-for="(item,key) in pageData.navList" :key="key" :url="item.link1" class="m-navPic-item">
					<image class="m-navPic-img" mode="widthFix" :src="item.imgurl"></image>
					<view class="m-navPic-title">{{item.title}}</view>
				</navigator> -->

			</view>

			<div class="tabNav">
				<div gourl="/module.php?m=forum" class="tabNav-item tabNav-item-active">车友圈</div>
				<div @click="gourl('../../pageforum/forum/new')" class="tabNav-item">最新</div>
				<div @click="gourl('../../pageforum/forum_group/index')" class="tabNav-item">热卖榜单</div>
				<div @click="gourl('../../pageforum/forum_paihang/index')" class="tabNav-item">排名榜</div>
			</div>
			<div class="flist">
				<div @click="goForum(item.id)" class="flist-item" v-for="(item,fkey) in pageData.list" :key="fkey">
					<view v-if="fkey==1" style="width: 100%;height: 200px;">
						<video id="myVideo" autoplay src="https://video-qn.51miz.com/Video/10/22/102202_1848379effc119634e5268c812706c45.mp4"
							enable-danmu danmu-btn controls></video>
					</view>
					<view v-if="fkey==3" class="guangao">
						<div class='' ></div>
					</view>
					<div class="flist-user">
						<image :src="item.user_head+'.100x100.jpg'" class="flist-head"></image>
						<div class="flex-1">
							<div class="flist-nick">{{item.nickname}}</div>
							<div class="flist-time">{{item.timeago}}</div>
						</div>
					</div>
					<div class="flex mgb-5">
						<div v-if="item.videourl" class="iconfont cl-red mgr-5 icon-video"></div>
						<div class="flex-1">{{item.title}}</div>
					</div>

					<div class="flist-imgs" v-if="item.imgslist">
						<image v-for="(img,imgIndex) in item.imgslist" :key="imgIndex" :src="img"
							class="flist-imgs-img" mode="widthFix"></image>
					</div>

					<div class="flex flist-ft">
						<div class="flist-ft-love">
							{{item.love_num}}
						</div>
						<div class="flist-ft-cm">
							{{item.comment_num}}
						</div>
						<div class="flist-ft-view">
							{{item.view_num}}
						</div>
					</div>
				</div>

			</div>
		</div>
		<!-- <forum-footer tab="home"></forum-footer> -->
	</div>
</template>

<script>
	// import forumFooter from "../../components/forumfooter.vue";
	import JsonData from '../../common/data.json'
	var app = require("../../common/common.js");
	var per_page = 0;
	var isfirst = true;
	var gid = 0;
	var activeClass = "tabs-border-active";
	export default {
		components: {
			// forumFooter
		},
		data: function() {
			return {
				defaultActive: "tabs-border-active",
				pageLoad: false,
				pageHide: false,
				pageData: {},
				imgList:[
					 {"imgurl":'../../static/image/car1.jpg'}
					,{"imgurl":'../../static/image/car2.jpg'}
					,{"imgurl":'../../static/image/car3.jpg'}
					,{"imgurl":'../../static/image/car4.jpg'}]
			}

		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: '云平台总体架构'
			});
			this.getPage();
		},


		onReachBottom: function() {
			this.getList();
		},
		onPullDownRefresh: function() {
			this.refresh();
		},
		methods: {
			gourl: function(url) {
				uni.navigateTo({
					url: url
				})
			},
			getPage: function() {
				var that = this;
				isfirst = false;
				that.pageLoad = true;
				that.pageData = JsonData.data;
				per_page = JsonData.data.per_page;
			},
			setGroup: function(cid) {
				gid = cid;
				isfirst = true;
				per_page = 0;
				if (gid == 0) {
					this.defaultActive = activeClass;
				} else {
					this.defaultActive = "";
				}
				var grouplist = this.pageData.grouplist;
				for (var i in grouplist) {
					if (grouplist[i].gid == gid) {
						grouplist[i].isactive = 1;
					} else {
						grouplist[i].isactive = 0;
					}
				}
				this.pageData.grouplist = grouplist;
				this.getList();
			},
			getList: function() {
				var that = this;
				if (!isfirst && per_page == 0) return false;
				uni.request({
					url: app.apiHost + "/module.php?m=forum&ajax=1",
					data: {
						per_page: per_page,
						gid: gid,
						authcode: app.getAuthCode()
					},
					success: function(res) {

						if (!res.data.error) {
							if (isfirst) {
								that.pageData.list = res.data.data.list;
								isfirst = false;
							} else {

								that.pageData.list = app.json_add(that.pageData.list, res.data.data.list);
							}
							per_page = res.data.data.per_page;

						}


					}
				})
			},
			goForum: function(id) {
				uni.navigateTo({
					url: "../../pageforum/forum/show?id=" + id
				})
			},
			refresh: function() {
				this.getPage();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			loadMore: function() {
				this.getList();
			}
		},
	}
</script>

<style>
	@import "../../static/css/index-app.css";
	@import "../../common/iconfont.css";
	@import "../../common/dt-ui-uni.css";
	@import "../../common/forum.css";
	.guangao {
		height: 163px;
	}
	.guangao div{
		background: url(../../static/image/gg.jpg) no-repeat center center;
		width: 100%;
		height: 100%;
	  background-size: cover;
	}
	uni-video{
		width: 100%;
	}
	swiper {
		height: 440upx;
	}
	.title{
		text-indent: 10px;
	}
	.imgbox {
		padding: 20rpx;
		    display: flex;
		    justify-content: space-between;
		    width: 100%;
			flex-flow: inherit;
	}
	
	.imgbox image{
		
		display: inline-block;
		width: 30%;
		height: 150rpx;
	}

	.tabNav {
		padding: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.tabNav-item {
		cursor: pointer;
		margin-right: 40px;
		font-weight: 600;
	}

	.tabNav-item-active {
		color: #f60;
		padding-bottom: 3px;

	}
	
	
</style>
