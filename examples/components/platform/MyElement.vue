<style>
</style>

<template>
<!-- 按钮组件 -->
<SrpButton v-if="type == 'button'" :config="config" :allIndex="allIndex"></SrpButton>
</template>


<script>
import SrpButton from '@/components/platform/myElement/Srp-button';

export default {
    name: 'my-element',
    components: {
        SrpButton,
    },
    props:{
        config: Object,
        type: String,
        allIndex: Object
    },
    data(){
        return {
            
        }
    },
}
</script>
