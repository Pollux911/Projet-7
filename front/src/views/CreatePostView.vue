<template>
  <Title msg="Créer un post"/>
  <CreatePost />
</template>

<script>

import CreatePost from "@/components/CreatePost";
import Title from "@/components/Title";

export default {
  name: "CreatePostView",
  components: {
    CreatePost,
    Title
  }
}
</script>

<style lang="scss">

</style>