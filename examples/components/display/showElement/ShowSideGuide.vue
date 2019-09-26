<style scoped lang="scss">
    .srp-side-guide {
        width: 100%;
        height: 100%;
        & > div {
            display: inline-block;
        }
        .left {
            width: 20%;
            > ul > li {
                margin-bottom: 5px;
                border-left: 5px solid #c1c1c1;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background-color: #e1e1e1;
                &.active {
                    background-color: #2d8cf0;
                    border-left: none;
                    color: #fff;
                }
            }
        }
        .right {
            margin-left: 30px;
            width: calc(80% - 30px);
            height: 100%;
            background-color: #e3e3e3;
            vertical-align: top;
        }
    }
</style>
<template>
    <div class="srp-side-guide">
        <div class="left">
            <ul>
                <li 
                    v-for="(item,index) in config.contentList" 
                    :key="index" 
                    :class="index == curIndex ? 'active' : ''"
                    @click="selectGuide(index)"
                >
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="content" v-html="config.contentList[curIndex].content"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ShowSideGuide',
        components: {
        },
        props: {
            config: Object
        },
        data() {
            return {
                curIndex: 0,//当前选中导航栏的索引
            }
        },
        created() {},
        methods: {
            selectGuide(index) {
                this.curIndex = index;
            },
        }
    }
</script>