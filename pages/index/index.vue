<template>
	<view class="index_view">
		<video id="myVideo" :src="url" :poster="poster_img" :loop="play" :show-fullscreen-btn="progress" :autoplay="autoplay" :show-center-play-btn="play" :enable-progress-gesture="progress" :controls="controls" direction="0">
			
		</video>
		<cover-view class="cover_video_view">
			<cover-view class="cv_title">20/16</cover-view>
			<cover-view class="operate_box">
				<cover-view class="ob_avatar"><cover-image src="../../static/img/index_avatar.png"></cover-image></cover-view>
				<cover-view class="ob_item ob_collect"><cover-image src="../../static/img/index_icon1.png"></cover-image><cover-view>566w</cover-view></cover-view>
				<cover-view class="ob_item ob_love"><cover-image src="../../static/img/index_icon2.png"></cover-image><cover-view>13.8w</cover-view></cover-view>
				<cover-view class="ob_item ob_commont"><cover-image src="../../static/img/index_icon3.png"></cover-image><cover-view>350</cover-view></cover-view>
				<cover-view class="ob_item ob_share"><cover-image src="../../static/img/index_icon4.png"></cover-image><cover-view>1.2w</cover-view></cover-view>
			</cover-view>
			<cover-view class="cover_content">
				<cover-view class="cover_style">
					<cover-view class="cs_left"><cover-image src="../../static/img/theme_icon.png"></cover-image></cover-view>
					<cover-view class="cs_right">新惠设计主流款...</cover-view>
				</cover-view>
				<cover-view class="cover_word">
					高品质制造平台,三体系认证,十环认证 平台,三体系认证十环认证平台,三体系认证,十环认证高品质制造
				</cover-view>
			</cover-view>
		</cover-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url: "http://vd.yinyuetai.com/sh.yinyuetai.com/uploads/videos/common/5A18014D6581072F9B3C10765252A3F1.mp4",
				poster_img: "../../static/img/poster.jpg",
				controls: false,
				autoplay: true,
				progress: false,
				play: true
			}
		},
		methods:{
			
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	// body,page{position: relative;width: 100%;height: 100%;}
	#myVideo{
		position: relative;
		display: block;
		width: 100vw;
		height: 100vh;
		// width: 100%;
		// height: calc(100% - 28px);
		// left: 0;
		// top: var(--status-bar-height);
	}
	.cover_video_view{
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		padding: 30upx 20upx;
		box-sizing: border-box;
		// top: var(--status-bar-height);
		.cv_title{
			display: block;
			width: 100%;
			color: #fff;
			font-size: 36upx;
			text-align: center;
			margin: 30upx 0;
		}
		.operate_box{
			position: absolute;
			right: 20upx;
			bottom: 210upx;
			width: 90upx;
			text-align: center;
			.ob_avatar{
				border: 2px solid #fff;
				border-radius: 50%;
				cover-image{
					display: block;
					width: 82upx;
					height: 82upx;
				}
			}
			.ob_item{
				margin-top: 40upx;
				cover-image{
					display: block;
					width: 50upx;
					height: 47upx;
					margin: 0 auto 10upx;
				}
				cover-view{
					color: #fff;
					font-size: 24upx;
					text-align: center;
				}
			}
		}
		.cover_content{
			position: absolute;
			left: 20upx;
			bottom: 150upx;
			width: 520upx;
			.cover_style{
				width: 270upx;
				height: 58upx;
				background: rgba(0,0,0,.13);
				border-radius: 10upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 20upx;
				.cs_left{
					width: 60upx;
					height: 58upx;
					background: rgba(0,0,0,.5);
					display: flex;
					justify-content: center;
					align-items: center;
					margin-right: 10upx;
					cover-image{
						display: block;
						width: 34upx;
						height: 30upx;
					}
				}
				.cs_right{
					color: #fff;
					font-size: 22upx;
					width: 75%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.cover_word{
				color: #fff;
				font-size: 22upx;
				height: 90upx;
				line-height: 1.4;
				color: #fff;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				white-space: pre-wrap;
			}
		}
	}
</style>
