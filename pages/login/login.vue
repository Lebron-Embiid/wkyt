<template>
    <view class="login_view">
		<view class="logo_img"><image src="../../static/img/logo.png" mode="widthFix"></image></view>
        <view class="input-group">
            <view class="input-row">
				<image src="../../static/img/login_icon1.png" mode="widthFix"></image>
                <m-input class="m-input" type="text" clearable v-model="account" placeholder="请输入手机号码"></m-input>
            </view>
            <view class="input-row">
				<image src="../../static/img/login_icon2.png" mode="widthFix"></image>
                <m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
		<view class="remember_me">
			<label class="checkbox">
				<checkbox value="" checked />
				记住我
			</label>
		</view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="bindLogin">登录</button>
        </view>
        <view class="action-row">
            <navigator url="/pages/reg/reg">新用户注册</navigator>
            <text>|</text>
            <navigator url="/pages/pwd/pwd">找回密码</navigator>
        </view>
		<view class="three_login" v-if="hasProvider">
			<view class="tl_title">第三方登录</view>
			<view class="tl_img_box">
				<view class="tl_icon" @tap="oauth(provider.value)" v-for="provider in providerList" :key="provider.value">
					<image :src="provider.image" mode="widthFix"></image>
				</view>
			</view>
		</view>
        <!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
            <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
                <image :src="provider.image" @tap="oauth(provider.value)"></image>
            </view>
        </view> -->
    </view>
</template>

<script>
    import service from '../../service.js';
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mInput from '../../components/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
                providerList: [],
                hasProvider: false,
                account: '',
                password: '',
                positionTop: 0
            }
        },
        computed: mapState(['forcedLogin']),
        methods: {
            ...mapMutations(['login']),
            initProvider() {
                const filters = ['weixin', 'qq'];
                uni.getProvider({
                    service: 'oauth',
                    success: (res) => {
                        if (res.provider && res.provider.length) {
                            for (let i = 0; i < res.provider.length; i++) {
                                if (~filters.indexOf(res.provider[i])) {
                                    this.providerList.push({
                                        value: res.provider[i],
                                        image: '../../static/img/' + res.provider[i] + '.png'
                                    });
                                }
                            }
                            this.hasProvider = true;
                        }
                    },
                    fail: (err) => {
                        console.error('获取服务供应商失败：' + JSON.stringify(err));
                    }
                });
            },
            initPosition() {
                /**
                 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
                 * 反向使用 top 进行定位，可以避免此问题。
                 */
                this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            },
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                // if (this.account.length < 5) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '账号最短为 5 个字符'
                //     });
                //     return;
                // }
                // if (this.password.length < 6) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '密码最短为 6 个字符'
                //     });
                //     return;
                // }
                /**
                 * 下面简单模拟下服务端的处理
                 * 检测用户账号密码是否在已注册的用户列表中
                 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
                 */
                const data = {
                    account: this.account,
                    password: this.password
                };
				uni.request({
				    url: that.$api+'passport/mobile-login',
				    data: {
						contact_way:this.phoneno,
						password:this.password
					},
					method: 'POST',
					dataType:'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
				    success: (res) => {
						if(res.data.code!=1){
							uni.showToast({title:res.data.data.msg,icon:'none'});
						}else{
				
							uni.clearStorageSync(); 
							uni.setStorageSync('access_token',res.data.data.access_token);
							uni.setStorageSync('level',res.data.data.level);
							uni.showToast({title:res.data.data.msg,icon:'none',duration:1500});
							that.$access_token = uni.getStorageSync('access_token');
							that.$level = uni.getStorageSync('level');
							console.log(that.$access_token)
							console.log(that.$level)
							setTimeout(function(){
								uni.reLaunch({
									url: "/pages/index/index"
								})
							},1500)
						}
				    },
					fail: () => {
						uni.showToast({title:res.data.msg,icon:'none'});
					}
				});
				uni.reLaunch({
					url: "/pages/birth/birth"
				})
                // const validUser = service.getUsers().some(function (user) {
                //     return data.account === user.account && data.password === user.password;
                // });
                // if (validUser) {
                //     this.toMain(this.account);
                // } else {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '用户账号或密码不正确',
                //     });
                // }
            },
            oauth(value) {
                uni.login({
                    provider: value,
                    success: (res) => {
                        uni.getUserInfo({
                            provider: value,
                            success: (infoRes) => {
                                /**
                                 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                                 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                                 */
                                this.toMain(infoRes.userInfo.nickName);
                            }
                        });
                    },
                    fail: (err) => {
                        console.error('授权登录失败：' + JSON.stringify(err));
                    }
                });
            },
            toMain(userName) {
                this.login(userName);
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../main/main',
                    });
                } else {
                    uni.navigateBack();
                }

            }
        },
        onReady() {
            this.initPosition();
            this.initProvider();
        }
    }
</script>

<style scoped lang="scss">
	.login_view{
		width: 100%;
		padding: 130upx 90upx 100upx;
		box-sizing: border-box;
		.logo_img{
			overflow: hidden;
			image{
				display: block;
				width: 156upx;
				height: 130upx !important;
				margin: 0 auto 40upx;
			}
		}
	}
	.remember_me{
		display: flex;
		justify-content: flex-end;
		color: #257cf2;
		font-size: 22upx;
		margin-top: 30upx;
		label{
			display: flex;
			align-items: center;
			checkbox{
				transform: scale(.7);
			}
		}
	}
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
		align-items: center;
		color: #92bdf8;
    }
	.action-row text{
		display: inline-block;
		transform: scale(0.7);
	}
    .action-row navigator {
        color: #257cf2;
        padding: 0 20upx;
		font-size: 22upx;;
    }
	.three_login{
		position: fixed;
		left: 0;
		bottom: 80upx;
		width: 100%;
		text-align: center;
		.tl_title{
			display: inline-block;
			color: #c2c2c2;
			font-size: 22upx;
			position: relative;
			margin-bottom: 30upx;
			&:before,&:after{
				content: "";
				display: block;
				width: 55upx;
				height: 1px;
				background: #c5c5c5;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
			&:before{
				left: -100upx;
			}
			&:after{
				right: -100upx;
			}
		}
		.tl_img_box{
			display: flex;
			justify-content: center;
			align-items: center;
			.tl_icon{
				margin-right: 45upx;
				image{
					display: block;
					width: 54upx;
					height: 54upx !important;
				}
				&:last-child{
					margin-right: 0;
				}
			}
		}
	}
    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
</style>
