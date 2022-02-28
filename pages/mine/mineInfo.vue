<template>
    <view class="content">
        <view class="mienSelfie">
            <u-avatar @click="uploadProfile" size="200" src="@/static/headInit.png"></u-avatar>
            <!-- <view>
                <u-image width="220rpx" height="220rpx" shape="circle" :src="commonIP+infoData.UserHeadImgUrl" error-icon="@/static/headInit.png"></u-image>
                <u-image @click="uploadProfile" style="position: absolute;right:0;top:0" width="44rpx" height="44rpx" src="@/static/addhead.png"></u-image>
            </view> -->
        </view>
        <view>
            <u-cell-group :border="false">
                <u-cell-item title="姓名" :value="infoData.DisplayName" hover-class="none" :arrow="false"></u-cell-item>
                <u-cell-item title="手机号" :value="infoData.MobilePhone" hover-class="none" :arrow="false"></u-cell-item>
                <u-cell-item title="身份证号" :value="infoData.IDNumber?infoData.IDNumber:'-'" hover-class="none" :arrow="false"></u-cell-item>
                <u-cell-item title="工作单位" :value="infoData.WorkCompany?infoData.WorkCompany:'-'" hover-class="none" :arrow="false"></u-cell-item>
            </u-cell-group>
        </view>
        <view class="u-m-t-30">
            <u-cell-group :border="false">
                <u-cell-item title="设置" :value="infoData.CompanyName"></u-cell-item>
            </u-cell-group>
        </view>
        <u-button class="u-m-30" type="primary" shape="circle" @click="logOut">退出登录</u-button>
    </view>
</template>
 
<script>
    export default {
        data() {
            return {
                commonIP: uni.getStorageSync('commonIP'),
                infoData: {},
                showModal: false
            }
        },
        mounted() {
            this.getInfoData()
            /* uni.$on('uAvatarCropper', path => {
                var imageList = []
                imageList.push({
                    uri: path,
                    name: path.substring(path.lastIndexOf("/") + 1, path.length)
                })
                uni.showLoading({
                    title: '上传中'
                })
                uni.uploadFile({
                    url: this.commonIP + '/api/User/UserHeadPortrait', //仅为示例，非真实的接口地址
                    files: imageList,
                    success: (uploadFileRes) => {
                        this.getInfoData()
                        uni.navigateBack()
                        uni.hideLoading()
                    },
                    fail: (res) => {
                        uni.hideLoading()
                    }
                });
            }) */
        },
        methods: {
            getInfoData() {    
                this.$u.get(`/Api/AppUser/GetUserDataInfo?userID=${uni.getStorageSync('ID')}`).then(res => {
                    this.infoData = res.ResultData
                })
            },
            uploadProfile() {
                this.$u.route({
                    // 关于此路径，请见下方"注意事项"
                    url: '/pages/mine/u-avatar-cropper',
                    // 内部已设置以下默认参数值，可不传这些参数
                    params: {
                        // 输出图片宽度，高等于宽，单位px
                        destWidth: 300,
                        // 裁剪框宽度，高等于宽，单位px
                        rectWidth: 200,
                        // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
                        fileType: 'jpg',
                    }
                })
            },
            logOut() {
                uni.showModal({
                    title: '提示',
                    content: '确认退出吗？',
                    success: function(res) {
                        if (res.confirm) {
                            uni.clearStorage();
                            uni.reLaunch({
                                url: '../login/login'
                            })
                        }
                    }
                });
            }
        }
    }
</script>
 
<style lang="scss" scoped>
    .content {
        overflow: hidden;
 
        .mienSelfie {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 260rpx;
            background-color: #FFFFFF;
 
            &>view {
                position: relative;
                width: 220rpx;
                height: 220rpx;
            }
        }
    }
</style>