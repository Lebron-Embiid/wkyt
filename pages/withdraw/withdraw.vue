<template>
    <view class="withdraw_view">
        <!-- <web-view :webview-styles="webviewStyles" :src="url"></web-view> -->
		<view class="page_bg"></view>
		<form @submit="formSubmit">
			<view class="over_till">账户余额：<text>￥{{over_money}}</text></view>
			<view class="section">
				<view class="left_txt">提现金额<text>*</text></view>
				<input type="number" name="money" v-model="money" :value="money" />
			</view>
			<view class="section" style="justify-content: space-between;">
				<view class="left_txt">提现方式</view>
				<view class="txt">
					<!-- <view class="pic_box"> -->
					<picker class="pic_box" @change="bindPickerChange" :value="index" :range="array">
		                <view class="uni-input">{{array[index]}}</view>
						<image src="../../static/next.png" mode="widthFix"></image>
		            </picker>
					<!-- </view> -->
				</view>
			</view>
			<view class="section section_img">
				<view class="left_txt">收款二维码</view>
				<view class="img" @click="selectCode"><image :src="code_img" mode=""></image></view>
			</view>
			<view class="btn-area">
				<button formType="submit" class="submit_btn">提现</button>
			</view>
		</form>
    </view>
</template>

<script>
	import api from '../../api/api'
    import config from '../../config'
	import { pathToBase64, base64ToPath } from '../../js_sdk/gsq-image-tools/image-tools/index.js'
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
				name: "",
				username: "",
				over_money: "0",
				money: "",
				code_img: "",
				code_pic: "",
				array: ['微信提现', '支付宝提现'],
				index: 0,
								
                url: '',
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        methods: {
			selectCode: function(e){
				var that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (ress) {
						// that.code_img = ress.tempFilePaths[0];
						pathToBase64(ress.tempFilePaths[0])
						.then(base64 => {
							console.log(base64)
							uni.request({
								url: api.config.baseURL+'/index.php?act=ajax_return&op=upload_image',  
								method: 'POST',
								data:{
									images:base64,  
								},
								dataType:'json',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									console.log(res.data.url);
									that.code_img = base64;
									that.code_pic = res.data.url;
								}
							});
						})
						.catch(error => {
							console.error(error)
						})
						// that.urlTobase64(ress.tempFilePaths[0]);
					}
				});
			},
			urlTobase64(url){
				uni.request({
					url: url,
					method:'GET',
					responseType: 'arraybuffer',
					success: ress => {
						let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
						base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
						// console.log(base64);										
						uni.request({
							url: api.config.baseURL+'/index.php?act=ajax_return&op=upload_image',  
							method: 'POST',
							data:{
								images:base64,  
							},
							dataType:'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {  
								console.log(1111)
							    this.code_pic = res.data.url
								console.log(this.code_pic)
							}
						});  
					}
				})
			},
			bindPickerChange: function(e){
				this.index = e.target.value;
			},
			formSubmit: function(e){
				var that = this;
				console.log(that.money);
				console.log(that.index);
				console.log(that.code_pic);
				if(that.money == '' || that.money == "0"){
					uni.showToast({
						title:"提现金额不为空",
						icon:'none', 
					});
					return false;
				}
				if(that.money >= that.over_money){
					uni.showToast({
						title:"提现金额不可大于现有金额",
						icon:'none', 
					});
					return false;
				}
				if(that.code_pic == ''){
					uni.showToast({
						title:"提现二维码不为空",
						icon:'none', 
					});
					return false;
				}
				
				uni.request({
					url: api.config.baseURL+'/index.php?act=predeposit&op=pd_cash_add&key='+uni.getStorageSync("access_token"), 
					method: 'POST',
					data:{
						pdc_url:that.code_pic,  
						pdc_type:that.index, 
						pdc_amount:that.money, 
					},
					dataType:'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {  
						console.log(res.data)
						 uni.showToast({
						  title: res.data.datas,
						  duration: 2000,
						  icon: 'none'
						})	
					}
				});  
			}
		}, 
        onLoad() {
			var that = this; 
			api.get('index.php?act=member', {}).then(datas => { 
				that.over_money = datas.member_info.available_predeposit
			})
        },
    }
</script>

<style scoped lang="scss">
	.withdraw_view{width: 100%;}
	.over_till{
		font-size: 26upx;
		margin-bottom: 20upx;
		padding-left: 10upx;
		text{
			color: #f00;
		}
	}
	.withdraw_view{
		padding: 30upx 20upx;
		box-sizing: border-box;
		.section{
			background: #fff;
			padding: 0 20upx;
			height: 80upx;
			margin-bottom: 20upx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.left_txt{
				color: #00001f;
				font-size: 24upx;
				// width: 140upx;
				width: 150upx;
				margin-right: 30upx;
				border-right: 1upx solid #eee;
				text{
					color: #f00;
				}
			}
			.txt{
				color: #333;
				font-size: 20upx;
				width: 72%;
				// padding-left: 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.pic_box{
					width: 100%;
					view{
						display: inline-block;
					}
					image{
						display: block;
						float: right;
						width: 20upx;
						height: 34upx !important;
					}
				}
			}
			.img{
				width: 180upx;
				height: 180upx;
				border: 1px solid #eee;
				// margin-left: 30upx;
				position: relative;
				&:after{
					content: "+";
					color: #999;
					font-size: 100upx;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					z-index: 0;
				}
				image{
					display: block;
					width: 100%;
					height: 100% !important;
					position: relative;
					z-index: 5;
				}
			}
			input{
				color: #333;
				font-size: 22upx;
			}
		}
		.section_img{
			height: auto;
			line-height: auto;
			padding: 30upx 20upx;
		}
		.submit_btn{
			width: 80%;
			margin-top: 100upx;
			color: #fff;
			font-size: 24upx;
			background: #00001f;
			border-radius: 5upx;
			padding: 10upx 0 12upx;
		}
	}
</style>