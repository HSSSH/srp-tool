<style scoped lang="scss">
.srp-picText {
    .default-picTextTable {
        width: 100%;
        height: 100%;
        border: none;
        tr {
            td {
                border-right: solid 2px #ECECEC;
                border-bottom: solid 2px #ECECEC;

                .pic-text-table-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    height: 100%;
                    font-size: 16px;

                    .pic-text-table-tip {
                        display: none;
                        position: absolute;
                        top: 0;
                        left: 0;
                        color: #fff;
                    }

                    &:hover {
                        background: #405DE6;
                        color: #ffffff;
                        .pic-text-table-tip {
                            display: block;
                        }
                    }

                    .pic-text-table-content {
                        width: 100%;

                        .pic-wrapper {
                            display: block;
                            width: 50%;
                            height: 50%;
                            margin: 0 auto;
                            & > img {
                                width: 100%;
                                height: 100%;
                                cursor: pointer;
                            }
                        }

                        .pic-text-table-label {
                            display: block;
                        }
                    }
                }

                &:last-child {
                    border-right: none;
                }
            }

            &:last-child {
                td {
                    border-bottom: none;
                }
            }
        }
    }
    .no-border-picTextTable {
        tr {
            td {
                border: none;
            }
        }
    }
}
</style>
<template>
    <div class="srp-picText">
        <table class="default-picTextTable" :class="config.ifShowBorder?'':'no-border-picTextTable'" :style="config.eleStyle">
            <tbody>
                <tr v-for="(rowItem,rowIndex) in config.contentList" :key="rowIndex">
                    <td v-for="(columnItem,columnIndex) in rowItem" :key="columnIndex">
                        <div class="pic-text-table-item">
                            <p class="pic-text-table-tip">{{ `${rowIndex+1}-${columnIndex+1}` }}</p>
                            <div class="pic-text-table-content">
                                <div class="pic-wrapper">
                                    <img 
                                        :src="columnItem.absoluteUrl" 
                                        alt="upload-images" 
                                        class="pic-text-table-img">
                                </div>
                                <label class="pic-text-table-label" v-if="config.ifShowLabel">
                                    {{ columnItem.text }}
                                </label>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: ['config','allIndex'],
    components: {
    },
    data() {
        return {
        }
    },
}
</script>