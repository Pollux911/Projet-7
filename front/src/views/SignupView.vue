<template>
  <div>
    <HelloWorld msg="Inscription"/>
    <SignUp></SignUp>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import SignUp from "@/components/SignUp";

export default {
  name: "SignupView",
  components: {
    SignUp,
    HelloWorld,
  }
}
</script>

<style scoped>

</style>