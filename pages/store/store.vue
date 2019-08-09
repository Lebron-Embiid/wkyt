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
        // onLoad() {
        //     uni.showToast({title:'onload...',icon:'none'});
        //     if (this.hasLogin) {
        //         this.url = this.$wap_url + '?_key=' + uni.getStorageSync("access_token");
        //     } else {
        //         uni.navigateTo({
        //             url: '/pages/login/login',
        //         });
        //     }
        // },
        onShow() {  
			uni.startPullDownRefresh()
            // if (this.hasLogin) {
            if (uni.getStorageSync("access_token")) {
                this.url = config.wapUrl + 'index.html?uid=50&key=' + uni.getStorageSync("access_token");
				console.log(this.url)
             } else {
                uni.navigateTo({
                    url: '/pages/login/login',
                });
            }
        },		
			onPullDownRefresh() {
				var that = this;
				setTimeout(function () { 
					that.url = config.wapUrl + 'index.html?uid=50&key=' + uni.getStorageSync("access_token");
				console.log(that.url)
					uni.stopPullDownRefresh();
				}, 1000);
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
	// uni-web-view{
	// 	bottom: 40px;
	// }
	// .top_web{
	// 	position: fixed;
	// 	width: 100%;
	// 	height: calc(100% - 40px);
	// 	left: 0;
	// 	top: 0;
	// 	z-index: 10;
	// }
	// .web_view{
	// 	position: fixed;
	// 	width: 100%;
	// 	bottom: 40px !important;
	// }
</style>