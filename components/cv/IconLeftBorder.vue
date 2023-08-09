<script setup lang="ts">
interface IconLeftBorderProps {
  imgSrc: string;
  title: string;
}

const props = defineProps<IconLeftBorderProps>();
</script>

<template>
  <div class="flex flex-row mb-2 items-center">
    <img
      :src="props.imgSrc"
      alt="Avatar"
      :loading="props.title"
      class="w-12 h-12 rounded-full bg-gray-200 mr-3"
    />
    <span class="text-xl text-cyan-500">{{ props.title }}</span>
  </div>
  <div class="border-l-2 border-gray-200 dark:border-gray-600 pl-8 ml-6 mb-3">
    <slot />
  </div>
</template>
