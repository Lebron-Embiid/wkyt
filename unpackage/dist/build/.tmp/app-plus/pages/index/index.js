(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"3b22":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},i=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return i})},4941:function(e,t,o){"use strict";o.r(t);var n=o("3b22"),i=o("b372");for(var a in i)"default"!==a&&function(e){o.d(t,e,function(){return i[e]})}(a);o("f649");var s=o("2877"),c=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,"01aa92e0",null);t["default"]=c.exports},5464:function(e,t,o){},"8c46":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(o("61f8"));function i(e){return e&&e.__esModule?e:{default:e}}e.createCanvasContext("firstCanvas");var a,s={data:function(){return{video_id:0,url:"",tag_img:"",poster_img:"http://wkyt.demenk.com/wap/app/poster.jpg",controls:!1,autoplay:!0,progress:!1,member_watch:100,member_video:100,play:!0,title:"20/16",avatar:"",collect:"0",love:"0",comment:"0",share:"0",type:"新惠设计主流款...",info:"高品质制造平台,三体系认证,十环认证 平台,三体系认证十环认证平台,三体系认证,十环认证高品质制造",red_title:"奔驰汽车",red_info:"领导时代，驾驭未来",money:0,red_show:!1,money_show:!1,percent:0,subject:[],current:0,pages:0,page:1,icons:"",subjectList:[],videoContext:"",isPlay:1,isOne:0,wapUrl:"",status:"",num:0,video_num:0}},methods:{preventTouchMove:function(){},startPause:function(){console.log("tap"," at pages\\index\\index.vue:95"),1==this.isPlay?(this.videoContext.pause(),this.isPlay=0):(this.videoContext.play(),this.isPlay=1)},open_red:function(){var t=this;1==this.num?(this.red_title="",this.red_info="",e.navigateTo({url:"/pages/awards/awards"})):n.default.post("index.php?act=video&op=reward",{video_id:this.video_id}).then(function(e){t.money=e.amount,t.red_title="",t.red_info=e.message,t.red_show=!1,t.money_show=!0})},close_money:function(){this.money_show=!1,setTimeout(function(){e.showModal({title:"提示",content:"前往大转盘抽奖？",success:function(t){t.confirm&&e.navigateTo({url:"/pages/awards/awards"})},fail:function(e){console.log(e," at pages\\index\\index.vue:140")}})},500)},toAvatar:function(){e.navigateTo({url:"/pages/business_info/business_info?video_id="+this.video_id})},toCollect:function(){var e=this;n.default.get("index.php?act=video&op=videoCollection",{video_id:this.video_id}).then(function(t){0==t.code&&(e.collect=t.v_star_count)})},toLove:function(){var e=this;n.default.get("index.php?act=video&op=fabulous",{video_id:this.video_id}).then(function(t){0==t.code&&(e.love=t.v_like_count)})},toShare:function(){var t=this;n.default.get("index.php?act=video&op=forward",{video_id:this.video_id}).then(function(o){0==o.code&&e.showModal({title:"提示",content:"分享需要下载此视频，确认下载？",success:function(o){if(o.confirm){e.showLoading({title:"下载中"});var n=e.downloadFile({url:t.url,success:function(t){200===t.statusCode&&(console.log(t.tempFilePath," at pages\\index\\index.vue:189"),e.saveVideoToPhotosAlbum({filePath:t.tempFilePath,success:function(){e.hideLoading(),e.showToast({title:"视频已保存到相册，请到其他平台分享",icon:"none"})}}))},fail:function(t){e.showToast({title:t.errMsg,icon:"none"})}});n.onProgressUpdate(function(t){e.showToast({title:"下载中: "+t.progress+"%",icon:"none"}),console.log("下载进度"+t.progress," at pages\\index\\index.vue:218"),100==t.progress&&e.hideLoading()})}},fail:function(e){console.log(e," at pages\\index\\index.vue:231")}})})},toComment:function(){console.log(this.comment," at pages\\index\\index.vue:239"),console.log(this.video_id," at pages\\index\\index.vue:240"),e.navigateTo({url:"/pages/comment/comment?comment_count="+this.comment+"&video_id="+this.video_id})},touchstart:function(e){a=e.changedTouches[0]},touchmove:function(e){},touchend:function(e){this.getDirect(a,e.changedTouches[0])},touchcancel:function(e){this.getDirect(a,e.changedTouches[0])},getDirect:function(e,t){var o=t.pageX-e.pageX,n=t.pageY-e.pageY;Math.abs(o)>Math.abs(n)&&o>0?console.log("right"," at pages\\index\\index.vue:267"):Math.abs(o)>Math.abs(n)&&o<0?console.log("left"," at pages\\index\\index.vue:270"):Math.abs(n)>Math.abs(o)&&n>0?(console.log("bottom"," at pages\\index\\index.vue:273"),this.pre()):Math.abs(n)>Math.abs(o)&&n<0&&(console.log("top"," at pages\\index\\index.vue:277"),this.next())},loadData:function(){var t=this;e.showLoading({title:"视频加载中..."}),t.video_num++,n.default.post("index.php?act=video&op=getOne",{video_num:t.video_num}).then(function(o){console.log(o.v_id," at pages\\index\\index.vue:289"),t.video_id=o.v_id,t.url=o.url,t.avatar=o.store_logo,t.tag_img=o.tag_img,t.type=o.v_title,t.info=o.v_desc,t.collect=o.v_star_count,t.love=o.v_like_count,t.comment=o.v_comment_count,t.share=o.v_forward_count,t.title=o.member_watch+"/"+o.member_video,t.status=o.status,t.num=o.num,1==t.num&&(t.video_num=0),console.log(t.avatar," at pages\\index\\index.vue:306"),e.hideLoading()})},changeSubject:function(){this.loadData()},timeupdate:function(e){var t=e.detail.currentTime,o=e.detail.duration,n=Math.round(t/o*1e4)/100;this.percent=n},ended:function(){2!=this.num&&0==this.isOne&&(this.red_show=!0,this.isOne=1,this.videoContext.pause())},toResetPlay:function(){this.videoContext.play(),this.money_show=!1},toNextPlay:function(){this.next()},pre:function(){var e=this;e.changeSubject(e.current-1),e.red_show=!1,e.money_show=!1,e.isPlay=1,e.isOne=0},next:function(){var e=this;e.changeSubject(e.current+1),e.red_show=!1,e.money_show=!1,e.isPlay=1,e.isOne=0}},onLoad:function(){var t=this;t.wapUrl=n.default.config.wapUrl,console.log(t.wapUrl," at pages\\index\\index.vue:371"),t.videoContext=e.createVideoContext("myVideo"),t.loadData()},onShow:function(){this.videoContext.play(),this.isPlay=1},onHide:function(){this.isPlay=0,this.videoContext.pause()},onPullDownRefresh:function(){},onReachBottom:function(){},onPageScroll:function(e){}};t.default=s}).call(this,o("6e42")["default"])},b372:function(e,t,o){"use strict";o.r(t);var n=o("8c46"),i=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);t["default"]=i.a},f649:function(e,t,o){"use strict";var n=o("5464"),i=o.n(n);i.a}},[["1891","common/runtime","common/vendor"]]]);