<template>
  <nav class="toc">
    <header :class="[
      'flex flex-rowitems-center cursor-pointer',
      isVisible ? 'mb-2' : '',
    ]" @click="toggleToc" aria-label="Expand the table of contents.">
      <span class="mb-0 text-2xl text-gray-400 align-middle">
        Table of Contents
        <Icon v-if="isVisible" name="mdi:chevron-down" class="text-3xl" />
        <Icon v-else name="mdi:chevron-up" class="text-3xl" />
      </span>
    </header>
    <ul v-if="links" :class="[isVisible ? 'block' : 'hidden']">
      <!-- render each link with depth class -->
      <li v-for="link of flattenLinks(links)" :key="link.id"
        :class="`toc-link_${link.depth} first:mt-0 mt-2 md:mt-1 ml-3`">
        <a :href="`#${link.id}`" class="hover:underline text-gray-400">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  links: {
    type: Array,
    required: true,
  },
});

// flatten TOC links nested arrays to one array
const flattenLinks = (links) => {
  let _links = links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        // recursively flatten children links
        let flattened = flattenLinks(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);
  return _links;
};

import { ref } from "vue";
const isVisible = ref(true);
const toggleToc = () => {
  isVisible.value = !isVisible.value;
};
</script>

<style scoped>
.toc-link_3 {
  @apply pl-4;
}

.toc-link_3::before {
  @apply pr-2;
  content: "-";
}
</style>
