<style lang="scss" scoped>
    .srp-album {
        width: 100%;
        height: 100%;
        .album-list {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .album-item {
                margin: 0 24px 30px 0;
                display: inline-block;
                width: 277px;
                cursor: pointer;
                & > .image-wrapper {
                    overflow: hidden;
                    width: 100%;
                    height: 156px;
                    display: flex;
                    align-items: center;
                    & > img {
                        display: block;
                        height: 100%;
                        margin: 0 auto;
                    }
                }
                & > .title {
                    width: 100%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                }
            }
        }
        .detail-container {
            width: 100%;
            height: 100%;
            padding-right: 5px;
            .album-detail {
                & > span {
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    cursor: pointer;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    & > span {
                        font-size: 16px;

                    }
                }
            }
        }
    }
</style>
<template>
    <div class="srp-album">
        <div class="album-list" v-if="config.ifUseData && !ifOpenDetail">
            <div class="album-item" 
                v-for="(item,index) in albumList" 
                @click="config.ifUseData?openDetail(item):''"
                :style="config.eleStyle"
                :key="index"
            >
                <div class="image-wrapper" :style="config.imgStyle">
                    <img :src="item.titlePic?item.titlePic:require('@/images/icon/upload-pic.png')" alt="pic">
                </div>
                <div class="title" v-if="config.ifShowLabel">{{ item.title }}</div>
            </div>
        </div>
        <div class="detail-container" v-better-scroll v-if="ifOpenDetail">
            <div class="album-detail">
                <span @click="goback"><Icon type="ios-arrow-back" />返回</span>
                <div class="title">
                    {{ curItem.title }}
                </div>
                <div v-html="curItem.content"></div>
            </div>
        </div>
        <div class="album-list" v-if="!config.ifUseData">
            <div class="album-item" 
                v-for="(item,index) in config.contentList" 
                @click="config.ifUseData?openDetail(item):''"
                :style="config.eleStyle"
                :key="index"
            >
                <div class="image-wrapper" :style="config.imgStyle">
                    <img :src="item.titlePic?item.titlePic:require('@/images/icon/upload-pic.png')" alt="pic">
                </div>
                <div class="title" v-if="config.ifShowLabel">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { getAllArticles } from '@/api/articleManage';
export default{
    props: {
        config: Object,
        publishWeb: Boolean
    },
    data: function() {
        return {
            showSettingPanel: false,
            albumList: [],
            ifOpenDetail: false,
            curItem: {}
        }
    },
    created() {
        if(this.config.ifUseData) {
            this.getAllArticles();
        } else {
            this.albumList = this.config.contentList;
        }
    },
    methods: {
        getAllArticles() {
            getAllArticles({groupId: this.config.groupId}).then(data => {
                this.albumList = data.dataList;
            });
        },
        openDetail(item) {
            this.ifOpenDetail = true;
            this.curItem = item;
        },
        goback() {
            this.ifOpenDetail = false;
            this.curItem = {};
        }
    }
}
</script>