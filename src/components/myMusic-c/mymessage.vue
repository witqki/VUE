<template>
    <div id="mymessage">
<v-myheader></v-myheader>


    </div>
</template>

<script>
import Myheader from './mymessage/myheader.vue'
    export default {
        data() {
            return {
                key: value
            }
        },
        components:{
            'v-myheader':Myheader
        }
    }
</script>

<style lang="scss" scoped>
@import "./style/mymessage.scss";
</style>