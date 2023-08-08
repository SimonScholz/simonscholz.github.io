<script setup lang="ts">
interface ToolCardProps {
  imgSrc: string;
  imgAlt?: string;
}

const props = defineProps<ToolCardProps>();
</script>

<template>
  <div
    class="min-w-60 flex flex-col items-center justify-center border border-gray-200 rounded-lg bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
  >
    <img
      :src="props.imgSrc"
      :alt="props.imgAlt"
      :title="props.imgAlt"
      width="24"
      height="24"
      loading="lazy"
      class="h-16 w-16 md:h-24 md:w-24"
    />
    <p class="mt-5 text-xl font-normal text-gray-700 dark:text-gray-400">
      <slot />
    </p>
  </div>
</template>
