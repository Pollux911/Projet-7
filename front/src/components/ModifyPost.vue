<template>
  <Form @submit="sendForm()">
    <div class="post">
      <div class="post__title">
        <label for="title">Titre :</label>
        <Field type="text" name="title" id="title" v-model="title" placeholder="Titre" required />
        <ErrorMessage name="title" />
      </div>

      <div class="post__content">
        <label for="content">Contenu : </label>
        <textarea name="content" id="content" v-model="content" placeholder="" ></textarea>
        <ErrorMessage name="content" />
      </div>
      <div class="post__image">
        <label for="text">Lien : </label>
        <Field type="file" name="image" id="image" v-model="image" value=""  placeholder="Lien" />
        <ErrorMessage name="image" />
      </div>

      <div class="post__submit">
        <input type="submit" value="Modifier Post" id="submit" />
      </div>
    </div>
  </Form>
  <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message.error || message }}</div>

</template>

<script>
import {ref, onMounted} from "vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from "axios";
import { useRoute } from "vue-router"
export default {
  name: "ModifyPost",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const data = ref(null);
    const error = ref(null);
    const route = useRoute();
    const id = route.params.id

    function fetchPost(postId) {
      return fetch(`http://localhost:3000/api/posts/${postId}`, {
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
            console.log(json.title)
            console.log(this.content)
            this.content = json.title



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

    }


    onMounted(() => {
      fetchPost(id);


    });

    return {
      data,
      error
    };
  },
  data() {

    return {
      post: null,
      title: null,
      content: null,
      image: null,
      submitted: false,
      successful: false,
      message: '',
    }
  },

  methods : {

    sendForm() {
      this.message = '';


      let user = JSON.parse(localStorage.user).userId
      this.post = {
        title: this.title,
        content: this.content,
        userId: user
      }

      const formData = new FormData()

      formData.append('post', JSON.stringify(this.post))
      formData.append('image', this.image[0], this.image[0].name)


      axios.put(`http://localhost:3000/api/posts/${this.$route.params.id}`, formData)
          .then(data => {
                console.log(data, 'les datas')
                this.message = data.data.message;
                this.successful = true;
                //setTimeout( () => this.$router.push('/forum'), 3000)
              },
              error => {
                console.log(error, 'erreurfrontend')
                this.message =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                this.successful = false;
              }
          )
    }
  }
}
</script>

<style lang="scss">

</style>