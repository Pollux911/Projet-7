<template>
  <ul v-if="!loading && data && data.length">
    <li v-for="post of data" :key="post">
      <h2>{{ post.title }}</h2>

      <p class="post">{{ post.users.firstName + ' ' + post.users.lastName }} a posté à {{ post.createdAt.substring(11, 16) }} le {{ post.createdAt.substring(5, 7) }}/{{ post.createdAt.substring(8, 10) }} : {{ post.content }}</p>

      <p class="likes" v-if="post.likes >= 0">{{ post.likes }} likes</p>
      <LikeButton />
      <CommentButton />

      <p class="comments" v-for="comment of post.postComment" :key="comment">
        {{ comment.firstName + ' ' + comment.lastName }} a commenté à {{ comment.Comment.createdAt.substring(11, 16) }} le {{ comment.Comment.createdAt.substring(5, 7) }}/{{ comment.Comment.createdAt.substring(8, 10) }} : {{ comment.Comment.content }}
      </p>
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
            // a non-200 response code
            if (!res.ok) {
              // create error instance with HTTP status text
              const error = new Error(res.statusText);
              error.json = res.json();
              throw error;
            }

            return res.json();
          })
          .then(json => {
            // set the response data
            data.value = json;
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

</style>