<style scoped lang="scss">
.layout-panel{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover,&.dragEnter{
        border: 1px dashed #6981fb;
    }
    &.dragEnter{
        &:after {
            content: '放在这里';
            color: #6981fb;
        }
    }
}
</style>

<template>
<div class="layout-panel" :style="style" :class="{'dragEnter':showTips}" @drop="drop($event)" @dragenter="dragenter($event)" @dragleave="dragleave($event)">
    <VueDragResize v-for="(rect,index) in rects"
        :key="rect.id"
        :parentW="listWidth"
        :parentH="listHeight"
        :minw="rect.minw"
        :minh="rect.minh"
        :w="rect.width"
        :h="rect.height"
        :x="rect.left"
        :y="rect.top"
        :z="rect.zIndex"
        :isActive="rect.active"
        @setActivateEv="setActivateEv($event,indexSequence,index)"
        @changePosSize="changePosSize($event, indexSequence,index)"
        @deleteElement="deleteElement(indexSequence,index)"
    >
        <MyElement :style="rect.element.style" :type="rect.element.type" :config="rect.element.config" :allIndex={indexSequence,index}></MyElement>
    </VueDragResize>

</div>
</template>

<script>
import VueDragResize from '@/components/platform/dragResize/dragResize.vue';
import MyElement from '@/components/platform/MyElement'; 

export default {
    name: 'layoutPanel',
    props: {
        indexSequence: {},
        width: {
            type: String, default: '100%',
        },
        height: {
            type: String, default: '650px',
        },
        background: {
            type: String, default: 'transparent',
        },
        rects: {},
        changeSizeSignal: {
            type: Boolean
        },
        changePanelSize: {
            type: Boolean
        },
        changeChildSizeSignal: {
            type: Boolean
        },
    },
    components: {
        VueDragResize,
        MyElement
    },

    data(){
        return {
            listWidth: 0,
            listHeight: 0,
            showTips: false,
            ifShowChooseVideo: false,
        }
    },

    mounted() {
        this.listWidth = this.$el.offsetWidth;
        this.listHeight = this.$el.offsetHeight;
    },

    computed: {
        style(){
            return{
                width: this.width,
                height: this.height,
                background: this.background
            }
        }
    },

    methods: {
        setActivateEv(flag,indexSequence,index) {
            this.$store.dispatch('rect/setActivateEv', {indexSequence, index, flag});
        },

        changePosSize(newRect,indexSequence, index) {
            this.$store.dispatch('rect/setPosSize', {indexSequence, index, newRect});
        },
    
        drop(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.showTips = false;
            let type = ev.dataTransfer.getData("text");
            if(type == 'layoutPanel' || type == 'composePanel') {
                this.$Modal.error({
                    title: '错误',
                    content: '容器放外面去！'
                })
                return;
            }
            this.$store.dispatch('rect/addNewRect', {indexSequence:this.indexSequence, eleType:type, x:ev.offsetX, y:ev.offsetY});

        },

        dragenter(ev){
            this.showTips = true;
        },
        dragleave(ev){
            this.showTips = false;
        },
        deleteElement(indexSequence, index){
            this.$Modal.confirm({
                title: '消息',
                content: '确认删除组件？',
                onOk:()=>{this.$store.dispatch('rect/deleteElement', {indexSequence, index});}
            })
        },
        handleChooseVideoVisible() {
            if (!this.ifShowChooseVideo) {

            } else {
                this.selectedVideoUrl = '';
            }
        },
        
    },
    watch: {
        changeSizeSignal(val){
            setTimeout(()=>{
                this.listWidth = this.$el.offsetWidth;
                this.listHeight = this.$el.offsetHeight;
            },50);
        },
        changeChildSizeSignal(val){
            setTimeout(()=>{
                this.listWidth = this.$el.offsetWidth;
                this.listHeight = this.$el.offsetHeight;
            },50);
        },
        changePanelSize(val){
            setTimeout(()=>{
                this.listWidth = this.$el.offsetWidth;
                this.listHeight = this.$el.offsetHeight;
            },50);
        }
    },
    beforeDestroy: function () {
    },
}
</script>