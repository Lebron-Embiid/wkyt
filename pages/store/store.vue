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
				console.log(config.wapUrl)
				console.log(uni.getStorageSync("access_token"))
            // if (this.hasLogin) {
            if (true) {
                this.url = config.wapUrl + 'index.html?uid=50&key=' + uni.getStorageSync("access_token");
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