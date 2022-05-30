<template>
  <form @submit.prevent="checkForm"
        novalidate>
    <div v-if="errors.length">
      <b>Veuillez corriger les erreurs suivantes:</b>
      <ul>
        <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
      </ul>
    </div>
    <div class='login'>
      <div class="login__email" >
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" v-model="email" required>
        <p id="emailErrorMsg"></p>
      </div>
      <div class="login__password">
        <label for="password">Mot de passe: </label>
        <input type="password" name="password" id="password" placeholder="MotDePasse" v-model="password" required>
        <p id="passwordErrorMsg"></p>
      </div>
      <div class="form__submit">
        <input type="submit" value="Se connecter" id="submit">
      </div>
    </div>
  </form>


</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      errors: [],
      loading: false,
      email: null,
      password: null,
      user: {}
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/forum')
    }
  },
  methods: {
    checkForm(){
      this.loading = true;
      const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      this.errors = [];

      if(!this.email) {
        this.errors.push({message: 'Email requis'})
      }

      if(!regExpEmail.test(this.email)){
        this.errors.push({message: 'Email invalide'})
      }

      if(!this.password) {
        this.errors.push({message: 'Mot de passe requis'})
      }

      if(this.errors.length === 0) {
        this.user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/forum');
            },
            error => {
              this.loading = false;
              let errorMessage =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              this.errors.push({message: errorMessage.error});
            }
        );
      }
    }
  }
}
</script>

<style lang="scss">

</style>