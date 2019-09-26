<style scoped lang="scss">
    .srp-pic-text-by-page2 {
        width: 100%;
        height: 550px;
        .articles {
            .handle-bar {
                width: 100%;
                height: 40px;
                margin-bottom: 50px;
                .search-btn {
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
                & > label {
                    margin-right: 10px;
                    height: 40px;
                    line-height: 40px;
                    float: right;
                    font-size: 14px;
                }
                & > .el-select {
                    width: 250px;
                    height: 40px;
                    border-radius: 4px;
                    float: right;
                    /deep/.el-input {
                       & > input {
                           background-color: #f3f3f3;
                       }
                       & > .el-input__suffix > .el-input__suffix-inner > i:before{
                            content: '\e790';
                       }
                    }
                    
                }
            }
            .pic-text-item {
                height: 169px;
                position: relative;
                margin-bottom: 10px;
                display: block;
                overflow: hidden;
                background-color: #fafafa;
                .img-wrapper {
                    float: left;
                    font-size: 0;
                    width: 300px;
                    height: 100%;
                    border: 1px solid #e3e3e3;
                    background-color: #fff;
                    & > img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .content-wrapper {
                    display: inline-block;
                    margin: 0 30px 0 30px;
                    width: calc(100% - 360px);
                    .date {
                        position: absolute;
                        bottom: 20px;
                    }
                    & > .title {
                        font-family: MicrosoftYaHei;
                    }
                }
            }
            .page {
                position: absolute;
                right: 0;
                bottom: 0;
            }
        }
        .detail-container {
            width: 100%;
            height: 100%;
            padding-right: 10px;
            .detail {
                & > span {
                    position: absolute;
                    top: 0;
                    left: 0;
                    font-size: 16px;
                }
                & > .title {
                    margin-bottom: 18px;
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                }
                & > .date {
                    margin-bottom: 40px;
                    text-align: right;
                    font-weight: 14px;
                    color: #666;
                }
            }
        }
    }
</style>
<template>
    <div class="srp-pic-text-by-page2">
        <div class="articles" v-if="!ifShowDetailPage">
            <div class="handle-bar" v-if="config.ifShowSearchBtn||config.ifShowDomainSelect">
                <div v-if="config.ifShowSearchBtn" class="search-btn" :style="{ float:config.searchBtnFloat }">
                    <input type="text" v-model="title" @click="focus()" ref="input" placeholder="搜索标题" />
                    <i class="iconfont iconsousuo1" @click="getArticleByPage()"></i>
                </div>
                <el-select v-if="config.ifShowDomainSelect" v-model="tagId" placeholder="请选择" @change="getArticleByPage()">
                    <el-option
                        v-for="(item,index) in config.tagsList"
                        :key="index"
                        :label="item.tagName"
                        :value="item.id">
                    </el-option>
                </el-select>
                <label v-if="config.ifShowDomainSelect">领域筛选:</label>
            </div>
            <div class="pic-text-item" v-for="(item,index) in picTextList" :style="config.eleStyle" @click="openDetail(item)" :key="index">
                <div class="img-wrapper" :style="{ float:config.picFloat }" v-if="config.ifShowPic">
                    <img :src="item.titlePic?item.titlePic:require('@/images/icon/upload-pic.png')" alt="title-pic" class="title-pic">
                </div>
                <div class="content-wrapper" :style="{float:config.picFloat}">
                    <div class="title" :style="config.titleStyle">{{ item.title }}</div>
                    <div class="sub-title" :style="config.subTitleStyle">{{ item.subTitle }}</div>
                    <div class="content">{{ item.des }}</div>
                    <div class="date" v-if="config.ifShowDate">{{ item.createTime?item.createTime.split(' ')[0]:'' }}</div>
                </div>
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
        <div class="detail-container" v-if="ifShowDetailPage" v-better-scroll="{init:scrollBarRefresh}">
            <div class="detail">
                <span @click="goBack()"><Icon type="ios-arrow-back" />返回</span>
                <p class="title">{{ curItem.title }}</p>
                <p class="date">发布时间：{{ curItem.createTime }}</p>
                <div class="content" v-html="curItem.content"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getAllArticles,getArticle,getPageNoByArticleId } from '@/api/articleManage';
    export default {
        components: {
        },
        props: {
            config: Object,
            allIndex: Object
        },
        data() {
            return {
                pageNo: 1,
                totalNum: 0,
                pageNum: 0,
                title: '',//搜索的标题关键字
                tagId: '',//搜索的领域的id
                picTextList: [],//图文的列表

                ifShowDetailPage: false,
                curItem: {}//当前查看详情文章

            }
        },
        created() {
            let newId = this.$route.query.newId;
            if (newId) {
                getArticle(newId).then(data => {
                    this.curItem = data;
                    this.ifShowDetailPage = true;
                })
            }
            this.getArticleByPage();
        },
        methods: {
            getArticleByPage() {
                getAllArticles({
                    pageNo:this.pageNo,
                    pageSize:this.config.pageNum,
                    groupId:this.config.groupId,
                    title: this.title,
                    tagId: this.tagId
                })
                .then(data => {
                    this.picTextList = data.dataList;
                    this.totalNum = data.totalCount;
                    this.pageNum = data.pageCount;
                    this.ifGroupIdChange = false;
                })
            },
            changePage(pageNumber) {
                this.pageNo = pageNumber;
                this.getArticleByPage();
            },
            focus() {
                this.$refs.input.focus();
            },
            openDetail(item) {
                let isMove = this.$store.state.event.isMove;
                if (isMove) return;
                this.curItem = item;
                this.ifShowDetailPage = true;
            },
            goBack() {
                let newId = this.$route.query.newId;
                if (newId) {
                    getPageNoByArticleId(newId).then(data => {
                        this.pageNo = data;
                        this.getArticleByPage();
                    })
                }
                this.curItem = {};
                this.ifShowDetailPage = false;
            },
            scrollBarRefresh(scroller) {
                scroller.refresh();
            }
        },
        computed: {

        },
        watch: {
            'config.pageNum':function(val) {
                this.getArticleByPage();
            },
            'config.groupId': function(val) {
                this.getArticleByPage();
            }
        }
    }
</script>