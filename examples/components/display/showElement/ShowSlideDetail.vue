<style scoped lang="scss">
.slide-detail{
    .search-area{
        margin-bottom: 30px;
    }
    .img-list{
        &>span{
            display: inline-block;
            vertical-align: top;
            width: 35px;
            position: relative;
            i{
                font-size: 35px;
                color: #afafaf;
                cursor: pointer;
                position: absolute;
                top:50%;
                margin-top: -17px;
            }
        }
        &>div{
            display: inline-block;
            width: calc(100% - 70px);
            vertical-align: middle;
            overflow: hidden;
            ul{
                margin-left: 0;
                padding-bottom: 20px;
                transition: margin 1s;
                li{
                    display: inline-block;
                    vertical-align: top;
                    cursor: pointer;
                    position: relative;
                    img:nth-child(2){
                        position: absolute;
                        left: 5px;
                        top: 5px;
                        opacity: 0;
                        z-index: -1;
                    }
                    img:nth-child(3){
                        position: absolute;
                        left: 10px;
                        top: 10px;
                        opacity: 0;
                        z-index: -2;
                    }
                    p{
                        text-align: center;
                        margin-top: 15px;
                        font-size: 16px;
                        padding: 0 5px;
                    }
                    &:hover,&.beChoose{
                        img:nth-child(2){
                            opacity: 0.5;
                        }
                        img:nth-child(3){
                            opacity: 0.2;
                        }
                        p{
                            color: #1259c3;
                        }
                    }
                }
            }
        }
    }
    .large-pic{
        text-align: center;
        margin-top: 10px;
        img{
            width: 120px;
            height: 120px;
            border-radius: 60px; 
        }
    }
    &>p{
        text-align: center;
        font-size: 20px;
        margin-top: 10px;
        font-weight: bold;
    }
    .content{
        margin-top: 20px; 
    }
}
</style>

<template>
    <div class="slide-detail">
        <div class="search-area">
            <span>领域筛选：</span>
            <el-select v-model="currentGroup" size="small" @change="search">
                <el-option v-for="item in groupList" :value="item.id" :key="item.id" :label="item.name"></el-option>
            </el-select>
        </div>
        <div class="img-list">
            <span :style="{'height':config.cardHeight+'px'}"><Icon class="left" type="ios-arrow-back" @click="moveLeft"/></span>
            <div ref="listContainer">
                <ul :style="{'width':imgList.length*(config.cardWidth+config.gap*2) + 'px','margin-left':distance + 'px'}" ref="listAll">
                    <li v-for="(item,index) in imgList" :key="item.id" class="section-card" :style="{'margin':'0 ' + config.gap + 'px'}" :class="{'beChoose':index==currentChoose}">
                        <img :src="item.pic" @click="changeDetail(index)" :style="{'width':config.cardWidth+'px','height':config.cardHeight+'px','border-radius':config.borderRadius+'px'}">
                        <img :src="item.pic" :style="{'width':config.cardWidth-10+'px','height':config.cardHeight+'px','border-radius':config.borderRadius+'px'}">
                        <img :src="item.pic" :style="{'width':config.cardWidth-20+'px','height':config.cardHeight+'px','border-radius':config.borderRadius+'px'}">
                        <template v-if="config.showName == '1'">
                            <p :style="{'width':config.cardWidth-10+'px'}">{{item.name}}</p>
                        </template>
                    </li>
                </ul>
            </div>
            <span :style="{'height':config.cardHeight+'px'}"><Icon class="right" type="ios-arrow-forward" @click="moveRight"/></span>
        </div>
        <div class="large-pic" v-if="config.showLarge == '1'">
            <img v-if="currentImg!=''" :src="currentImg">
        </div>
        <p>{{currentName}}</p>
        <div class="content" v-html="currentContent"></div>
    </div>
</template>

<script>
import { getAllSection,getAllLeader,getAllProduct,getAllSectionGroup,getAllLeaderGroup,getAllProductGroup } from "@/api/productManage";

export default {
    props: ['config'],
    data() {
        return{
            groupList:[],
            currentGroup:'',
            imgList: [],
            currentChoose: 0,
            currentContent: '',
            currentImg: '',
            currentName: '',
            distance: 0,
        }
    },
    created() {
        this.search();
        this.getGroupList().then(data => {
            this.groupList = data;
            this.groupList.unshift({id:'',name:'全部'});
            this.currentGroup = this.groupList[0].id;
        })
        if(this.$route.query.secTionIndex) {this.currentChoose = this.$route.query.secTionIndex;}
    },
    methods: {
        getGroupList(){
            switch(this.config.type){
                case '1':
                    return getAllSectionGroup()
                case '2':
                    return getAllLeaderGroup()
                case '3':
                    return getAllProductGroup()
            }
        },
        getListByGroupIds() {
            switch(this.config.type){
                case '1':
                    return getAllSection(this.currentGroup)
                case '2':
                    return getAllLeader(this.currentGroup)
                case '3':
                    return getAllProduct(this.currentGroup)
            }
        },
        search(){
            this.currentContent = '';
            this.currentImg = '';
            this.currentName = '';
            this.distance = 0;
            this.currentChoose = 0;
            this.getListByGroupIds().then(data => {
                this.imgList = data;
                if(this.imgList.length){
                    this.currentContent = this.imgList[this.currentChoose].content;
                    this.currentImg = this.imgList[this.currentChoose].pic;
                    this.currentName = this.imgList[this.currentChoose].name;
                }
            });
        },
        changeType(){
            this.currentGroup = '';
            this.search();
            this.getGroupList().then(data => {
                this.groupList = data;
                this.groupList.unshift({id:'',name:'全部'});
                this.currentGroup = this.groupList[0].id;
            })
        },
        moveLeft(){
            this.distance = this.distance + this.$refs.listContainer.clientWidth > 0?0:this.distance + this.$refs.listContainer.clientWidth
        },
        moveRight(){
            let minLeft = -1*(this.$refs.listAll.clientWidth - this.$refs.listContainer.clientWidth);
            this.distance = this.distance - this.$refs.listContainer.clientWidth < minLeft?minLeft:this.distance - this.$refs.listContainer.clientWidth
        },
        changeDetail(index){
            this.currentChoose = index;
            this.currentContent = this.imgList[this.currentChoose].content;
            this.currentImg = this.imgList[this.currentChoose].pic;
            this.currentName = this.imgList[this.currentChoose].name;
        },
    },
}
</script>
