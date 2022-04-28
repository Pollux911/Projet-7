<template>
  <form @submit="checkForm"
        method="post"
        novalidate="true">
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
        <input type="password" name="password" id="password" v-model="password" required>
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
      email: null,
      password: null,
    }
  },
  methods: {
    checkForm(e){
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

      else{
        this.connect()
      }
      e.preventDefault()

    },

    async connect(){
      const postConnect = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(),
        headers: {
          "content-type" : "application/json",
        }
      })

      return postConnect

    }
  }

}
</script>

<style lang="scss">

</style>