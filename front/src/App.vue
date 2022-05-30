<template>
  <nav>
    <img class="logo" alt="Groupomania Logo" src="./assets/icon-left-font-monochrome-black.svg">
    <div class="links" v-if="this.$route.name === 'home' || this.$route.name === 'signup'">
      <router-link to="/">Se connecter</router-link> |
      <router-link to="/signup">S'inscrire</router-link>
    </div>
    <div class="navLinks" v-if="this.$route.name === 'forum'">
      <router-link to="/createpost">Créer un post</router-link> |
      <router-link to="/profile/">Mon Profil</router-link> |
      <a href @click.prevent="logOut">Se déconnecter</a>
    </div>
    <div class="navLinks" v-if="this.$route.name === 'createpost'">
      <router-link to="/forum/">Forum</router-link> |
      <router-link to="/profile/">Mon Profil</router-link>
    </div>
    <div class="navLinks" v-if="this.$route.name === 'profile'">
      <router-link to="/forum/">Forum</router-link> |
      <router-link to="/createpost/">Créer un post</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<script>

  export default {
    name: 'App',
    components: {
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap');
body {
  background-color: white;
}
#app {
  font-family: Lato, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo{
  filter: invert(13%) sepia(95%) saturate(6682%) hue-rotate(6deg) brightness(105%) contrast(119%);
  width: 25%;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 3vw;
}

nav a.router-link-exact-active, nav a:visited {
  color: red;
  text-decoration: none;
}

.navLinks{
  flex-direction: row;
}
router-link a {

}
</style>
