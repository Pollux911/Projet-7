<template>
  <div >
      <h3>
        <strong>{{currentUser.username}}</strong>
      </h3>
    <p>
      <strong>Token:</strong>
      {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.userId}}
    </p>
    <Form @submit="eraseUser">
      <p>Entrez votre email pour effacer votre compte :</p>
      <label for="email">Email : </label>
      <Field type="email" name="email" id="email" v-model="email" :rules="validateEmail" />
      <ErrorMessage name="email" />
      <button >Effacer Profil</button>
    </Form>
    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message.error || message }}</div>

  </div>

</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import AuthService from "@/services/auth.service";

export default {
  name: "UserProfile",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      user: null,
      email: null,
      firstName: null,
      lastName: null,
      isAdmin: null,
      message: '',
      successful: false,

    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.router.push('/')
    }
  },
  methods: {
    validateEmail(value) {
      if (!value) {
        return 'Email requis !'
      }

      const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if (!regExpEmail.test(value)) {
        return 'Email incorrect !'
      }

      return true;
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    eraseUser(){
      this.user = {
        email: this.email,
        token: this.currentUser.token
      }
      AuthService.deleteUser(this.user).then(
          data => {
            this.message = data.data.message + " Redirection vers la page d'accueil...";
            this.successful = true;
            AuthService.logout() //remove local storage user
            setTimeout(() => this.logOut(), 2000 ) //redirect to home page after 2 seconds
          },
          error => {
            this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
          }
      );

    }
  }
}
</script>

<style lang="scss">

</style>