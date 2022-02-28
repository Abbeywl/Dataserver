<template>
	<div v-if="pageLoad" class="main-body">
		<div class="tabs-border-group">
			<div class="tabs-border">
				<div @click="tab='a'" :class="tab=='a'?'tabs-border-active':''" class="tabs-border-item">推荐榜</div>
				<div @click="tab='b'" :class="tab=='b'?'tabs-border-active':''" class="tabs-border-item">名人榜</div>

			</div>
			<div :class="tab=='a'?'tabs-border-box-active':''" class="row-box tabs-border-box">
				<view>
					<h3>#本地口碑推荐#</h3>
					<div class='d_flex'>
						<div class='img1'></div>
						<div class='img2'></div>
						<div class='img3'></div>
						<!-- <image src="../../static/image/car2.jpg" mode=""></image>
						<image src="../../static/image/car4.jpg" mode=""></image> -->
					</div>
					<div class='d_flex'>
						<h4>朗逸</h4>
						<h4>逸动</h4>
						<h4>思域</h4>
					</div>
					<div class='d_flex'>
						<h5>6.5-14.2万</h5>
						<h5>6.35-20.2万</h5>
						<h5>7.32-19.4万</h5>
					</div>
					<div class='d_flex'>
						  <button type="primary" disabled="true" plain="true"size="mini">空间足够</button>
						  <button type="primary" disabled="true" plain="true"size="mini">马力够大</button>
						  <button type="primary" disabled="true" plain="true"size="mini">动力足够</button>
					</div>
				</view>
				<view>
					<h3>#超高性价比推荐#</h3>
					<div class='d_flex'>
						<div class='img1'></div>
						<div class='img2'></div>
						<div class='img3'></div>
						<!-- <image src="../../static/image/car2.jpg" mode=""></image>
						<image src="../../static/image/car4.jpg" mode=""></image> -->
					</div>
					<div class='d_flex'>
						<h4>朗逸</h4>
						<h4>逸动</h4>
						<h4>思域</h4>
					</div>
					<div class='d_flex'>
						<h5>6.5-14.2万</h5>
						<h5>6.35-20.2万</h5>
						<h5>7.32-19.4万</h5>
					</div>
					<div class='d_flex'>
						  <button type="primary" disabled="true" plain="true"size="mini">空间足够</button>
						  <button type="primary" disabled="true" plain="true"size="mini">马力够大</button>
						  <button type="primary" disabled="true" plain="true"size="mini">动力足够</button>
					</div>
				</view>
			</div>
			<div @click="goUser(item.userid)" :class="tab=='b'?'tabs-border-box-active':''"
				class="row-box tabs-border-box">
				<div class="flex mgb-10">
					<div class="td-a fwb">排行</div>
					<div class="td-b fwb">头像</div>
					<div class="td-c fwb">昵称</div>
					<div class="flex-1"></div>
					<div class="td-d fwb">积分</div>
				</div>

				<div v-for="(item,index) in fsList" :key="index" class="flex flex-ai-center mgb-10">
					<div class="td-a cl-num">{{index+1}}</div>
					<div class="td-b">
						<image mode="widthFix" class="rdImg" :src="item.user_head+'.100x100.jpg'"></image>
					</div>
					<div class="td-c">{{item.nickname}}</div>
					<div class="flex-1"></div>
					<div class="td-d cl-num">{{item.num}}</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				fsList: [
  {
    "userid": 188,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/2021/09/23/18357733f6d3d470489dc84eba050d35.png",
    "nickname": "雷哥哥",
    "followed_num": 38
  },
  {
    "userid": 2644,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/27/799b8be07079f701ca21b2fb2594c075.jpg",
    "nickname": "老雷1",
    "followed_num": 24
  },
  {
    "userid": 2577,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/12/d41d8cd98f00b204e9800998ecf8427e1589275239.jpg",
    "nickname": "千寻",
    "followed_num": 4
  },
  {
    "userid": 2580,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/13/d41d8cd98f00b204e9800998ecf8427e1589348886.jpg",
    "nickname": "Aa劳务派遣-大磊",
    "followed_num": 3
  },
  {
    "userid": 2581,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/2020/05/15/21820b7034e3482185d5719e74c9e40d.jpg",
    "nickname": "曾德明",
    "followed_num": 3
  },
  {
    "userid": 2571,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "福建天然茶叶有限公司",
    "followed_num": 3
  },
  {
    "userid": 3220,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/2020/11/30/3fbc1d631cfba66346f4c5e2b890f7bc.jpg",
    "nickname": "仙女姐姐",
    "followed_num": 2
  },
  {
    "userid": 2592,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/2021/01/06/3398cd735129ec1a78b849821ac84663.png",
    "nickname": "惠民-张晓春",
    "followed_num": 2
  },
  {
    "userid": 982,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2018/12/20/d41d8cd98f00b204e9800998ecf8427e1545287732.jpg",
    "nickname": "老雷",
    "followed_num": 1
  },
  {
    "userid": 2583,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/15/5p6X5reR5Ly21589527082.jpg",
    "nickname": "林淑伶",
    "followed_num": 1
  },
  {
    "userid": 2573,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/11/d41d8cd98f00b204e9800998ecf8427e1589165803.jpg",
    "nickname": "晓燕",
    "followed_num": 1
  },
  {
    "userid": 2641,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "13",
    "followed_num": 0
  },
  {
    "userid": 4586,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "微微幽兰",
    "followed_num": 0
  },
  {
    "userid": 4585,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "红红颜",
    "followed_num": 0
  },
  {
    "userid": 2582,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/2021/06/24/9c9c08759748ec7f6c33b316f4c04b24.jpg",
    "nickname": "10.11",
    "followed_num": 0
  },
  {
    "userid": 4499,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2021/05/25/d57f352abd307a2a468306cdd0a25e92.jpg",
    "nickname": "JackFu",
    "followed_num": 0
  },
  {
    "userid": 4498,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "也一样",
    "followed_num": 0
  },
  {
    "userid": 2584,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "阿斯顿萨",
    "followed_num": 0
  },
  {
    "userid": 2591,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/18/d41d8cd98f00b204e9800998ecf8427e1589812646.jpg",
    "nickname": "丽",
    "followed_num": 0
  },
  {
    "userid": 2646,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/27/5be0198a4fae3440ec4b6dfd39cd747a.jpg",
    "nickname": "国峰",
    "followed_num": 0
  },
  {
    "userid": 2645,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/27/c73e9fa92d6a1bc83093679de703848d.jpg",
    "nickname": "老雷2",
    "followed_num": 0
  },
  {
    "userid": 2606,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/21/d41d8cd98f00b204e9800998ecf8427e1590051365.jpg",
    "nickname": "蝶恋花---卓",
    "followed_num": 0
  },
  {
    "userid": 2593,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "tiancheng",
    "followed_num": 0
  },
  {
    "userid": 2594,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/19/d41d8cd98f00b204e9800998ecf8427e1589859843.jpg",
    "nickname": "海越山庄",
    "followed_num": 0
  },
  {
    "userid": 2595,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/19/d41d8cd98f00b204e9800998ecf8427e1589861988.jpg",
    "nickname": "泰康小雷",
    "followed_num": 0
  },
  {
    "userid": 2600,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "多多",
    "followed_num": 0
  },
  {
    "userid": 2602,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "大博",
    "followed_num": 0
  },
  {
    "userid": 2603,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/20/d41d8cd98f00b204e9800998ecf8427e1589961242.jpg",
    "nickname": "小酱姑娘",
    "followed_num": 0
  },
  {
    "userid": 2604,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "测试啊啊",
    "followed_num": 0
  },
  {
    "userid": 2605,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "xiyue",
    "followed_num": 0
  },
  {
    "userid": 2564,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/05/d41d8cd98f00b204e9800998ecf8427e1588692819.jpg",
    "nickname": "阿党",
    "followed_num": 0
  },
  {
    "userid": 992,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2019/01/04/d41d8cd98f00b204e9800998ecf8427e1546586987.jpg",
    "nickname": "厦门老雷",
    "followed_num": 0
  },
  {
    "userid": 2552,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/04/29/d41d8cd98f00b204e9800998ecf8427e1588126437.jpg",
    "nickname": "特罗力",
    "followed_num": 0
  },
  {
    "userid": 2553,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "牛B",
    "followed_num": 0
  },
  {
    "userid": 2555,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/04/29/d41d8cd98f00b204e9800998ecf8427e1588159042.jpg",
    "nickname": "谢敏",
    "followed_num": 0
  },
  {
    "userid": 2556,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "十点十分",
    "followed_num": 0
  },
  {
    "userid": 2557,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/01/d41d8cd98f00b204e9800998ecf8427e1588275661.jpg",
    "nickname": "少年癸",
    "followed_num": 0
  },
  {
    "userid": 2558,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/01/d41d8cd98f00b204e9800998ecf8427e1588296586.jpg",
    "nickname": "wdj1029",
    "followed_num": 0
  },
  {
    "userid": 2559,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "柠檬",
    "followed_num": 0
  },
  {
    "userid": 2561,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "南风",
    "followed_num": 0
  },
  {
    "userid": 2562,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "yy",
    "followed_num": 0
  },
  {
    "userid": 2563,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "321大东雨",
    "followed_num": 0
  },
  {
    "userid": 2579,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "cwx",
    "followed_num": 0
  },
  {
    "userid": 2565,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "Damon",
    "followed_num": 0
  },
  {
    "userid": 2566,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "佲們",
    "followed_num": 0
  },
  {
    "userid": 2567,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "得到",
    "followed_num": 0
  },
  {
    "userid": 2568,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "chh",
    "followed_num": 0
  },
  {
    "userid": 2569,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/07/6Zuo6JaH5a6255qE5Liy5Liy6aaZ1588842896.jpg",
    "nickname": "雨薇家的串串香",
    "followed_num": 0
  },
  {
    "userid": 2570,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "OutReacher",
    "followed_num": 0
  },
  {
    "userid": 2572,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "爸爸",
    "followed_num": 0
  },
  {
    "userid": 2574,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "可可",
    "followed_num": 0
  },
  {
    "userid": 2575,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com/attach/user_head/2020/05/12/d41d8cd98f00b204e9800998ecf8427e1589265507.jpg",
    "nickname": "老大不小伙子",
    "followed_num": 0
  },
  {
    "userid": 2576,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "wang1",
    "followed_num": 0
  },
  {
    "userid": 2578,
    "user_head": "https://fd175.oss-cn-hangzhou.aliyuncs.com//static/images/user_head.jpg",
    "nickname": "小星星666123",
    "followed_num": 0
  }
],
				wzList: [],
				pageLoad: false,
				tab: "a"
			}
		},
		onLoad: function() {
			this.getPage();
		},
		methods: {
			goUser: function(userid) {
				uni.navigateTo({
					url: "../../pageforum/forum_home/index?userid=" + userid
				})
			},
			goForum: function(id) {
				uni.navigateTo({
					url: "../../pageforum/forum/show?id=" + id
				})
			},
			getPage: function() {
				let that = this;
				that.pageLoad = true;
			}
		}
	}
</script>
<style>
	@import "../../common/iconfont.css";
	@import "../../common/dt-ui-uni.css";
	@import "../../common/forum.css";

	.fwb {
		font-weight: 600;
	}

	.rdImg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.d_flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}
	.d_flex div:nth-child(1){
			background: url("../../static/image/3.jpg") no-repeat center center;
			background-size: cover;
		}
		.d_flex div:nth-child(2){
			background: url("../../static/image/2.jpg") no-repeat center center;
			background-size: cover;
		}
	.d_flex div {
		width: 100px;
		height: 80px;
		background: url("../../static/image/4.jpg") no-repeat center center;
		background-size: cover;
	}
	.d_flex h4,.d_flex button{
		width: 100px;
	}
	.d_flex h5{
		width: 100px;
		color: #BC3C11;
	}
	


	.td-a,
	.td-b,
	.td-d {
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.td-a {
		width: 80rpx;
	}

	.td-b {
		width: 160rpx;
	}

	.td-c {
		width: 200rpx;
	}

	.td-d {
		width: 120rpx;

	}
</style>
