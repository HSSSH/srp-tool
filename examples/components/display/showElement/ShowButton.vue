<style lang="scss" scoped>
.srp-button {
    width: 100%;
    height: 100%;
    &:hover {
        opacity: 0.8;
    }
    .button-content {
        padding: 0;
        width: 100%;
        height: 100%;
        /deep/ span {
            display: inline-block;
            width: 100%;
            height: 100%;
            & > a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
            & > p {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
        }
        
    }
}
    
</style>
<template>
    <div class="srp-button">
        <Button class="button-content" :style="config.eleStyle">
            <a v-if="config.linkType==='站外'" :href="config.outsideLink" target=_blank :style="{color:config.eleStyle.color}">{{ config.text }}</a>
            <p v-if="config.linkType==='站内'" @click.stop="changePage(config.insideLink)">{{ config.text }}</p>
            <p v-if="!config.linkType">{{config.text}}</p>
        </Button>
    </div>
</template>
<script>
export default{
    props: {
        config: Object,
        publishWeb: Boolean
    },
    data() {
        return {
        }
    },
    methods:{
        changePage(link) {
            if (link) { //是否有链接的页面，有则跳转，无则提示
                if(this.publishWeb){
                    this.$store.dispatch('setPublishWebViewId', link);
                    this.$router.push({ path:'/publish/' + this.$route.params.namespace});
                }else{
                    this.$router.push({ path:'/app/display', query: { viewId: link } });
                }
            }
        }
    },
    created() {}
}
</script>