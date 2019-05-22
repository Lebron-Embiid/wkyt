<template>
	<view class="income_view">
		<view class="income_card_box">
			<view class="income_card">
				<view class="ic_top">
					<view class="it_left">
						<view class="itl_title">当前余额<image src="../../static/img/mark.png" mode="widthFix"></image></view>
						<view class="itl_money">{{money}}</view>
					</view>
					<view class="it_right">
						<view>1.当月广告基础收益为0.08元一条，随市场变化及商家收益升涨；</view>
						<view>2.用户观看广告上限后可每天在商品界面收取20活力值；</view>
					</view>
				</view>
				<view class="ic_bottom">累计收入(元){{income}} <navigator url="">马上去赚钱 &gt;</navigator></view>
			</view>
		</view>
		<view class="income_content">
			<view class="income_nav">
				<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
			</view>
			<!-- 收益记录 -->
			<view class="income_list" v-show="currentTab == 0">
				<view class="income_item" v-for="(item,index) in income_list" :key="index">
					<view class="i_left">
						<image src="../../static/img/clock.png" mode=""></image>
						<view class="i_word">
							<view class="iw_time">{{item.time}}</view>
							<view class="iw_info">{{item.info}}</view>
						</view>
					</view>
					<view class="i_num">{{item.num}}</view>
				</view>
			</view>
			<!-- 提现 -->
			<view class="income_list" v-show="currentTab == 1">
				<view class="income_item" v-for="(item,index) in income_list" :key="index">
					<view class="i_left">
						<image src="../../static/img/clock.png" mode=""></image>
						<view class="i_word">
							<view class="iw_time">{{item.time}}</view>
							<view class="iw_info">{{item.info}}</view>
						</view>
					</view>
					<view class="i_num">{{item.num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				money: "268.09",
				income: "333.09",
				navbar:[{name:"收益记录"},{name:"提现"}],
				currentTab:0,
				income_list:[
					{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					},{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					},{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					},{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					},{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					},{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					},{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					},{
						time: "2019-03-17",
						info: "查看xxx的广告",
						num: "+2.08"
					}
				]
			}
		},
		methods:{
			navbarTap: function(e){
				this.currentTab = e;
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.income_view{
		width: 100%;
	}
	.income_card_box{
		overflow: hidden;
		padding: 40upx 20upx 70upx;
		box-sizing: border-box;
		.income_card{
			background: url(../../static/img/income_bg.png) center center no-repeat;
			background-size: 100% 100%;
			padding: 20upx 20upx 30upx 25upx;
			box-sizing: border-box;
			border-radius: 5upx;
			box-shadow: 0 0 5upx #C2E1FE;
			color: #fff;
			font-size: 20upx;
			.ic_top{
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				color: #b7ddff;
				font-size: 26upx;
				margin-bottom: 30upx;
				.it_left{
					width: 35%;
					image{
						display: inline-block;
						vertical-align: middle;
						margin: 0 0 8upx 8upx;
						width: 23upx;
						height: 23upx !important;
					}
					.itl_money{
						color: #fff;
						font-size: 40upx;
					}
				}
				.it_right{
					color: #fff;
					font-size: 20upx;
					view{
						margin-bottom: 10upx;
					}
				}
			}
			.ic_bottom{
				color: #b7ddff;
				font-size: 24upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
	.income_content{
		overflow: hidden;
		background: #f3f3f3;
		padding-bottom: 10upx;
		.income_nav{
			margin-bottom: 20upx;
			color: #414141;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid #D5D5D5;
			view{
				width: 35%;
				text-align: center;
				padding: 20upx 0;
				position: relative;
				&:first-child{
					margin-right: 5%;
				}
				&.active:after{
					content: "";
					position: absolute;
					left: 0;
					bottom: -1px;
					width: 100%;
					height: 1px;
					background: #399FFA;
				}
			}
		}
		.income_list{
			.income_item{
				background: #fff;
				padding: 20upx 25upx;
				margin-bottom: 10upx;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.i_left{
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					color: #626262;
					font-size: 22upx;
					image{
						display: inline-block;
						width: 33upx;
						height: 33upx !important;
						margin-right: 15upx;
					}
					.iw_info{
						color: #484848;
						font-size: 24upx;
						margin-top: 5upx;
					}
				}
				.i_num{
					color: #cc1515;
					font-size: 24upx;
					margin-top: 10upx;
				}
			}
		}
	}
</style>