<style scoped lang="scss">
    .drag-tool{
        position: fixed;
        z-index: 999;
        overflow: hidden;
        font-family: "微软雅黑";
        cursor: move;
    }
</style>

<template>
    <div class="drag-tool" :style="style" @mousedown="down($event)" @touchstart="down($event)">
        <slot></slot>
    </div>
</template>

<script>
import { ALL_ELEMENT } from '@/services/constant';
export default {
    props: {
        type: {
            type: String,//定位类型，可选absolute
            default: 'fixed'
        },
        horizontal: {
            type: String,
            default: 'left'
        },
        parTopLimit: {
            type: Number,//拖动范围上边界
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        },
        parLeftLimit: {
            type: Number,//拖动范围左边界
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        },
        parRightLimit: {
            type: Number,//拖动范围右边界
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        },
        parBottomLimit: {
            type: Number,//拖动范围下边界
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        },
        x: {
            type: Number,//初始坐标
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        },
        y: {
            type: Number,//初始坐标
            default: 0,
            validator: function (val) {
                return val >= 0
            }
        }
    },
    created() {
        this.bodyDrag = false;
        this.mouseDownPos = {mouseX: 0, mouseY: 0};
    },
    data() {
        return{
            width: 0,
            height: 0,
            positionX: this.x,
            positionY: this.y,
            parentWidth: null,
            parentHeight: null,
            rawRight: null,
            rawBottom: null,
            toolList: ALL_ELEMENT,
        }
    },
    mounted(){
        this.width = this.$el.offsetWidth;
        this.height = this.$el.offsetHeight;

        this.parentWidth = this.type == 'absolute'? this.$el.parentNode.clientWidth : document.documentElement.clientWidth;
        this.parentHeight = this.type == 'absolute'? this.$el.parentNode.clientHeight : document.documentElement.clientHeight;

        this.rawRight = this.horizontal == 'left'?(this.parentWidth - this.width - this.positionX):this.positionX;    //右边到边界距离
        this.rawBottom = this.parentHeight - this.height - this.positionY;  //底部到边界距离

        document.documentElement.addEventListener('mousemove', this.move);
        document.documentElement.addEventListener('mouseup', this.up);
        document.documentElement.addEventListener('mouseleave', this.up);

        document.documentElement.addEventListener('touchmove', this.move, true);
        document.documentElement.addEventListener('touchend touchcancel', this.up, true);
        document.documentElement.addEventListener('touchstart', this.up, true);

        window.addEventListener('resize', ()=>{
            this.parentWidth = this.type == 'absolute'? this.$el.parentNode.clientWidth : document.documentElement.clientWidth;
            this.parentHeight = this.type == 'absolute'? this.$el.parentNode.clientHeight : document.documentElement.clientHeight;
            if(this.horizontal == 'left'){
                this.positionX = this.parentWidth - this.width - this.positionX < this.parRightLimit?this.parentWidth - this.width - this.parRightLimit:this.positionX;
                this.rawRight = this.parentWidth - this.width - this.positionX;
            }
            this.positionY = this.parentHeight - this.height - this.positionY < this.parBottomLimit?this.parentHeight - this.height - this.parBottomLimit:this.positionY;
            this.rawBottom = this.parentHeight - this.height - this.positionY;
        })
    },
    computed: {
        style() {
            let objStyle = {
                position: this.type,
                top: this.positionY + 'px'
            }
            objStyle[this.horizontal] = this.positionX + 'px';
            return objStyle
        }
    },
    methods:{
        down: function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            this.bodyDrag = true;
            this.$emit('isMousedown',this.bodyDrag);
            this.mouseDownPos.mouseX = ev.pageX || ev.touches[0].pageX;
            this.mouseDownPos.mouseY = ev.pageY || ev.touches[0].pageY;
        },
        move(ev) {
            if(!this.bodyDrag) return;
            ev.stopPropagation();
            let delta = {
                x: this.horizontal == 'left'?((ev.pageX || ev.touches[0].pageX) - this.mouseDownPos.mouseX):0,
                y: (ev.pageY || ev.touches[0].pageY) - this.mouseDownPos.mouseY
            };
            this.positionX += delta.x;
            this.positionY += delta.y;
            this.rawRight = this.horizontal == 'left'?(this.parentWidth - this.width - this.positionX):this.positionX;
            this.rawBottom = this.parentHeight - this.height - this.positionY;
            this.mouseDownPos.mouseX = ev.pageX || ev.touches[0].pageX;
            this.mouseDownPos.mouseY = ev.pageY || ev.touches[0].pageY;
        },
        up(ev) {
            if(!this.bodyDrag) return;
            this.bodyDrag = false;
            this.$emit('isMousedown',this.bodyDrag);
            if(this.horizontal == 'left'){
                this.positionX = this.rawRight < this.parRightLimit?this.parentWidth - this.width - this.parRightLimit:this.positionX;
                this.positionX = this.positionX < this.parLeftLimit?this.parLeftLimit:this.positionX;
                this.rawRight = this.parentWidth - this.width - this.positionX;
            }
            this.positionY = this.rawBottom < this.parBottomLimit?this.parentHeight - this.height - this.parBottomLimit:this.positionY;
            this.positionY = this.positionY < this.parTopLimit?this.parTopLimit:this.positionY;
            this.rawBottom = this.parentHeight - this.height - this.positionY;
        },
        
    },
    beforeDestroy: function () {
        document.documentElement.removeEventListener('mousemove', this.move);
        document.documentElement.removeEventListener('mouseup', this.up);
        document.documentElement.removeEventListener('mouseleave', this.up);

        document.documentElement.removeEventListener('touchmove', this.move, true);
        document.documentElement.removeEventListener('touchend touchcancel', this.up, true);
        document.documentElement.removeEventListener('touchstart', this.up, true);
    }
}
</script>