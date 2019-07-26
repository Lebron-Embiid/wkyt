<template>
	<view class="index_view">
		<video id="myVideo" @tap.stop="startPause" :src="url" :poster="poster_img" :loop="play" :show-fullscreen-btn="progress" :autoplay="autoplay" :show-center-play-btn="play" :enable-progress-gesture="progress" :controls="controls" direction="0"
		 @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' @touchcancel='touchcancel' @timeupdate="timeupdate" @ended="ended">
			<cover-view class="cv_title">{{title}}</cover-view>
			
			<cover-view class="ob_avatar_border" v-if="status != 1"></cover-view>
			<!-- <cover-view class="ob_avatar1" :style="'background: url('+avatar+') center center no-repeat;background-size: 100% 100%;'" @tap.stop="toAvatar"></cover-view> -->
			<cover-image class="ob_avatar" v-if="status != 1" :src="avatar" @tap.stop="toAvatar"></cover-image>
			<cover-image class="ob_item oc_img1" v-if="status != 1" @tap.stop="toCollect" :src="wapUrl+'index_icon1.png'"></cover-image><cover-view @tap="toCollect" v-if="status != 1" class="ob_txt ob_collect">{{collect}}</cover-view>
			<cover-image class="ob_item oc_img2" v-if="status != 1" @tap.stop="toLove" :src="wapUrl+'index_icon2.png'"></cover-image><cover-view @tap="toLove" v-if="status != 1" class="ob_txt ob_love">{{love}}</cover-view>
			<cover-image class="ob_item oc_img3" v-if="status != 1" @tap.stop="toComment" :src="wapUrl+'index_icon3.png'"></cover-image><cover-view @tap="toComment" v-if="status != 1" class="ob_txt ob_comment">{{comment}}</cover-view>
			<cover-image class="ob_item oc_img4" v-if="status != 1" @tap.stop="toShare" :src="wapUrl+'index_icon4.png'"></cover-image><cover-view  @tap="toShare" v-if="status != 1" class="ob_txt ob_share">{{share}}</cover-view>
			
			<cover-view class="cs_left_bg"></cover-view>
			<cover-image class="cs_left" :src="tag_img"></cover-image>
			<cover-view class="cs_right">{{type}}</cover-view>
			<cover-view class="cover_word">
				{{info}}
			</cover-view>
			
			<!-- <cover-image class="v_play_btn" :class="[isPlay==0?'active':'']" :src="wapUrl+'play_btn.png'"></cover-image> -->

			<!-- 弹出红包 -->
			<cover-image :src="wapUrl+'red_bg1.png'" class="red_img" v-if="red_show == true" :class="[red_show==true?'active':'']" @tap.stop="open_red"></cover-image>
			<cover-view class="red_title" v-if="red_show == true" :class="[red_show==true?'active':'']">{{red_title}}</cover-view>
			<cover-view class="red_info" v-if="red_show == true" :class="[red_show==true?'active':'']">{{red_info}}</cover-view>

			<!-- 打开红包 -->
			<cover-image :src="wapUrl+'red_bg.png'" v-if="money_show == true" class="open_bg" :class="[money_show==true?'active':'']"></cover-image>
			<cover-image :src="wapUrl+'close_icon1.png'" v-if="money_show == true" class="close_icon" @tap.stop="close_money" :class="[money_show==true?'active':'']"></cover-image>
			<cover-view class="open_money" v-if="money_show == true" :class="[money_show==true?'active':'']">¥ {{money}}</cover-view>
			<cover-view class="open_info" v-if="money_show == true" :class="[money_show==true?'active':'']">{{red_title}}{{red_info}}</cover-view>
			<cover-view class="open_word" v-if="money_show == true" :class="[money_show==true?'active':'']">已存入钱包，可以直接消费</cover-view>
		</video>
	</view>
</template>

<script>
	var ctx = uni.createCanvasContext('firstCanvas')
	// const videoContext = uni.createVideoContext('myVideo')
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
				poster_img: "http://wkyt.demenk.com/wap/app/poster.jpg",
				controls: false,
				autoplay: true,
				progress: false, 
				member_watch:100,
				member_video:100,
				play: true,
				title: '20/16',
				avatar: "",
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
				videoContext: "",
				isPlay: 1,
				isOne: 0,
				wapUrl: "",
				status: '',
				num: 0,
				video_num: 0
			}
		},
		methods:{
			startPause(){
				console.log("tap");
				if(this.isPlay == 1){
					this.videoContext.pause();
					this.isPlay = 0;
				}else{
					this.videoContext.play();
					this.isPlay = 1;
				}
			},
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
				setTimeout(function(){
					uni.showModal({
						title: "提示",
						content: "前往大转盘抽奖？",
						success: (res) => {
							if(res.confirm){
								uni.navigateTo({
									url: "/pages/awards/awards"
								})
							}
						},
						fail: (err) => {
							console.log(err)
						}
					})
				},500)
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
						  uni.share({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 4,
							href: "http://uniapp.dcloud.io/",
							title: "uni-app分享",
							summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
							imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
							mediaUrl: "",
							success: function (res) {
								console.log("success:" + JSON.stringify(res));
								this.share = datas.v_forward_count
							},
							fail: function (err) {
								console.log("fail:" + JSON.stringify(err));
							}
						});
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
			loadData: function () {
			  	var that = this;
			    //获取视频
				uni.showLoading({
					title: "视频加载中..."
				})
				that.video_num++;
				api.post('index.php?act=video&op=getOne', {'video_num': that.video_num}).then(datas => {
					console.log(datas.v_id)
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
					that.status = datas.status;
					that.num = datas.num;
					if(that.num == 1){
						that.video_num = 0;
					}
					console.log(that.avatar);
					
					uni.hideLoading();
				})
			},
			changeSubject: function () {
				this.loadData();
			},
			// 视频播放时间更新
			timeupdate: function (e) {
			  var val = e.detail.currentTime;
			  var max = e.detail.duration;
			  var percent = Math.round(val / max * 10000) / 100;
			  this.percent = percent;
			  
			},
			ended: function(){
				// parseInt(val) >= parseInt(max) && 
				if(this.isOne == 0){
					this.red_show = true;
					this.isOne = 1;
				}
			},
			// 播放上一个抖音
			pre: function () {
				var that = this;
			  that.changeSubject(that.current - 1);
			  that.red_show = false;
			  that.money_show = false;
			  that.isPlay = 1;
			  that.isOne = 0;
				//显示红包
				// setTimeout(function(){
				// 	that.red_show = true;
				// },5000)
			},

			// 播放下一个抖音
			next: function () {
				var that = this;
			  that.changeSubject(that.current + 1);
			  that.red_show = false;
			  that.money_show = false;
			  that.isPlay = 1;
			  that.isOne = 0;
			  //显示红包
				// setTimeout(function(){
				// 	that.red_show = true;
				// },5000)
			},
		},
		onLoad() {
			//TODO:检查登录
			var that = this;
			that.wapUrl = api.config.wapUrl;
			console.log(that.wapUrl)
			that.videoContext = uni.createVideoContext('myVideo');
			that.loadData();
			//显示红包
			// setTimeout(function(){
			// 	that.red_show = true;
			// },5000)
		},
		onShow() {
			this.videoContext.play();
			this.isPlay = 1;
		},
		onHide() {
			this.isPlay = 0;
			this.videoContext.pause();
		},
		onPullDownRefresh() {
			
		},
		onReachBottom() {
			
		},
		onPageScroll(e) {
			
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
				// border-radius: 45upx;
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
				// border-radius: 41upx;
				border-radius: 50% !important;
				position: absolute;
				right: 24upx;
				bottom: 724upx;
			}
			.ob_avatar1{
				display: block;
				width: 82upx;
				height: 82upx;
				border-radius: 50% !important;
				position: absolute;
				// background: url('http://wkyt.demenk.com/data/upload/shop/store/06171923179233107.jpg') center center no-repeat;
				// background-size: 100% 100%;
				right: 24upx;
				bottom: 724upx;
				z-index: 9999
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
				// top: -100%;
				// transition: all .5s ease;
				&.active{
					display: block;
					// top: 330upx;
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
				// top: -100%;
				// transition: all .5s ease;
				&.active{
					display: block;
					// top: 640upx;
				}
			}
			.red_info{
				font-size: 30upx;
				top: 700upx;
				&.active{
					display: block;
					// top: 700upx;
				}
			}
			.close_icon{
				width: 26upx;
				height: 26upx;
				position: absolute;
				top: 345upx;
				right: 180upx;
				display: none;
				// top: -100%;
				// transition: all .5s ease;
				&.active{
					display: block;
					// top: 345upx;
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
				// top: -100%;
				// transition: all .5s ease;
				display: none;
				&.active{
					display: block;
				}
			}
			// .open_money{
			// 	&.active{
			// 		top: 440upx;
			// 		display: block;
			// 	}
			// }
			.open_info{
				font-size: 24upx;
				top: 540upx;
				// &.active{
				// 	top: 540upx !important;
				// 	display: block;
				// }
			}
			.open_word{
				color: #3d3d3d;
				font-size: 24upx;
				top: 700upx;
				// &.active{
				// 	top: 700upx !important;
				// 	display: block;
				// }
			} 
		// }
	// }
	.v_play_btn{
		display: none;
		width: 86upx;
		height: 99upx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		&.active{
			display: block;
		}
	}
</style>
