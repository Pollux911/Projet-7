<template>
  <div>
    <Title msg="Accueil Forum"/>
    <ForumPosts />
  </div>
</template>

<script>
import Title from "@/components/Title";
import ForumPosts from "@/components/ForumPosts";

export default {
  name: "ForumView",
  components: {
    Title,
    ForumPosts
  }
}
</script>

<style lang="scss">

</style>