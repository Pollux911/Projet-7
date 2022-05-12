<template>
  <component :is="tag" class="file-preview">
    <button @click="$emit('remove', file)" class="close-icon" aria-label="Remove">X</button>
    <img :src="file.url" :alt="file.file.name" :title="file.file.name" />
  </component>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  file: { type: Object, required: true},
  tag: { type: String, default: 'li' }
})
defineEmits(['remove'])
</script>

<style lang="scss">
file-preview {
  width: 20%;
  margin: 1rem 2.5%;
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;

  .close-icon, .status-indicator {
    --size: 20px;
    position: absolute;
    line-height: var(--size);
    height: var(--size);
    border-radius: var(--size);
    box-shadow: 0 0 5px currentColor;
    right: 0.25rem;
    appearance: none;
    border: 0;
    padding: 0;
  }

  .close-icon {
    width: var(--size);
    font-size: var(--size);
    background: #933;
    color: #fff;
    top: 0.25rem;
    cursor: pointer;
  }
}
img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}


</style>