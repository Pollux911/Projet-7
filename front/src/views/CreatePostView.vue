<template>
  <HelloWorld msg="Créer un post"/>
  <CreatePost />
</template>

<script>

import CreatePost from "@/components/CreatePost";
import HelloWorld from "@/components/HelloWorld";

export default {
  name: "CreatePostView",
  components: {
    CreatePost,
    HelloWorld
  }
}
</script>

<style lang="scss">

</style>