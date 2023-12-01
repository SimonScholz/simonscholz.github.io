<script setup lang="ts">
import { useKlaro } from './composables/useKlaro';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Simon Scholz` : "Simon Scholz";
  },
  noscript: [
    {
      tagPosition: "bodyOpen",
      innerHTML: `<iframe data-name="google-tag-manager" data-src="https://www.googletagmanager.com/ns.html?id=GTM-KW7KLVJR"
        height="0" width="0" style="display:none;visibility:hidden">
      </iframe>`
    }
  ],
  script: [
    {
      type: 'text/plain',
      "data-type": "application/javascript",
      "data-name": "google-tag-manager",
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KW7KLVJR');`
    },
  ],
});
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

useKlaro();
</script>
<template>
  <AppLayout>
    <NuxtPage />
  </AppLayout>
</template>

<style>
@import url("~/assets/klaro.css");
</style>
