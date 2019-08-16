<template> 
		 
  </template>

<script>
    import api from '../../api/api'
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mInput from '../../components/m-input.vue'

    export default {
        data() {
            return { 
            }
        }, 
        onLoad() {
			uni.reLaunch({
				url: "/pages/person/person"
			})  
        },
    }
</script>

