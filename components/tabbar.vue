<template>
	<view class="tabbar_view">
		<view class="tabbar_list">
			<view class="tabbar_item" :class="[selected == index?'active':'']" v-for="(item,index) in tabbar" @tap="toSwitchTab(item.path)" :key="index">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabbar: [
					{
						name: '首页',
						path: '/pages/index/index'
					},{
						name: '商城',
						path: '/pages/store/store'
					},{
						name: '收益',
						path: '/pages/income/income'
					},{
						name: '我的',
						path: '/pages/person/person'
					}
				]
			}
		},
		props:{
			selected:{
				type: Number,
				default: 0
			}
		},
		methods:{
			toSwitchTab(path){
				console.log(path);
				uni.reLaunch({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar_list{
		position: fixed;
		width: 100%;
		height: 40px;
		background: #fff;
		border-top: 1px solid #ddd;
		box-sizing: border-box;
		left: 0;
		bottom: 0;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&.opacity{
			background: rgba(0,0,0,0);
		}
		.tabbar_item{
			width: 25%;
			font-weight: bold;
			text-align: center;
			color: #1e1e1e;
			font-size: 36upx;
			&.active{
				color: #257cf2;
			}
		}
		&.opacity{
			.tabbar_item{
				color: #fff;
			}
		}
	}
</style>
