<style scoped lang="scss">
.slide-pic{
    .default-slidePic{
        .slide-pic-item{
            position: relative;
            & > div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #fff;
                & > div {
                    display: block;
                }
                & > button {
                    box-sizing: content-box;
                    padding: 0;
                    width:80px;
                    height:30px;
                    &:hover {
                        opacity: 0.8;
                    }
                    & > span {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        & > p {
                            line-height: 30px;
                            width: 100%;
                            height: 100%;
                        }
                        & > a {
                            width: 100%;
                            height: 100%;
                            color: #fff;
                        }
                    }
                    
                }
                
            }
            img{
                width: 100%;
                height: 100%;
            }
        }        
    }
}
</style>

<template>
<div class="slide-pic">
    <Carousel
        ref="carousel"
        class="default-slidePic"
        :style="config.eleStyle"
        v-model="slidePic.initIndex"
        :height="config.setHeight"
        :autoplay="config.autoplay"
        :autoplay-speed="config.autoplaySpeed"
        :dots="config.dots"
        :radius-dot="config.radiusDot"
        :trigger="config.trigger"
        :arrow="config.arrow"
    >
        <CarouselItem v-for="(item,index) in config.slidePicList" :key="index" class="slide-pic-item">
            <img :src="item.absoluteUrl">
            <div>
                <div v-if="item.ifShowTitle" class="title" v-html="item.title"></div>
                <Button v-if="item.ifShowButton" :style="item.eleStyle" type="text">
                    <a v-if="item.linkType=='站外'" :href="item.outsideLink" target=_blank>
                        {{ item.buttonText }}
                    </a>
                    <p v-if="item.linkType=='站内'" @click.stop="changePage(item.insideLink)">
                        {{ item.buttonText }}
                    </p>
                    <p v-if="!item.linkType">
                        {{ item.buttonText }}
                    </p>
                </Button>    
            </div>
        </CarouselItem>
    </Carousel>
</div>
</template>

<script>
export default {
    props: ['config','publishWeb'],
    data() {
        return{
            slidePic:{
                initIndex:0
            }, 
        }
    },
    mounted() {
        
    },
    computed: {
        curViewId() {
            return this.$route.query.viewId;
        }
    },
    methods: {
        changePage(link) {
            const vm = this;
            if (link) { //是否有链接的页面，有则跳转，无则提示
                if (link != this.curViewId) {
                    if(this.publishWeb){
                        this.$store.dispatch('setPublishWebViewId', link);
                        this.$router.push({ path:'/publish/' + this.$route.params.namespace});
                    }else{
                        this.$router.push({ path:'/app/display', query: { viewId: link } });
                    }
                }
            }
        }
    },
    beforeDestroy() {

    },
    created() {
        this.$nextTick(() => {
            this.$refs.carousel.handleResize();
        })
    }
}
</script>