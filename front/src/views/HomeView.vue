<template>
  <div class="home">
    <HelloWorld msg="Bienvenue sur Groupomania"/>
    <LogIn />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import LogIn from "@/components/Login";

export default {
  name: 'HomeView',
  components: {
    LogIn,
    HelloWorld
  }
}
</script>

<style lang="scss">

</style>
