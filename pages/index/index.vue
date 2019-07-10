<template>
	<view class="index_view">
		<video id="myVideo" :src="url" :poster="poster_img" :loop="play" :show-fullscreen-btn="progress" :autoplay="autoplay" :show-center-play-btn="play" :enable-progress-gesture="progress" :controls="controls" direction="0"
		 @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' @touchcancel='touchcancel' @timeupdate="timeupdate">
			<cover-view class="cv_title">{{title}}</cover-view>
			<cover-view class="ob_avatar_border"></cover-view>
			<cover-image class="ob_avatar" :src="avatar" @tap="toAvatar" style="border-radius: 50%;"></cover-image>
			<cover-image class="ob_item oc_img1" @tap="toCollect" src="../../static/img/index_icon1.png"></cover-image><cover-view @tap="toCollect" class="ob_txt ob_collect">{{collect}}</cover-view>
			<cover-image class="ob_item oc_img2" @tap="toLove" src="../../static/img/index_icon2.png"></cover-image><cover-view @tap="toLove" class="ob_txt ob_love">{{love}}</cover-view>
			<cover-image class="ob_item oc_img3" @tap="toComment" src="../../static/img/index_icon3.png"></cover-image><cover-view @tap="toComment" class="ob_txt ob_comment">{{comment}}</cover-view>
			<cover-image class="ob_item oc_img4" @tap="toShare" src="../../static/img/index_icon4.png"></cover-image><cover-view  @tap="toShare" class="ob_txt ob_share">{{share}}</cover-view>
			<cover-view class="cs_left_bg"></cover-view>
			<cover-image class="cs_left" :src="tag_img"></cover-image>
			<cover-view class="cs_right">{{type}}</cover-view>
			<cover-view class="cover_word">
				{{info}}
			</cover-view>

			<!-- 弹出红包 -->
			<cover-image src="../../static/img/red_bg1.png" class="red_img" :class="[red_show==true?'active':'']" @tap="open_red"></cover-image>
			<cover-view class="red_title" :class="[red_show==true?'active':'']">{{red_title}}</cover-view>
			<cover-view class="red_info" :class="[red_show==true?'active':'']">{{red_info}}</cover-view>

			<!-- 打开红包 -->
			<cover-image src="../../static/img/red_bg.png" class="open_bg" :class="[money_show==true?'active':'']"></cover-image>
			<cover-image src="../../static/img/close.png" class="close_icon" @tap="close_money" :class="[money_show==true?'active':'']"></cover-image>
			<cover-view class="open_money" :class="[money_show==true?'active':'']">¥ {{money}}</cover-view>
			<cover-view class="open_info" :class="[money_show==true?'active':'']">{{red_title}}{{red_info}}</cover-view>
			<cover-view class="open_word" :class="[money_show==true?'active':'']">已存入钱包，可以直接消费</cover-view>
		</video>
	</view>
</template>

<script>
	const videoContext = uni.createVideoContext('myVideo')
	import api from '../../api/api'
	// #ifdef APP-PLUS
	// var currentWebview = plus.webview.currentWebview();
	// #endif
	var start;
	export default{
		data(){
			return{
				video_id: 0,
				url: "",
				tag_img: "",
				poster_img: "../../static/img/poster.jpg",
				controls: false,
				autoplay: true,
				progress: false, 
				member_watch:100,
				member_video:100,
				play: true,
				title: '20/16',
				avatar: "../../static/img/index_avatar.png",
				collect: "0",
				love: "0",
				comment: "0",
				share: "0",
				type: "新惠设计主流款...",
				info: "高品质制造平台,三体系认证,十环认证 平台,三体系认证十环认证平台,三体系认证,十环认证高品质制造",
				red_title: "奔驰汽车",
				red_info: "领导时代，驾驭未来",
				money: 0,
				red_show: false,
				money_show: false,

				percent: 0,
				subject: [],
				current: 0,
				pages: 0,
				page: 1,
				icons:'',
				subjectList: [],
			}
		},
		methods:{
			// 打开红包
			open_red(){
				api.post('index.php?act=video&op=reward', {
					'video_id': this.video_id
				}).then(datas => {
					this.money = datas.amount;
					this.red_title = '';
					this.red_info = datas.message;

					//显示红包内容
					this.red_show = false;
					this.money_show = true;
				})
			},
			close_money(){
				this.money_show = false;
			}, 
			//商家信息
			toAvatar(){
				uni.navigateTo({
					url: "/pages/business_info/business_info?video_id="+this.video_id
				})
			},
			//收藏
			toCollect(){
				 api.get('index.php?act=video&op=videoCollection', {
				 	'video_id': this.video_id
				 }).then(datas => {
				      if(datas.code == 0){
						  this.collect = datas.v_star_count
					  }
				 })
			},
			//点赞
			toLove(){
				 api.get('index.php?act=video&op=fabulous', {
				 	'video_id': this.video_id
				 }).then(datas => {
				      if(datas.code == 0){
						  this.love = datas.v_like_count
					  }
				  
				 })
			},
			//转发
			toShare(){
				 api.get('index.php?act=video&op=forward', {
				 	'video_id': this.video_id
				 }).then(datas => {
				      if(datas.code == 0){
						  this.share = datas.v_forward_count
					  }
				 })
			},
			//评论
			toComment(){
				console.log(this.comment)
				console.log(this.video_id)
				
				uni.navigateTo({
					url: "/pages/comment/comment?comment_count="+this.comment+"&video_id="+this.video_id
				})
			},
			// 下面主要模仿滑动事件
			touchstart: function (e) {
			  start = e.changedTouches[0];
			},

			touchmove: function (e) {
			},

			touchend: function (e) {
			  this.getDirect(start, e.changedTouches[0]);
			},

			touchcancel: function (e) {
			  this.getDirect(start, e.changedTouches[0]);
			},

			// 计算滑动方向
			getDirect(start, end) {
			  var X = end.pageX - start.pageX,
			    Y = end.pageY - start.pageY;
			  if (Math.abs(X) > Math.abs(Y) && X > 0) {
			    console.log("right");
			  }
			  else if (Math.abs(X) > Math.abs(Y) && X < 0) {
			    console.log("left");
			  }
			  else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
			    console.log("bottom");
				this.pre();
			  }
			  else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
			    console.log("top");
				this.next()
			  }
			},
			loadData: function (page, success) {
			  var that = this;
			  that.page = page;
			    //获取视频
				api.post('index.php?act=video&op=getOne', {}).then(datas => {
					that.video_id = datas.v_id;
					that.url = datas.url;
					that.avatar = datas.store_logo;
					that.tag_img = datas.tag_img;
					that.type = datas.v_title;
					that.info = datas.v_desc;
					that.collect = datas.v_star_count;
					that.love = datas.v_like_count;
					that.comment = datas.v_comment_count;
					that.share = datas.v_forward_count;
					that.title = datas.member_watch+'/'+datas.member_video;
					 
				})
			},
			changeSubject: function (current) {
			  var that = this;
			  if (current < 0) {
			    current = 0;
			    uni.showToast({
			      title: '请往上滑',
			      duration: 2000,
			      icon: 'none'
			    })
			  }
			  current = current || 0;
			  var list = that.subjectList;
			  if (list.length <= current) {
			    return;
			  }
			  // 自动加载
			  // var diff = list.length - current;
			  // if (diff <= 5) {
				that.loadData(that.page + 1);
			  // }
			},
			// 视频播放时间更新
			timeupdate: function (e) {
			  var val = e.detail.currentTime;
			  var max = e.detail.duration;
			  var percent = Math.round(val / max * 10000) / 100;
			  this.percent = percent;
			},
			// 播放上一个抖音
			pre: function () {
			  this.changeSubject(this.current - 1);
			},

			// 播放下一个抖音
			next: function () {
			  this.changeSubject(this.current + 1);
			},
		},
		onLoad() {
			//TODO:检查登录
			var that = this;
			that.loadData(1, this.changeSubject);
			//显示红包
			setTimeout(function(){
				that.red_show = true;
// 				uni.showModal({
// 					title: "提示",
// 					content: "前往大转盘抽奖？",
// 					success: (res) => {
// 						if(res.confirm){
// 							uni.navigateTo({
// 								url: "/pages/awards/awards"
// 							})
// 						}
// 					},
// 					fail: (err) => {
// 						console.log(err)
// 					}
// 				})
			},5000)
		},
		onShow() {
			videoContext.play();
		},
		onHide() {
			videoContext.pause();
		},
		onPullDownRefresh() {

		},
		onReachBottom() {

		},
		onPageScroll(e) {
			console.log(e)
		}
	}
</script>

<style scoped lang="scss">
	body,page{position: relative;}
	#myVideo{
		display: block;
		// width: 100vw;
		// height: 100vh;
		width: 100%;
		height: calc(100% - 28px);
		position: absolute;
		left: 0;
		top: var(--status-bar-height);
	}
	
	// .cover_video_view{
	// 	position: absolute;
	// 	width: 100%;
	// 	height: 100%;
	// 	left: 0;
	// 	top: 0;
	// 	// padding: 30upx 20upx;
	// 	box-sizing: border-box;
		// top: var(--status-bar-height);
		.cv_title{
			display: block;
			width: 100%;
			color: #fff;
			font-size: 36upx;
			text-align: center;
			position: absolute;
			top: 50upx;
		}
		// .operate_box{
		// 	position: absolute;
		// 	right: 20upx;
		// 	bottom: 210upx;
		// 	width: 90upx;
		// 	text-align: center;
			.ob_avatar_border{
				width: 90upx;
				height: 90upx;
				border-radius: 50%;
				background: #fff;
				position: absolute;
				right: 20upx;
				bottom: 720upx;
			}
			.ob_avatar{
				display: block;
				width: 82upx;
				height: 82upx;
				position: absolute;
				right: 24upx;
				bottom: 724upx;
			}
			.ob_item{
				display: block;
				width: 50upx;
				height: 47upx;
				position: absolute;
				right: 43upx;
			}
			.oc_img1{
				bottom: 640upx;
			}
			.oc_img2{
				bottom: 520upx;
			}
			.oc_img3{
				bottom: 400upx;
			}
			.oc_img4{
				bottom: 280upx;
			}
			.ob_txt{
				color: #fff;
				font-size: 24upx;
				text-align: center;
				position: absolute;
				right: 23upx;
				width: 90upx;
				text-align: center;
			}
			.ob_collect{
				bottom: 605upx;
			}
			.ob_love{
				bottom: 485upx;
			}
			.ob_comment{
				bottom: 365upx;
			}
			.ob_share{
				bottom: 245upx;
			}
		// }
		// .cover_content{
		// 	position: absolute;
		// 	left: 20upx;
		// 	bottom: 150upx;
		// 	width: 520upx;
			// .cover_style{
			// 	width: 270upx;
			// 	height: 58upx;
			// 	background: rgba(0,0,0,.13);
			// 	border-radius: 10upx;
			// 	display: flex;
			// 	justify-content: flex-start;
			// 	align-items: center;
			// 	margin-bottom: 20upx;
				.cs_left{
					width: 34upx;
					height: 30upx;
					position: absolute;
					left: 35upx;
					bottom: 297upx;
					// cover-image{
					// 	display: block;
					// 	width: 34upx;
					// 	height: 30upx;
					// }
				}
				.cs_left_bg{
					background: rgba(0,0,0,.5);
					border-top-left-radius: 10upx;
					border-bottom-left-radius: 10upx;
					width: 60upx;
					height: 58upx;
					position: absolute;
					left: 20upx;
					bottom: 280upx;
				}
				.cs_right{
					color: #fff;
					width: 200upx;
					height: 58upx;
					line-height: 58upx;
					padding-left: 10upx;
					font-size: 22upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					position: absolute;
					left: 80upx;
					bottom: 280upx;
					background: rgba(0,0,0,.13);
					border-top-right-radius: 10upx;
					border-bottom-right-radius: 10upx;
				}
			// }
			.cover_word{
				color: #fff;
				font-size: 22upx;
				width: 65%;
				height: 90upx;
				line-height: 30upx;
				color: #fff;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				white-space: pre-wrap;
				position: absolute;
				left: 20upx;
				bottom: 170upx;
			}
			.red_img,.open_bg{
				position: absolute;
				width: 431upx;
				height: 532upx;
				left: 50%;
				top: 330upx;
				transform: translateX(-50%);
				border-radius: 10upx;
				display: none;
				&.active{
					display: block;
				}
			}
			.red_title,.red_info{
				color: #fff;
				font-size: 36upx;
				width: 431upx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 640upx;
				text-align: center;
				font-family: "黑体";
				display: none;
				&.active{
					display: block;
				}
			}
			.red_info{
				font-size: 30upx;
				top: 700upx;
			}
			.close_icon{
				width: 26upx;
				height: 26upx;
				position: absolute;
				top: 345upx;
				right: 180upx;
				display: none;
				&.active{
					display: block;
				}
			}
			.open_money,.open_info,.open_word{
				color: #fff;
				font-size: 64upx;
				position: absolute;
				width: 431upx;
				text-align: center;
				left: 50%;
				transform: translateX(-50%);
				top: 440upx;
				display: none;
				&.active{
					display: block;
				}
			}
			.open_info{
				font-size: 24upx;
				top: 540upx;
			}
			.open_word{
				color: #3d3d3d;
				font-size: 24upx;
				top: 700upx;
			} 
		// }
	// }
</style>
