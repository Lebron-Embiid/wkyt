<template>
	<view class="index_view">
		<video :src="url" :poster="poster_img" class="a_video" :autoplay="autoplay" :show-center-play-btn="play" :enable-progress-gesture="progress" :controls="controls" direction="0"></video>
		<!-- <cover-view class="cover_video_view">
			<cover-view class="cv_title">20/16</cover-view>
		</cover-view> -->
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
				play: false
			}
		},
		methods:{
			
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.a_video{
		position: fixed;
		display: block;
		width: 100%;
		height: 100% - var(--window-bottom);
		left: 0;
		top: var(--status-bar-height);
	}
	.cover_video_view{
		.cv_title{
			display: block;
			width: 100%;
			color: #fff;
			font-size: 36upx;
			text-align: center;
			margin: 15upx 0;
		}
	}
</style>
