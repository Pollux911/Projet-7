<template>
  <div class="home">
    <Title msg="Bienvenue sur Groupomania"/>
    <LogIn />
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import LogIn from "@/components/Login";

export default {
  name: 'HomeView',
  components: {
    LogIn,
    Title
  }
}
</script>

<style lang="scss">

</style>
