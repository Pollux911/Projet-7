<template>
  <Title msg="Profil"/>
  <UserProfile />
</template>

<script>
import Title from "@/components/Title";
import UserProfile from "@/components/Profile";
export default {
  name: "ProfileView",
  components: {
    Title,
    UserProfile
  }
}
</script>

<style lang="scss">

</style>