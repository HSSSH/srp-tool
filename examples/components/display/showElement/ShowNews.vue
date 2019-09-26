<style scoped lang="scss">
.news {
  & > .guide {
    margin-left: calc(2.5% + 38px);
    p {
      margin:0 80px 23px 0;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      &.active {
        color: #1259c3;
        font-weight: bold;
      }
    }
  }
  .news-slide {
    height: calc(100% - 46px);
    width: 100%;
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
            box-sizing: border-box;
            padding: 0 10px;
            float: left;
            height: 100%;
            .image {
              width: 100%;
              padding-bottom: 56%;
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
            .title {
              & > span {
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box; 
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
              }
            }
            .text {
              padding: 5px 10px 5px 10px;
              background: #fff;
              span {
                display: inline-block;
                height: 48px;
                font-size: 16px;
              }
              & > p {
                display: inline-block;
                width: 100%;
                color: #999;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
    .indicator {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 2px;
        background-color: #fff;
        border: 1px solid #ccc;
        cursor: pointer;
        &.cur-dot {
          background-color: #1259c3;
        }
      }
    }
    .left-arrow {
      position: absolute;
      left: 2.5%;
      top: 50%;
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
      top: 50%;
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
}
</style>

<template>
  <div class="news">
    <div class="guide">
      <p 
        v-for="(item,index) in groupsList" 
        :key="index" 
        :class="item.name==curGroup.name?'active':''"
        @click="changeGuide(item)"
      >
          {{item.name}}
      </p>
    </div>
    <div class="news-slide" @mouseover="mouseOver" @mouseout="mouseOut">
      
      <div class="slide-container">
        <div
          class="wrap-box"
          ref="moveBox"
          :style="{width:wrapWidth,transition: 'all ' + config.speed + 's'}"
        >
          <ul
            class="per-group"
            v-for="(item,index) in this.logoByGroup"
            :key="index"
            :style="{width:ulWidth}"
          >
            <li v-for="(it,itIndex) in item" :key="itIndex" :style="{width:liWidth}" @click="goToDetail(it)">
              <div class="image" v-if="it&&it.titlePic">
                <img :src="it.titlePic" />
              </div>
              <div class="image" v-if="it&&!it.titlePic">
                <img />
              </div>
              <div class="text title" v-if="it&&it.title">
                <span>{{it.title}}</span>
              </div>
              <div class="text" v-if="it&&!it.title">
                <span></span>
              </div>
              <div class="text" v-if="it&&it.des">
                <p>{{it.des}}</p>
              </div>
              <div class="text" v-if="it&&!it.des">
                <p></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="indicator" ref="indicator">
        <span
          class="dot"
          :class="{'cur-dot':index == pageNo}"
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
    </div>
</div>
</template>

<script>
import { getAllArticles,getAllGroup } from '@/api/articleManage';

export default {
  props: ["config","publishWeb"],
  data() {
    return {
      techList: [], //logo列表页
      timer: null, //定时器
      pageNo: 0, //当前页
      pageSize: 3, //每页的logo数
      changeTime: this.config.changeTime,
      groupsList: [],
      curGroup: {}//当前导航栏
    };
  },
  computed: {
    totalNum: function() {
      //logo总数
      return this.techList.length;
    },
    totalPage: function() {
      //logo总页数
      return Math.ceil(this.totalNum / this.pageSize);
    },
    logoByGroup: function() {
      //logo分组(每五张为一组)
      let logoGroups = [];
      for (let i = 0; i < this.totalPage; i++) {
        let logoGroup = [];
        let groupStartNum = i * this.pageSize;
        let groupEndNum = groupStartNum + 3 > this.totalNum ? this.totalNum : groupStartNum + 3;
        for (let j = groupStartNum; j < groupEndNum; j++) {
          logoGroup.push(this.techList[j]);
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
      return (1 / this.pageSize) * 100 + "%";
    }
  },
  methods: {
    getNewsByGroupIds() {
      //获取新闻列表
      getAllArticles({ 
        pageNo:1,
        groupId:this.curGroup.id 
      }).then(data => {
        this.techList = data.dataList;
      });
    },
    autoLoop() {
      //自动轮播
      const vm = this;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (vm.pageNo == vm.totalPage - 1||vm.totalPage==0) {
          setTimeout(() => {
            vm.moveBox.style.left = 0 + "%";
            vm.pageNo = 0;
          }, 500);
        } else {
          vm.pageNo++;
          vm.moveBox.style.left = -100 * vm.pageNo + "%";
        }
      }, vm.changeTime);
    },
    indicator(index) {
      //指示器索引
      this.pageNo = index;
      this.moveBox.style.left = -100 * index + "%";
    },
    leftArrow() {
      //向左移动
      this.pageNo--;
      if (this.pageNo < 0) {
        this.pageNo = this.totalPage - 1;
      }
      this.moveBox.style.left = -100 * this.pageNo + "%";
    },
    rightArrow() {
      //向右移动
      this.pageNo++;
      if (this.pageNo > this.totalPage - 1) {
        this.pageNo = 0;
      }
      this.moveBox.style.left = -100 * this.pageNo + "%";
    },
    mouseOver() {
      //鼠标移入
      clearInterval(this.timer);
    },
    mouseOut() {
      //鼠标移出
      this.autoLoop();
    },
    changeGuide(item) {
      this.curGroup = item;
      this.pageNo = 0;
      this.moveBox.style.left = 0 + "%";
      this.getNewsByGroupIds();
    },
    goToDetail(newItem) {
      if(this.publishWeb){
          this.$store.dispatch('setPublishWebViewId', this.config.viewId);
          this.$router.push({ path:'/publish/' + this.$route.params.namespace, query: { newId:newItem.id,groupId:this.curGroup.id ,typeName:this.curGroup.name} });
      }else{
          this.$router.push({ path:'/app/display', query: { newId:newItem.id,groupId:this.curGroup.id,viewId: this.config.viewId,typeName:this.curGroup.name } });
      }
    }
  },
  mounted() {
    this.moveBox = this.$refs.moveBox; //移动盒子节点
    this.autoLoop();
  },
  created() {
    getAllGroup().then(data => {
      let curGuide = data.find(group => group.name === '新闻动态');
      this.curGroup = curGuide;
      this.groupsList.push(curGuide);
      this.groupsList.push(data.find(group => group.name === '通知公告'));
      this.groupsList.push(data.find(group => group.name === '媒体信息'));
      this.getNewsByGroupIds();
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>
