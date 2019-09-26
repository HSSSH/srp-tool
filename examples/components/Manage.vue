<style scoped lang="scss">
.manage {
  height: 100%;
  .left-bar,.content-view {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    position: relative;
  }
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
  .content-view {
    width: calc(100% - 170px);
  }
}
</style>

<template>
  <div class="manage">
    <LeftBar class="left-bar"></LeftBar>
    <div class="content-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftBar from '@/components/manage/LeftBar';

export default {
  name: 'Manage',
  components: {
    LeftBar,
  },
  data(){
    return {
    }
  },
  computed:{
  },
  methods: {
  }
}
</script>