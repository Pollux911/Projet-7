<template>
  <nav>
    <img class="logo" alt="Groupomania Logo" src="./assets/icon-left-font-monochrome-black.svg">
    <div class="links" v-if="this.$route.name === 'home' || this.$route.name === 'signup'">
      <router-link to="/">Se connecter</router-link> |
      <router-link to="/signup">S'inscrire</router-link>
    </div>
    <div class="disconnect" v-if="this.$route.name === 'forum'">
      <a href @click.prevent="myProfile">Mon Profil</a>
      <a href @click.prevent="logOut">Se déconnecter</a>
    </div>
  </nav>
  <router-view/>
</template>

<script>
 /* import NavLink from './components/NavLink.vue'
  import Login from './components/Login.vue';*/

  export default {
    name: 'App',
    components: {
      /*NavLink,
      Login*/
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/');
      },
      myProfile() {
        this.$router.push('/profile')
      }
    }
  }
</script>

<style lang="scss">
body {
  background-color: #101010;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #929292;
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
</style>
