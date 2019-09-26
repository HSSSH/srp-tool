<style lang="scss" scoped>
    .srp-bottom {
        width: 100%;
        height: 300px;
        .bottom-content {
            float: left;
            width: 150px;
            label {
                font-size: 24px;
                color: #a5a9ad;
                a {
                    color: #a5a9ad;
                }
            }
            li {
                font-size: 16px;
                line-height: 64px;
                a {
                    color: #515a6e;
                }
            }
        }
    }
</style>
<template>
    <div class="srp-bottom" :style="config.eleStyle">
        <div class="bottom-content" v-for="(item,index) in config.contentList" :key="index">
            <label>
                <a v-if="item.link" :href="item.link" target=_blank>{{ item.majorColumn }}</a>
                <p v-if="!item.link">{{ item.majorColumn }}</p>
            </label>
            <ul class="bottom-content-list">
                <li v-for="(secondaryItem,secondaryIndex) in item.secondaryList" :key="secondaryIndex">
                    <a v-if="secondaryItem.link" :href="secondaryItem.link" target=_blank>{{secondaryItem.name}}</a>
                    <p v-if="!secondaryItem.link" :href="secondaryItem.link">{{ secondaryItem.name }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShowBottom',
    props: {
        config: Object
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods:{},
    created() {}
}
</script>