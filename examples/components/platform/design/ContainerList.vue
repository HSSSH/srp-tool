<style lang="scss" scoped>
.container-list{
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
        .set-icon{
            position: absolute;
            top: 0;
            right: 0;
            z-index: 101;
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
    .set-title{
        button{
            width: 20px;
            height: 20px;
            background: none;
            border-radius: 10px;
            border: solid 1px rgb(225, 225, 225);
            cursor: pointer;
            margin-right: 15px;
            &.delete{
                position: relative;
                top: -1px;
                height: 32px;
                border-radius: 0;
                border-left: none;
            }
        }
    }
}
</style>
<template>
<div class="container-list" :style="{'padding-top':type == 'multiple'?50 + guideConfig.top + 'px':'0'}">
    <ul v-if="type == 'multiple'" :style="myStyle">
        <li v-for="(item,index) in panelList" :key="index" :class="{'active':index == currentIndex}" @click="currentIndex = index;changePanelSize = !changePanelSize">{{item.name}}</li>
        <div class="set-icon" @click="showPanelSetting = true">
            <i class="iconfont icon-leixing"></i>
        </div>
    </ul>
    <ContainerDiv 
        :containIndex="[containListIndex,currentIndex]" 
        :type="type"
        :width = "panelList[currentIndex].width"
        :height = "panelList[currentIndex].height"
        :background = "panelList[currentIndex].background"
        :children = "panelList[currentIndex].children"
        :changeSizeSignal = "changeSizeSignal"
        :changePanelSize = "changePanelSize"
    ></ContainerDiv>
    <Modal title="设置菜单" v-model="showPanelSetting" :draggable="true" :scrollable="true">
        <div class="modal-body">
            <label>宽度：</label>
            <select v-model="widthMode" @change="changeWidth">
                <option :value="'num'">数值</option>
                <option :value="'percent'">百分比</option>
            </select>
            <span v-if="widthMode == 'num'"><input type="number" v-model="setWidth" min="500"><label>PX</label></span>
            <span v-if="widthMode == 'percent'"><input type="number" v-model="perWidth" min="10" max="100"><label>%</label></span>
            <br/>
            <br/>
            <label>距离：</label>
            <p>数值</p>
            <span><input type="number" v-model="setTop"><label>PX</label></span>
            <i class="iconfont icon-lajitong" @click="deletePanel"></i>
            <br/>
            <br/>
            <div class="set-title">
                <span v-for="(item,index) in guideList" :key=index>
                    <button @click="addGuideContainer(index)">+</button>
                    <input v-model="item.name">
                    <button class="delete" @click="deleteGuideContainer(index)">-</button>
                </span>
                <button @click="addGuideContainer(-1)">+</button>
            </div>
        </div>
        <div slot="footer" style="height: 20px"></div>
    </Modal>
</div>
</template>
<script>
import ContainerDiv from '@/components/platform/design/ContainerDiv.vue';

export default {
    components: {
        ContainerDiv
    },
    props: {
        type: {
            type: String
        },
        guideConfig: {
        },
        containListIndex:{
            type: Number
        },
        panelList: {
        },
        changeSizeSignal: {
            type: Boolean
        }
    },
    data() {
        return {
            currentIndex: 0,
            changePanelSize: false,
            widthMode:this.guideConfig.width.endsWith('px')?'num':'percent',
            setWidth: this.guideConfig.width.endsWith('px')?parseInt(this.guideConfig.width.replace('px','')):1000,
            perWidth: this.guideConfig.width.endsWith('%')?parseInt(this.guideConfig.width.replace('%','')):80,
            guideList: this.panelList.map(item => {return {name: item.name}}),
            setTop: this.guideConfig.top,
            showPanelSetting: false
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
        changeWidth(){
            if(this.widthMode == 'num'){
                this.$store.dispatch('rect/setGuideConfig', {index:this.containListIndex, config:{
                    'top': this.guideConfig.top,
                    'width': this.setWidth + 'px'
                }});
            }
            if(this.widthMode == 'percent'){
                this.$store.dispatch('rect/setGuideConfig', {index:this.containListIndex, config:{
                    'top': this.guideConfig.top,
                    'width': this.perWidth + '%'
                }});
            }
        },
        addGuideContainer(index){
            this.$store.dispatch('rect/addGuideContainer', {num:this.containListIndex,index:index});
             if(index == -1){
                this.guideList.push({name:'新菜单'});
            }
            else if(index > -1){
                this.guideList.splice(index, 0, {name:'新菜单'});
            }
        },
        deleteGuideContainer(index){
            if(this.guideList.length == 1){
                this.$Message.error('导航栏不能为空！');
            }
            else{
                this.$Modal.confirm({
                    title: '消息',
                    content: '确认删除？',
                    onOk:()=>{
                        this.$store.dispatch('rect/deleteGuideContainer', {num:this.containListIndex,index:index});
                        this.guideList.splice(index, 1);
                        if(this.currentIndex > this.guideList.length - 1){
                            this.currentIndex = 0;
                        }
                    }
                })
            }
        },
        deletePanel(){
            this.$Modal.confirm({
                title: '消息',
                content: '确认删除容器？',
                onOk:()=>{this.$store.dispatch('rect/deleteLayout', [this.containListIndex]);}
            })
        },
    },

    watch: {
        setWidth(val) {
            if(this.widthMode == 'num' && val >= 500){
                this.$store.dispatch('rect/setGuideConfig', {index:this.containListIndex, config:{
                    'top': this.guideConfig.top,
                    'width': val + 'px'
                }});
            }
        },
        perWidth(val) {
            if(this.widthMode == 'percent' && val >= 10 && val <= 100){
                this.$store.dispatch('rect/setGuideConfig', {index:this.containListIndex, config:{
                    'top': this.guideConfig.top,
                    'width': val + '%'
                }});
            }
        },
        setTop(val) {
            this.$store.dispatch('rect/setGuideConfig', {index:this.containListIndex, config:{
                'top': parseInt(val),
                'width': this.guideConfig.width
            }});
        },
        guideList: {
            handler: function(val) {
                if(val.length == this.panelList.length){
                    val.forEach((element,index) => {
                        if(element.name != this.panelList[index].name){
                            this.$store.dispatch('rect/setLayoutName', {containIndex:[this.containListIndex,index], val:element.name});
                        }
                    });
                }
            },
            deep: true
        }
    },

}
</script>