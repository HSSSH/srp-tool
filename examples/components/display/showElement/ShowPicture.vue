<style scoped lang="scss">
.default-img{
  width: 100%;
  height: 100%;
  & > img{
    width: 100%;
    height: 100%;
    &:hover {
      & + ul {
        display: block;
      }
    }
  }
  & > ul {
    position: absolute;
    display: none;
    width: 300px;
    padding: 10px;
    font-size: 14px;
    background: #fff;
    box-shadow: 0px 5px 9px 1px 
		rgba(0, 63, 136, 0.12);
    border-radius: 4px;
    & > li {
      & > i {
        margin-right: 10px;
      }
    }
  }
}
</style>

<template>
<div class="default-img" >
    <img :src="config.src" :style="config.eleStyle">
    <ul class="hover" :style="config.hoverStyle" v-if="config.ifShowHover">
      <li v-for="(item,index) in config.contentList" :key="index">
        <i class="iconfont" :class="item.iconfont" v-if="config.ifShowHoverIcon"></i>
        <span>{{ item.content }}</span>
      </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'SrpPicture',
    props: ['config','allIndex'],
    components: {
    },
    data() {
        return{
          eleConfig: JSON.parse(JSON.stringify(this.config))
        }
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    },
    watch: {
        
    },
    beforeDestroy() {

    },
    created() {
    }
}
</script>