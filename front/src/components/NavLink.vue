<template>
  <a :href="url">{{ text }}</a>
</template>

<script>
export default {
  name: 'NavLink',
  props: ['url', 'text']
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>
