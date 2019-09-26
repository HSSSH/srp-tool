<style lang="scss" scoped>
    .picture-manage {
        position: relative;
        height: 100%;
        width: 100%;
        box-shadow: 0px 5px 10px 1px #E0E0E0;
        .top-title{
            height: 40px;
            line-height: 40px;
            padding-left: 15px;
            font-size: 16px;
            font-weight: bold;
            background: #CCDAFF;
        }
        .nav {
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            background-color: #fff;
            border-bottom: solid 1px #D7DEE3;
            .search-btn {
                width: 200px;
            }
            .right {
                .group-select {
                    margin-right: 10px;
                    width: 142px;
                }
                &>label {
                    margin-right: 10px;
                }
            }
            .add-btn{
                background: #2488EB;
                color: white;
                i,label{
                    vertical-align: middle;
                }
                i{
                    margin-right: 10px;
                }
            }
            
        }
        .picture-list {
            height: calc( 100% - 160px);
            background-color: #fff;
            &>div{
                padding: 10px 10px;
            }
            .pic-card{
                width: 250px;
                height: 220px;
                box-shadow: 0px 2px 3px 1px #eeeeee;
                display: inline-block;
                margin: 5px 15px;
                border-radius: 5px;
                position: relative;
                img{
                    width: 100%;
                    height: 150px;
                    cursor: pointer;
                }
                p{
                    padding: 5px;
                    font-size: 15px;
                    overflow: hidden; 
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    &:nth-child(2){
                        font-weight: bold;
                    }
                    &:nth-child(3){
                        color: #A9A9A9;
                    }
                }
                .modify-icon{
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    display: none;
                    color: white;
                    i{
                        cursor: pointer;
                        font-size: 20px; 
                    }
                }
                &:hover{
                    .modify-icon{
                        display: inline-block;
                    }
                }
            }
        }
        .page {
            margin-bottom: 15px;
            margin-right: 20px;
            text-align: right;
        }
    }
    .add-document-modal {
        /deep/ .modal-body {
            overflow: auto;
            .modal-content {
                padding-right: 10px;
                .ivu-row {
                    margin-bottom: 10px;
                    & > label {
                        display: inline-block;
                        width: 100px;
                        vertical-align: top;
                    }
                    .group-selected {
                        position: relative;
                        display: inline-block;
                        width: calc( 100% - 100px );
                        border: 1px solid #dcdee2;
                        border-radius: 4px;
                        .selected-item {
                            position: relative;
                            top: 7px;
                            left: 0;
                            z-index: 1;
                            padding: 6px 10px;
                            background-color: #2488eb;
                            color: #fff;
                            border-radius: 14px;
                            & > i {
                                margin-left: 12px;
                            } 
                        }
                        .group-input {
                            & > input {
                                border: none;
                                &:hover {
                                    border: none;
                                }
                                &:focus {
                                    box-shadow: none;
                                }
                            }
                        }
                    }
                    .groups {
                        display: inline-block;
                        width: calc( 100% - 100px );
                        & > span {
                            margin: 0 12px 12px 0;
                            padding: 4px 12px;
                            display: inline-block;
                            border-radius: 14px;
                            font-size: 14px;
                            color: #2488eb;
                            background: #deedfc;
                            &.active {
                                color: #666;
                                background: #f4f5f7;
                            }
                            & > i {
                                margin-left: 3px;
                                color: #2488eb;
                                display: none;
                            }
                            &:hover > i {
                                display: inline-block
                            }
                        }
                    }
                    .ivu-input-wrapper {
                        vertical-align: top;
                        width: calc( 100% - 100px );
                    }
                    .ivu-upload {
                        display: inline-block;
                        width: calc(100% - 100px);
                    }                    
                }
            }
        } 
        .confirm {
            color: #fff;
            background-color: #2d8cf0;
        } 
    }
    .edit-document-modal {
        /deep/ .modal-body {
            overflow: auto;
            .modal-content {
                padding-right: 10px;
                .ivu-row {
                    margin-bottom: 10px;
                    & > label {
                        display: inline-block;
                        width: 100px;
                        vertical-align: top;
                    }
                    .ivu-input-wrapper {
                        vertical-align: top;
                        width: calc( 100% - 100px );
                    }
                    .group-selected {
                        position: relative;
                        display: inline-block;
                        width: calc( 100% - 100px );
                        border: 1px solid #dcdee2;
                        border-radius: 4px;
                        .selected-item {
                            position: relative;
                            top: 7px;
                            left: 0;
                            z-index: 1;
                            padding: 6px 10px;
                            background-color: #2488eb;
                            color: #fff;
                            border-radius: 14px;
                            & > i {
                                margin-left: 12px;
                            } 
                        }
                        .group-input {
                            & > input {
                                border: none;
                                &:hover {
                                    border: none;
                                }
                                &:focus {
                                    box-shadow: none;
                                }
                            }
                        }
                    }
                    .groups {
                        display: inline-block;
                        width: calc( 100% - 100px );
                        & > span {
                            margin: 0 12px 12px 0;
                            padding: 4px 12px;
                            display: inline-block;
                            border-radius: 14px;
                            font-size: 14px;
                            color: #2488eb;
                            background: #deedfc;
                            &.active {
                                color: #666;
                                background: #f4f5f7;
                            }
                            & > i {
                                margin-left: 3px;
                                color: #2488eb;
                                display: none;
                            }
                            &:hover > i {
                                display: inline-block
                            }
                        }
                    }
                }
            }
        }
    }
    .img-modal{
         /deep/ .ivu-modal-content {
            background: transparent;
            box-shadow: none;
            .ivu-modal-close{
                border-radius: 15px; 
                border: solid 1px white;
                i{
                    font-size: 20px; 
                    color: white;
                }
            }
            .modal-content{
                text-align: center;
                img{
                    max-width: calc(100% - 10px); 
                    max-height: calc(100% - 10px);
                    margin-top: 10px; 
                }
            }
         }
    }
</style>
<template>
    <div class="picture-manage">
        <div class="top-title">
            图片列表
        </div>
        <div class="nav">
            <Input class="search-btn" search enter-button @on-search="getPicture" v-model="name" placeholder="" />
            <div class="right">
                <label>分组:</label>
                <el-select  class="group-select" v-model="groupId" size="small" @change="getPicture" clearable>
                    <el-option v-for="(item,index) in groupsList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <Button class="add-btn" @click="openAddDocumentModal"><i class="iconfont iconshangchuan-copy"></i><label>上传图片</label></Button>
            </div>
        </div>
        <div class="picture-list" v-better-scroll>
            <div>
                <div class="pic-card" v-for="item in documentsList" :key="item.id">
                    <img :src="item.absoluteUrl" @click="showLargePic(item.absoluteUrl)">
                    <p>图片名称{{item.name}}</p>
                    <p>{{ item.createTime }}</p>
                    <div class="modify-icon">
                        <i class="iconfont iconshanchu" @click="deletePic(item)"></i>
                        <!-- <i class="iconfont iconbianji"></i> -->
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Page 
                class="page"
                :current="pageNo"
                :total="totalCount" 
                :page-size="pageSize" 
                @on-change="changePage"
                show-total
                show-elevator
            >
                <slot>共{{pageCount}}页/{{ totalCount }}条</slot>
            </Page>
        </div>
        <Modal
            class="add-document-modal"
            title="上传图片"
            v-model="ifShowAddDocument"
            :mask-closable="false"
            @on-cancel="cancelAddDocument"
            @on-visible-change="handleAddVisibleChange"
        >
            <div class="modal-body" v-if="ifShowAddDocument">
                <div class="modal-content">
                    <Row>
                        <label>图片上传</label>
                        <Upload
                            action="/source/srp/source/upload?sourceType=picture"
                            accept="'image/*'"
                            :multiple="false"
                            :on-success="handleUploadSuccess"
                            :show-upload-list="false"
                            :before-upload="beforeUpload"
                        >
                            <i-button icon="ios-cloud-upload" :loading="uploading">上传</i-button>
                        </Upload>
                    </Row>
                    <Row>
                        <label>预览</label>
                        <img :src="documentItem.absoluteUrl">
                    </Row>
                    <Row>
                        <label>图片名称</label>
                        <Input v-model="documentName"></Input>
                    </Row>
                    <Row>
                        <label>分组</label>
                        <div class="group-selected">
                            <span class="selected-item" v-if="curSelectedGroup.id">{{ curSelectedGroup.name }}<Icon type="md-close" @click.stop="deleteSelectedGroup()"/></span>
                            <Input class="group-input" v-model="groupName" @on-enter="handleGroupEnter()" placeholder="按回车键Enter创建分组"></Input>
                        </div>
                    </Row>
                    <Row>
                        <label>已有分组：</label>
                        <div class="groups">
                            <span class="group" v-for="(item,index) in groupsList" :key="index" :class="item.active?'active':''" @click="chooseGroup(item)">
                                {{ item.name }}
                                <Icon v-if="!item.active" type="md-close" @click.stop="deleteGroup(item.id)"/>
                            </span>
                        </div>
                    </Row>
                </div>
            </div>
            <div slot="footer">
                <i-button class="confirm" @click="addPicture()">保存</i-button>
            </div>
        </Modal>
        <Modal
            class="edit-document-modal"
            title="文档编辑"
            v-model="ifShowEditDocument"
            :mask-closable="false"
            @on-cancel="cancelEditDocument"
            @on-ok="updateDocument"
            @on-visible-change="handleEditVisibleChange"
        >
            <div class="modal-body" v-if="curDocument.id">
                <div class="modal-content">
                    <Row>
                        <label>文档名字</label>
                        <Input v-model="documentName"></Input>
                    </Row>
                    <Row>
                        <label>分组</label>
                        <div class="group-selected">
                            <span class="selected-item" v-if="curSelectedGroup.id">{{ curSelectedGroup.name }}<Icon type="md-close" @click.stop="deleteSelectedGroup()"/></span>
                            <Input class="group-input" v-model="groupName" @on-enter="handleGroupEnter()" placeholder="按回车键Enter创建分组"></Input>
                        </div>
                    </Row>
                    <Row>
                        <label>已有分组：</label>
                        <div class="groups">
                            <span class="group" v-for="(item,index) in groupsList" :key="index" :class="item.active?'active':''" @click="chooseGroup(item)">
                                {{ item.name }}
                                <Icon v-if="!item.active" type="md-close" @click.stop="deleteGroup(item.id)"/>
                            </span>
                        </div>
                    </Row>
                </div>
            </div>
        </Modal>
        <Modal
            class="img-modal"
            v-model="ifShowLargeImg"
            :mask-closable="false"
            :footer-hide="true"
            :width="900"
        >
            <div class="modal-body">
                <div class="modal-content">
                    <img :src="currentLargeUrl">
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { getPictureByGroup,addPicture,deletePicture } from '@/api/picture';
    import { getGroupsListByType,addGroup,deleteGroup } from '@/api/groupManage';
    export default {
        name: 'PictureManage',
        components: {
        },
        props: {

        },
        data() {
            return {
                documentsList: [],//所有文档

                ifShowAddDocument: false,
                ifShowEditDocument: false,
                ifShowLargeImg: false,

                documentItem: {},//新增文档时绑定的变量

                documentName: '',//新增和编辑的文档的名字

                curDocument: {},//当前编辑的文档

                pageNo: 1,
                pageSize: 10,
                pageCount: 0,
                totalCount: 0,

                uploading: false,
                name: '',//搜索的文档名
                groupId: '',//搜索的分组id
                groupsList: [],//分组列表,
                groupName: '',//创建的组名
                curSelectedGroup: {},//当前选中的分组
                currentLargeUrl: ''
            }
        },

        methods: {
            openAddDocumentModal() {
                this.ifShowAddDocument = true;
            },
            cancelAddDocument() {
                this.ifShowAddDocument = false;
            },
            handleAddVisibleChange() {
                if (!this.ifShowAddDocument) {
                    this.documentItem = {};
                    this.clearUploadData();
                } else {
                    this.getGroupsByType(); 
                }
            },
            openEditDocumentModal(item) {
                this.ifShowEditDocument = true;
                this.curDocument = { ...item };
            },
            cancelEditDocument() {
                this.ifShowEditDocument = false;
            },
            handleEditVisibleChange(item) {
                if (!this.ifShowEditDocument) {
                    this.curDocument = {};
                    this.clearUploadData();
                } else {
                    this.getGroupsByType().then(() => {
                        this.groupsList.map(group => {
                            if (group.id == this.curDocument.groupId) {
                                this.$set(group, 'active', true)
                            } else {
                                this.$set(group, 'active', false)
                            }
                        })
                        this.curSelectedGroup = this.groupsList.filter(group => group.id == this.curDocument.groupId)[0];
                    });
                    this.documentName = this.curDocument.name;
                }
            },
            getPicture() {
                const { groupId,pageNo,pageSize,name } = this;
                getPictureByGroup({ groupId,pageNo,pageSize,name }).then(data => {
                    this.documentsList = data.dataList; 
                    this.pageNo = data.pageNo;
                    this.pageCount = data.pageCount;
                    this.totalCount = data.totalCount;
                })
            },
            getGroupsByType() {//获取文档的分组
                return getGroupsListByType('picture').then(data => {
                    this.groupsList = data;
                })
            },
            addPicture() {
                if (!this.documentName) {
                    this.$Modal.error({
                        title: '消息',
                        content: '请填写图片名称！'
                    });
                    return;
                }
                if (Object.keys(this.documentItem).length!==0) {
                    this.documentItem.name = this.documentName;
                    if(this.curSelectedGroup.id) {
                        this.documentItem.groupId = this.curSelectedGroup.id;
                    }
                    addPicture(this.documentItem)
                    .then(data => {
                        if (data.result) {
                            this.$Modal.info({
                                title: '消息',
                                content: '添加图片成功！',
                            })
                            this.ifShowAddDocument = false;
                            this.documentItem = {};
                            this.clearUploadData();
                            this.getPicture();
                        } else {
                            this.$Modal.error(
                            {
                                title: '错误',
                                content: '添加图片失败！请重新添加！'
                            })
                        }
                    })
                }
                else {
                    this.$Modal.error({
                        title: '消息',
                        content: '请上传图片！'
                    })
                }
            },
            updateDocument() {//编辑文档
                let groupId;
                if(this.curSelectedGroup.id) {
                    groupId = this.curSelectedGroup.id;
                }
                updateDocument({
                    groupId: groupId,
                    id: this.curDocument.id,
                    name: this.documentName
                })
                .then(data => {
                    if (data) {
                        this.$Modal.info({
                            title: '消息',
                            content: '编辑成功！'
                        });
                        this.getPicture();
                    } else {
                        this.$Modal.error({
                            title: '消息',
                            content: '提交失败！请重新提交！'
                        })
                    }
                })
            },
            handleUploadSuccess(response,file) { //文档上传成功
                if (response.result) {
                    this.uploading = false;
                    this.documentItem = response.t;
                    this.documentName = response.t.name;
                } else {
                    this.$Modal.error({
                        title: '消息',
                        content: response.message
                    })
                }
            },
            beforeUpload() { //文档上传前
                this.uploading = true;
            },
            handleGroupEnter() {//回车创建分组
                if (this.groupName) {
                    addGroup({name:this.groupName,type:'picture'}).then(data => {
                        if (data) {
                            this.getGroupsByType();
                            this.groupName = '';
                        } else {
                            this.$Modal.error({
                                title: '消息',
                                content: '创建分组失败！请重新创建！'
                            })
                        }
                    })
                }
            },
            deleteGroup(id) {
                deleteGroup(id).then(data => {
                    if (data) {
                        this.getGroupsByType();                    
                    } else {
                        this.$Modal.error({
                            title: '消息',
                            content: '删除分组失败！请重新删除！'
                        })
                    }
                })
            },
            chooseGroup(item) {//选中分组
                this.curSelectedGroup = item;
                this.$set(item,'active',true);
                this.groupsList.map(group => {
                    if (group.id != item.id) {
                        this.$set(group,'active',false);
                    }
                })
            },
            deleteSelectedGroup() {//删除选中的分组
                this.curSelectedGroup = {},
                this.groupsList.map(group => {
                    this.$set(group,'active',false);
                })
            },
            clearUploadData() {//清空新增文档的草稿
                this.groupName = '';
                this.documentName = '';
                this.curSelectedGroup = {};
                this.groupsList.map(group => {
                    this.$set(group,'active',false);
                })
            },
            changePage(pageNumber) {
                this.pageNo = pageNumber;
                this.getPicture();
            },
            showLargePic(url){
                this.ifShowLargeImg = true;
                this.currentLargeUrl = url;
            },
            deletePic(item){
                deletePicture(item.id).then(data => {
                    if (data) {
                        this.$Modal.info({
                            title: '消息',
                            content: '删除成功！',
                        })
                        this.getPicture();
                    } else {
                        this.$Modal.error(
                        {
                            title: '错误',
                            content: '删除失败！'
                        })
                    }
                })
            }
        },
        created() {
            this.getGroupsByType();
            this.getPicture();
        },
        mounted() {
        }
    }
</script>