<script setup lang="ts">
interface TutorialCardProps {
  href: string
}

const props = defineProps<TutorialCardProps>()
</script>

<template>
  <a :href="props.href" class="m-3 block max-w-sm border border-gray-200 rounded-lg bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      <slot />
    </h5>
  </a>
</template>
