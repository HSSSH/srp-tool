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
    .setting-panel {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        visibility: hidden;
        background: white;
        border-radius: 8px;
        box-shadow: 0 3px 5px 5px rgba(0,0,0,.1);
        padding: 8px;
        font-size: 15px;
        a{
            margin: 0 10px;
        }
    }
    &:hover {
        .setting-panel {
            visibility: visible;
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
        <div class="setting-panel" v-if="!showSettingPanel">
            <a @click="showSettingPanel = true">设置</a>
        </div>
        <SrpButtonSetModal
            :config="config"
            :allIndex="allIndex"
            :showSettingPanel="showSettingPanel" 
            @closeModal="showSettingPanel=false">    
        </SrpButtonSetModal>
    </div>
</template>
<script>
import SrpButtonSetModal from '@/components/platform/myElementSet/Srp-button-set'; 
import { saveView } from '@/api/platform';

export default{
    name: 'Srp-button',
    components: {
        SrpButtonSetModal,
    },
    props: {
        config: Object,
        allIndex: Object
    },
    computed: {
        curViewId() {
            return this.$route.query.viewId;
        }
    },
    data() {
        return {
            showSettingPanel: false,//是否显示设置弹窗
        }
    },
    methods:{
        changePage(link) {
            let isMove = this.$store.state.event.isMove;
            if (isMove) return;
            const vm = this;

            if (link) { //是否有链接的页面，有则跳转，无则提示
                if (link != this.curViewId) {
                    saveView(this.$store.state.rect.layout,this.curViewId).then(data => {
                        this.$Modal.info({
                            title: '消息',
                            content: '已自动保存视图！',
                        })
                    });
                    this.$router.push({ path:'/app/platform/design', query: { viewId: link } });
                }
            } else {
                this.$Modal.info({
                    title: '消息',
                    content:'此栏目没有链接到对应页面！'
                });
            }
        }
    },
    created() {}
}
</script>