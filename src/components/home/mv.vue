<template>
  <div>

  </div>
</template>

<script>
  export default {
    data() {
      return{

      }
    },
    mounted() {
       this.$store.commit('changeLinkIndex', 1)
      this.$store.commit('changeTagIndex', 4)

    },
    methods: {

    }
  }
</script>

<style media="screen">

</style>
