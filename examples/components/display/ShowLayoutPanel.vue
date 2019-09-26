<style scoped lang="scss">
.show-layout-panel{
    margin: 0 auto;
    position: relative;
    .container {
        display: inline-block;
        vertical-align: top;
        &>div{
            position: relative;
        }
    }
}
</style>

<template>
<div class="show-layout-panel" :style="style" v-if="isAlive">
    <div class="container" v-for="(child1,index2) in children" :key="index2" :style="{width:child1.width,height:child1.height}">
        <div v-for="(child2,index3) in child1.children" :key="index3" :style="{width:child2.width,height:child2.height,background:child2.background}">
            <ShowDrag v-for="(item,index4) of child2.rects" 
                :key="index4"
                :w="item.width"
                :h="item.height"
                :x="item.left"
                :y="item.top"
                :z="item.zIndex">
                <ShowElement :style="item.element.style" :type="item.element.type" :config="item.element.config" :publishWeb="publishWeb">
                </ShowElement>
            </ShowDrag>
        </div>
    </div>
</div>
</template>

<script>
import ShowDrag from '@/components/display/ShowDrag';
import ShowElement from '@/components/display/ShowElement';

export default {
    name: 'showLayoutPanel',
    props: {
        change:{
            type: Boolean
        },
        width: {
            type: String, default: '1000px',
        },
        height: {
            type: String, default: '350px',
        },
        background: {
            type: String, default: 'transparent',
        },
        children: {
            type: Array
        },
        publishWeb: {
            type: Boolean, default: false
        }
    },
    data(){
        return{
            isAlive:true
        }
    },
    components: {
        ShowDrag,
        ShowElement,
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

    watch:{
        change(){
            this.isAlive = false
            this.$nextTick(() => (this.isAlive = true))
        }
    },

    beforeDestroy: function () {
    },
}
</script>

