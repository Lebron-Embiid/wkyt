<template>
	<view class="comment_view">
		<view class="comment_top">
			<text>评论 128</text>
			<image src="../../static/img/close_icon1.png" mode="widthFix"></image>
		</view>
		<scroll-view class="comment_box" :scroll-top="scrollTop" scroll-y="true" @scroll="scroll">
			<view class="comment_item">
				<view class="comment_left">
					<image src="../../static/img/comment_avatar1.png" class="comment_avatar" mode="widthFix"></image>
					<view class="comment_info">
						<view class="cic_title">心是i</view>
						<view class="cic_info">你陪我一程，我念你一生。</view>
					</view>
				</view>
				<view class="comment_right">
					<image src="../../static/img/love_icon.png" mode="widthFix"></image>
					<text>3119</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				scrollTop: 0
			}
		},
		methods:{
			
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.comment_view{
		width: 100%;
		background: #000;
		.comment_top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30upx 25upx;
			box-sizing: border-box;
			color: #6e6e6e;
			font-size: 28upx;
			border-bottom: 1px solid #2A2A2A;
			image{
				display: block;
				width: 37upx;
				height: 37upx !important;
			}
		}
		.comment_box{
			.comment_item{
				
			}
		}
	}
</style>