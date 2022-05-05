<template>
  <div id="intro">
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#intro {
  /*display: flex;
  align-content: flex-start;*/
}
a, h1{
  color: red;
}
</style>
