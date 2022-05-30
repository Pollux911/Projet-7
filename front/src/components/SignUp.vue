<template>
  <Form @submit="handleSignup">
    <div class="signup">
      <div class="signup__email">
        <label for="email">Email : </label>
        <Field type="email" name="email" id="email" v-model="email" :rules="validateEmail"  placeholder="email@example.com" />
        <ErrorMessage name="email" />
      </div>
      <div class="signup__password">
        <label for="password">Mot de passe : </label>
        <Field type="password" name="password" id="password" v-model="password" :rules="validatePassword" placeholder="MotDePasse123@" required />
        <ErrorMessage name="password" />
      </div>
      <div class="signup__lastName">
        <label for="lastName">Nom : </label>
        <Field type="text" name="lastName" id="lastName" v-model="lastName" :rules="validateLastName" placeholder="Nom" required />
        <ErrorMessage name="lastName" />
      </div>
      <div class="signup__firstName">
        <label for="firstName">Prénom : </label>
        <Field type="text" name="firstName" id="firstName" v-model="firstName" :rules="validateFirstName" placeholder="Prénom" required />
        <ErrorMessage name="firstName" />
      </div>
      <div class="form__submit">
        <input type="submit" value="S'inscrire" id="submit" />
      </div>
    </div>
  </Form>
  <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message.error || message }}</div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: "SignUp",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      user: {},
      submitted: false,
      successful: false,
      message: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/forum');
    }
  },
  methods: {
    handleSignup() {
      this.message = '';
      this.submitted = true;
      this.user = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.$store.dispatch('auth/signup', this.user).then(
          data => {
            this.message = data.message;
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
      );
    },

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

    validatePassword(value) {
      if(!value){
        return 'Mot de passe requis !'
      }
      if(value.length < 8) {
        return 'Le mot de passe doit contenir au moins 8 caractères'
      }
      if(value.length > 64) {
        return 'Le mot de passe doit contenir au maximun 64 caractères'
      }

      return true;
    },

    validateFirstName(value) {
      if(!value){
        return 'Prénom requis !'
      }
      const regExpName = new RegExp('^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõú ùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]*$');
      if(!regExpName.test(value)) {
        return 'Prénom invalide'
      }

      return true;
    },
    validateLastName(value) {
      if(!value){
        return 'Nom requis !'
      }
      const regExpName = new RegExp('^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõú ùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]*$');
      if(!regExpName.test(value)) {
        return 'Nom invalide'
      }

      return true;
    },
  }
}
</script>

<style lang="scss">


</style>