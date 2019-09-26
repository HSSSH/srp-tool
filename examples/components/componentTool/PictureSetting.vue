<!-- 
选择图片的组件
duplicate可不传
<PictureSettingModal
    :duplicate=""
    :settingModalShow=""
    @confirmSelected=""
/>
-->

<style lang="scss" scoped>
    .pictures-modal {
        position: relative;
        .modal-body {
            width: 100%;
            height: 540px;
            .ivu-row {
                & > label {
                    display: inline-block;
                    width: 100px;
                    margin-right: 10px;
                } 
                & > .ivu-switch {
                    display: inline-block;
                }
            }
            .pictures-upload-btn {
                /deep/ .ivu-upload-list {
                    position: relative;
                    width: 100px;
                }
            }
            /deep/ .ivu-progress {
                    position: absolute;
                    top: 90px;
                    padding: 0 5px;
                    width: 100px;
                    z-index: 2;                    
                .ivu-progress-bg {
                    background-color: #2d8cf0;
                }
                /deep/ .ivu-progress-success-bg {
                    background-color: #2d8cf0 !important;
                }
            }
            .pictures-list {
                position: relative;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                margin-top: 20px;
                
                & > li:nth-child(7n) {
                    margin-right: 0px;
                }
                & > li {
                    position: relative;
                    margin-right: 20px;
                    float: left;
                    & > .picture-thumb,& > .picture-thumb-upload {
                        display: flex;
                        align-items: center;
                        width: 100px;
                        height: 100px;
                        background-color: #f3f3f3;
                        border: 1px solid #fff;
                        &:hover {
                            border: 1px solid #1bbb43;
                        }
                        & > img {
                            max-width: 100%;
                            max-height: 100%;
                            width: 100%;
                        }
                    }
                    & > p {
                        width: 100px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
<template>
    <Modal
        class="pictures-modal"
        v-model="visible"
        title="选择图片"
        width="900"
        :mask-closable="false"
        :draggable="true"
        :scrollable="true"
        @on-visible-change="handleVisibleChange"
    >
        <div class="modal-body" v-better-scroll>
            <div class="modal-content">
                <Upload 
                    ref="upload"
                    action="source/srp/source/upload?sourceType=picture" 
                    class="pictures-upload-btn upload-btn"
                    :multiple="false"
                    :accept="'image/*'"
                    :on-success="handleSuccess"
                    :show-upload-list="false"
                >
                    <i-button icon="ios-cloud-upload">上传</i-button>
                </Upload>
                <Progress class="picture-thumb-progress" v-if="progressBarShow" :percent="progressBarPercent" status="active" hide-info/>
                <ul class="pictures-list">
                    <template v-if="showUploadFileList">
                        <li v-for="(item,index) in uploadFileList" :key="index">
                            <div class="picture-thumb-upload" v-if="item.response">
                                <img :src="item.response.t.absoluteUrl" alt="pictures">
                            </div>
                            <p class="picture-name" v-if="item.response">{{ item.name }}</p>
                        </li>
                    </template>
                    <li v-for="(item,index) in allPicturesList" :key="index" @click="selectItem(item)">
                        <div class="picture-thumb" :style="item.selected?'border: 1px solid #1bbb43':''">
                            <img :src="item.absoluteUrl" alt="pictures">
                        </div>
                        <p class="picture-name">{{ item.name }}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div slot="footer" class="footer">
            <i-button class="cancel-btn" @click="closeModal()">取消</i-button>
            <i-button class="submit-btn" type="primary" @click="selectedPictureArr()">确认</i-button>
        </div>
    </Modal>
</template>
<script>
    import { getAllPicturesList,addPicture } from "@/api/picture";
    export default{
        name: 'PictureSelectModal',
        data() {
            return {
                allPicturesList: [],
                visible: false,
                curItem: {},
                uploadFileList: [],
                progressBarShow: false,//是否显示进度条
                progressBarPercent: 0,//进度条的进度
                showUploadFileList: false,//是否显示上传的文件
            }
        },
        computed:{
        },
        watch: {
            settingModalShow(value) {
                if (value) {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
            },
        },
        props: {
            settingModalShow: Boolean,
            duplicate: {//是否多选
                type: Boolean,
                default: false
            },
        },
        methods: {
            closeModal() { 
                this.$emit('closeModal')
            },
            getAllPicturesList() {
                getAllPicturesList().then(data => {
                    this.allPicturesList = data;
                });
            },
            handleVisibleChange() {
                if (this.visible) {
                    this.getAllPicturesList();
                } else {
                    this.curItem = {};
                    this.uploadFileList = [];
                    this.allPicturesList.map(item => {
                        item.selected = false;
                    });//取消选中
                    this.$emit('closeModal');//把关闭状态传到父元素
                }
            },
            selectItem(item) {//单选多选时设置当前选中
                const vm = this;
                if (item.selected) {
                    vm.$set(item,'selected',false);
                    if (!vm.duplicate) {
                        vm.curItem = {};
                    }
                } else {
                    vm.$set(item,'selected',true);
                    if(!vm.duplicate) {
                        vm.curItem = item;
                        setOtherUnselected(item);
                    }
                }
                function setOtherUnselected (item) {
                    vm.allPicturesList.map(target => {
                        if(target.id != item.id) {
                            target.selected = false;
                        }
                    })
                }
            },
            addPicture(pictureObj) { //保存图片
                return addPicture(pictureObj);
            },
            handleSuccess (response,file) { //上传成功
                const vm = this;                
                function setProgressPercent(callback) {
                    let count = 0;
                    let percentInterVal = setInterval(() => {
                        count++;
                        if (count>100) {
                            clearInterval(percentInterVal);
                            setTimeout(() => {
                                vm.progressBarShow = false;
                                vm.progressBarPercent = 0;
                            },100)
                            callback&&callback();
                        } else {
                            vm.progressBarPercent = count;
                        } 
                    },30);
                }
                if (response.t) {
                    vm.addPicture(response.t).then((data) => {
                        if (data.result) {
                            vm.uploadFileList = JSON.parse(JSON.stringify(vm.$refs.upload.fileList));
                            vm.showUploadFileList = true;
                            vm.progressBarShow = true;
                            setProgressPercent(() => {
                                vm.$refs.upload.fileList.length = 0;
                                vm.getAllPicturesList();
                                vm.showUploadFileList = false;
                            });
                        } else {
                            vm.$Modal.error({
                                title: '错误',
                                content: data.message
                            });
                            vm.$refs.upload.fileList.splice(0,1);
                            vm.uploadFileList.splice(0,1);
                        }
                    },(err) => {
                        vm.$Modal.error({
                            title: '错误',
                            content: err
                        })
                    });
                }
            },
            selectedPictureArr() {
                const vm = this;
                if (!vm.duplicate) {
                    if (Object.keys(vm.curItem).length!=0) {
                        let selectedPicArr = [];
                        selectedPicArr.push(vm.curItem);
                        this.$emit('confirmSelected',selectedPicArr);
                    } else {
                        this.$Modal.info({
                            title: '消息',
                            content: '请选择图片！'
                        })
                    }
                } else {
                    let selectedPicArr = vm.allPicturesList.filter(item => item.selected);
                    this.$emit('confirmSelected',selectedPicArr);
                }
            }
        },
        created(){
        }
    }
</script>