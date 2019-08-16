<script>
	var wgtVer = null;  
	var wgtUrl = null;
	export default {
		globalData:{
			and_ios: 0
		},
		onLaunch: function() {
			console.log('App Launch');
			
			switch(uni.getSystemInfoSync().platform){
				case 'android':
					console.log('运行Android上')
					this.$options.globalData.and_ios = 0;
					break;
				case 'ios':
					console.log('运行iOS上')
					this.$options.globalData.and_ios = 1;
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
		},
		onShow: function () {
			var that = this;
			plus.runtime.getProperty(plus.runtime.appid,function(inf){
				wgtVer=inf.version;
				console.log("当前应用版本："+wgtVer);
				uni.request({
				    url:  api.config.baseURL+'index.php?act=index&op=edition', //仅为示例，并非真实接口地址。
				    data: {number:wgtVer,type:that.$options.globalData.and_ios},
					method: 'POST',
					dataType:'json',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
				    success: (res) => {
						console.log(res.data)
						if(res.data.code == 0){
							wgtUrl = res.data.data;
							// downWgt();
							uni.showModal({
								content: res.data.msg,
								confirmText:"升级APP",
								showCancel:false,
								success:function(){
									console.log(uni.getSystemInfoSync().platform)
									plus.runtime.openURL(wgtUrl);
								}
							})
						}
				    }
				});
			});
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	.page_bg{
		background: #efeef3 !important;min-height: 100%;position: fixed;width: 100%;z-index: -1;left: 0;top: 0;
		&.black{
			background: #000 !important;
		}
	}
	.status_bar {  
		height: var(--status-bar-height);  
		width: 100%;  
		// background-color: #efeef3;  
	}  
	.top_view {  
		height: var(--status-bar-height);  
		width: 100%;  
		position: fixed;  
		// background-color: #efeef3;  
		top: 0;  
		z-index: 999;  
	}  
	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	body,
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	uni-picker .uni-picker-item{
		font-size: 28upx;
	}
	
	.toNextPage{
		padding: 0 60upx;
		margin-top: 130upx;
		button{
			height: 85upx;
			line-height: 85upx;
			color: #fff;
			font-size: 30upx;
			background: #257cf2;
			border-radius: 5upx;
			&:after{
				border: 0;
			}
		}
	}
	
	.bor{
		border-top: 1px solid #DFDFDF;
		border-bottom: 1px solid #DFDFDF;
	}
	.mb20{
		margin-bottom: 25upx;
	}
	
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-row{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-bottom: 10upx;
		border-bottom: 1px solid #D6D6D6;
		margin-top: 60upx;
		image{
			display: inline-block;
			width: 28upx;
			height: 34upx !important;
		}
		.m-input{
			color: #c1c1c1;
			font-size: 26upx;
		}
	}

	button.primary {
		height: 90upx;
		line-height: 90upx;
		background-color: #3d88eb;
		border-radius: 50upx;
		font-size: 30upx;
		margin: 80upx 0 30upx;
	}
	button.primary:after{
		border: 0;
	}
	.ob_avatar .uni-cover-image,.ob_avatar .uni-cover-image img{
		border-radius: 50% !important;
	}
	
	
	// .uni-tabbar .uni-tabbar__item .uni-tabbar__bd{
	// 	height: 44px !important;
	// }
	// .uni-tabbar .uni-tabbar__item .uni-tabbar__bd .uni-tabbar__label{
	// 	font-weight: bold !important;
	// }
</style>
