<style>
.show-drag {
    position: absolute;
    box-sizing: border-box;
}
.show-drag>.inside-container,.show-drag>.inside-container>div{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>

<template>
    <div class="show-drag" :style="style">
        <div class="inside-container"><slot></slot></div>
    </div>
</template>

<script>
export default {
    props: { 
        w: {
            type: [String, Number],
        },
        h: {
            type: [String, Number],
        },
        x: {
            type: [String, Number],
        },
        y: {
            type: [String, Number],
        },
        z: {
            type: [String, Number],
        }
    },
    computed: {
        style() {
            return {
                top: typeof this.y == "string"?this.y:this.y + 'px',
                left: typeof this.x == "string"?this.x:this.x + 'px',
                width: typeof this.w == "string"?this.w:this.w + 'px',
                height: typeof this.h == "string"?this.h:this.h + 'px',
                zIndex: this.z
            }
        }
    }
}
</script>