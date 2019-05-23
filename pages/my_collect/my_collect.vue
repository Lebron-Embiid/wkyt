<template>
	<view class="collect_view">
		<view class="page_bg"></view>
		<view class="collect_box">
			<view class="collect_item" v-for="(item,index) in collect_list" :key="index">
				<image :src="item.photo" class="ci_photo" mode="aspectFill"></image>
				<view class="ci_layer">
					<image src="../../static/img/play.png" mode="widthFix"></image>
					<text>{{item.num}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				collect_list: [
					{
						id: 1,
						photo: "../../static/img/collect_img1.jpg",
						num: "3.6w"
					},
					{
						id: 2,
						photo: "../../static/img/collect_img2.jpg",
						num: "3.6w"
					},
					{
						id: 3,
						photo: "../../static/img/collect_img3.jpg",
						num: "3.6w"
					},
					{
						id: 4,
						photo: "../../static/img/collect_img4.jpg",
						num: "3.6w"
					},
					{
						id: 5,
						photo: "../../static/img/collect_img5.jpg",
						num: "3.6w"
					},
					{
						id: 6,
						photo: "../../static/img/collect_img6.jpg",
						num: "3.6w"
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
	.collect_box{
		width: 100%;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.collect_item{
			width: 33%;
			margin: 0 0.5% 5upx 0;
			position: relative;
			&:nth-child(3n){
				margin-right: 0;
			}
			.ci_photo{
				display: block;
				width: 228upx;
				height: 287upx !important;
			}
			.ci_layer{
				position: absolute;
				width: 80%;
				left: 25upx;
				bottom: 15upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image{
					display: block;
					width: 25upx;
					height: 28upx !important;
					margin-right: 10upx;
				}
				text{
					display: block;
					color: #fff;
					font-size: 24upx;
				}
			}
		}
	}
</style>