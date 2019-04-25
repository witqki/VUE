<template>
    <div>
       <ul class="mod_top_subnav">
          <li class="top_subnav__item" >
            <router-link to="/home/musicDis" class="top_subnav__link" :class="{'top_subnav__link--current': tagLink==1}">首页</router-link>
          </li>
          <li class="top_subnav__item" >
            <router-link  to="/home/singer" class="top_subnav__link" :class="{'top_subnav__link--current': tagLink==2}">歌手</router-link>
          </li>
          <li class="top_subnav__item" >
            <router-link  to="/home/cd" class="top_subnav__link" :class="{'top_subnav__link--current': tagLink==3}">专辑</router-link>
          </li>
          <li class="top_subnav__item" >
            <router-link  to="/home/mv" class="top_subnav__link" :class="{'top_subnav__link--current': tagLink==4}"></router-link>
          </li>
        </ul>
         <router-view></router-view> 
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
         computed: {//发生变化就改变
            
            tagLink () {
                return this.$store.state.tagLink
            }
        },
          mounted() {
           this.$store.commit('changeLinkIndex', 1)
           
        }
    }
</script>
<style lang="css" scoped>
  @import "./public/style/header.css";
</style>