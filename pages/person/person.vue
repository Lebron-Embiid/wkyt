<template>
	<view class="person_view">
		<view class="page_bg"></view>
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="person_top">
			<view class="person_bg">
				<image src="../../static/img/person_bg.jpg" mode="widthFix"></image>
				<view class="person_layer"></view>
			</view>
			<view class="person_layer">
				<view class="person_avatar"><image :src="avatar_url" mode="widthFix"></image></view>
				<view class="person_name">{{nickname}}</view>
				<view class="person_edit" @tap="toSettings"><image src="../../static/img/edit.png" mode="widthFix"></image>编辑资料</view>
			</view>
		</view>
		<view class="nav_box">
			<view class="order_box">
				<view class="order_item"><navigator url="/pages/my_order/my_order?id=0"><image src="../../static/img/order_icon1.png" mode="widthFix"></image>待付款<view v-if="status_0 != 0">{{status_0}}</view></navigator></view>
				<view class="order_item"><navigator url="/pages/my_order/my_order?id=1"><image src="../../static/img/order_icon2.png" mode="widthFix"></image>待发货<view v-if="status_1 != 0">{{status_1}}</view></navigator></view>
				<view class="order_item"><navigator url="/pages/my_order/my_order?id=2"><image src="../../static/img/order_icon3.png" mode="widthFix"></image>待收货<view v-if="status_2 != 0">{{status_2}}</view></navigator></view>
				<view class="order_item"><navigator url="/pages/my_order/my_order?id=3"><image src="../../static/img/order_icon4.png" mode="widthFix"></image>已完成</navigator></view>
			</view>
			<view class="nav_item">
				<navigator class="navigator" url="/pages/wallet/wallet">我的钱包<image src="../../static/img/next.png" mode="widthFix"></image></navigator>
			</view>
			<view class="nav_item">
				<navigator class="navigator" url="/pages/car/car">我的购物车<image src="../../static/img/next.png" mode="widthFix"></image></navigator>
			</view>
			<view class="nav_item">
				<navigator class="navigator" url="/pages/my_coupon/my_coupon">我的优惠券<image src="../../static/img/next.png" mode="widthFix"></image></navigator>
			</view>
			<view class="nav_item">
				<navigator class="navigator" url="/pages/my_collect/my_collect">我的收藏<image src="../../static/img/next.png" mode="widthFix"></image></navigator>
			</view>
			<view class="nav_item">
				<view class="navigator" @click="logOut">退出登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				code:'',
				id:'',
				avatar_url: '../../static/img/person_avatar.png',
				money:0,
				nickname:'晓晓可',
				orders:[],
				status_0:0,
				status_1:0,
				status_2:0,
				status_3:0,
			}
		},
		methods:{
			toSettings(e){
				uni.navigateTo({
					url: "/pages/settings/settings"
				})
			},
			logOut(){
				 uni.showToast({
				 	title:"退出成功",
				 	icon:'none',
				 });
				setTimeout(function(){
					uni.reLaunch({
						url: "/pages/login/login"
					})
				},1500)
			}
		},
		onLoad() {
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style scoped lang="scss">
	.person_view{
		width: 100%;
	}
	.person_top{
		position: relative;
		.person_bg{
			position: relative;
			image{
				display: block;
				width: 100%;
				height: 340upx !important;
			}
			.person_layer{
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				background: rgba(255,255,255,.1);
				z-index: 5;
			}
		}
		.person_layer{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 5;
			padding: 30upx 45upx;
			box-sizing: border-box;
			overflow: hidden;
			.settings{
				float: right;
				image{
					display: block;
					width: 41upx;
					height: 41upx !important;
				}
			}
			.person_avatar{
				display: block;
				width: 122upx;
				height: 122upx;
				border: 2upx solid #fff;
				border-radius: 50%;
				margin: 30upx auto;
				box-sizing: border-box;
				image{
					display: block;
					width: 100%;
					height: 100% !important;
					// border: 5upx solid #0a0a41;
					box-sizing: border-box;
					border-radius: 50%;
				}
			}
			.person_name{
				color: #fff;
				font-size: 28upx;
				text-align: center;
			}
			.person_edit{
				text-align: center;
				color: #fff;
				font-size: 24upx;
				image{
					display: inline-block;
					vertical-align: middle;
					width: 24upx;
					height: 24upx !important;
					margin: 0 10upx 7upx 0;
				}
			}
		}
	}
// 	.person_top:after{
// 		background: rgba(0,0,31,.07);
// 	}
	.nav_box{
		padding: 0 20upx;
		box-sizing: border-box;
		overflow: hidden;
		transform: translateY(-40upx);
		position: relative;
		z-index: 10;
		.nav_item {
			.navigator{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx 40upx 20upx 25upx;
				background: #fff;
				margin-bottom: 5upx;
				color: #00001f;
				font-size: 26upx;
				image{
					display: block;
					width: 20upx;
					height: 34upx !important;
				}
			}
			&.radius navigator{
				border-top-left-radius: 5upx;
				border-top-right-radius: 5upx;
				border-bottom: 1upx solid #F1F1F1;
				margin-bottom: 0;
			}
		}
	}
	.order_box{
		padding: 0 30upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #00001f;
		font-size: 24upx;
		background: #fff;
		margin-bottom: 5upx;
		navigator{
			display: block;
			padding: 30upx;
			box-sizing: border-box;
			position: relative;
			view{
				position: absolute;
				right: 20upx;
				top: 20upx;
				display: block;
				width: 30upx;
				height: 30upx;
				line-height: 30upx;
				background: #f00;
				border-radius: 50%;
				color: #fff;
				font-size: 10upx;
				text-align: center;
			}
			image{
				display: block;
				width: 62upx;
				height: 54upx !important;
				margin: 0 auto 10upx;
			}
		}
	}
</style>