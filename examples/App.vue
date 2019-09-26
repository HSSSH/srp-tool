<style src="@/sass/global.scss" lang="scss"></style>
<style scoped lang="scss">
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <div id="app">
    <!-- 旧的图标库 -->
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_1064517_s479lsvo5jn.css" />
    <!-- 新的图标库 -->
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_1325145_18pch9vhurv.css" />
    <router-view></router-view>
  </div>
</template>

<script>
// import router from "@/router/index.js";
export default {
  name: 'app',
  components: {
  },
  // router,
  data(){
    return {
    }
  },
}
</script>