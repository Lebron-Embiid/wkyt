<template>
	<view class="index_view">
		<video :src="url" :poster="poster_img" class="a_video" :autoplay="autoplay" :show-center-play-btn="play" :enable-progress-gesture="progress" :controls="controls" direction="0" objectFit="fill"></video>
		<cover-view class="cover_video_view">
			<cover-view class="cv_title">20/16</cover-view>
		</cover-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url: "",
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
		height: calc(100% - var(--window-bottom));
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
