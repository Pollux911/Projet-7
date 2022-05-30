<template>
  <div>
    <textarea v-model="contentArea" name="contentArea" id="contentArea" cols="30" rows="5"></textarea>
    <button @click="commentPost">Commenter</button>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "CommentButton",
  props: {
    postId: String
  },
  data(){
    return {
      contentArea: null
    }
  },
  methods: {
    commentPost() {
      let postId = this.postId;
      let userStorage = JSON.parse(localStorage.getItem('user'))
      if (!this.contentArea) {
        return alert('Votre commentaire est vide.')
      }
      return axios.post(`http://localhost:3000/api/comments/${postId}`, {
        userId: JSON.parse(localStorage.user).userId,
        content: this.contentArea,
        likes: 0
      }, {headers: {'Authorization': 'Bearer ' + userStorage.token}}).then(() => this.$emit('comment-clicked'), this.contentArea = null)
    }
  }

}
</script>

<style lang="scss">
div {
  display: flex;
  flex-direction: column;
}
textarea {
  max-width: 25em;
  margin: auto;
}
button {
  max-width: 25em;
  margin: auto;
}
</style>