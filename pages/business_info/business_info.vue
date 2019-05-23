<template>
	<view class="business_view">
		<view class="page_bg"></view>
		<image src="../../static/img/business_info_bg.jpg" class="bus_bg" mode="widthFix"></image>
		<view class="qualify_box bor mb20">
			<view class="qb_title">徳盟互联</view>
			<view class="qb_right">
				<image src="../../static/img/qualification.png" mode="widthFix"></image>
				<text>资质</text>
			</view>
		</view>
		<view class="bus_info_box bor mb20">
			<view class="bi_title">店铺地址：深圳市龙岗区龙岗路10号硅谷动力电子商务港6楼</view>
			<view class="bi_contact">联系方式</view>
			<view class="bi_txt">电话：18822840016</view>
			<view class="bi_txt">邮箱：sa@demenk.com</view>
		</view>
		<view class="bus_store_box bor">
			<view class="bus_store_item" v-for="(item,index) in business" :key="index">
				<view class="bs_img"><image :src="item.src" mode="widthFix"></image></view>
				<view class="bs_info">
					<view class="bsi_title">{{item.title}}</view>
					<view class="bsi_info">{{item.info}}</view>
					<view class="bsi_mark">
						￥{{item.price}}
						<text>规格：{{item.type}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				business: [
					{
						id: 1,
						src: "../../static/img/store_img.jpg",
						title: "艾璐卡-山羊奶悦颜清透洁面乳",
						info: "清洁皮肤，长效保湿滋润",
						price: "98",
						type: "3.5g"
					}
				]
			}
		},
		methods:{
			
		},
		onLoad() {
			
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