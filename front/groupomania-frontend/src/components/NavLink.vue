<template>
  <a :href="url">{{ text }}</a>
</template>

<script>
export default {
  name: 'NavLink',
  props: ['url', 'text']
}
</script>

<style>
.grpLogo{
  width: 25%;
}
a {
  text-decoration: none;
}
</style>