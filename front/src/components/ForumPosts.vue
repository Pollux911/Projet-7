<template>
  <ul v-if="!loading && data && data.length">
    <li v-for="post of data" :key="post">

      <router-link :to="`/modifypost/${post.id}`">Modifier post</router-link>

      <h2>{{ post.title }}</h2>
      <p class="date"> {{ post.createdAt.substring(11, 16) }} le {{ post.createdAt.substring(5, 7) }}/{{ post.createdAt.substring(8, 10) }}</p>
      <p class="post">{{ post.users.firstName + ' ' + post.users.lastName }} a posté : {{ post.content }}</p>

      <p class="likes">{{ post.likes }} likes</p>
      <img :src="post.attachment" alt="Image">
      <LikeButton :postId="post.id"  :liked="post.postLike"/>

      <p class="comments" v-for="comment of post.postComments" :key="comment">
        {{  comment.commentUser.firstName + ' ' + comment.commentUser.lastName }} a commenté à {{ comment.createdAt.substring(11, 16) }} le {{ comment.createdAt.substring(5, 7) }}/{{ comment.createdAt.substring(8, 10) }} : {{ comment.content }}
      </p>
      <CommentButton :postId="post.id" />

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
import {ref, onMounted} from "vue";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";

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

    function fetchData() {

      loading.value = true;
      return fetch('http://localhost:3000/api/posts/', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
          .then(res => {
            if (!res.ok) {
              // create error instance with HTTP status text
              const error = new Error(res.statusText);
              error.json = res.json();
              throw error;
            }
            return res.json();
          })
          .then(json => {
            data.value = json;
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

    function sortByDescDate(array) {
      array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    function sortByAscDate(array) {
      array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }



    onMounted(() => {
      fetchData();
    });

    return {
      data,
      loading,
      error,
      //userName
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
.comments{
  color: aqua;
  border: 0.3vw #a10a85 solid ;
}
ul{
  list-style: none;
}
li{
  border: 0.5vw red solid;
  margin: 1vw 1vw 5vw 1vw ;
}
img {
  max-width: 25em;
  max-height: 25em;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto
}

</style>