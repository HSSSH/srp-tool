<style scoped lang="scss">
    .left-bar {
        display: inline-block;
        width: 170px;
        background-color: #23242a;
        .bar-list {
            width: 100%;
            & > li > a {
                &.router-link-active {
                    color: #58b8ff;
                    & + .second-list {
                        display: block;
                    }
                }
                & + .second-list {
                    display: none;
                    & > li > a {
                        padding-left: 20px;
                        &.router-link-active {
                            color: #58b8ff;
                            background-color: #2e374e;
                        }
                    }
                }
            }            
            li {
                width: 100%;
                line-height: 45px;
                color: #2488eb;
                & > a {
                    display: block;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    &:hover {
                        color: #58b8ff;
                        background-color: #2e374e;
                    }
                    &.router-link-exact-active {
                        background-color: #2e374e;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="left-bar">
        <ul class="bar-list list">
            <li v-for="(item,index) in barLists" :key="index" class="first-level">
                <router-link class="first-level-item" :to="item.link">
                    {{ item.name }}
                </router-link>
                <ul class="second-list list">
                    <li v-for="(sub,subIndex) in item.sub" class="second-level" :key="subIndex">
                        <router-link class="second-level-item" :to="sub.link">
                            {{ sub.name }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'LeftBar',
        data() {
            return {
                barLists: [
                    {
                        id: '2',
                        name: '视图管理',
                        link: '/app/manage/siteManage',
                    }, {
                        id: '3',
                        name: '资源管理',
                        link: '/app/manage/sourceManage',
                        sub: [
                            {
                                id: '3-1',
                                name: '图片',
                                link: '/app/manage/sourceManage/pictureManage'
                            },
                            {
                                id: '3-2',
                                name: '视频',
                                link: '/app/manage/sourceManage/videoManage'
                            },
                            {
                                id: '3-3',
                                name: '文档',
                                link: '/app/manage/sourceManage/documentManage'
                            }
                        ]
                    }, {
                        id: '4',
                        name: '设置管理',
                        link: '/app/manage/developSection',
                    }
                ]
            }
        }
    }
</script>