<style scoped lang="scss">
.srp-select{
    .select-part{
        color: #fff;
        cursor: pointer;
        position: relative;
        *{
            display: inline-block;
            vertical-align: middle;
        }
        span{
            margin-right: 5px;
        }
        ul{
            color: #fff;
            position: absolute;
            left: 0;
            background: #003F88;
            padding: 5px;
            display: none;
            li{
                display: block;
                white-space: nowrap;
                a{
                    opacity: 0.8; 
                    color: #fff;
                    &:hover{
                        opacity: 1; 
                    }
                }
            }
        }
        &:hover{
            ul{
                display: block;
            }
        }
    }
}
</style>
<template>
    <div class="srp-select">
        <div class="select-part" @click="focus()">
            <span>{{config.title}}</span><Icon type="md-arrow-dropdown" size="20" color="white"/>
            <ul :style="config.direction == 'up'?{'bottom':'20px'}:{'top':'20px'}">
                <li v-for="(item,index) in config.srpSelectList" :key="index"><a :href="'http://'+item.link" target=_blank>{{item.name}}</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: ['config'],
    data() {
        return{
            showOption: false
        }
    },
    methods: {
        focus() {
            this.showOption = !this.showOption;
        },
    },
}
</script>
