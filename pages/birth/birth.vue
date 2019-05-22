<template>
	<view class="birth_box">
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
			<view class="sb_till"><text>生日当天有优惠哦!</text></view>
			<view class="sb_box">
				<view class="sb_left">选择生日：<text>2019-03-14</text></view>
				<view class="sb_right">仅自己可见<image src="../../static/img/three.png" mode="widthFix"></image></view>
			</view>
		</view>
		<view class="toNextPage"><button type="primary">下一步</button></view>
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
				current: 0
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
			}
		},
		onLoad() {
			
		}
	}
</script>

<style scoped lang="scss">
	.birth_box{
		width: 100%;
		padding: 130upx 40upx 20upx;
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
					text{
						font-size: 24upx;
					}
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
		.toNextPage{
			padding: 0 60upx;
			margin-top: 130upx;
			button{
				height: 85upx;
				line-height: 85upx;
				color: #fff;
				font-size: 30upx;
				background: #257cf2;
				border-radius: 5upx;
				&:after{
					border: 0;
				}
			}
		}
	}
</style>
