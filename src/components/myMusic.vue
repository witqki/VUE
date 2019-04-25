<template>
  <div class="play">
   
    <v-mymessage v-show="this.unLogin?false:true"></v-mymessage>
  </div>
</template>

<script>
 //<un-login v-show="this.isLogin?false:true"></un-login>
  // <v-mymessage v-show="this.unLogin?true:false"></v-mymessage>
import unLogin from './myMusic-c/unlogin.vue'
import Mymessage from './myMusic-c/mymessage.vue'
export default {
  data () {
    return {
      isLogin: '',
      unLogin:''
    }
  },
  components: {
    unLogin,
    'v-mymessage':Mymessage
  },
  mounted() {
    this.$store.commit('changeLinkIndex', 2)
    
  },
  computed() {
    this.isLogin=this.$store.state.isLogin
    this.unLogin=this.$store.state.isLogin
  }
}
</script>

<style lang="scss">
</style>
