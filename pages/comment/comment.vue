<template>
	<view class="comment_view">
		<view class="comment_top">
			<text>评论 {{comment_count}}</text>
			<image src="../../static/img/close_icon1.png" @tap="back" mode="widthFix"></image>
		</view>
		<scroll-view class="comment_box" :scroll-top="scrollTop" scroll-y="true">
			<view class="comment_item" v-for="(item,index) in comment_list" :key="index">
				<view class="comment_left">
					<image  :src="item.avatar" class="comment_avatar" mode="widthFix"></image>
					<view class="comment_info">
						<view class="cic_title">{{item.name}}</view>
						<view class="cic_info">{{item.info}}</view>
					</view>
				</view>
				<view class="comment_right" @click="toComment(item.id)">
					<image src="../../static/img/love_icon.png" mode="widthFix"></image>
					<text>{{item.num}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="fixed_submit">
			<input type="text" placeholder="说点什么" :value="content" v-model="content" />
			<button type="primary" @tap="toSend">发送</button>
		</view>
	</view>
</template>

<script>
	import api from '../../api/api'
	export default{
		data(){
			return{
				comment_count:0,
				scrollTop: 0,
				content: "",
				video_id: 0,
				total_count:1,
				curpage:1,
				comment_list:[]
			}
		},
		methods:{
			back(){
				uni.navigateBack({
					delta: 1
				})
			},					
			toSend(){ 
			if(this.content == ''){			
				uni.showToast({
				  title: '请填写信息',
				  duration: 2000,
				  icon: 'none'
				})
			} 
				 api.post('index.php?act=video&op=videoComment', {
				 	'video_id': this.video_id,
				 	'content': this.content
				 }).then(datas => {
					 if(datas == 1){
						 uni.showToast({
						   title: '评论成功',
						   duration: 2000,
						   icon: 'none'
						 })
						 this.content = ''
					 } 
				 })
			},
			toComment:function(id){
				console.log(id)		
				api.get('index.php?act=video&op=CommentPraise', {
					id:id
				}).then(datas => {
					console.log(datas.list) 
				})
			},
			getCommentList(){
				//TODO:分页处理
					api.get('index.php?act=video&op=CommentList', {
						video_id:this.video_id,curpage:this.curpage
					}).then(datas => {
						console.log(datas.list)
						this.comment_list = datas.list
						this.comment_count = datas.count
						this.total_count = datas.total_count
					})
			},
		
		},
		onLoad(opt) {
			this.video_id = opt.video_id
			this.comment_count = opt.comment_count
			//评论分页
			this.getCommentList();
		},			
		onReachBottom() {
			var that = this;
			this.curpage = this.curpage + 1
			if(this.total_count < this.curpage){							
				 uni.showToast({
				   title: '暂无更多加载',
				   duration: 2000,
				   icon: 'none'
				 })
				 return false;
			}
			uni.showLoading({
				title: "加载中"
			})
			setTimeout(function () {
			    that.getCommentList();
				uni.hideLoading();
			}, 1000);
		},
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
			height: 90upx;
			box-sizing: border-box;
			color: #6e6e6e;
			background: #000;
			position: relative;
			z-index: 6;
			font-size: 28upx;
			border-bottom: 1px solid #2A2A2A;
			image{
				display: block;
				width: 37upx;
				height: 37upx !important;
			}
		}
		.comment_box{
			// margin-bottom: 100upx;
			display: inline-block;
			white-space: nowrap;
			position: fixed;
			width: 100%;
			left: 0;
			top: 100upx;
			height: 83%;
			.comment_item{
				padding: 30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				border-bottom: 1px solid #131313;
				.comment_left{
					width: 70%;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					.comment_avatar{
						display: block;
						width: 70upx;
						height: 70upx !important;
						margin-right: 20upx;
					}
					.comment_info{
						.cic_title{
							color: #415d6d;
							font-size: 26upx;
						}
						.cic_info{
							color: #727272;
							font-size: 24upx;
						}
					}
				}
				.comment_right{
					display: flex;
					justify-content: flex-end;
					flex-wrap: wrap;
					image{
						display: block;
						width: 36upx;
						height: 38upx !important;
						margin: 0 auto 5upx;
					}
					text{
						display: block;
						width: 100%;
						text-align: center;
						color: #727272;
						font-size: 24upx;
					}
				}
			}
		}
		.fixed_submit{
			position: fixed;
			width: 100%;
			padding: 30upx;
			height: 90upx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #1b1b1b;
			left: 0;
			bottom: 0;
			z-index: 5;
			input{
				display: block;
				width: 80%;
				color: #838383;
				font-size: 26upx;
			}
			button{
				width: 15%;
				padding: 0;
				margin: 0;
				height: 50upx;
				line-height: 50upx;
				font-size: 24upx;
				background: #CB0000;
			}
		}
	}
</style>