<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <nav absolute right-0 top-0 mr-10 mt-5 text-xl md:fixed>
    <button ml-2 icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>
  </nav>
</template>
