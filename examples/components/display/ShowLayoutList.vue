<style lang="scss" scoped>
.layout-list{
    position: relative;
    &>ul{
        position: absolute;
	    height: 50px;
	    background-color: #ffffff;
	    box-shadow: 0px 5px 8px 0px rgba(0, 63, 136, 0.12);
        border-radius: 4px;
        z-index: 100;
        li{
            display:inline-block;
            font-size: 16px;
            line-height: 50px;
            padding: 0 15px;
            color: #666666;
            cursor: pointer;
            &:hover{
                color: #000;
            }
            &.active{
                font-size: 18px;
                color: #1259c3;
            }
        }
    }
}
</style>
<template>
<div class="layout-list" :style="{'padding-top':type == 'multiple'?50 + guideConfig.top + 'px':'0'}">
    <ul v-if="type == 'multiple'" :style="myStyle">
        <li v-for="(item,index) in panelList" :key="index" :class="{'active':index == currentIndex}" @click="currentIndex = index;indexChange = !indexChange">{{item.name}}</li>
    </ul>
    <ShowLayoutPanel
        :change = "indexChange"
        :width = "panelList[currentIndex].width"
        :height = "panelList[currentIndex].height"
        :background = "panelList[currentIndex].background"
        :children = "panelList[currentIndex].children"
        :publishWeb = "publishWeb"
    >
    </ShowLayoutPanel>
</div>
</template>
<script>
import ShowLayoutPanel from '@/components/display/ShowLayoutPanel';
export default {
    components: {
        ShowLayoutPanel
    },
    props: {
        type: {
            type: String
        },
        guideConfig: {
        },
        panelList: {
        },
        publishWeb: {
            type: Boolean
        }
    },
    data() {
        return {
            widthMode:this.guideConfig.width.endsWith('px')?'num':'percent',
            setWidth: this.guideConfig.width.endsWith('px')?parseInt(this.guideConfig.width.replace('px','')):1000,
            perWidth: this.guideConfig.width.endsWith('%')?parseInt(this.guideConfig.width.replace('%','')):80,
            currentIndex: 0,
            indexChange: false
        }
    },

    created() {
        this.panelList.forEach((item,index) => {
            if(item.name == this.$route.query.typeName){
                this.currentIndex = index;
            }
        });
    },
    mounted() {
    },

    computed: {
        myStyle(){
            return{
                width: this.guideConfig.width,
                top: this.guideConfig.top + 'px',
                left: this.widthMode == 'num'?'calc(50% - ' + this.setWidth/2 + 'px)':'calc(50% - ' + this.perWidth/2 + '%)'
            }
        }
    },

    methods: {
    },

    watch: {
    },

}
</script>