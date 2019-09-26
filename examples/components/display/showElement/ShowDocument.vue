<style scoped lang="scss">
    .srp-document {
        width: 100%;
        height: 100%;
        .handle-bar {
            width: 100%;
            height: 40px;
           .search-btn {
               float: right;
               position: relative;
               display: inline-block;
               width: 240px;
               height: 100%;
               & > input {
                   padding-left: 20px;
                   height: 100%;
                   width: 100%;
                   border-radius: 20px;
               }
               & > i {
                   position: absolute;
                   top: 0;
                   right: 0;
                   width: 50px;
                   height: 40px;
                   color: #fff;
                   cursor: pointer;
                   border-radius: 20px;
                   background-color: #54a3ff;
                   text-align: center;
                   &:before {
                       font-size: 26px;
                   }
               }
           } 
        }
        .pic-text-item {
            height: 60px;
            position: relative;
            display: block;
            overflow: hidden;
            background-color: #fafafa;
            &:nth-child(odd) {
                background: #fff;
            }
            &:nth-child(even) {
                background: #f8f8f8;
            }
            & > i {
                margin: 12px 24px;
                line-height: 60px;
                color: #ffba4c;
                vertical-align: middle;
            }
            .name {
                line-height: 60px;
                display: inline-block;
                width: calc(85% - 130px);
                font-size: 18px;
                letter-spacing: 1px;
                color: #333333;
                cursor: pointer;
            }
            .create-time {
                margin-right: 24px;
                line-height: 60px;
                float: right;
                display: inline-block;
                height: 100%;
                font-size: 16px;
                color: #666;
            }
        }
        .page {
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
</style>
<template>
    <div class="srp-document">
        <div class="handle-bar">
            <div class="search-btn">
                <input type="text" v-model="name" ref="input" placeholder="搜索标题" />
                <i class="iconfont iconsousuo1" @click="getDocumentByPage()"></i>
            </div>
        </div>
        <div class="pic-text-item" v-for="(item,index) in documentsList">
            <i class="iconfont iconwenjian"></i>
            <div class="name" @click="downloadFile(item)">{{ item.name }}</div>
            <div class="create-time">{{ item.createTime?item.createTime.split(' ')[0]:'' }}</div>
        </div>
        <Page 
            class="page"
            :current="pageNo"
            :total="totalNum" 
            :page-size="config.pageNum" 
            @on-change="changePage"
            show-total
            show-elevator
        >
            <slot>共{{pageNum}}页/{{ totalNum }}条</slot>
        </Page>
    </div>
</template>
<script>
    import { getDocuments } from '@/api/documentManage';
    export default {
        props: {
            config: Object,
        },
        data() {
            return {
                pageNo: 1,
                totalNum: 0,
                pageNum: 0,//共几页

                documentsList: [],//图文的列表

                name: ''//搜索标题
            }
        },
        created() {
            this.getDocumentByPage();
        },
        methods: {
            getDocumentByPage() {
                const { pageNo,name } = this;
                let groupId = this.config.groupId;
                let pageSize = this.config.pageNum;
                getDocuments({ pageNo,pageSize,groupId,name })
                .then(data => {
                    this.documentsList = data.dataList;
                    this.totalNum = data.totalCount;
                    this.pageNum = data.pageCount;
                })
            },
            changePage(pageNumber) {
                this.pageNo = pageNumber;
                this.getDocumentByPage();
            },
            changeGroupId() {
                this.pageNo = 1;
                this.getDocumentByPage();
            },
            downloadFile(item) {
                window.open('/source/srp/source/manage/download?url='+item.url)
            }
        },
    }
</script>