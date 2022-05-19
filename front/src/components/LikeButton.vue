<template>
  <button @click="likePost">Aimer</button>

</template>

<script>
import axios from "axios";

export default {
  name: "LikeButton",
  props: {
    postId: String,
    liked: Array
  },
  methods: {
    likePost() {
      let postUuid = this.postId;
      if (this.liked.some( e => e.id === JSON.parse(localStorage.user).userId)) {
        return axios.post(`http://localhost:3000/api/posts/${postUuid}/like`, {
          like:false,
          userId: JSON.parse(localStorage.user).userId
        })
      }
      else {
        axios.post(`http://localhost:3000/api/posts/${postUuid}/like`, {
          like:true,
          userId: JSON.parse(localStorage.user).userId
        })
      }




    }
  }
}
</script>

<style lang="scss">

</style>