<template>
	<view class="collect_view">
		<view class="page_bg"></view>
		<view class="collect_box">
			<view class="collect_item" v-for="(item,index) in collect_list" :key="index"  @click="toVideoDetail(item.v_id)">
				<view class="ci_title">{{item.content}}</view>
				<view class="ci_time">{{item.add_time}}</view>
				<!-- <image :src="item.url" class="ci_photo" mode="aspectFill"></image>
				<view class="ci_layer">
					<image src="../../static/img/play.png" mode="widthFix"></image>
					<text>{{item.num}}</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import formatDate from '../../api/util.js'
	import api from '../../api/api'
	export default{
		data(){
			return{
				total_count:1,
				curpage:1,
				collect_list: []
			}
		},
		methods:{				
			toVideoDetail: function(id){
					uni.navigateTo({
						url: "/pages/my_collect_detail/my_collect_detail?v_id="+id
					})
			},
			getCollectionList(){
				//TODO:分页处理
				api.get('index.php?act=video&op=CollectionList', {curpage:this.curpage}).then(datas => { 
					this.collect_list = datas.list; 
					this.total_count = datas.total_count; 
				})
			},
		},
		onLoad() {
			this.getCollectionList();
		},				
		onReachBottom() {
			var that = this;
			this.curpage = this.curpage + 1
			if(this.total_count < this.curpage){							
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
			setTimeout(function () {
			    that.getCollectionList();
				uni.hideLoading();
			}, 1000);
		},
	}
</script>

<style scoped lang="scss">
	.collect_view{
		width: 100%;
	}
	.collect_box{
		width: 100%;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		// flex-wrap: wrap;
		.collect_item{
			width: 100%;
			// width: 33%;
			// margin: 0 0.5% 5upx 0;
			margin-bottom: 15upx;
			background: #fff;
			padding: 15upx;
			box-sizing: border-box;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 26upx;
			&:nth-child(3n){
				margin-right: 0;
			}
			.ci_title{
				width: 60%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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