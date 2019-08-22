<template>
    <view class="reg_view">
		<view class="reg_logo">
			<image src="../../static/img/logo.png" mode="widthFix"></image>
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
			已同意<navigator class="text" @click="toAgree">《旺客易推APP软件协议》</navigator>
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
				second:0,
				mobile_code:100000,
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
			toAgree() { 
				uni.redirectTo({
					url: "/pages/agreement/agreement"
				});
			},
			toLogin() { 
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
						title:"请填写正确的手机号码",
						icon: 'none'
					})	
					return false;
				}
				uni.request({
				    url: api.config.baseURL+'/index.php?act=ihuyi&op=register',  
 					method: 'POST',
					data:{
						mobile:that.account,  
					},
					dataType:'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
				    success: (res) => {  
						if(res.data == '-1'){
							uni.showToast({title:"验证码发送失败",icon:'none'});
							that.second = 0;
						}else{
							uni.showToast({title:"验证码发送成功"});
							that.mobile_code = res.data
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
						title:"请填写正确的手机号码",
						icon: 'none'
					})	
					return false;
				}
				if(this.password == ''){
					uni.showToast({
						title:"请输入新密码",
						icon: 'none'
					})	
					return false;
				}
				if(this.code == '' || this.code != this.mobile_code){
					uni.showToast({
						title:"请输入正确的验证码",
						icon: 'none'
					})	
					return false;
				}
				api.post('index.php?act=login&op=tel_register', {
					username:this.account, password:this.password,code:this.code
				}).then(datas => { 
					if(datas.status == 1){
						uni.showToast({title: datas.msg, icon: 'none'});	
						 return false;
					}else{ 
						// uni.showToast({title: "注册成功,请返回登录", icon: 'none'});	
						uni.clearStorageSync();
						uni.setStorageSync('access_token', datas.key);
						uni.showToast({title: '注册成功', icon: 'none', duration: 1500});
						this.$access_token = uni.getStorageSync('access_token');
 						setTimeout(function () {
						    uni.redirectTo({
						    	url: "/pages/birth/birth"
						    })
						}, 500)
					} 
				})  
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
				height: 130upx !important;
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
