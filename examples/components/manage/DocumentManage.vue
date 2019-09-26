<style lang="scss" scoped>
    .document-manage {
        position: relative;
        height: 100%;
        width: 100%;
        .nav {
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            width: 100%;
            background-color: #fff;
            .search-btn {
                width: 200px;
            }
            .right {
                .group-select {
                    margin-right: 10px;
                    width: 142px;
                }
                label {
                    margin-right: 10px;
                }
            }
            
        }
        .document-list {
            position: absolute !important;
            top: 80px;
            margin: 20px;
            height: calc( 100% - 120px);
            width: calc( 100% - 40px );
            background-color: #fff;
            table {
                width: 100%;
                text-align: center;
                & > tr {
                    height: 50px;
                    & > td {
                        span {
                            margin-right: 10px;
                            color: #2d8bf0;
                            cursor: pointer;
                        }
                    }
                    & > th {
                        text-align: center;
                        background-color: #e6e7ef;
                    }
                    &:nth-child(odd) {
                        background-color: #cdd6e0;
                    }
                }
            }
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
</style>
<template>
    <div class="document-manage">
        <div class="nav">
            <Input class="search-btn" search enter-button @on-search="getDocuments()" v-model="name" placeholder="搜索标题" />
            <div class="right">
                <label>分组:</label>
                <el-select  class="group-select" v-model="groupId" size="small" @change="getDocuments()" clearable>
                    <el-option v-for="(item,index) in groupsList" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <Button class="add-btn" @click="openAddDocumentModal">添加文档</Button>
            </div>
        </div>
        <div class="document-list" v-better-scroll>
            <table>
                <tr>
                    <th>文档名字</th>
                    <th>上传时间</th>
                    <th>分组</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item,index) in documentsList" :key="index">
                    
                    <td>{{ item.name }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.groupName }}</td>
                    <td>
                        <span @click="openEditDocumentModal(item)">编辑</span>
                    </td>
                </tr>
            </table>
        </div>
        <Modal
            class="add-document-modal"
            title="添加文档"
            v-model="ifShowAddDocument"
            :mask-closable="false"
            @on-cancel="cancelAddDocument"
            @on-visible-change="handleAddVisibleChange"
        >
            <div class="modal-body" v-if="ifShowAddDocument">
                <div class="modal-content">
                    <Row>
                        <label>文档上传</label>
                        <Upload
                            action="/source/srp/source/upload?sourceType=doc "
                            accept="application/vnd.ms-powerpoint,application/vnd.ms-excel, 
application/msword"
                            :multiple="false"
                            :on-success="handleUploadSuccess"
                            :show-upload-list="true"
                            :before-upload="beforeUpload"
                        >
                            <i-button icon="ios-cloud-upload" :loading="uploading">上传</i-button>
                        </Upload>
                    </Row>
                    <Row>
                        <label>文档名字</label>
                        <Input v-model="documentName" />
                    </Row>
                    <Row>
                        <label>分组</label>
                        <div class="group-selected">
                            <span class="selected-item" v-if="curSelectedGroup.id">{{ curSelectedGroup.name }}<Icon type="md-close" @click.stop="deleteSelectedGroup()"/></span>
                            <Input class="group-input" v-model="groupName" @on-enter="handleGroupEnter()" placeholder="按回车键Enter创建分组" />
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
                <i-button class="confirm" @click="addDocument()">保存</i-button>
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
                        <Input v-model="documentName" />
                    </Row>
                    <Row>
                        <label>分组</label>
                        <div class="group-selected">
                            <span class="selected-item" v-if="curSelectedGroup.id">{{ curSelectedGroup.name }}<Icon type="md-close" @click.stop="deleteSelectedGroup()"/></span>
                            <Input class="group-input" v-model="groupName" @on-enter="handleGroupEnter()" placeholder="按回车键Enter创建分组" />
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
    </div>
</template>
<script>
    import { addDocument,getDocuments,updateDocument } from '@/api/documentManage';
    import { getGroupsListByType,addGroup,deleteGroup } from '@/api/groupManage';
    export default {
        name: 'DocumentManage',
        components: {
        },
        props: {

        },
        data() {
            return {
                documentsList: [],//所有文档

                ifShowAddDocument: false,
                ifShowEditDocument: false,

                documentItem: {},//新增文档时绑定的变量

                documentName: '',//新增和编辑的文档的名字

                curDocument: {},//当前编辑的文档

                pageNo: 1,
                pageSize: -1,

                uploading: false,
                name: '',//搜索的文档名
                groupId: '',//搜索的分组id
                groupsList: [],//分组列表,
                groupName: '',//创建的组名
                curSelectedGroup: {}//当前选中的分组
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
            getDocuments() {
                const { groupId,pageNo,pageSize,name } = this;
                getDocuments({ groupId,pageNo,pageSize,name }).then(data => {
                    this.documentsList = data.dataList; 
                })
            },
            getGroupsByType() {//获取文档的分组
                return getGroupsListByType('doc').then(data => {
                    this.groupsList = data;
                })
            },
            addDocument() {
                if (!this.documentName) {
                    this.$Modal.error({
                        title: '消息',
                        content: '请填写文件名字！'
                    });
                    return;
                }
                if (Object.keys(this.documentItem).length!==0) {
                    this.documentItem.name = this.documentName;
                    if(this.curSelectedGroup.id) {
                        this.documentItem.groupId = this.curSelectedGroup.id;
                    }
                    addDocument(this.documentItem)
                    .then(data => {
                        if (data.result) {
                            this.$Modal.info({
                                title: '消息',
                                content: '添加文档成功！',
                            })
                            this.ifShowAddDocument = false;
                            this.documentItem = {};
                            this.clearUploadData();
                            this.getDocuments();
                        } else {
                            this.$Modal.error(
                            {
                                title: '错误',
                                content: '添加文档失败！请重新添加！'
                            })
                        }
                    })
                }
                else {
                    this.$Modal.error({
                        title: '消息',
                        content: '请上传文档！'
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
                        this.getDocuments();
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
                    addGroup({name:this.groupName,type:'doc'}).then(data => {
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
            }
        },
        created() {
            this.getDocuments();
            this.getGroupsByType(); 
        },
        mounted() {
        }
    }
</script>