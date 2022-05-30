<template>
  <div>
    <Title msg="Inscription"/>
    <SignUp/>
  </div>
</template>

<script >
import Title from "@/components/Title";
import SignUp from "@/components/SignUp";

export default {
  name: "SignupView",
  components: {
    SignUp,
    Title
  }
}
</script >

<style lang="scss">

</style>