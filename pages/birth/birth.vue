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
				<picker style="width: 100%;" @change="bindDateChange" mode="date" :value="date" :start="startDate" :end="endDate">
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view class="sb_left" style="width: 30%;">选择生日：</view>
						<view class="sb_right" style="width: 60%;display: flex;justify-content: flex-end;align-items: center;">
							{{dateText}}
							<image src="../../static/img/three.png" mode="widthFix"></image>
							<!-- <picker mode="selector" :range="looks" @change="bindLook">
								{{looks[idx]}}<image src="../../static/img/three.png" mode="widthFix"></image>
							</picker> -->
						</view>
					</view>
				</picker>
			</view>
			<view class="sb_box" style="margin-top: 20upx;">
				<view class="sb_left" style="width: 30%;">选择地区：</view>
				<view class="sb_right" style="width: 60%;">
					<w-picker
						mode="region" 
						:defaultVal="cityPickerValueDefault" 
						@confirm="onConfirm" 
						ref="region" 
						:themeColor="themeColor" 
					></w-picker>
					<view class="acc_right" style="display: flex;justify-content: flex-end;align-items: center;" @tap="toShowRegion">
						{{addressText}}<image src="../../static/img/three.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="toNextPage" @tap="toNext"><button type="primary">下一步</button></view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import api from '../../api/api'
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
				birth_num: 0,
				dateText: "请选择",
				show: false,
				looks: ["仅自己可见","全部可见"],
				idx: 0,
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#007AFF',
				addressText: '请选择',
				province_id: "",
				city_id: "",
				district_id: "",
			}
		},
		components:{
			wPicker
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
				let now_year = new Date().getFullYear();
				this.date = e.target.value;
				this.birth_num = now_year - parseInt(this.date.substring(0,4));
				console.log(this.birth_num);
				this.dateText = this.date;
				this.show = true;
				console.log(this.date)
			},
			bindLook: function(e){
				this.idx = e.target.value;
			},
			toNext: function(e){
				var that = this;
				if(that.date == "" || that.dateText == "请选择"){
					uni.showToast({
						title: "请填写生日！",
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				if(that.addressText == "请选择"){
					uni.showToast({
						title: "请填写地区！",
						duration: 1000,
						icon: 'none'
					})
					return;
				}
				uni.reLaunch({
					url: "/pages/interest/interest?sex="+that.current+"&birth="+that.date+"&address="+that.addressText+"&province_id="+that.province_id+"&city_id="+that.city_id+"&district_id="+that.district_id+"&age="+that.birth_num,
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
					year = year - 100;
				} else if (type == 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			toShowRegion(e){
				this.$refs.region.show();
			},
			onConfirm(e){
				// console.log(e);
				var that = this;
				that.cityPickerValueDefault = e.defaultVal;
				that.$refs.region.pickVal = e.defaultVal;
				that.addressText = e.checkArr[0]+'-'+e.checkArr[1]+'-'+e.checkArr[2];
				that.province_id = e.checkValue[0];
				that.city_id = e.checkValue[1];
				that.district_id = e.checkValue[2];
				console.log(this.addressText,that.province_id,that.city_id,that.district_id);
			}
		},
		onLoad(opt) {
			api.get('index.php?act=login&op=address_list', {}).then(datas => {
				console.log(datas)
			})
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
