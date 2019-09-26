<style lang="scss" scoped>
    .ivu-modal {
        .ivu-row {
            margin-bottom: 20px;
            label {
                display: inline-block;
                width: 90px;
            }
            .ivu-input-wrapper {
                display: inline-block;
                width: 200px;
            }
            .ivu-input-number {
                width: 200px;
            }
            /deep/ .el-select {
                & > .el-input {
                    width: 200px;
                }
            }
        }
    }
</style>
<template>
    <Modal
        title="编辑按钮"
        v-model="ifShowSettingButtonModal"
        :draggable="true"
        :scrollable="true"
        @on-ok="submitButtonSet"
        @on-cancel="cancelButtonSet"
        @on-visible-change="handleSettingButtonModalVisible"
        :closable="false"
    >
        <Row>
            <label>按钮文字</label>
            <Input type="text" v-model="eleConfig.text"/>
        </Row>
        <Row>
            <label>链接到</label>
            <RadioGroup v-model="eleConfig.linkType" @on-change="changeLinkType()">
                <Radio label="站内"></Radio>
                <Radio label="站外"></Radio>
            </RadioGroup>
        </Row>
        <Row v-if="eleConfig.linkType==='站外'">
            <label>站外链接</label>
            https://<Input type="text" v-model="outLink" @on-change="setOutsideLink()"/>
        </Row>
        <Row v-if="eleConfig.linkType==='站内'">
            <label>站内视图</label>
            <el-select 
                v-model="eleConfig.insideLink"
                size="small"
                >
                <el-option v-for="(item,index) in viewLists" :value="item.id" :key="index" :label="item.title"></el-option>
            </el-select>
        </Row>
        <Row>
            <label>背景颜色</label>
            <ColorSetting :color="eleConfig.eleStyle.background" @changeColor="setBackgroundColor($event)"/>
        </Row>
        <Row>
            <label>字体颜色</label>
            <ColorSetting class="color-picker" :color="eleConfig.eleStyle.color" @changeColor="setFontColor($event)"/>
        </Row>
        <Row>
            <label>字体大小</label>
            <Input type="number" v-model="fontSize" @on-change="setFontSize()"/>px
        </Row>
        <Row>
            <label>边框像素</label>
            <InputNumber :min="1" v-model="borderWidth" @on-change="setBorderWidth()"/>px
        </Row>
        <Row>
            <label>边框颜色</label>
            <ColorSetting class="color-picker" :color="eleConfig.eleStyle.borderColor" @changeColor="setBorderColor($event)"></ColorSetting>
        </Row>
        <Row>
            <label>按钮圆角</label>
            <InputNumber :min="0" v-model="borderRadius" @on-change="setBorderRadius()"></InputNumber>px
        </Row>
    </Modal>
</template>
<script>
import ColorSetting from '@/components/componentTool/ColorSetting.vue';
import { getCookie } from '@/utils/util';
import { getViewListsBySiteId } from '@/api/siteManage';

export default {
    name: 'SrpButtonSet',
    components:{
        ColorSetting
    },
    props: {
        config: Object,
        allIndex: Object,
        showSettingPanel: Boolean,
    },
    watch: {
        showSettingPanel(val) {
            if (val) {
                this.ifShowSettingButtonModal = true;
            } else {
                this.ifShowSettingButtonModal = false;
            }
        },
        eleConfig: {
            handler: function(config) {
                this.$store.dispatch('rect/changeConfig', {config,allIndex:this.allIndex});
            },
            deep: true
        }
    },
    computed: {
    },
    data() {
        return {
            ifShowSettingButtonModal: false,
            eleConfig: JSON.parse( JSON.stringify(this.config)),//用于触发监听，提交样式设置
            copyConfig: JSON.parse( JSON.stringify(this.config)),//用于设置样式时缓存样式
            fontSize: this.config.eleStyle.fontSize.endsWith('px')?parseInt(this.config.eleStyle.fontSize.replace('px','')):this.config.eleStyle.fontSize,//字体大小
            borderWidth: this.config.eleStyle.borderWidth.endsWith('px')?parseInt(this.config.eleStyle.borderWidth.replace('px','')):this.config.eleStyle.borderWidth,//边框宽度
            outLink: this.config.outsideLink.startsWith('https://')?this.config.outsideLink.replace('https://',''):this.config.outsideLink,//链接的地址
            linkType: '',//链接的类型
            curSiteId: '',//当前网站id
            viewLists: '',//视图列表
            borderRadius: this.config.eleStyle.borderRadius.endsWith('px')?parseInt(this.config.eleStyle.borderRadius.replace('px','')):this.config.eleStyle.borderRadius,//按钮圆角
        }
    },
    methods: {
        submitButtonSet() {
            this.$emit('closeModal');
        },
        cancelButtonSet() {
            for (let key in this.copyConfig) {
                this.eleConfig[key] = this.copyConfig[key];
            }
            this.$emit('closeModal');
        },
        handleSettingButtonModalVisible() {
            if(this.ifShowSettingButtonModal){
                this.eleConfig = JSON.parse( JSON.stringify(this.config));
                this.copyConfig = JSON.parse( JSON.stringify(this.config));
                this.getAllViews(this.curSiteId);
            }
        },
        setBackgroundColor(val) {
            this.eleConfig.eleStyle.background = val;
        },
        setFontColor(val) {
            this.eleConfig.eleStyle.color = val;
        },
        setFontSize() {
            this.eleConfig.eleStyle.fontSize = this.fontSize + 'px';
        },
        setBorderWidth() {
            this.eleConfig.eleStyle.borderWidth = this.borderWidth + 'px';
        },
        setBorderColor(val) {
            this.eleConfig.eleStyle.borderColor = val;
        },
        setOutsideLink() {
            if (this.outLink) {
                this.eleConfig.outsideLink = 'https://' + this.outLink;
            } else {
                this.eleConfig.outsideLink = this.outLink;
            }   
        },
        getAllViews(siteId) {
            getViewListsBySiteId(siteId).then(data => {
                this.viewLists = data;
            })
        },
        changeLinkType() {
            if (this.eleConfig.linkType=='站内') {
                this.outLink = '';
                this.eleConfig.outsideLink = '';
            } else {
                this.eleConfig.insideLink = '';
            }
        },
        setBorderRadius() {
            this.eleConfig.eleStyle.borderRadius = this.borderRadius + 'px';
        }
    },
    created() {
        this.curSiteId = getCookie('curSiteId');
    }
}
</script>