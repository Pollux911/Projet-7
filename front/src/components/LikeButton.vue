<template>
  <button @click="likePost">Aimer</button>

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
      let postId = this.postId;
      let connectedUser = JSON.parse(localStorage.user)
      let user = JSON.parse(localStorage.user).userId
      axios.get(`http://localhost:3000/api/posts/${postId}`, {
        headers : { Authorization: 'Bearer ' + connectedUser.token }
      })
          .then( post => {
            let liked = post.data.postLike //Get user like status (liked or not liked)
            if ( liked.some( e => e.id === connectedUser.userId)) {
              return axios.post(`http://localhost:3000/api/posts/${postId}/like`, {
                    like: false,
                    userId: user
              },
                  {headers : { Authorization: 'Bearer ' + connectedUser.token }}
              ).then(() => this.$emit('like-clicked'))
            }
            else {
              return axios.post(`http://localhost:3000/api/posts/${postId}/like`, {
                like: true,
                userId: user
              },
                  {headers : { Authorization: 'Bearer ' + connectedUser.token }}
              ).then(() => this.$emit('like-clicked'))
            }
          })
    }
  }
}
</script>

<style lang="scss">

</style>