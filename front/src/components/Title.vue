<template>
  <div id="intro">
    <div class="title">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TiTle',
  props: {
    msg: String
  }
}
</script>

<style lang="scss">
#intro {
  /*display: flex;
  align-content: flex-start;*/
}
a, h1{
  color: red;
}
</style>
