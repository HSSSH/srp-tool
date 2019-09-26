<style lang="scss" scoped>
    .platform {
        position: relative;
        margin: 60px 0 0 40px;
        width: calc(100% - 40px);
        height: calc(100% - 60px);
        .nav {
          position: fixed;
          top: 0px;
          left: 0px;
          height: 60px;
          line-height: 60px;
          width: 100%;
          font-size: 14px;
          border-bottom: 1px solid #2488eb;
          background-color: #fff;
          z-index: 100;
          .icon-pingtai {
            padding-left: 20px;
            font-size: 16px;
            color: #2488eb;
            &:after {
              position: relative;
              top: 2px;
              left: 10px;
              display: inline-block;
              content: '';
              width: 2px;
              height: 13px;
              background-image: linear-gradient(270deg, 
                #3286d5 0%, 
                #ffffff 100%);
            }
          }
          .title {
            padding-left: 30px;
            color: #666;
          }
          .handle-list {
            float: right;
            li {
              padding: 0px 9px;
              display: inline-block;
              &:after {
                position: relative;
                top: 2px;
                left: 9px;
                display: inline-block;
                content: '';
                width: 2px;
                height: 13px;
                background-color: #ddd;
              }
              &:last-child:after {
                display: none;
              }
              a {
                cursor: pointer;
                color: #666;
              }
              a:hover {
                color: #2488eb;
              }
              .save-bt{
                cursor: pointer;
                color: #666;
                &:hover{
                  color: #2488eb;
                }
              }
            }
          }
          .icon-zhanghao {
            float: right;
          }
        }
    }
</style>
<template>
    <div class="platform">
        <div class="nav">
          <i class="iconfont icon-pingtai"></i>
          <router-link :to="{name: 'App'}" class="title">消息发布平台</router-link>
          <i class="iconfont icon-zhanghao"></i>
          <ul class="handle-list">
            <!-- <li>
              <router-link to="">撤销</router-link>
            </li>
            <li>
              <router-link to="">恢复</router-link>
            </li> -->
            <!-- <li>
              <router-link to="">取消</router-link>
            </li> -->
            <li>
              <router-link :to="{name:'Display', query: { viewId: curViewId }}" target="_blank">预览</router-link>
            </li>
            <li>
              <div @click="saveView()" class="save-bt">保存</div>
            </li>
          </ul>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
  import { saveView } from "@/api/platform";
    export default {
        data() {
            return {
                curViewId: '',
            }
        },
        computed: {
          layout() {
            return this.$store.state.rect.layout;
          }
        },
        methods: {
          init() {
            this.curViewId = this.$route.query.viewId;
          },
          saveView() {
            this.curViewId = this.$route.query.viewId;
            saveView(this.layout,this.curViewId).then(data => {
              if (data) {
                this.$Modal.success({
                    title: '消息',
                    content: '保存视图成功！'
                });
              } else {
                this.$Modal.error({
                  title: '消息',
                  content: '保存视图失败！请重新保存！',
                });
              }
            });
          }
        },
        created() {
          this.init();
        }
    }
</script>