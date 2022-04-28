<template>
  <form @submit="checkForm"

        method="post"
        novalidate="true">
      <div v-if="errors.length">
        <b>Veuillez corriger les erreurs suivantes:</b>
      <ul>
        <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
      </ul></div>
    <div class="signup">
      <div class="signup__email">
        <label for="email">Email : </label>
        <input type="email" name="email" id="email" v-model="email" placeholder="email@example.com">
      </div>
      <div class="signup__password">
        <label for="password">Mot de passe : </label>
        <input type="password" name="password" id="password" v-model="password" placeholder="MotDePasse123@" required>
      </div>
      <div class="signup__lastName">
        <label for="text">Nom : </label>
        <input type="text" name="lastName" id="lastName" v-model="lastName" placeholder="Nom" required>
      </div>
      <div class="signup__firstName">
        <label for="text">Prénom : </label>
        <input type="text" name="firstName" id="firstName" v-model="firstName" placeholder="Prénom" required>
      </div>
      <div class="form__submit">
        <input type="submit" value="S'inscrire" id="submit">
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      errors: [],
      email: null,
      password: null,
      firstName: null,
      lastName: null
    }
  },
  methods: {
    connect(email, password, firstName, lastName){
      let info = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,

      }
      fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "content-type" : "application/json",
        }
      })
          .then(function (res){
            if(res.ok) {
              return res.json();
            } else {
              console.log("error with API", res)
            }
          })
          .then(function (){
            window.location = `./forum`;

          })
    },

    checkForm(e){
      const regExpEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      const regExpName = new RegExp('^[a-zA-Z-áàâäãåçéèêëíìîïñóòôöõú ùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]*$');

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

      if(!this.lastName) {
        this.errors.push({message: 'Nom requis'})
      }

      if(!regExpName.test(this.lastName)){
        this.errors.push({message: 'Prénom invalide'})
      }

      if(!this.firstName) {
        this.errors.push({message: 'Prénom requis'})
      }

      if(!regExpName.test(this.firstName)){
        this.errors.push({message: 'Nom invalide'})
      }
      else {
        this.connect(this.email, this.password, this.firstName, this.lastName)
      }

      e.preventDefault()
    },


  }
}
</script>

<style lang="scss">


</style>