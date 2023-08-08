<script setup lang="ts">
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
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>
