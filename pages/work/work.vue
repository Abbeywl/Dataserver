<template>
	<view class="page">
		<scroll-view  @scroll="leftScroll" class="left_view p_r" scroll-y :style="{ height: scrollH + 'px' }" :scroll-into-view="leftScrollTop()">
			<block  v-for="(item, index) in dataArr" :key="index" v-if='item.DisplayName!="用户角色"'>
				<view :class="[left_selectIndex == index ? 'left_item_s' : '', 'left_item']" :id="'left_' + index" @click="leftTap({ item, index })">{{ item.DisplayName }}</view>
			</block>
			<view class="seletItem" :style="{ top: left_selectIndex * 60 + 'px' }"></view>
			<view class="" style="height: 80px;"><!-- 站位 --></view>
		</scroll-view>

		<scroll-view @scroll="rightScroll" class="right_view" scroll-y :style="{ height: scrollH + 'px' }" :scroll-into-view="'left_' + right_selectIndex" scroll-with-animation>
			<block v-for="(item, index) in dataArr" :key="index"  v-if="item.DisplayName!='用户角色'">
				<view :ref="'left_' + index" class="right_item " :id="'left_' + index">
					<text class="right_item_title ">{{ item.DisplayName }}</text>
					<view class="right_item_view">
						<view class="item" v-for="(subitem, subindex) in item.VisibleSubMenus" :key="subindex" @click="redirectToPage(subitem.url)" v-show="subitem.isChecked">
							<image :src="subitem.img" :style="{ width: '100%', height: subItemW + 'px' }"></image>
							<text>{{ subitem.DisplayName }}</text>
						</view>
					</view>
				</view>
			</block>
			<view class="" :style="{ height: placeholderH + 'px' }"><!-- 站位 --></view>
		</scroll-view>
		
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
// import testdata from './testdata.js';
import browser from '../../common/js/browser.js';
export default {
	data() {
		return {
			password: '',
			play: uni.getStorageSync('inPassword') ? false : true,
			left_scrolly: 0,
			// 底部有tabar-88 scrollH: uni.getSystemInfoSync().screenHeight-88
			scrollH: uni.getSystemInfoSync().screenHeight,
			subItemW: parseInt((uni.getSystemInfoSync().screenWidth * (2 / 3) - 15 * 2 - 24) / 3),
			left_selectIndex: 0,
			right_selectIndex: 0,
			ttscrollH: 0, //总高度
			placeholderH: 0, //占位高度

			heighArr: [],
			dataArr: []
		};
	},
	onLoad() {
		let self = this;
		setTimeout(function() {
			self.computerH();
		}, 100);
		this.initData()
		console.log(this.dataArr)
		// location.reload()
	},
	onShow: function () {
		this.initData()
	},
	
	methods: {
		initData:function(e) {
			let aa= uni.getStorageSync('mobileAppMenusData')
			aa=JSON.parse(aa)
			this.dataArr =aa
		},
		leftTap: function(e) {
			this.left_selectIndex = e.index;
			this.right_selectIndex = e.index;
		},
		// 左侧滚动
		leftScroll: function(e) {
			this.left_scrolly = e.detail.scrollTop;
		},
		// 左侧顶部高度
		leftScrollTop: function(e) {
			let b = this.left_selectIndex * 60 + 80;
			let c = b - this.scrollH;

			if (c > 0) {
				return 'left_' + this.left_selectIndex;
			}

			if (this.left_scrolly > b - 80) {
				return 'left_' + this.left_selectIndex;
			}
		},

		//跳转方法
		redirectToPage(url){
			switch(url){
				case "https://m.baidu.com":
					var options = {
						'data': '123' // 自定义参数
					}
					browser.init(options)
					browser.show(url)
					break;
				default:
					uni.navigateTo({
						url:url
					});
					break;
			}
		},
		rightScroll: function(e) {
			let scrollH = e.detail.scrollTop + 30;
			let cc = this.ttscrollH - this.scrollH;

			let a = 0;
			let findInx = this.heighArr.findIndex(function(itemH, i) {
				a = a + itemH;
				return a > scrollH;
			});

			this.left_selectIndex = findInx;
		},

		// 计算高度
		computerH: function() {
			this.ttscrollH = 0;
			for (let item of this.dataArr) {
				if(item.DisplayName!='用户角色'){
					let title_lineH = 49; //rpx
					let subNum = item.VisibleSubMenus.length;
					let subImgH = this.subItemW; //rpx
					let subTitleH = 40; //rpx
					let rowSpecH = 8; //rpx
					let rowN = subNum % 3;
					let rowSpecNum = parseInt(subNum / 3) + parseInt(rowN > 0 ? 1 : 0);
					let totalRpx = title_lineH + (subImgH + subTitleH) * rowSpecNum + rowSpecH * (rowSpecNum - 1);
					this.heighArr.push(totalRpx);
					this.ttscrollH = this.ttscrollH + totalRpx;
				}
				
			}

			this.placeholderH = this.scrollH - this.heighArr[this.heighArr.length - 1];

			//以下方法也可以  但是通用性不高 上面方法 计算麻烦但是适合各种平台
			// let self=this
			// var selectorQuery = uni.createSelectorQuery()
			// selectorQuery.selectAll('.right_item').boundingClientRect(data => {
			// 	self.heighArr = data.map(item => {
			// 		return {
			// 			top: Math.round(item.top),
			// 			height: Math.round(item.height)
			// 		}
			// 	})
			// }).exec()
			// console.log('ttscrollH',this.$refs.left_0)
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
		}
	}
};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
}
.page {
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: auto;
	position: absolute;
	left: 0rpx;
	bottom: 0rpx;
	right: 0rpx;
	top: 0rpx;
	overflow: hidden;
}
.left_view {
	background-color: #f8f8f8;
	position: relative;
	// 蒙版
	.seletItem {
		height: 60px;
		position: absolute;
		top: 0rpx;
		left: 0rpx;
		z-index: 10;
		right: 0rpx;
		background-color: rgba(255, 255, 255, 0.3);
		transition: top 0.2s linear;
		display: flex;
		align-items: center;

		&::before {
			content: '';
			width: 6rpx;
			height: 60%;
			background-color: #24c06a;
			left: 0rpx;
			border-radius: 0px 100rpx 100rpx 0px;
		}
	}
	.left_item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
		margin-bottom: 0rpx;
		position: relative;
		font-weight: bold;
		font-size: 28rpx;
	}
	.left_item_s {
		background-color: #ffffff;
		color: #24c06a;
		font-weight: bold;
		position: relative;
	}
}

.right_view {
	background-color: #ffffff;
	padding: 0rpx 12px;
	.right_item {
		.right_item_title {
			display: block;

			line-height: 49px;
			font-size: 28rpx;
			font-weight: bold;
		}
		.right_item_view {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: auto;
			grid-gap: 8px 15px;
			.item {
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				text {
					color: #333;
					line-height: 40px;
				}
			}
		}
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
