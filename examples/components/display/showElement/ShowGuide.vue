<style lang="scss" scoped>
.SrpGuide {
    & > ul > li {
        display: inline-block;
        text-align: center;
    }
}

</style>
<template>
    <div class="SrpGuide">
        <ul>
            <template v-for="(item,index) in config.guideList">
                <li 
                    :key="index"
                    class="guide-item"
                    @click.stop="changePage(item)"
                    @mouseover="setHoverItemIndex(item,index)"
                    @mouseout="setHoverItemIndex(item,-1)"
                    :style="[config.normalStyle,item.url==curViewId?config.activeStyle:config.guideStyle,index==currentIndex?config.activeStyle:'']"
                >
                    {{ item.title }}
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
import { getViewListsBySiteId } from '@/api/siteManage';
 
export default {
    name: 'ShowGuide',
    props: {
        config: Object,
        publishWeb: Boolean
    },
    data() {
        return {
            currentIndex: -1,
        }
    },
    watch: {
    },
    computed: {
        curViewId() {
            return this.publishWeb?this.$store.state.publishWebViewId:this.$route.query.viewId;
        }
    },
    methods: {
        changePage(item) {//点击哪个导航处于选中状态
            let isMove = this.$store.state.event.isMove;
            if (isMove) return;
            const vm = this;
            if (item.url) { //是否有链接的页面，有则跳转，无则提示
                if (item.url != this.curViewId) {
                    if(this.publishWeb){
                        this.$store.dispatch('setPublishWebViewId', item.url);
                        this.$router.push({ path:'/publish/' + this.$route.params.namespace});
                    }else{
                        this.$router.push({ path:'/app/display', query: { viewId: item.url } });
                    }
                }
            } else {
                this.$Modal.info({
                    title: '消息',
                    content:'此栏目没有链接到对应页面！'
                });
            }
        },
        setHoverItemIndex(item,index) {//鼠标悬浮时hover状态决定是否显示悬浮状态,鼠标移开，取消悬浮显示状态
            this.currentIndex = index;
        }
    }
}
</script>