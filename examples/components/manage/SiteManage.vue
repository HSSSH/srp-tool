<style scoped lang="scss">
.site-manage {
  height: 100%;
  padding: 20px;
    .right-title {
      position: relative;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e3e3e3;
      .right-handle {
        position: absolute;
        right: 10px;
        top: 0px;
        color: #3b8cff;
        cursor: pointer;
      }
    }
    ul {
      padding: 0 10px 10px 10px;
      height: calc(100% - 40px);
      overflow: auto;
    }
    .pages {
      position: relative;
      margin: 10px 10px 0px 0px;
      display: inline-block;
      width: calc(20% - 8px);
      height: 160px;
      border: 1px solid #e3e3e3;
      &:nth-child(5n) {
        margin-right: 0px;
      }
      .page-title {
        position: absolute;
        top: 0;
        left: 0;
      }
      .page-info {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: right;
        & > div {
          margin-right: 5px;
          display: inline-block;
          cursor: pointer;
          color: #3b8cff;
        }
      }
       .page-delete {
         position: absolute;
         bottom: 5px;
         right: 35px;
         color: #3b8cff;
         cursor: pointer;
       }
       .page-edit {
         position: absolute;
         right: 5px;
         bottom: 5px;
         color: #3b8cff;
         cursor: pointer;
       }
    }
}
</style>

<template>
  <div class="site-manage">
    <div class="right-title">
        视图内容
        <div class="right-handle" @click="openAddViewModal">新增</div>
      </div>
      <ul>
        <li class="pages" v-for="(item,index) in  pageLists" :key="index">
          <div class="page-title">{{ item.title }}</div>
          <div class="page-info">
            <div class="page-delete" @click="openDeleteViewModal(item)">删除</div>
            <div class="page-edit" @click="goToDesign(item)">编辑</div>
          </div>
        </li>
      </ul>
    <Modal
      title="新增视图"
      v-model="showAddViewModal"
      :width="600"
      @on-cancel="cancelAddViewModal"
      @on-ok="confirmAddViewModal"
    >
      <div class="modal-body">
        <label>名字</label>
        <input type="text" v-model="viewName">
      </div>
    </Modal>
    <Modal
      :width="416"
      v-model="showDeleteViewModal"
      title="删除"
      @on-ok="deleteView()"
      @on-cancel="cancelDeleteViewModal"
    >
      <div class="modal-body">
        确认删除该视图？
      </div>
    </Modal>
  </div>
</template>

<script>
import { addSite,deleteSite,updateSite,getSiteList,getViewListsBySiteId,addView,deleteView } from '@/api/siteManage';
import { setPublishWeb,setUnPublishWeb} from '@/api/platform';
import { getCookie,setCookie } from '@/utils/util';

export default {
  name: 'siteManage',
  components: {
  },
  data(){
    return {
      siteLists: [],
      pageLists: [],
      showAddSiteModal: false,
      showAddViewModal: false,
      showDeleteViewModal: false,
      showDeleteSiteModal: false,
      siteName: '',
      curSiteId: '',
      addViewSiteId: '',
      curViewId: '',//当前视图id
      viewName: '',//新增的视图名字
    }
  },
  methods: {
    getSiteList() {
      getSiteList().then(data => {
        if (data && data.length) {
          data[0].siteActive = true;
          this.curSiteId = data[0].id;
          this.siteLists = data;
          return this.getViewListsBySiteId(this.siteLists[0].id);
        }
      });
    },
    addView() {
      addView(this.addViewSiteId,this.viewName).then(data => {
        if (data.result) {
          this.$Modal.success({
            title: '消息',
            content: '新增视图成功！'
          });
          this.getViewListsBySiteId(this.curSiteId);
        } else {
          this.$Modal.error({
            title: '消息',
            content: '新增视图失败！',
          })
        }
      });
    },
    deleteView() {
      deleteView(this.curViewId).then(data => {
        if(data) {
          this.$Modal.success({
            title: '消息',
            content: '删除视图成功！'
          });
          this.getViewListsBySiteId(this.curSiteId);
        } else {
          this.$Modal.error({
            title: '消息',
            content: '删除视图失败！请重新删除！'
          });
        }
      });
    },
    getViewListsBySiteId(siteId) {
      getViewListsBySiteId(siteId)
      .then(data => {
        this.pageLists = data;
      });
    },
    chooseSite(id) {
      this.curSiteId = id;
      if (id) {
        this.getViewListsBySiteId(id);
        this.siteLists.map((item) => {
          if (item.id == id) {
            this.$set(item,'siteActive',true);
          } else {
            this.$set(item,'siteActive',false);
          }
        })
      }
    },
    addSite() {
      const vm = this;
      if (vm.siteName) {
        addSite(vm.siteName).then(data => {
          vm.$Modal.success({
            title:'消息',
            content: '新增网站成功！',
          })
          vm.getSiteList();
        });
      } else {
        vm.$Modal.error({
          title: '消息',
          content: '请填写网站名字！'
        });
      }
    },
    deleteSite() {
      deleteSite(this.curSiteId).then(data => {
        if(data) {
          this.$Modal.success({
            title: '消息',
            content: '删除成功！'
          });
          this.getSiteList();
        } else {
          this.$Modal.error({
            title: '消息',
            content: '删除失败！请重新删除！'
          });
        }
      })
    },
    openAddSiteModal() {
      this.showAddSiteModal = true;
    },
    cancelAddSiteModal() {
      this.showAddSiteModal = false;
      this.siteName = '';
    },
    confirmAddSiteModal() {
      this.addSite();
    },
    openAddViewModal() {
      this.showAddViewModal = true;
    },
    cancelAddViewModal() {
      this.showAddViewModal = false;
    },
    confirmAddViewModal() {
      this.addView();
    },
    openDeleteSiteModal(item) {
      const vm = this;
      vm.curSiteId = item.id;
      vm.showDeleteSiteModal = true;
    },
    cancelDeleteSiteModal() {
      this.curSiteId = '';
      this.showDeleteSiteModal = true;
    },
    openDeleteViewModal(viewItem) {
      const vm = this;
      vm.curViewId = viewItem.id;
      vm.showDeleteViewModal = true;
    },
    cancelDeleteViewModal() {
      this.showDeleteViewModal = false;
      this.curViewId = '';
    },
    goToDesign(item) {
      setCookie('curSiteId',this.curSiteId,1);
      this.$router.push({ path: '/app/platform/design', query: { viewId: item.id } });
    },
    publishWeb(item){
      setPublishWeb(item.id).then(data => {
        if(!data.result){
          this.$Modal.error({
            title: '消息',
            content: data.message
          });
        }
        else{
          this.getSiteList();
        }
      })
    },
    canclePublishWeb(item){
      setUnPublishWeb(item.id).then(data => {
        if(data.result){
          this.getSiteList();
        }
      })
    },
    checkPublishWeb(item){
      let routeUrl = this.$router.resolve({name:'Publish',params:{namespace:item.namespace}});
      window.open(routeUrl .href, '_blank');
    }
  },
  created() {
    this.getSiteList();
  }
}
</script>