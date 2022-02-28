<template>
	<view class="csstransforms csstransforms3d">
		<profile v-if="PageCur=='profile'"></profile>
		<home v-if="PageCur=='home'"></home>
		<shipin v-if="PageCur=='shipin'"></shipin>
		<discover v-if="PageCur=='discover'"></discover>
		<notifications v-if="PageCur=='notifications'"></notifications>
		<Publish v-if="PageCur=='publish'"></Publish>
		<view class="cu-bar tabbar m-bg-bar shadow foot" style="    background: gainsboro;">
			<view class="action" @click="NavChange" data-cur="home" :class="PageCur=='home' ? 'm-text-white' : 'm-text-gray'">
				<view class="cuIcon-homefill"></view>Home
			</view>
			<view class="action" @click="NavChange" data-cur="discover" :class="PageCur=='discover' ? 'm-text-white' : 'm-text-gray'">
				<view class="cuIcon-discoverfill"></view>发现
			</view>
			<view class="action add-action m-text-gray"@click="NavChange" data-cur="publish" :class="PageCur=='discover' ? 'm-text-white' : 'm-text-gray'">
				<button class="cu-btn cuIcon-add m-bg-pink shadow"></button>发布
			</view>
			<view class="action" @click="NavChange" data-cur="notifications" :class="PageCur=='notifications' ? 'm-text-white' : 'm-text-gray'">
				<view class="cuIcon-notificationfill"></view>通知
			</view>
			<view class="action" @click="NavChange" data-cur="profile" :class="PageCur=='profile' ? 'm-text-white' : 'm-text-gray'">
				<view class="cuIcon-peoplefill"></view>我的
			</view>
		</view>

	</view>
</template>

<script>
	import Publish from '../main/settings.vue'
	export default {
		components: {Publish},
		data() {
			return {
				PageCur: 'home',
				open: false,
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
		}
	}
</script>
<style>

</style>
