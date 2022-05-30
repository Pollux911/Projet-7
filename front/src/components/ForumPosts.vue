<template>
  <ul v-if="!loading && data && data.length">
    <li v-for='(post, index) in data' :key="post">

      <div v-if="user === post.users.id || adminStatus === true">
        <router-link :to="`/modifypost/${post.id}`">Modifier le post</router-link>
        <button @click="deletePost(post.id)">Supprimer le post</button>
      </div>

      <h2>{{ post.title }}</h2>
      <p class="date"> {{ post.createdAt.substring(11, 16) }} le {{ post.createdAt.substring(5, 7) }}/{{ post.createdAt.substring(8, 10) }}</p>
      <p class="user">{{ post.users.firstName + ' ' + post.users.lastName }} </p>
      <p class="post">a posté : {{ post.content }}</p>

      <img class="postImage" v-if="post.attachment" :src="post.attachment" alt="Image">
      <p class="likes">{{ post.likes }} likes</p>
      <LikeButton :postId="post.id" @like-clicked="updateLike(post.id, index)"/>

      <div :class="{ bold: isFolder }" @click="toggle">
        <span class="tree" v-if="isFolder">[{{ isOpen ? 'Masquer les commentaires' : 'Afficher les commentaires' }}]</span>
      </div>

      <div v-show="isOpen" class="comments" v-for="comment in post.postComments" :key="comment">
        <p class ="comment">
          {{ comment.commentUser.firstName +' ' + comment.commentUser.lastName }} a commenté à {{ comment.createdAt.substring(11, 16) }} le {{ comment.createdAt.substring(5, 7) }}/{{ comment.createdAt.substring(8, 10) }} : {{ comment.content }}
        </p>
        <button @click="deleteComment(comment.id)" v-if=" user === comment.commentUser.id || adminStatus === true ">Supprimer ce commentaire</button>
      </div>
      <CommentButton :postId="post.id" @comment-clicked="updateComment(post.id, index)"/>

    </li>
  </ul>

  <p v-if="loading">
    Chargement...
  </p>
  <p v-if="error">
    Erreur avec l'API : {{ error }}
  </p>

</template>

<script>
import {ref, onMounted, computed} from "vue";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import axios from "axios";

export default {
  name: 'ForumPosts',
  components: {
    LikeButton,
    CommentButton
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const user = ref(JSON.parse(localStorage.user).userId)
    const adminStatus = ref(false)
    const userStorage = ref(JSON.parse(localStorage.getItem('user')))
    const isOpen = ref(true)
    const isFolder = computed(() => {
      return data.value && data.value.length
    })

    function toggle() {
      isOpen.value = !isOpen.value
    }

    function fetchData() {
      loading.value = true;
      return fetch('http://localhost:3000/api/posts/', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + userStorage.value.token,
          'content-type': 'application/json'
        }
      })
          .then(res => {
            if (!res.ok) {
              // Create error instance with HTTP status text
              const error = new Error(res.statusText);
              error.json = res.json();
              throw error;
            }
            return res.json();
          })
          .then(json => {
            data.value = json;
            isAdmin(user.value) // Check if user is admin
            sortByDescDate(data.value) //Sorting Posts by descending dates (from newest to oldest post)
            data.value.forEach(e => { //Sorting Comments by ascending dates (from oldest to newest)
              sortByAscDate(e.postComments)
            })
          })
          .catch(err => {
            error.value = err;
            // In case a custom JSON error response was provided
            if (err.json) {
              return err.json.then(json => {
                // set the JSON response message
                error.value.message = json.message;
              });
            }
          })
          .then(() => {
            loading.value = false;
          });
    }

    function sortByDescDate(array) { //Sort by Descending Order (Newest to Oldest)
      array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    function sortByAscDate(array) { //Sort by Ascending Order (Oldest to Newest)
      array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    function updateLike(postId, index){//Refresh likes value of a post
      axios.get(`http://localhost:3000/api/posts/${postId}`, {
        headers: {'Authorization': 'Bearer ' + userStorage.value.token}
      })
          .then( json => {
            this.data[index].likes = json.data.likes
          })
    }

    function updateComment(postId, index){//Refresh Comments of a Post
      axios.get(`http://localhost:3000/api/posts/${postId}`, {
        headers: { 'Authorization': 'Bearer ' + userStorage.value.token }
      })
          .then( json => {
            this.data[index].postComments = json.data.postComments
            this.data.forEach(e => { //Sorting Comments by ascending dates (from oldest to newest)
              sortByAscDate(e.postComments)
            })
          })
    }
    function isAdmin(user){
      axios.get(`http://localhost:3000/api/auth/user/${user}`, {
        headers: {'Authorization': 'Bearer ' + userStorage.value.token}
      }).then(user => {
        if(user.data.isAdmin){
          adminStatus.value = true
        }
      })
    }
    function deletePost(post){
      return axios.delete( `http://localhost:3000/api/posts/${post}`, {
        headers: {'Authorization': 'Bearer ' + userStorage.value.token},
        data: {
          user: userStorage.value.userId
        }
      }).then(fetchData)
    }
    function deleteComment(comment){
      return axios.delete( `http://localhost:3000/api/comments/${comment}`, {
        headers: {'Authorization': 'Bearer ' + userStorage.value.token},
        data: {
          user: userStorage.value.userId
        }
      }).then(fetchData)
    }

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      loading,
      error,
      user,
      adminStatus,
      isAdmin,
      //fetchData,
      updateLike,
      updateComment,
      deletePost,
      deleteComment,
      isOpen,
      isFolder,
      toggle
    };
  }
}
</script>

<style lang="scss">

h2{
  color: #ff6868;
}
h3{
  color: blueviolet;

}
.likes{
  color: green;
}
.comment{
  background: #FD2D01;
  color: black;
  border: 0.3vw #FFD7D7 solid ;
  border-radius: 0.75em;
  margin: auto;
  padding: 0.75em;
}
ul{
  list-style: none;
}
li{
  border: 0.5vw red solid;
  border-radius: 0.75em;
  margin: 1vw 1vw 5vw 1vw ;
  background: #FFD7D7;
}
.postImage {
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
  border: 0.5vw red solid;
}
.tree {
  cursor: pointer;
}

</style>