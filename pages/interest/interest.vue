<template>
	<view class="interest_view">
		<view class="page_bg"></view>
		<view class="inter_title">欢迎来到旺客-易推</view>
		<view class="inter_info">完善信息，个性化你的内容</view>
		<view class="interest_box">
			<view class="interest_item" @tap="selectInterest(index,item.id)" v-for="(item,index) in interest_list" :key="index">
				<view class="in_img">
					<image :src="item.img" class="in_photo" mode="widthFix"></image>
					<block v-if="item.select == 1">
						<image src="../../static/img/select.png" class="in_select" mode="widthFix"></image>
					</block>
				</view>
				<view class="in_title">{{item.name}}</view>
			</view>
		</view>
		<view class="toNextPage" @tap="toNext"><button type="primary">至少关注3个({{num}}/3)</button></view>
	</view>
</template>

<script>
	import api from '../../api/api'
	export default{
		data(){
			return{
				num: 0,
				birthday:0,
				member_label:'',
				label: [],
				sex:0,
				interest_list: [
// 					{
// 						id: 1,
// 						img: "../../static/img/interest_img1.png",
// 						name: "时尚穿搭",
// 						select: 0
// 					}
				],
				age: 0,
				address: "",
				province_id: "",
				city_id: "",
				district_id: ""
			}
		},
		methods:{
			selectInterest: function(e){
				if(this.interest_list[e].select == 0){
					this.member_label = '';
					this.interest_list[e].select = 1;
					this.num++;
					this.label.push(this.interest_list[e].id);
				}else{
					this.interest_list[e].select = 0;
					this.num--;
					for(let i=0; i<this.label.length; i++) {
						this.member_label = '';
						if(this.label[i] == this.interest_list[e].id) {
							this.label.splice(i, 1);
							break;
						}
					}
				}
				console.log(this.member_label);
			},
			toNext: function(e){ 
				for(let i=0; i<this.label.length; i++) {
					this.member_label += this.label[i]+',';
				}
				
				if(parseInt(this.num) < 3){
					uni.showToast({
						title: "至少关注3个兴趣！",
						duration: 1000,
						icon: 'none'
					})
					return;
				}			
 				 api.post('index.php?act=member&op=hot', {
					 'member_label':this.member_label,
					 'sex':this.sex,
					 'age':this.age,
					 'address':this.address,
					 'province_id':this.province_id,
					 'city_id':this.city_id,
					 'area_id':this.district_id, 
					 }).then(datas => {   					 
					 uni.reLaunch({
					 	url: "/pages/index/index",
					 	animationType: 'pop-in',
					 	animationDuration: 500
					 })
				 })
			},
		},
		onLoad(opt) {
			// console.log(opt);
			var that = this;
			that.sex = opt.sex;
			that.birthday = opt.birth;
			that.age = opt.age;
			that.address = opt.address;
			that.province_id = opt.province_id;
			that.city_id = opt.city_id;
			that.district_id = opt.district_id;
			console.log(that.age,that.address,that.province_id,that.city_id,that.district_id);
			 api.get('index.php?act=video&op=video_tag', {}).then(datas => {  
				  // that.interest_list = datas.list;
				  var interest = [];
				  for(let i in datas.list){
					  var item = datas.list[i];
					   interest.push({
						  id: item.id,
						  img: item.img,
						  name: item.name,
						  select: 0
					  })
				  }
				 that.interest_list = interest;
				 console.log(that.interest_list)
			 })
			
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