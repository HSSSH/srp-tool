<style lang="scss" scoped>
    .video-manage {
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
        }
        .video-list {
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
    .add-video-modal {
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
                        & > textarea {
                            width: 100%;
                            border: 1px solid #e1e1e1;
                        }
                    }
                    .ivu-select {
                        width: calc(100% - 100px);
                        & > .ivu-select-dropdown {
                            z-index: 10002;
                        }
                    }
                    .upload-btn {
                        display: inline-block;
                        border: 1px solid #2d8cf0;
                        padding: 5px;
                        color: #2d8cf0;
                    }
                    .ivu-upload {
                        display: inline-block;
                        width: calc(100% - 100px);
                    }
                    img {
                        margin-left: 100px;
                        border: 1px solid #e3e3e3;
                        display: block;
                    }
                }
            }
        } 
        .confirm {
            color: #fff;
            background-color: #2d8cf0;
        } 
    }
    .edit-video-modal {
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
                        width: calc( 100% - 100px );
                        vertical-align: top;
                    }
                    &.handle-nav {
                        .ivu-date-picker {
                            width: 200px;
                            & .ivu-input-wrapper {
                                width: 200px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="video-manage">
        <div class="nav">
            <Button class="add-btn" @click="openAddVideoModal">添加视频</Button>
        </div>
        <div class="video-list" v-better-scroll>
            <table>
                <tr>
                    <th>操作</th>
                    <th>视频名字</th>
                    <th>上传者</th>
                    <th>上传时间</th>
                </tr>
                <tr v-for="(item,index) in videos" :key="index">
                    <td>
                        <span @click="openEditVideoModal(item)">编辑</span>
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.applicant }}</td>
                    <td>{{ item.createTime }}</td>
                </tr>
            </table>
        </div>
        <Modal
            class="add-video-modal"
            title="添加视频"
            v-model="ifShowAddVideo"
            :mask-closable="false"
            @on-cancel="cancelAddVideo"
            @on-visible-change="handleAddVisibleChange"
        >
            <div class="modal-body" v-if="ifShowAddVideo">
                <div class="modal-content">
                    <Row>
                        <label>视频名字</label>
                        <Input v-model="videoName" />
                    </Row>
                    <Row>
                        <label>上传者</label>
                        <Input v-model="videoApplicant" />
                    </Row>
                    <Row>
                        <label>视频上传</label>
                        <Upload
                            action="/source/srp/source/upload?sourceType=video "
                            accept="video/mp4"
                            :multiple="false"
                            :on-success="handleUploadSuccess"
                            :show-upload-list="true"
                            :before-upload="beforeUpload"
                        >
                            <i-button icon="ios-cloud-upload" :loading="uploading">上传</i-button>
                        </Upload>
                    </Row>
                </div>
            </div>
            <div slot="footer">
                <i-button class="confirm" @click="addVideo()">保存</i-button>
            </div>
        </Modal>
        <Modal
            class="edit-video-modal"
            title="视频详情"
            v-model="ifShowEditVideo"
            :mask-closable="false"
            @on-cancel="cancelEditVideo"
            @on-visible-change="handleEditVisibleChange"
        >
            <div class="modal-body" v-if="curVideo.id">
                <div class="modal-content">
                    <Row>
                        <label>视频名字</label>
                        <Input disabled v-model="curVideo.name" />
                    </Row>
                    <Row>
                        <label>上传者</label>
                        <Input disabled v-model="curVideo.applicant" />
                    </Row>
                    <Row class="handle-nav">
                        <label>上传时间</label>
                        <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model="curVideo.createTime" format="yyyy-MM-dd HH:mm:ss"></DatePicker>
                    </Row>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { addVideo,getAllVideos } from '@/api/videoManage';
    import { formatDate } from '@/utils/util';
    export default {
        name: 'VideoManage',
        components: {
        },
        props: {

        },
        data() {
            return {
                videos: [],//所有视频
                ifShowAddVideo: false,
                ifShowEditVideo: false,
                videoItem: {},//新增视频时绑定的变量
                videoApplicant: '',
                videoName: '',
                curVideo: {},
                pageNo: 1,
                pageSize: -1,
                uploading: false
            }
        },

        methods: {
            openAddVideoModal() {
                this.ifShowAddVideo = true;
            },
            cancelAddVideo() {
                this.ifShowAddVideo = false;
            },
            handleAddVisibleChange() {
                if (!this.ifShowAddVideo) {
                    this.videoItem = {};
                }
            },
            openEditVideoModal(item) {
                this.ifShowEditVideo = true;
                this.curVideo = { ...item };
            },
            cancelEditVideo() {
                this.ifShowEditVideo = false;
            },
            handleEditVisibleChange(item) {
                if (!this.ifShowEditVideo) {
                    this.curVideo = {};
                }
            },
            getAllVideos() {
                getAllVideos().then(data => {
                    this.videos = data;
                });
            },
            addVideo() {
                this.videoItem.applicant = this.videoApplicant;
                this.videoItem.name = this.videoName;
                addVideo(this.videoItem)
                .then(data => {
                    if (data) {
                        this.$Modal.info({
                            title: '消息',
                            content: '添加视频成功！',
                        })
                        this.ifShowAddVideo = false;
                        this.getAllVideos();
                    } else {
                        this.$Modal.error(
                        {
                            title: '错误',
                            content: '添加视频失败！'
                        })
                    }
                })
            },
            handleUploadSuccess(response,file) { //视频上传成功
                if (response.result) {
                    this.uploading = false;
                    this.videoItem = response.t;
                } else {
                    this.$Modal.error({
                        title: '消息',
                        content: response.message
                    })
                }
            },
            beforeUpload() { //视频上传前
                this.uploading = true;
            }
        },
        created() {
            this.getAllVideos();          
        },
        mounted() {
        }
    }
</script>