<template>
  <div class="home">
    <img class="grpLogo" alt="Groupomania logo" src="../assets/icon-left-font.png">
    <HelloWorld msg="Bienvenue sur Groupomania"/>
    <LogIn />
  </div>
</template>

<script>
// @ is an alias to /src
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

<style scoped>
.grpLogo{
  width: 10%;
}
</style>
