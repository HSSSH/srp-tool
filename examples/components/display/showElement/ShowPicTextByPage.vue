<style scoped lang="scss">
    .srp-pic-text-by-page {
        width: 100%;
        height: 100%;
        .pic-text-item {
            height: 28%;
            position: relative;
            padding: 20px;
            margin-bottom: 10px;
            display: block;
            overflow: hidden;
            background-color: #fafafa;
            .img-wrapper {
                float: left;
                width: 15%;
                height: 100%;
                border: 1px solid #e3e3e3;
                background-color: #fff;
                & > img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                display: inline-block;
                float: left; 
                margin-left: 30px;
                width: calc(85% - 130px);
                font-weight: bold;
                font-size: 16px;
            }
            .content {
                display: inline-block;
                float: left; 
                margin-left: 30px;
                width: calc(85% - 130px);
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box; 
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2; 
            }
            .create-time {
                position: absolute;
                top: 0;
                right: 0;
                display: inline-block;
                padding: 7% 16px;
                margin-left: 0;
                width: 80px;
                height: 100%;
                border: 1px solid #e1e1e1;
                border-left: none;
                font-size: 18px;
                background-color: #fff;
                .year {
                    font-size: 12px;
                }
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
    <div class="srp-pic-text-by-page">
        <div class="pic-text-item" v-for="(item,index) in picTextList">
            <div class="img-wrapper">
                <img v-if="item.titlePic" :src="item.titlePic" alt="title-pic" class="title-pic">
                <img v-if="!item.titlePic" src="@/images/icon/upload-pic.png" alt="title-pic-none-replace">
            </div>
            <div class="title">{{ item.title }}</div>
            <div class="content">{{ item.des }}</div>
            <div class="create-time">
                <div class="date">{{ item.date }}</div>
                <div class="year">{{ item.year }}</div>
            </div>
        </div>
        <Page 
            class="page"
            :current="pageNo"
            :total="totalNum" 
            :page-size="pageSize" 
            @on-change="changePage"
        />
    </div>
</template>
<script>
    import { getAllArticles } from '@/api/articleManage';
    export default {
        name: 'SrpPicTextByPage',
        components: {
        },
        props: {
            config: Object,
        },
        data() {
            return {
                pageNo: 1,
                pageSize: 3,
                totalNum: 0,

                picTextList: [],//图文的列表

                showSettingPanel: false,

            }
        },
        created() {
            this.getArticleByPage();
        },
        methods: {
            getArticleByPage() {
                getAllArticles({
                    pageNo:this.pageNo,
                    pageSize:this.pageSize,
                    groupId:this.config.groupId}).then(data => {
                    //对数据进行预处理创建时间分成年和日期
                    data.dataList.map(item => {
                        let date = item.createTime.split(' ')[0];
                        this.$set(item,'year',date.split('-')[0]);
                        this.$set(item,'date',date.split('-')[1] + '-' + date.split('-')[2]);
                    });
                    this.picTextList = data.dataList;
                    this.totalNum = data.totalCount;
                })
            },
            changePage(pageNumber) {
                this.pageNo = pageNumber;
                this.getArticleByPage();
            },
        },
        computed: {

        },
        watch: {

        }
    }
</script>