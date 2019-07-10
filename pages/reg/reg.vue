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
                <m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
		<view class="agree_box">
			<checkbox value="" checked />
			已同意<navigator class="text" url="">《旺客易推APP软件协议》</navigator>
		</view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
        </view>
		<view class="to_login" @click="toLogin">已有会员，去<text>登录</text></view>
    </view>
</template>

<script>
	import api from '../../api/api'
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
// 				uni.navigateBack({
// 					delta: 1
// 				})
				uni.redirectTo({
					url: "/pages/login/login"
				});
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
				    url: 'http://www.wk.com/mobile/index.php?act=login&op=register',  
				    data: {content:that.account},
					method: 'POST',
					data:{
						username:account, 
						password:password,
						code:code
					},
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
            register() {
				if(this.account.length != 11){
					uni.showToast({
						title:"请填写正确的号码",
						icon: 'none'
					})	
					return false;
				}
				api.post('index.php?act=login&op=tel_register', {
					username:this.account, password:this.password,code:this.code
				}).then(datas => { 
				}) 
  
//                 uni.showToast({
//                     title: '注册成功'
//                 });
//                 uni.navigateBack({
//                     delta: 1
//                 });
            }
        }
    }
</script>

<style scoped lang="scss">
	.reg_view{
		width: 100%;
		padding: 140upx 90upx 0;
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
		.agree_box{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #c2c2c2;
			font-size: 22upx;
			margin-top: 30upx;
			checkbox{
				transform: scale(.7);
			}
			.text{
				color: #257cf2;
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
