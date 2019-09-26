<style scoped lang="scss">
.input-set{
    display: inline-block;
}
</style>

<template>
    <div class="input-set">
        <input v-model="data"/>
    </div>
</template>

<script>
export default {
    props: {
        inputStr: {
            type: String, default: '',
        },
    },
    data() {
        return{
            data: this.inputStr
        }
    },
    methods:{
    },
    watch: {
        inputStr(val){
            this.data = val;
        },
        data(val){
            this.$emit('changeInput',val);
        }
    }
}
</script>