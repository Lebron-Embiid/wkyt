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
						<view>2.用户观看广告上限后可每天在商品界面收取1活力值；</view>
					</view>
				</view>
				<!-- <view class="ic_bottom">累计收入(元){{income}} <navigator url="">马上去赚钱 &gt;</navigator></view> -->
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
				<view class="income_item" v-for="(item,index) in withdraw_list" :key="index">
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
	import api from '../../api/api';
	import utils from '../../utils/utils';
	export default{
		data(){
			return{
				money: "0.00",
				income: "0.00",
				total_page_count:1,
				cash_count:1,
				navbar:[{name:"收益记录"},{name:'提现'}],
				currentTab:0,
				income_list:[],
				withdraw_list:[],
				income_page_number:1,
				withdraw_page_number:1
			}
		},
		methods:{
			navbarTap: function(e){
				this.currentTab = e;	
				this.income_page_number = 1;
				this.withdraw_page_number = 1;
				if(this.currentTab == 0){
					//获取收益列表
					this.getRewardList()
				}else{
					//获取提现列表
					this.getWithdrawList()					
				}
			},
			getRewardList(){			
				console.log(this.income_page_number)
				//TODO:分页处理
				api.get('index.php?act=predeposit&op=pd_list', {'curpage': this.income_page_number}).then(datas => {
					this.money = datas.available_predeposit
					this.income = datas.total_reward_amount
					this.total_page_count = datas.page.total_page_count
					for (let key in datas.list) {
						// console.log(datas.list[key])
						this.income_list.push({
							time: utils.formatTime(datas.list[key].lg_add_time, 'Y-m-d'),
							info: datas.list[key].lg_desc,
							num: datas.list[key].lg_av_amount
						})
					}
				})
			},
			getWithdrawList(){				 
				//TODO:分页处理
				api.get('index.php?act=predeposit&op=pd_cash_list', {'curpage': this.withdraw_page_number}).then(datas => {
					this.cash_count = datas.cash_count 
					for (let key in datas.cash_list) {
						// console.log(datas.cash_list[key])
						this.withdraw_list.push({
							time: utils.formatTime(datas.cash_list[key].pdc_add_time, 'Y-m-d'),
							info: datas.cash_list[key].info,
							num: datas.cash_list[key].pdc_amount
						})
					}
				})
			}
		},
		onLoad() {
			//获取收益列表
			this.getRewardList()
			//获取提现列表
			// this.getWithdrawList()
		},		
		onReachBottom() { 	
			var that = this;
			if(that.currentTab == 0){
				var page = that.income_page_number + 1
				if(that.total_page_count < page){							
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
				 that.income_page_number = that.income_page_number + 1
				setTimeout(function () {
					   that.getRewardList(); 
					uni.hideLoading();
				}, 1000);
			}else{
				var page_count = that.withdraw_page_number + 1
				console.log(that.cash_count)
				console.log(page_count)
				if(that.cash_count < page_count){							
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
				 that.withdraw_page_number = that.withdraw_page_number + 1
				setTimeout(function () {
					that.getWithdrawList(); 
					uni.hideLoading();
				}, 1000);
			}
		},

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