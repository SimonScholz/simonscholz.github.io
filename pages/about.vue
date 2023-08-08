<script setup lang="ts">
import mePresentingBg from "~/assets/me-presenting-bg.webp";
</script>

<template>
  <main class="container flex flex-col md:flex-row md:justify-between mx-auto">
    <div
      class="md:p-16 bg-no-repeat bg-cover bg-right rounded-t-2xl"
      :style="{ backgroundImage: 'url(' + mePresentingBg + ')' }"
    >
      <ContentDoc path="/about" class="md:w-2/3 p-2" />
    </div>
  </main>
</template>
