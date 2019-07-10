<template>
	<view class="business_view">
		<view class="page_bg"></view>
		<image :src="store_banner" class="bus_bg" mode="widthFix"></image>
		<view class="qualify_box bor mb20">
			<view class="qb_title">{{store_name}}</view>
			<!-- <view class="qb_right"> -->
				<!-- <image src="../../static/img/qualification.png" mode="widthFix"></image> -->
				<!-- <text>资质</text> -->
			<!-- </view> -->
		</view>
		<view class="bus_info_box bor mb20">
			<view class="bi_title">店铺地址：{{store_address}}</view>
			<view class="bi_contact">联系方式</view>
			<view class="bi_txt">电话：{{store_phone}}</view>
			<view class="bi_txt">邮箱：{{store_email}}</view>
		</view>
		<view class="bus_store_box bor" @tap="toDetail">
			<view class="bus_store_item" v-for="(item,index) in business" :key="index">
				<view class="bs_img"><image :src="item.goods_image_url" mode="widthFix"></image></view>
				<view class="bs_info">
					<view class="bsi_title">{{item.goods_name}}</view>
					<view class="bsi_info">{{item.goods_jingle}}</view>
					<view class="bsi_mark">
						￥{{item.goods_price}}
						<!-- <text>规格：{{item.type}}</text> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../api/api'
	export default{
		data(){
			return{
				store_name:'',
				store_address:'',
				store_banner:'../../static/img/business_info_bg.jpg',
				store_phone:'',
				store_email:'',
				goods_id:'0',
				business: []
			}
		},
		methods:{ 
			toDetail(){
				uni.navigateTo({
					url: "/pages/product_detail/product_detail?goods_id="+this.goods_id
				})
			},
			
		},
		onLoad(opt) {		
			var that = this;
			 api.get('index.php?act=store&op=store_info', {
				'video_id': opt.video_id
			 }).then(datas => { 
				 that.goods_id = datas.goods_info.goods_id;
			      that.business[0] = datas.goods_info;
				  console.log(that.business)
				  
			      that.store_address = datas.store_address;
			      that.store_banner = datas.store_banner_url;
			      that.store_email = datas.store_email;
			      that.store_name = datas.store_name;
			      that.store_phone = datas.store_phone;
			 })
		}
	}
</script>

<style scoped lang="scss">
	.business_view{
		width: 100%;
		.bus_bg{
			display: block;
			width: 100%;
		}
		.qualify_box{
			padding: 20upx;
			background: #fff;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #000;
			font-size: 26upx;
			.qb_title{
				width: 50%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.qb_right{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				image{
					display: block;
					width: 48upx;
					height: 41upx !important;
					margin-right: 10upx;
				}
			}
		}
		.bus_info_box{
			padding: 30upx 30upx 25upx 35upx;
			background: #fff;
			box-sizing: border-box;
			.bi_title,.bi_contact{
				color: #313131;
				font-size: 24upx;
				position: relative;
				&:before{
					content: "";
					width: 25upx;
					height: 10upx;
					background: #176de2;
					position: absolute;
					left: -35upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			.bi_contact{
				margin: 30upx 0 10upx;
			}
			.bi_txt{
				color: #313131;
				font-size: 24upx;
				margin-bottom: 5upx;
			}
		}
		.bus_store_box{
			background: #fff;
			.bus_store_item{
				padding: 25upx 20upx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				border-bottom: 1px solid #DFDFDF;
				&:last-child{
					border-bottom: 0;
				}
				.bs_img{
					width: 178upx;
					height: 193upx;
					border: 1px solid #DCDCDC;
					box-sizing: border-box;
					overflow: hidden;
					margin-right: 35upx;
					image{
						display: block;
						width: 100%;
						height: 100% !important;
					}
				}
				.bs_info{
					.bsi_title{
						color: #160c11;
						font-size: 22upx;
						margin: 20upx 0 15upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.bsi_info{
						color: #7d7d7d;
						font-size: 20upx;
						margin-bottom: 50upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.bsi_mark{
						color: #00001f;
						font-size: 24upx;
						text{
							color: #4d4d4d;
							font-size: 18upx;
							margin-left: 120upx;
						}
					}
				}
			}
		}
	}
</style>