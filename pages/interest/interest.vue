<template>
	<view class="interest_view">
		<view class="page_bg"></view>
		<view class="inter_title">欢迎来到旺客-易推</view>
		<view class="inter_info">完善信息，个性化你的内容</view>
		<view class="interest_box">
			<view class="interest_item" @tap="selectInterest(index)" v-for="(item,index) in interest_list" :key="index">
				<view class="in_img">
					<image :src="item.photo" class="in_photo" mode="widthFix"></image>
					<block v-if="item.select == 1">
						<image src="../../static/img/select.png" class="in_select" mode="widthFix"></image>
					</block>
				</view>
				<view class="in_title">{{item.title}}</view>
			</view>
		</view>
		<view class="toNextPage" @tap="toNext"><button type="primary">至少关注3个({{num}}/3)</button></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num: 0,
				interest_list: [
					{
						id: 1,
						photo: "../../static/img/interest_img1.png",
						title: "时尚穿搭",
						select: 0
					},
					{
						id: 2,
						photo: "../../static/img/interest_img2.png",
						title: "发型",
						select: 0
					},
					{
						id: 3,
						photo: "../../static/img/interest_img3.png",
						title: "化妆品",
						select: 0
					},
					{
						id: 4,
						photo: "../../static/img/interest_img4.png",
						title: "数码",
						select: 0
					},
					{
						id: 5,
						photo: "../../static/img/interest_img5.png",
						title: "音乐器材",
						select: 0
					},
					{
						id: 6,
						photo: "../../static/img/interest_img6.png",
						title: "书籍",
						select: 0
					},
					{
						id: 7,
						photo: "../../static/img/interest_img7.png",
						title: "百货",
						select: 0
					},
					{
						id: 8,
						photo: "../../static/img/interest_img8.png",
						title: "汽车",
						select: 0
					},
					{
						id: 9,
						photo: "../../static/img/interest_img9.png",
						title: "箱包",
						select: 0
					},
					{
						id: 10,
						photo: "../../static/img/interest_img10.png",
						title: "鞋靴",
						select: 0
					},
					{
						id: 11,
						photo: "../../static/img/interest_img11.png",
						title: "生鲜",
						select: 0
					},
					{
						id: 12,
						photo: "../../static/img/interest_img12.png",
						title: "美食",
						select: 0
					}
				]
			}
		},
		methods:{
			selectInterest: function(e){
				if(this.interest_list[e].select == 0){
					this.interest_list[e].select = 1;
					this.num++;
				}else{
					this.interest_list[e].select = 0;
					this.num--;
				}
			},
			toNext: function(e){
				if(parseInt(this.num) < 3){
					uni.showToast({
						title: "至少关注3个兴趣！",
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				uni.reLaunch({
					url: "/pages/index/index",
					animationType: 'pop-in',
					animationDuration: 500
				})
			},
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.interest_view{
		width: 100%;
		padding: 50upx 25upx 100upx;
		box-sizing: border-box;
		.inter_title{
			color: #000;
			font-size: 40upx;
			text-align: center;
			margin-bottom: 10upx;
		}
		.inter_info{
			color: #8a8a8a;
			font-size: 24upx;
			text-align: center;
			margin-bottom: 100upx;
		}
		.interest_box{
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			.interest_item{
				width: 32%;
				margin: 0 2% 20upx 0;
				&:nth-child(3n){
					margin-right: 0;
				}
				.in_img{
					position: relative;
					margin-bottom: 15upx;
					.in_photo{
						display: block;
						width: 227upx;
						height: 227upx !important;
					}
					.in_select{
						display: block;
						width: 29upx;
						height: 29upx !important;
						position: absolute;
						right: 15upx;
						top: 10upx;
						z-index: 3;
					}
				}
				.in_title{
					color: #2e2e2e;
					font-size: 28upx;
					text-align: center;
				}
			}
		}
	}
</style>