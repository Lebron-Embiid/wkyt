<template>
    <view class="store_view">
		<web-view class="web_view" :webview-styles="webviewStyles" :src="url"></web-view>
		<!-- <cover-view class="cover_box">
			<tabbar :selected="1"></tabbar>
		</cover-view> -->
    </view>
</template>

<script>
	import tabbar from '../../components/tabbar.vue'
    import config from '../../config'
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                url: '', 
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		components:{
			tabbar
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        methods: {}, 
		onLoad(opt){
			this.mobile = opt.mobile
			if (uni.getStorageSync("access_token")) {
			    this.url = config.wapUrl + 'tmpl/app_manager.html?mobile='+opt.mobile+'&key=' + uni.getStorageSync("access_token");
				console.log(this.url) 
			 } else {
			    uni.navigateTo({
			        url: '/pages/login/login',
			    });
			}
		},
		onPullDownRefresh() {
			var that = this; 
			that.url = config.wapUrl + 'tmpl/app_manager.html?mobile='+that.mobile+'&key=' + uni.getStorageSync("access_token");
			console.log(that.url) 
		}
	}
</script>

<style scoped lang="scss">
	.cover_box{
		height: 40px;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 100;
	}
	.store_view{
		width: 100%;
	} 
</style>