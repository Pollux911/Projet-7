<template>
  <Form @submit="sendForm(files)">
    <div class="post">
      <div class="post__title">
        <label for="title">Titre :</label>
        <Field type="text" name="title" id="title" v-model="title" placeholder="Titre" required />
        <ErrorMessage name="title" />
      </div>

      <div class="post__content">
        <label for="content">Contenu : </label>
        <textarea name="content" id="content" v-model="content" placeholder="Contenu du post..." />
        <ErrorMessage name="content" />
      </div>
      <div class="post__image">
        <label for="text">Lien : </label>
        <Field type="file" name="image" id="image" v-model="image"  placeholder="Lien" />
        <ErrorMessage name="image" />
      </div>
      <div class="post__submit">
        <input type="submit" value="Créer Post" id="submit" />
      </div>
    </div>
  </Form>
  <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message.error || message }}</div>

</template>


<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from "axios";

export default {
  name: "CreatePost",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      post: null,
      title: null,
      content: null,
      image: null,
      submitted: false,
      successful: false,
      message: ''
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
      if (this.image){
        formData.append('image', this.image[0], this.image[0].name)
      }
      let connectedUser = JSON.parse(localStorage.user)
      axios.post('http://localhost:3000/api/posts',
        formData, {headers: {'Authorization': 'Bearer ' + connectedUser.token}}
      )
          .then(data => {
                this.message = data.data.message + ' Redirection dans 3 secondes...';
                this.successful = true;
                setTimeout( () => this.$router.push('/forum'), 3000)
              },
              error => {
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
label {
  font-size: 25px;
  cursor: pointer;
  display: block;
  span {
    display: block;
  }
  .smaller {
    font-size: 16px;
  }
}

form {
  max-width: 25em;
  margin: auto;
  background: #FFD7D7;
  border-radius: 0.75em;
  padding: 2em;
}


</style>