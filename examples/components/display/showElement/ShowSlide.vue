<style scoped lang="scss">
.slide {
  .slide-container {
    width: 90%;
    height: 80%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .wrap-box {
      height: 100%;
      overflow: hidden;
      position: absolute;
      left: 0;
      .per-group {
        float: left;
        height: 100%;
        display: -webkit-inline-flex; /* Safari */
        display: inline-flex;
        li {
          float: left;
          height: 100%;
          margin: 0 10px;
          .image {
            width: 100%;
            padding-bottom: 56%;
            margin-bottom: 14px;
            border-radius: 4px;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
          .text {
            margin-left: 10px;
            span {
              font-size: 18px;
            }
          }
        }
        .li-last {
          margin-right: 0;
        }
      }
    }
  }
  .indicator {
    position: absolute;
    height: 20%;
    bottom: 0;
    left: calc(50% - 28px);
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      float: left;
      margin: 0 2px;
      background-color: #fff;
      border: 1px solid #ccc;
      cursor: pointer;
      &.cur-dot {
        background-color: blue;
      }
    }
  }
  .left-arrow {
    position: absolute;
    left: 2.5%;
    top: calc(28% - 31px);
    width: 34px;
    height: 34px;
    border-radius: 4px;
    .left {
      font-size: 34px;
      color: #ccc;
      text-align: center;
      line-height: 34px;
    }
  }
  .right-arrow {
    position: absolute;
    right: 2.5%;
    top: calc(28% - 31px);
    width: 34px;
    height: 34px;
    border-radius: 4px;
    .right {
      font-size: 34px;
      color: #ccc;
      text-align: center;
      line-height: 34px;
    }
  }
}
</style>

<template>
  <div class="slide" @mouseenter="mouseOver" @mouseleave="mouseOut">
    <div class="slide-container">
      <div
        class="wrap-box"
        ref="moveBox"
        :style="{width:wrapWidth,transition: 'left ' + config.speed + 's'}"
      >
        <ul
          v-for="(item,index) in this.logoByGroup"
          class="per-group"
          :key="index"
          :style="{width:ulWidth}"
        >
          <li v-for="(it,itIndex) in item" :key="itIndex" :style="{width:liWidth}">
            <div class="image" v-if="it&&it.pic">
              <img :src="it.pic" />
            </div>
            <div class="image" v-if="it=='undefined'">
              <img />
            </div>
            <div class="text" v-if="it&&it.name&&config.ifShowLabel">
              <span>{{it.name}}</span>
            </div>
            <div class="text" v-if="it=='undefined'&&config.ifShowLabel">
              <span>{{it.name}}</span>
              <span></span>
            </div>
          </li>
        </ul>      
      </div>
    </div>
    <div class="indicator" ref="indicator">
      <span
        class="dot"
        :class="{'cur-dot':index == curPage}"
        v-for="(item,index) in totalPage"
        :key="index"
        @click="indicator(index)"
      ></span>
    </div>
    <div class="left-arrow" @click="leftArrow">
      <Icon class="left" type="ios-arrow-back" />
    </div>
    <div class="right-arrow" @click="rightArrow">
      <Icon class="right" type="ios-arrow-forward" />
    </div>
    <div class="setting-panel">
      <a @click="showSettingPanel = true">设置</a>
    </div>
  </div>
</template>

<script>
import { getProductByGroupIds } from "@/api/productManage";
import SlideSetPanel from "@/components/platform/myElementSet/Srp-slide-set";

export default {
  name: "SrpSlide",
  components: {
    SlideSetPanel
  },
  props: ["config", "allIndex"],
  data() {
    return {
      techList: [], //logo列表页
      timer: null, //定时器
      curPage: 0, //当前页
      logoNumPerPage: 5, //每页的logo数
    };
  },
  created() {
    this.getProductByGroupIds();
  },
  computed: {
    totalNum: function() {
      //logo总数
      return this.techList.length;
    },
    totalPage: function() {
      //logo总页数
      return Math.ceil(this.totalNum / this.logoNumPerPage);
    },
    logoByGroup: function() {
      //logo分组(每五张为一组)
      let logoGroups = [];
      for (let i = 0; i < this.totalPage; i++) {
        let logoGroup = [];
        let groupStartNum = i * this.logoNumPerPage;
        let groupEndNum = groupStartNum + 5 > this.totalNum ? this.totalNum : groupStartNum + 5;
        for (let j = groupStartNum; j < groupEndNum; j++) {
          logoGroup.push(this.techList[j]);
        }
        if (groupStartNum+5 > this.totalNum) {
          let needAddNum = 5 - (this.totalNum - groupStartNum);
          for (let k = 0; k < needAddNum; k++) {
            logoGroup.push(this.techList[k]);
          }
        }        
        logoGroups.push(logoGroup);
      }
      return logoGroups;
    },
    wrapWidth: function() {
      //装logo盒子的总宽度
      return this.totalPage * 100 + "%";
    },
    ulWidth: function() {
      //每组logo的盒子宽度
      return (1 / this.totalPage) * 100 + "%";
    },
    liWidth: function() {
      //每张logo宽度
      return 'calc(' +(1 / this.logoNumPerPage) * 100 + "% - 20px)";
    }
  },
  methods: {
    getProductByGroupIds() {
      //获取科技产品列表
      const vm = this;
      vm.curPage = 0;
      if (vm.config.ifUseData) {
        getProductByGroupIds()
        .then(data => {
          vm.techList = data;
          vm.listByGroupId = data;
        })
      } else {
        vm.techList = vm.config.contentList;
      }
      
    },
    autoLoop() {
      //自动轮播
      const vm = this;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (vm.curPage == vm.totalPage - 1) {
          setTimeout(() => {
            vm.moveBox.style.left = 0 + "%";
            vm.curPage = 0;
          }, 500);
        } else {
          vm.curPage++;
          vm.moveBox.style.left = -100 * vm.curPage + "%";
        }
      }, vm.config.changeTime);
    },
    indicator(index) {
      //指示器索引
      this.curPage = index;
      this.moveBox.style.left = -100 * index + "%";
    },
    leftArrow() {
      //向左移动
      this.curPage--;
      if (this.curPage < 0) {
        this.curPage = this.totalPage - 1;
      }
      this.moveBox.style.left = -100 * this.curPage + "%";
    },
    rightArrow() {
      //向右移动
      this.curPage++;
      if (this.curPage > this.totalPage - 1) {
        this.curPage = 0;
      }
      this.moveBox.style.left = -100 * this.curPage + "%";
    },
    mouseOver() {
      //鼠标移入
      clearInterval(this.timer);
    },
    mouseOut() {
      //鼠标移出
      this.autoLoop();
    }
  },
  mounted() {
    this.moveBox = this.$refs.moveBox; //移动盒子节点
    this.autoLoop();
  },
  watch: {
    'config.ifUseData': function(val) {
      this.curPage = 0;
      if (val) {
        this.getProductByGroupIds();
      } else {
        this.techList = this.config.contentList;
      }
    },
    'config.contentList': {
      handler: function(val,oldVal) {
        if (!this.config.ifUseData) {
          this.techList = val;
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>