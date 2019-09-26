<style scoped lang="scss">
.color-set{
    display: inline-block;
}
</style>

<template>
    <div class="color-set">
        <ColorPicker v-model="myColor" @on-change="changeColor"/>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String, default: 'transparent',
        },
    },
    data() {
        return{
            myColor: this.color
        }
    },
    methods:{
        changeColor(val){
            this.$emit('changeColor',val);
        }
    },
    watch: {
        color(val){
            this.myColor = val;
        }
    }
}
</script>