<style lang="scss" scoped>
.contain-block{
    margin: 0 auto;
    position: relative;
    .container {
        display: inline-block;
        vertical-align: top;
    }
    .set-icon{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        background: #E0E0E0;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-bottom-left-radius: 20px;
        display: none;
        &>i{
            margin-left: 6px;
            color: white;
            font-size: 10px;
        }
        &:hover{
            background: #5873D7;
        }
    }
    &:hover{
        .set-icon{
            display: inline-block;
        }
    }
}
.modal-body{
    padding: 8px;
    overflow: auto;
    span{
        display: inline-block;
        vertical-align: middle;
    }
    input{
        width: 65px;
        height: 32px;
    }
    p{
        display: inline-block;
        width: 80px;
        height: 32px;
        line-height: 32px;
        padding-left: 4px;
        color: #000;
        border: solid 1px #AAAAAA;
        position: relative;
        top: 2px;
    }
    i.icon-lajitong{
        margin-left: 10px;
        color: #000;
        font-size: 15px;
        cursor: pointer;
        &:hover{
            color: #76BCEF;
        }
    }
    select{
        width: 80px;
        height: 32px;
        position: relative;
        top: 2px;
    }
    .panel-tree{
        ul{
            margin-left: 30px;
            li{
                button{
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
<template>
<div class="contain-block" :style="myStyle">
    <div class="container" v-for="(child1,index2) in children" :key="index2" :style="{width:child1.width,height:child1.height}">
        <LayoutPanel v-for="(child2,index3) in child1.children"
            :key="index3"
            :indexSequence="[...containIndex,index2,index3]"
            :width="child2.width"
            :height="child2.height"
            :background="child2.background"
            :rects="child2.rects"
            :changeSizeSignal="changeSizeSignal"
            :changePanelSize="changePanelSize"
            :changeChildSizeSignal="changeChildSizeSignal"
        >
        </LayoutPanel>
    </div>
    <div class="set-icon" @click="showPanelSetting = true">
        <i class="iconfont icon-leixing"></i>
    </div>
    <Modal title="设置容器" v-model="showPanelSetting" :draggable="true" :scrollable="true" :width="700">
        <div class="modal-body">
            <label>宽度：</label>
            <select v-model="widthMode" @change="changeWidth">
                <option :value="'num'">数值</option>
                <option :value="'percent'">百分比</option>
            </select>
            <span v-if="widthMode == 'num'"><input type="number" v-model="setWidth" min="500"><label>PX</label></span>
            <span v-if="widthMode == 'percent'"><input type="number" v-model="perWidth" min="10" max="100"><label>%</label></span>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;背景：</label>
            <ColorSetting :color="background" @changeColor="changeLargeBack($event)"/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="pictureEditShow = true;">图片</button>
            <br/>
            <br/>
            <label>高度：</label>
            <!-- <select v-model="heightMode" @change="changeHeight" disabled>
                <option :value="'num'">数值</option>
            </select> -->
            <p>数值</p>
            <span v-if="heightMode == 'num'"><input type="number" v-model="setHeight" min="30"><label>PX</label></span>
            <span v-if="heightMode == 'percent'"><input type="number" v-model="perHeight"><label>%</label></span>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <i class="iconfont icon-lajitong" @click="deletePanel" v-if="type == 'single'"></i>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button @click="copyContainer(...containIndex)">复制容器</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button @click="pasteContainer(...containIndex)">粘贴容器</button>
            <br/>
            <br/>
            <ul class="panel-tree">
                <li>分割
                    <ul>
                        <li v-for="(child1,index2) in children" :key="index2">垂直{{index2 + 1}}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button @click="colCut(...containIndex,index2)">加左</Button>
                            <Button @click="colCut(...containIndex,index2 + 1)">加右</Button>
                            <Button @click="deleteHorizontal(...containIndex,index2)">删除</Button>
                            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宽度</label>
                            <InputSetting :inputStr="child1.width" @changeInput="changeWidthInput($event,...containIndex,index2)"></InputSetting>
                            <ul>
                                <li v-for="(child2,index3) in child1.children" :key="index3">水平{{index3 + 1}}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button @click="rowCut(...containIndex,index2,index3)">加上</Button>
                                    <Button @click="rowCut(...containIndex,index2,index3 + 1)">加下</Button>
                                    <Button @click="deleteVertical(...containIndex,index2,index3)">删除</Button>
                                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;背景：</label>
                                    <ColorSetting :color="child2.background" @changeColor="changeSmallBack($event,...containIndex,index2,index3)"/>
                                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高度</label>
                                    <InputSetting :inputStr="child2.height" @changeInput="changeHeightInput($event,...containIndex,index2,index3)"></InputSetting>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div slot="footer" style="height: 20px"></div>
    </Modal>
    <PictureSettingModal 
      :settingModalShow="pictureEditShow" 
      :duplicate="false" 
      @confirmSelected="changePictureUrl"
      @closeModal="pictureEditShow=false"
    />
</div>
</template>
<script>
import LayoutPanel from '@/components/platform/design/Layout-panel';
import ColorSetting from '@/components/componentTool/ColorSetting';
import InputSetting from '@/components/componentTool/InputSetting';
import PictureSettingModal from '@/components/componentTool/PictureSetting';

export default {
    components: {
        LayoutPanel,
        ColorSetting,
        InputSetting,
        PictureSettingModal
    },
    props: {
        width: {
            type: String, default: '1000px',
        },
        height: {
            type: String, default: '650px',
        },
        background: {
            type: String, default: 'transparent',
        },
        children: {
        },
        type: {
            type: String
        },
        containIndex: {
            type: Array
        },
        changeSizeSignal: {
            type: Boolean
        },
        changePanelSize: {
            type: Boolean
        }
    },
    data() {
        return {
            widthMode:this.width.endsWith('px')?'num':'percent',
            heightMode:this.height.endsWith('px')?'num':'percent',
            setWidth: this.width.endsWith('px')?parseInt(this.width.replace('px','')):1000,
            setHeight: this.height.endsWith('px')?parseInt(this.height.replace('px','')):650,
            perWidth: this.width.endsWith('%')?parseInt(this.width.replace('%','')):100,
            perHeight: this.height.endsWith('%')?parseInt(this.height.replace('%','')):50,

            changeChildSizeSignal: false,
            showPanelSetting: false,            //模态框显示
            pictureEditShow: false,
        }
    },

    mounted() {
    },

    computed: {
        myStyle(){
            return{
                width: this.width,
                height: this.height,
                background: this.background,
            }
        }
    },

    methods: {
        changeWidth(){
            if(this.widthMode == 'num'){
                this.$store.dispatch('rect/setLayoutWidth', {containIndex:this.containIndex, val:this.setWidth+'px'});
            }
            if(this.widthMode == 'percent'){
                this.$store.dispatch('rect/setLayoutWidth', {containIndex:this.containIndex, val:this.perWidth+'%'});
            }
            this.changeChildSizeSignal = !this.changeChildSizeSignal;
        },
        changeHeight(val){
            if(val == 'num'){
                this.$store.dispatch('rect/setLayoutHeight', {containIndex:this.containIndex, val:this.setHeight+'px'});
            }
            if(val == 'percent'){
                this.$store.dispatch('rect/setLayoutHeight', {containIndex:this.containIndex, val:this.perHeight+'%'});
            }
            this.changeChildSizeSignal = !this.changeChildSizeSignal;
        },
        changeLargeBack(val){
            this.$store.dispatch('rect/setLayoutBackground',{containIndex:this.containIndex, val});
        },
        deletePanel(){
            this.$Modal.confirm({
                title: '消息',
                content: '确认删除容器？',
                onOk:()=>{this.$store.dispatch('rect/deleteLayout', this.containIndex);}
            })
        },
        colCut(i1,i2,i3){
            this.$store.dispatch('rect/colCut', {i1,i2,i3});
            this.changeChildSizeSignal = !this.changeChildSizeSignal;
        },
        rowCut(i1,i2,i3,i4){
            this.$store.dispatch('rect/rowCut', {i1,i2,i3,i4});
            this.changeChildSizeSignal = !this.changeChildSizeSignal;
        },
        deleteHorizontal(i1,i2,i3){
            this.$store.dispatch('rect/deleteHorizontal', {i1,i2,i3});
            this.changeChildSizeSignal = !this.changeChildSizeSignal;
        },
        deleteVertical(i1,i2,i3,i4){
            this.$store.dispatch('rect/deleteVertical', {i1,i2,i3,i4});
            this.changeChildSizeSignal = !this.changeChildSizeSignal;
        },
        changeSmallBack(color,i1,i2,i3,i4){
            this.$store.dispatch('rect/setLayoutSmallBack',{i1,i2,i3,i4,color});
        },
        changeWidthInput(str,i1,i2,i3){
            if(str.endsWith('%') || str.endsWith('px') || (str.endsWith(')') && str.includes('calc('))){
                this.$store.dispatch('rect/setColWidth',{i1,i2,i3,str});
            }
        },
        changeHeightInput(str,i1,i2,i3,i4){
            if(str.endsWith('%') || str.endsWith('px') || (str.endsWith(')') && str.includes('calc('))){
                this.$store.dispatch('rect/setRowHeight',{i1,i2,i3,i4,str});
            }
        },
        copyContainer(i1,i2){
            this.$store.dispatch('rect/setCopyResource',{i1,i2});
        },
        pasteContainer(i1,i2){
            this.$store.dispatch('rect/getCopyResource',{i1,i2});
        },
        changePictureUrl (arrStr) {
          this.pictureEditShow = false;
          let val = "url('" + arrStr[0].absoluteUrl + "')center center / 100% 100% no-repeat";
          this.$store.dispatch('rect/setLayoutBackground',{containIndex:this.containIndex, val});
        },
    },

    watch: {
        setWidth(val) {
            if(this.widthMode == 'num' && val >= 500){
                this.$store.dispatch('rect/setLayoutWidth', {containIndex:this.containIndex, val:val+'px'});
                this.changeChildSizeSignal = !this.changeChildSizeSignal;
            }
        },
        setHeight(val) {
            if(this.heightMode == 'num' && val >= 30){
                this.$store.dispatch('rect/setLayoutHeight', {containIndex:this.containIndex, val:val+'px'});
                this.changeChildSizeSignal = !this.changeChildSizeSignal;
            }
        },
        perWidth(val) {
            if(this.widthMode == 'percent' && val >= 10 && val <= 100){
                this.$store.dispatch('rect/setLayoutWidth', {containIndex:this.containIndex, val:val+'%'});
                this.changeChildSizeSignal = !this.changeChildSizeSignal;
            }
        },
        perHeight(val) {
            if(this.heightMode == 'percent'){
                this.$store.dispatch('rect/setLayoutHeight', {containIndex:this.containIndex, val:val+'%'});
                this.changeChildSizeSignal = !this.changeChildSizeSignal;
            }
        },
        changePanelSize(){
            this.widthMode = this.width.endsWith('px')?'num':'percent';
            this.heightMode = this.height.endsWith('px')?'num':'percent';
            this.setWidth =  this.width.endsWith('px')?parseInt(this.width.replace('px','')):1000;
            this.setHeight =  this.height.endsWith('px')?parseInt(this.height.replace('px','')):650;
            this.perWidth =  this.width.endsWith('%')?parseInt(this.width.replace('%','')):100;
            this.perHeight =  this.height.endsWith('%')?parseInt(this.height.replace('%','')):50;
        }
    },

}
</script>