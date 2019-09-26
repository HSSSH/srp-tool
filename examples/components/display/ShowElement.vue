<style>
</style>

<template>
<!-- 按钮组件 -->
<ShowButton v-if="type == 'button'" :config="this.config" :publishWeb="publishWeb"></ShowButton>
</template>

<script>
import ShowButton from '@/components/display/showElement/ShowButton';

export default {
    name: 'showElement',
    components: {
        ShowButton,
    },
    props:{
        config: Object,
        type: String,
        publishWeb: Boolean
    },
    data(){
        return {
            
        }
    },
}
</script>
