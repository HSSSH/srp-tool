<style scoped lang="scss">
.develop-section{
    .section-card{
        display:inline-block;
        margin: 10px;
        img{
            cursor: pointer;
        }
        p{
            text-align: center;
            color: #666666;
            margin-top: 5px;
        }
    }
}
</style>

<template>
    <div class="develop-section">
        <div v-for="(item,index) in sectionList" :key="item.id" class="section-card">
            <img :src="item.pic" @click="changePage(index)">
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
import { getSectionByGroupIds } from "@/api/productManage";

export default {
    props: ['config','publishWeb'],
    data() {
        return{
            sectionList: []
        }
    },
    created() {
        this.getSectionByGroupIds();
    },
    methods: {
        getSectionByGroupIds() {
            return getSectionByGroupIds().then(data => {
                this.sectionList = data;
            })
        },
        changePage(index){
            const vm = this;
            if (vm.config.url) { //是否有链接的页面，有则跳转，无则提示
                if(this.publishWeb){
                    this.$store.dispatch('setPublishWebViewId', vm.config.url);
                    this.$router.push({ path:'/publish/' + this.$route.params.namespace, query: { typeName:vm.config.typeName ,secTionIndex:index}});
                }else{
                    this.$router.push({ path:'/app/display', query: { viewId: vm.config.url,typeName:vm.config.typeName ,secTionIndex:index} });
                }
            }
        }
    },
}
</script>
