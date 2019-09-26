<style scoped lang="scss">
#design{
    margin: 0;
    background: #fff;
    min-height: 100%;
    .middle-lay{
        width: 100%;
        height: 3px;
        &.dragEnter{
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed #6981fb;
            color: #6981fb;
            margin: 0 auto;
            &:after {
                display: inline-block;
                content: '放在这里';
                color: #6981fb;
            }
        }
    }
}
</style>

<template>
    <div id="design" @drop="drop($event,-1)" @dragover="dragover($event)">
        <DesignTool ref="designTool"></DesignTool>
        <template v-for="(item,index1) in layout">
            <div :key="index1" class="middle-lay" :class="{'dragEnter':currentEnter == index1}" @drop="drop($event,index1)" @dragenter="dragenter($event,index1,'drag')" @dragleave="dragleave($event,index1,'drag')" @mouseenter="dragenter($event,index1)" @mouseleave="dragleave($event,index1)">
            </div>
            <ContainerList :key="item.id" :type="item.type" :guideConfig="item.guideConfig" :panelList="item.panelList" :containListIndex="index1" :changeSizeSignal="changeSizeSignal">
            </ContainerList>
        </template>
        <div class="middle-lay" :class="{'dragEnter':currentEnter == layout.length}" @drop="drop($event,-1)" @dragenter="dragenter($event,layout.length,'drag')" @dragleave="dragleave($event,layout.length,'drag')" @mouseenter="dragenter($event,layout.length)" @mouseleave="dragleave($event,layout.length)">
        </div>
    </div>
</template>

<script>
import ContainerList from '@/components/platform/design/ContainerList.vue';
import DesignTool from '@/components/platform/design/DesignTool.vue';
import ToolBar from '@/components/platform/design/ToolBar';
import DragTool from '@/components/componentTool/DragTool';
import { getLayoutListByViewId,saveView } from '@/api/platform';
import { isJSON } from '@/utils/util';

export default {
    name: 'design',
    components: {
        ContainerList,
        DesignTool,
        ToolBar,
        DragTool,
    },
    data(){
        return {
            currentEnter: -1,
            changeSizeSignal: false,
        }
    },
    watch: {
        '$route' (to,from) {
            this.id = this.$route.query.viewId;
            getLayoutListByViewId(this.id).then(data => {
                if (data) {
                    let layoutData = JSON.parse(data.container);
                    this.$store.dispatch('rect/setLayout', {layoutData: layoutData});
                    let comResource = {
                        websiteId: data.comResource.websiteId,
                        navigationContainer: isJSON(data.comResource.navigationContainer)?JSON.parse(data.comResource.navigationContainer):null,
                        buttomContainer: isJSON(data.comResource.buttomContainer)?JSON.parse(data.comResource.buttomContainer):null
                    }
                    this.$store.dispatch('rect/setComResource', {config: comResource});
                }
            });
        },
    },
    computed: {
        layout() {
            return this.$store.state.rect.layout;
        },
    },
    mounted(){
        window.addEventListener('resize', ()=>{     //窗口尺寸变化时向内传递信号改变容器大小
            this.changeSizeSignal = !this.changeSizeSignal;
        })
    },
    methods: {
        dragover(ev) {
            ev.preventDefault();
        },
        dragenter(ev,index,judge){
            if(judge == 'drag' || this.$store.state.event.mouseDown){
                this.currentEnter = index;
            }
        },
        dragleave(ev,index,judge){
            this.currentEnter = -1;
        },
        drop(ev,index) {
            this.currentEnter = -1;
            ev.preventDefault();
            ev.stopPropagation();
            let elementType = ev.dataTransfer.getData("text");
            if(elementType == 'layoutPanel' || elementType == 'composePanel'){
                this.$store.dispatch('rect/addLayoutPanel', {index,elementType});
            } else {
                this.$Modal.error({
                    title: '错误',
                    content: '组件放容器里去！'
                })
                return;
            }
        },
    },
    created() {
        this.id = this.$route.query.viewId;
        getLayoutListByViewId(this.id).then(data => {
            if (data) {
                let layoutData = JSON.parse(data.container);
                this.$store.dispatch('rect/setLayout', {layoutData: layoutData});
                let comResource = {
                    websiteId: data.comResource.websiteId,
                    navigationContainer: isJSON(data.comResource.navigationContainer)?JSON.parse(data.comResource.navigationContainer):null,
                    buttomContainer: isJSON(data.comResource.buttomContainer)?JSON.parse(data.comResource.buttomContainer):null
                }
                this.$store.dispatch('rect/setComResource', {config: comResource});
            }
        });
    }
}
</script>