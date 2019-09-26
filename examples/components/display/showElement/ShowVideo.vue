<style lang="scss" scoped>
.srp-video {
    .video-js {
        width: 100%;
        height: 100%;
    }
}
</style>
<template>
    <div class="srp-video" id="videoWrapper">
        <video 
            id='video' 
            class='video-js vjs-big-play-centered'
            ref="videoPlayer"
            controls 
            preload='auto' 
            :width="config.resetWidth" 
            :height="config.resetHeight"
            data-setup='{}'
        >
            <source :src="config.videoUrl" type='video/mp4'>
            <p class='vjs-no-js'>
              To view this video please enable JavaScript, and consider upgrading to a web browser that
              <a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5 video</a>
            </p>
        </video>
    </div>
</template>
<script>
    import videojs from 'video.js';
    import 'video.js/dist/video-js.css';
    import 'videojs-contrib-hls';
    export default {
        props: {
            config: {
                type: Object,
            },
        },
        data() {
            return {
            }
        },
        created() {
            
        },
        mounted() {       
            var player = videojs('video',{
            }, function onPlayerReady(){
                setTimeout(() => {   //延时确保能监听到视频源错误
                    var mediaError = this.error();
                    if(mediaError!=null && mediaError.code){
                        _this.isError=true
                        Dialog.alert({
                            message: '啊哦，播放出错了。<br>请刷新重试，如无法播放建议您观看其它内容。',
                            confirmButtonText:'确定'
                        }).then(() => {
                            _this.goback();
                        });
                    }
                },1000);
            });
            if (!this.config.settingUrl) {
                this.showSettingPanel = true;
            }
        },
        beforeDestroy() {
            const videodom = this.$refs.videoPlayer;
            videojs(videodom).dispose();
        },
        methods: {
            changeSet(paramsArr) {
                videojs('video',{},function() {
                    let myVideo = videojs('video');
                    myVideo.src(paramsArr[0]);
                    myVideo.load(paramsArr[0]);  //使video重新加载 
                })
            }
        }
    }
</script>
