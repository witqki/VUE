<template>
    <div  >
        <div class="mod_profile">
           <div class="section_inner">
              <div class="profile__cover_link">
                  <img :src='userimg' onerror="this.src='http://39.96.172.186:8080/vue/loading.jpg';this.onerror=null" :alt='user_name' class="profile__cover">

              </div> 
            <h1 class="profile__tit">
              <span class="profile__name">{{user_name}}</span>
            </h1>
           </div>
       </div>
    </div>
</template>

<script>
  //class="mod_profile"
  /*
  http://39.96.172.186:8080/
  https://thirdqq.qlogo.cn/g?b=sdk&k=OVPXywljo6DnI80D2e3r4w&s=140&t=1555711469
  */
    export default {
        data() {
            return {
               
                userimg:'https://thirdqq.qlogo.cn/g?b=sdk&k=OVPXywljo6DnI80D2e3r4w&s=140&t=1555711469',
                user_name:'wiki'

            }
        },
    }
</script>

<style lang="scss" scoped>
@import "./style/myheader.scss"
</style>