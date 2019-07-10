<template>
    <view class="store_view">
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
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
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        methods: {}, 
		onLoad(opt) {		
			var that = this;
			that.goods_id = opt.goods_id;
		},
        onShow() {  
			console.log(uni.getStorageSync("access_token"))
            if (uni.getStorageSync("access_token")) {
			     this.url = config.wapUrl + 'tmpl/product_detail.html?goods_id='+this.goods_id+'&key=' + uni.getStorageSync("access_token"); 
				 console.log(this.url)
            } else {
                uni.navigateTo({
                    url: '/pages/login/login',
                });
            }
        }
    }
</script>

<style scoped lang="scss">
</style>