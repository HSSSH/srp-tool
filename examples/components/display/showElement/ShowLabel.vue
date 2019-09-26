<style scoped lang="scss">
</style>

<template>
    <div>
        <div class="default-label" :style="config.eleStyle" v-html="config.text"></div>
    </div>
</template>

<script>
export default {
    name: 'ShowLabel',
    props: ['config'],
    components: {
    },
    data() {
        return{
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

    }
}
</script>
