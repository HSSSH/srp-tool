<style scoped lang="scss">
.design-tool {
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
                cursor: pointer;
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
    .tool-list {
        position: fixed;
        left: 40px;
        top: 60px;
        width: 232px;
        height: 100%;
        background: #fff;
        z-index: 999;
        overflow: hidden;
        font-family: "微软雅黑";
        box-shadow: 1px 3px 6px 0px rgba(0, 0, 0, 0.13);
        .title {
            height: 40px;
            color: #333;
            opacity: 0.4;
            font-size: 14px;
            line-height: 40px;
            border-bottom: 1px solid #ebebeb;
        }
        .content {
            .type-nav {
                padding-left: 15px;
                height: 42px;
                line-height: 42px;
                border-bottom: 1px solid #ebebeb;
                cursor: pointer;
                &:hover {
                    color: #358ae5 !important;
                }
            }
            .type-list {
                .type-item {
                    display: inline-block;
                    padding: 8px 0px;
                    border-right: 1px solid #ebebeb;
                    border-bottom: 1px solid #ebebeb;
                    width: 58px;
                    height: 58px;
                    text-align: center;
                    color: #333;
                    &:nth-child(4n) {
                        border-right: none;
                    }
                    i {
                        color: #bdbdbd; 
                        height: 50%;
                        display: block;
                    }
                    & > p {
                        width: 100%;
                        text-overflow: ellipsis;
                        white-space:nowrap; 
                        overflow:hidden; 
                    }
                }
            }
        }
    }
}
</style>

<template>
<div class="design-tool">
    <div class="tool-bar">
        <ul class="tool-banner">
            <li class="tool-banner-item" v-for="(item,index) in toolList" :key="index" @click="openDetailList(item)">
                <i class="iconfont" :class="toolList[index].icon" :style="item.active?'color: #358ae5':'color: #bdbdbd'"></i>
            </li>
        </ul>
    </div>
    <template v-for="(tool,index) in toolList">
        <div class="tool-list" :key="index" v-if="tool.active" @mouseleave="dragLeaveToolList($event)" @dragleave="dragLeaveToolList($event)">
            <div class="title">
                {{tool.name}}
            </div>
            <div class="content">
                <div v-for="(toolType,typeIndex) in tool.contentList" :key="typeIndex">
                    <p class="type-nav" @click="showTypeList(index,typeIndex)" :style="toolType.ifShowDetail?'color: #358ae5':'color: #8c8c8c'">
                        <Icon type="md-arrow-dropup" v-if="!toolType.ifShowDetail"/>
                        <Icon type="md-arrow-dropdown" v-if="toolType.ifShowDetail"/>
                        {{toolType.text}}
                    </p>
                    <div class="type-list" v-if="toolType.ifShowDetail">
                        <div 
                            :id="but.type" 
                            v-for="(but) in toolType.children" 
                            :key="but.type" 
                            class="type-item" 
                            draggable="true" 
                            @dragstart="dragEle($event)" 
                            @mousedown="down($event)" 
                            @touchstart="down($event)"
                        >
                            <i class="iconfont icon-wenben1"></i>
                            <p>{{but.text}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</div>
</template>

<script>
import { ALL_ELEMENT } from '@/services/constant.js';

export default {
    name: 'designTools',
    props: {
    },
    created () {
    },
    data () {
        return{
            toolList: ALL_ELEMENT,
        }
    },
    mounted () {
    },
    computed: {
        topChoose () {
            return this.$store.state.rect.currentChoose;
        }
    },
    methods:{
        down (ev) {
            ev.stopPropagation();
        },
        dragEle (ev) {
            //兼容ie，key值ie下只能是text或url
            ev.dataTransfer.setData("text",ev.target.id);
        },
        showTypeList (index,typeIndex) {
            if (this.toolList[index].contentList[typeIndex].ifShowDetail) {
                this.$set(this.toolList[index].contentList[typeIndex],'ifShowDetail',false)
            } else {
                this.$set(this.toolList[index].contentList[typeIndex],'ifShowDetail',true)
            }
        },
        openDetailList(item) {//向父组件传递需要打开的列表类型
            if (!item.active) {
                this.toolList.map((tool) => {
                    if (Object.is(item,tool)) {
                        this.$set(item,'active',true);
                    } else {
                        this.$set(tool,'active',false);
                    }
                })
            } else {
                this.toolList.map((tool) => {
                    if (Object.is(item,tool)) {
                        this.$set(item,'active',!item.active);
                    } else {
                        this.$set(tool,'active',false);
                    }
                })
            }
            this.$emit('openDetailList',item.name);
        },
        closeAllToolList() {
            this.toolList.map(tool => {
                this.$set(tool,'active',false);
            })
        },
        dragLeaveToolList(ev) {
            this.closeAllToolList();
        }
    }
}
</script>