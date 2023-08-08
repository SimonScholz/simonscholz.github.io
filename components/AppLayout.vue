<script setup lang="ts">
const { cover } = useAppConfig();
useServerSeoMeta({
  title: "Simon Scholz",
  ogTitle: "Simon Scholz",
  ogUrl: "https://simonscholz.github.io/",
  description:
    "View the profile and skills of Simon Scholz plus tutorials he has written for you",
  ogDescription:
    "View the profile and skills of Simon Scholz plus tutorials he has written for you",
  twitterCard: "summary_large_image",
  titleTemplate: "%s - Simon Scholz",
  applicationName: "Simon Scholz",
  author: "Simon Scholz",
  creator: "Simon Scholz",
  generator: "Nuxt",
  robots: {
    all: true,
  },
  ogImageType: "image/png",
});
</script>

<template>
  <div class="sm:pt-6 sm:pb-10 px-4 py-10">
    <Html lang="en" />
    <Meta property="og:image" :content="cover" />
    <AppLoadingBar />
    <AppNavbar />
    <slot />
  </div>
</template>

<style lang="postcss">
body {
  @apply bg-primary-50 text-black dark:bg-primary-900 dark:text-white;
}
</style>
