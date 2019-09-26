<style lang="scss" scoped>
.SrpCompanion {
    position: relative;
    width: 800px;
    height: 200px;
    .content-wrapper {
        width: 90%;
        height: 100%;
        overflow: hidden;
        margin: 0 auto;
        & > div {
            position: relative;
            height: 100%;
            overflow: hidden;
            &.fade-enter-active,&.fade-leave-active{
                transition: opacity .5s;
            }
            & > ul {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                font-size: 0;
                & > li {
                    width: 25%;
                    height: 50%;
                    display: inline-block;
                    & > img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    &:hover {
        & > .left,& > .right {
            display: block;
        }
    }
    .left {
        display: none;
        position: absolute;
        left: 5px;
        top: calc( 50% - 15px);
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background-color: #e1e1e1;
        text-align: center;
    }
    .right {
        display: none;
        position: absolute;
        right: 5px;
        top: calc( 50% - 15px);
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background-color: #e1e1e1;
        text-align: center;
    }
    //图片从左面隐藏的动画
    @keyframes left-hide {
      from{
        left: 0;
      }
      to{
        left: -100%;
      }
    }
    //图片从左面出现的动画
    @keyframes left-show{
      from{
        left: -100%;
      }
      to{
        left: 0;
      }
    }
    //图片从右面消失的动画
    @keyframes right-hide{
      from{
        left: 0;
      }
      to{
        left: 100%;
      }
    }
    //图片从右面出现的动画
    @keyframes right-show{
      from{
        left: 100%;
      }
      to{
        left: 0;
      }
    }
}
</style>
<template>
    <div class="SrpCompanion">
        <div class="content-wrapper">
            <div class="content">
                <template v-for="(item,index) in logoByGroup" >
                    <transition name="fade">
                        <ul :key="index" v-if="index==curPage">
                            <li v-for="(pic,picIndex) in item" :key="picIndex" :style="{'width': picWidth,'height':picHeight}">
                                <img :src="pic.url" alt="company-logo">
                            </li>
                        </ul>
                    </transition>
                </template>
            </div>
        </div>
        <div class="left" @click="calcLocation('left')"><Icon type="ios-arrow-back" /></div>
        <div class="right" @click="calcLocation('right')"><Icon type="ios-arrow-forward" /></div>
    </div>
</template>
<script>
    export default {
        name: 'ShowCompanion',
        props: {
            config: {
                type: Object
            }
        },
        components: {
        },
        watch: {
        },
        computed: {
            totalNum: function () {//logo总数
                return this.config.logoList.length;
            },
            totalPage: function () {//logo总页数
                return Math.ceil(this.totalNum / this.logoNumPerPage);
            },
            logoNumPerPage: function() {//logo每页数量
                return this.config.logoRowPerPage * this.config.logoColPerPage;
            },
            logoByGroup: function () {
                let logoGroups = [];
                for (let i = 0 ; i < this.totalPage; i++) {
                    let logoGroup = [];
                    let groupStartNum = i * this.logoNumPerPage;
                    let groupEndNum = (groupStartNum+this.logoNumPerPage)> this.totalNum? this.totalNum: (groupStartNum+this.logoNumPerPage);
                    for (let j = groupStartNum; j < groupEndNum; j++) {
                        logoGroup.push(this.config.logoList[j]);
                    }
                    logoGroups.push(logoGroup);
                }
                return logoGroups;
            },
            picWidth: function () {
                return 1 / this.config.logoColPerPage * 100 + '%';
            },
            picHeight: function () {
                return 1 / this.config.logoRowPerPage * 100 + '%';
            }
        },
        data() {
            return {
                curPage: 0,//当前页
                // logoNumPerPage: 8,//每页的logo数
                showSettingPanel: false,//是否显示设置按钮

                wrapperStyle: {}
            }
        },
        methods: {
            calcLocation(type) {
                const vm = this;
                if (type=='left') {//左移
                    vm.curPage = vm.curPage == 0?vm.curPage:vm.curPage-1;
                } else {//右移
                    vm.curPage = vm.curPage == vm.totalPage-1?vm.totalPage-1:vm.curPage+1;
                }
            }
        },
        created() {
        }
    }
</script>