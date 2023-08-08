<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
const year = new Date().getFullYear();
</script>

<template>
  <nav class="">
    <section
      class="fixed bottom-0 right-0 mb-5 mr-10 transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700"
    >
      <a
        class="text-xl hover:cursor-pointer"
        title="⬆️ UP"
        @click="scrollToTop"
      >
        <Icon name="carbon:up-to-top" />
      </a>
    </section>
    <footer
      class="container flex flex-col md:flex-row md:justify-between mx-auto border-t-2 sticky bottom-0 print:hidden"
    >
      <span class="block md:flex-grow ml-4 text-gray-800 dark:text-gray-300"
        >© Simon Scholz 2020 - {{ year }}</span
      >
      <div class="block ml-4">
        <NuxtLink
          to="/contact"
          class="block mt-4 md:inline-block md:mt-0 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white mr-4"
        >
          Contact
        </NuxtLink>
        <NuxtLink
          to="/legal"
          class="block mt-4 md:inline-block md:mt-0 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white mr-4"
        >
          Legal
        </NuxtLink>
        <NuxtLink
          to="/privacy-policy"
          class="block mt-4 md:inline-block md:mt-0 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white mr-4"
        >
          Privacy Policy
        </NuxtLink>
      </div>
    </footer>
  </nav>
</template>
