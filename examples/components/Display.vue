<style scoped lang="scss">
#display{
    margin: 0;
    height: 100%;
    background: #fff;
}
</style>

<template>
  <div id="display">
      <ShowLayoutList v-for="item in layout" :key="item.id" :type="item.type" :guideConfig="item.guideConfig" :panelList="item.panelList">
      </ShowLayoutList>
  </div>
</template>

<script> 
import ShowLayoutList from '@/components/display/ShowLayoutList';
import { getLayoutListByViewId } from '@/api/platform';
export default {
  name: 'display',
  components:{
    ShowLayoutList
  },
  data() {
    return {
      layout:[]
    }
  },
  computed: {
  },
  created() {
      let currentId = this.$route.query.viewId;
      getLayoutListByViewId(currentId).then(data => {
          if (data) {
              this.layout = JSON.parse(data.container);
          }
      });
  },
  watch: {
      '$route' (to,from) {
          let currentId = this.$route.query.viewId;
          getLayoutListByViewId(currentId).then(data => {
              if (data) {
                  this.layout = JSON.parse(data.container);
              }
          });
      }
  },
  methods:{
  }
}
</script>