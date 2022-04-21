<template>
  <form>
    <div class='login'>
      <div class="login__email" >
        <label for="email">Email: </label>
        <input type="email" name="email" id="email" required>
        <p id="emailErrorMsg"></p>
      </div>
      <div class="login__password">
        <label for="password">Mot de passe: </label>
        <input type="password" name="password" id="password" required>
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
  name: "LogIn"
}
</script>

<style scoped>

</style>