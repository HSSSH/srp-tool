<style lang="scss" scoped>
    .tool-bar {
        position: fixed;
        left: 0px;
        top: 60px;
        width: 40px;
        height: 100%;
        font-size: 16px;
        text-align: center;
        color: #8c8c8c;
        z-index: 5;
        .tool-banner {
            position: absolute;
            left: 0px;
            width: 100%;
            height: 100%;
            background-color: #fff;
            border: 1px solid #dcdcdc;
            .tool-banner-item {
                margin-bottom: 15px;
                i {
                    font-size: 28px;
                    color: #bdbdbd;
                    &:hover,&:active {
                        color: #2d8cf0;
                    }
                }
            }
        }  
    }
</style>
<template>
    <div class="tool-bar">
        <ul class="tool-banner">
            <li class="tool-banner-item" v-for="(item,index) in tools" :keys="index" @click="openDetailList(item)">
                <i class="iconfont" :class="tools[index].type" :style="item.active?'color: #358ae5':'color: #bdbdbd'"></i>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tools: [
                {   
                    name: '模块列表',
                    type: 'icon-renwuxiangqing',
                },
                {
                    name: '产品列表',
                    type: 'icon-chanpin'
                },
                {
                    name: '页面列表',
                    type: 'icon-shengchanguanli'
                }
            ],
            ifModulesActive: false,
            ifPagesActive: false,
        }
    },
    props: {
    },
    methods: {
        openDetailList(item) {//向父组件传递需要打开的列表类型
            if (!item.active) {
                this.tools.map((tool) => {
                    if (Object.is(item,tool)) {
                        this.$set(item,'active',true);
                    } else {
                        this.$set(tool,'active',false);
                    }
                })
            } else {
                this.tools.map((tool) => {
                    if (Object.is(item,tool)) {
                        this.$set(item,'active',!item.active);
                    } else {
                        this.$set(tool,'active',false);
                    }
                })
            }
            this.$emit('openDetailList',item.name);
        }
    }
}
</script>