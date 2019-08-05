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
				order_state:20,
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        methods: {},
        onShow() { 
             this.url = config.wapUrl + '/tmpl/member/order_list.html?order_state='+this.order_state+'&key=' + uni.getStorageSync("access_token"); 
					console.log(this.url)    
        },
		 onLoad(opt) {
			console.log(opt)
			console.log(uni.getStorageSync("access_token"))
			 this.order_state = opt.order_state
             this.url = config.wapUrl + '/tmpl/member/order_list.html?order_state='+opt.order_state+'&key=' + uni.getStorageSync("access_token"); 
		 }
    }
</script>

<style scoped lang="scss">
</style>