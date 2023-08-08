<script setup lang="ts">
const { cover } = useAppConfig();
</script>

<template>
  <div class="sm:pt-6 sm:pb-10 px-4 py-10">
    <Html lang="en" />
    <Meta property="og:image" :content="cover" />
    <AppLoadingBar />
    <AppNavbar />
    <slot />
    <AppFooter />
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-primary-50 text-black dark:bg-primary-900 dark:text-white;
}
</style>
