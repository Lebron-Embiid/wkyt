<template>
    <view class="store_view">
         <video id="video" :src="url" :loop="play" :show-fullscreen-btn="progress" :autoplay="autoplay" :show-center-play-btn="play" :enable-progress-gesture="progress" direction="0" controls></video>
    </view>
</template>

<script>
	import api from '../../api/api'
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
				play: true,
				controls: false,
				autoplay: true,
				progress: false, 
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
				 api.get('index.php?act=video&op=video_detail', {
					'v_id': opt.v_id
				 }).then(datas => {
					 this.url = datas
					  console.log(datas)
				 })
				console.log(opt)
			},
		}
</script>

<style scoped lang="scss">
	#video{
		display: block;
		// width: 100vw;
		// height: 100vh;
		width: 100%;
		height: calc(100% - 28px);
		position: absolute;
		left: 0;
		top: var(--status-bar-height);
	}
</style>