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
    <strong>Rôle:</strong>
    <ul>
<!--      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>-->
    </ul>
    <Form @submit="eraseUser">
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
      message: '',
      successful: false,
    }
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user, 'userrweerw')
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
    eraseUser(){
      this.user = {
        email: this.email,
        token: this.currentUser.token
      }
      console.log('deleting')
      console.log('le token', this.currentUser.token)
      AuthService.deleteUser(this.user).then(
          data => {
            this.message = data;
            this.successful = true;
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