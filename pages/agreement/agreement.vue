<template>
    <view class="agreement_view">
		<view class="agree_title">{{title}}</view>
		<view class="agree_content">
			<block v-if="content!=''">
				<u-parse :content="content"></u-parse>
			</block>
		</view>
    </view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import api from '../../api/api'
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                article: '',
				title: '',
				content: ''
			}
        }, 
		components:{
			uParse
		},
        methods: {},
        onLoad() { 
			uni.request({
				url: api.config.baseURL+'index.php?act=ajax_return&op=article',
				method: 'GET',
				dataType: "json",
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: datas => {
					//成功
					 console.log(datas)
					 this.title = datas.data.article_info.title;
					 this.content = datas.data.article_info.content;
				}
			});
				// api.get('index.php?act=ajax_return&op=article', {}).then(datas => { 
				// 	 console.log(datas)
				// 	 this.title = datas.data.article_info.title;
				// 	 this.content = datas.data.article_info.content;
				// })
           },  
		}
</script>

<style scoped lang="scss">
	.agreement_view{
		padding: 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		.agree_title{
			text-align: center;
			margin-bottom: 30upx;
		}
		.agree_content{
			font-size: 24upx;
			image{
				display: block;
				max-width: 100% !important;
				margin: 0 auto;
			}
		}
	}
</style>