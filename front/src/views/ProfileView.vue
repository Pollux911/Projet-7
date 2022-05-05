<template>
  <HelloWorld msg="Profil"/>
  <UserProfile />
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import UserProfile from "@/components/Profile";
export default {
  name: "ProfileView",
  components: {
    HelloWorld,
    UserProfile
  }
}
</script>

<style lang="scss">

</style>