<template>
    <view class="reg_view">
		<view class="reg_logo">
			<image src="../../static/img/reg_logo.png" mode="widthFix"></image>
		</view>
        <view class="input-group">
            <view class="input-row">
				<image src="../../static/img/login_icon1.png" mode="widthFix"></image>
                <m-input class="m-input" type="text" clearable v-model="account" placeholder="请输入手机号码"></m-input>
            </view>
            <view class="input-row">
				<image src="../../static/img/login_icon3.png" mode="widthFix"></image>
                <m-input class="m-input" type="text" v-model="code" placeholder="请输入验证码"></m-input>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
            </view>
            <view class="input-row">
				<image src="../../static/img/login_icon2.png" mode="widthFix"></image>
                <m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
            </view>
            <view class="input-row">
				<image src="../../static/img/login_icon2.png" mode="widthFix"></image>
                <m-input class="m-input" type="password" displayable v-model="password1" placeholder="请再次输入新密码"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="submit">提交</button>
        </view>
		<view class="to_login" @click="toLogin">返回<text>登录</text></view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';
	var timer;
    export default {
        components: {
            mInput
        },
        data() {
            return {
                account: '',
                password: '',
                password1: '',
                code: '',
				second:0
            }
        },
		onLoad() {
			var that = this;
		},
		computed:{
			yanzhengma(){
				if(this.second==0){
					return '获取验证码';
				}else{
					return this.second+'s';
				}
			}
		},
        methods: {
			toLogin() {
				uni.navigateBack({
					delta: 1
				})
				// uni.redirectTo({
				// 	url: "/pages/login/login"
				// });
			},
			getcode(){
				var that = this;
				if(that.second>0){
					return;
				} 
				if(that.account.length != 11){
					uni.showToast({
						title:"请填写正确的号码",
						icon: 'none'
					})	
					return false;
				}
				uni.request({
				    url: '', //仅为示例，并非真实接口地址。
				    data: {content:that.account},
					method: 'GET',
					dataType:'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
				    success: (res) => {  
						if(res.data.code == 1){
							uni.showToast({title:res.data.msg,icon:'none'});
							that.second = 0;
						}else{
							uni.showToast({title:res.data.msg});
							that.second = 60;
							timer = setInterval(function(){
								that.second--;
								if(that.second==0){
									clearInterval(timer)
								}
							},1000)
						}
				    }
				});
			},
            submit() {
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
                // if (this.email.length < 3 || !~this.email.indexOf('@')) {
                //     uni.showToast({
                //         icon: 'none',
                //         title: '邮箱地址不合法'
                //     });
                //     return;
                // }

                const data = {
                    account: this.account,
                    password: this.password,
                    password1: this.password1,
                    code: this.code
                }
                uni.showToast({
                    title: '找回成功'
                });
            }
        }
    }
</script>

<style scoped lang="scss">
	.reg_view{
		width: 100%;
		padding: 100upx 90upx 0;
		.reg_logo{
			width: 190upx;
			height: 190upx;
			margin: 0 auto 80upx;
			border-radius: 50%;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 0 20upx #f3f3f3;
			image{
				display: block;
				width: 130upx;
				height: 40upx !important;
			}
		}
		.to_login{
			text-align: right;
			color: #c2c2c2;
			font-size: 22upx;
			text{
				color: #257cf2;
			}
		}
		.yzm{
			color: #257cf2;
			font-size: 20upx;
			width: 25%;
			text-align: right;
		}
	}
</style>
