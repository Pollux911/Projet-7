<template>
  <button>Aimer {{ postId }}</button>

</template>

<script>
import axios from "axios";

export default {
  name: "LikeButton",
  props: {
    postId: String
  },
  methods: {
    likePost() {
      let postUuid = this.postId;
      axios.post(`http://localhost:3000/api/posts/${postUuid}/like`, {
        like:true,
        userId: JSON.parse(localStorage.user).userId
      })

    }
  }
}
</script>

<style lang="scss">

</style>