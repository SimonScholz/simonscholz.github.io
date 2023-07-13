<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <section fixed bottom-0 right-0 mb-5 mr-10>
    <a text-xl icon-btn title="⬆️ UP" @click="scrollToTop">
      <div i-carbon-up-to-top />
    </a>
  </section>
</template>
