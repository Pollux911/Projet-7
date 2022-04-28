<template>
  <div>
    <HelloWorld msg="Accueil Forum"/>
    <ForumPosts />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import ForumPosts from "@/components/ForumPosts";

export default {
  name: "ForumView",
  components: {
    HelloWorld,
    ForumPosts
  }
}
</script>

<style>
router-link{

}

</style>