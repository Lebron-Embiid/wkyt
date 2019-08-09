<template>
    <view class="store_view">
        <!-- <web-view :webview-styles="webviewStyles" :src="url"></web-view> -->
		<view class="change_box">
			<view class="change_avatar">
				<image :src="avatar_pic" mode="aspectFit" class="set_avatar"></image>
				<view class="camera" @click="changeAvatar"><image src="../../static/camera.png" mode="widthFix"></image></view>
			</view>
			<view class="ca_till">修改头像</view>
		</view>
		<form @submit="formSubmit" class="form">
			<view class="section">
				<text>昵称</text>
				<input type="text" name="username" @input="getUsername" :value="username" />
			</view>
			<view class="btn-area">
				<button formType="submit" class="submit_btn">确定修改</button>
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
				username: "",
				avatar_pic: "../../static/person_avatar.png",
				avatar: "",
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
			getUsername: function(e){
				this.username = e.detail.value;
			},
			changeAvatar: function(e){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (ress) => {
						// that.avatar_pic = ress.tempFilePaths[0];
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
									that.avatar_pic = base64;
									that.avatar = res.data.url;
									console.log(that.avatar)
								}
							});
						})
						.catch(error => {
							console.error(error)
						})
						// this.urlTobase64(res.tempFilePaths[0]);
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
							    this.avatar = res.data.url
								console.log(this.avatar)
							}
						}); 
					}
				})
			},
			formSubmit: function(e){
			     var that = this; 
				 console.log()
				 console.log(that.username)
				 console.log(that.avatar) 
				api.post('index.php?act=member&op=edit', {'username':that.username,'avatar':that.avatar}).then(datas => {										
					 uni.showToast({
					   title: datas.msg,
					   duration: 2000,
					   icon: 'none'
					 })		 
				})
			}
		},
        onLoad() {
			var that = this; 
			api.get('index.php?act=member', {}).then(datas => {
				console.log(datas)
				that.username = datas.member_info.user_name
				that.avatar_pic = datas.member_info.avator
				that.avatar = datas.member_info.avator
			})
        },
    }
</script>

<style scoped lang="scss">
	.store_view{
		width: 100%;
	}
	.change_box{
		padding: 35upx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 8upx;
		.change_avatar{
			width: 132upx;
			height: 132upx;
			position: relative;
			border-radius: 50%;
			margin: 0 auto 20upx;
			.set_avatar{
				display: block;
				width: 100%;
				height: 100% !important;
				border-radius: 50%;
			}
			.camera{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.4);
				border-radius: 50%;
				z-index: 5;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					display: block;
					width: 34upx;
					height: 29upx !important;
				}
			}
		}
		.ca_till{
			color: #00001f;
			font-size: 24upx;
			text-align: center;
		}
	}
	.form{
		display: block;
		overflow: hidden;
		.section{
			background: #fff;
			padding: 20upx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-top: 1px solid #eee;
			border-bottom: 10upx solid #eee;
			text{
				color: #00001f;
				font-size: 24upx;
				padding-right: 60upx;
				border-right: 1upx solid #eee;
			}
			input{
				padding: 0 40upx 0 50upx;
				box-sizing: border-box;
				color: #333;
				font-size: 22upx;
			}
		}
		.submit_btn{
			width: 80%;
			margin-top: 200upx;
			color: #fff;
			font-size: 24upx;
			background: #00001f;
			border-radius: 5upx;
			padding: 10upx 0 12upx;
		}
	}
</style>