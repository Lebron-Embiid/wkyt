<template>
	<view class="birth_view">
		<view class="page_bg"></view>
		<view class="birth_title">欢迎来到旺客-易推</view>
		<view class="birth_info">完善信息，个性化你的内容</view>
		<view class="birth_sex">
			<radio-group @change="radioChange">
				<label class="radio" v-for="(item, index) in sex_items" :key="item.value">
					<view class="sex_box">
						<radio :value="item.value" :checked="index === current" />
						<image :src="item.icon" class="sex_img" mode="widthFix"></image>
						<block v-if="index == current">
							<image src="../../static/img/select.png" class="select_img" mode="widthFix"></image>
						</block>
					</view>
					<view class="sex_name">{{item.name}}</view>
				</label>
			</radio-group>
		</view>
		<view class="select_birth">
			<view class="sb_till"><text :class="[show == true?'active':'']">生日当天有优惠哦!</text></view>
			<view class="sb_box">
				<picker class="sb_left" @change="bindDateChange" mode="date" :value="date" :start="startDate" :end="endDate">
					<view>选择生日：{{date}}</view>
				</picker>
				<view class="sb_right">
					<picker mode="selector" :range="looks" @change="bindLook">
						{{looks[idx]}}<image src="../../static/img/three.png" mode="widthFix"></image>
					</picker>
				</view>
			</view>
		</view>
		<view class="toNextPage" @tap="toNext"><button type="primary">下一步</button></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				sex_items: [{
                    value: '0',
                    name: '男',
					icon: '../../static/img/boy.png'
                },{
                    value: '1',
					icon: '../../static/img/girl.png',
                    name: '女'
                }],
				current: 0,
				date: "",
				show: false,
				looks: ["仅自己可见","全部可见"],
				idx: 0
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods:{
			radioChange(e){
				for (let i = 0; i < this.sex_items.length; i++) {
					if (this.sex_items[i].value === e.target.value) {
						this.current = i;
						break;
					}
				}
				console.log(this.current);
			},
			bindDateChange: function(e) {
				this.date = e.target.value;
				this.show = true;
				console.log(this.date)
			},
			bindLook: function(e){
				this.idx = e.target.value;
			},
			toNext: function(e){
				var that = this;
				if(that.date == ""){
					uni.showToast({
						title: "请填写生日！",
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				uni.reLaunch({
					url: "/pages/interest/interest?sex="+that.current+"&birth="+that.date,
					animationType: 'pop-in',
					animationDuration: 500
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type == 'start') {
					year = year - 60;
				} else if (type == 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.birth_view{
		width: 100%;
		padding: 50upx 40upx 20upx;
		box-sizing: border-box;
		.birth_title{
			color: #000;
			font-size: 40upx;
			text-align: center;
			margin-bottom: 10upx;
		}
		.birth_info{
			color: #8a8a8a;
			font-size: 24upx;
			text-align: center;
			margin-bottom: 100upx;
		}
		.birth_sex{
			radio-group{
				display: flex;
				justify-content: center;
				align-items: flex-start;
				label{
					margin-right: 120upx;
					&:last-child{
						margin-right: 0;
					}
				}
			}
			.sex_box{
				position: relative;
				radio{
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
					opacity: 0;
				}
				.sex_img{
					display: block;
					width: 106upx;
					height: 106upx !important;
					margin-bottom: 20upx;
				}
				.select_img{
					position: absolute;
					width: 29upx;
					height: 29upx !important;
					left: 50%;
					bottom: -10upx;
					transform: translateX(-50%);
					z-index: 3;
				}
			}
			.sex_name{
				color: #000;
				font-size: 28upx;
				text-align: center;
			}
		}
		.select_birth{
			margin-top: 100upx;
			.sb_till{
				text-align: right;
				margin-bottom: 20upx;
				text{
					display: inline-block;
					padding: 10upx 25upx 12upx;
					border-radius: 50upx;
					background: #257cf2;
					color: #fff;
					font-size: 22upx;
					position: relative;
					opacity: 0;
					transition: opacity .5s linear;
					&:after{
						content: "";
						width: 0;
						height: 0;
						border: 15upx solid transparent;
						border-top: 15upx solid #257cf2;
						position: absolute;
						right: 20upx;
						bottom: -25upx;
					}
					&.active{
						opacity: 1;
					}
				}
			}
			.sb_box{
				background: #fff;
				padding: 20upx;
				box-sizing: border-box;
				border: 1px solid #E6E6E7;
				color: #000;
				font-size: 26upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.sb_left{
					width: 60%;
					font-size: 24upx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
				.sb_right{
					color: #9e9e9e;
					font-size: 20upx;
					image{
						display: inline-block;
						width: 28upx;
						height: 15upx !important;
						margin-left: 20upx;
					}
				}
			}
		}
	}
</style>
