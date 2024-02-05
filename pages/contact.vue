<script setup lang="ts">
useHead({
  title: "Contact",
});
</script>

<template>
  <div class="container flex flex-col md:justify-between mx-auto mb-10 md:p-8">

    <h1 class="mt-2 mb-10 text-3xl">
      Contact Me
      <Icon name="mdi:hand-wave" class="ml-3" />
    </h1>

    <div class="md:w-1/2">
      <form action="https://fabform.io/f/nmmFae0" method="post">
        <div class="mb-4">
          <label for="name" class="block text-sm font-bold mb-2">Name</label>
          <input name="name" type="text" required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-600 dark:text-black">
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-bold mb-2">Email</label>
          <input name="email" type="email"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-600 dark:text-black">
        </div>

        <div class="mb-4">
          <label for="message" class="block text-sm font-bold mb-2">Message</label>
          <textarea name="message" required
            class="w-full resize p-2 border border-gray-300 rounded md:h-24 focus:outline-none focus:border-cyan-600 dark:text-black"></textarea>
        </div>

        <button type="submit"
          class="text-xl right-0 border-0 p-2 px-4 bg-cyan-600 rounded-md transition duration-500 hover:duration-500 hover:bg-cyan-700 !important">
          Send
        </button>
      </form>
    </div>

    <p>
      Of course you can reach out to me via email (
      <a class="text-cyan-500" href="mailto:opensource.simon@gmail.com">
        opensource.simonⓐⓣgmail.com
      </a>
      ) or on social media.
    </p>

    <p>
      In regards of the tutorials also feel free to open issues in this GitHub
      repository:
      <a class="text-cyan-500" href="https://github.com/SimonScholz/simonscholz.github.io/issues">
        github.com/SimonScholz/simonscholz.github.io/issues
      </a>
    </p>
    <p>I am really happy to receive feedback about my content.</p>
  </div>
</template>

<style scoped>
[type=button],
[type=reset],
[type=submit],
button {
  @apply bg-cyan-600;
}

[type=button]:hover,
[type=reset]:hover,
[type=submit]:hover,
button:hover {
  @apply bg-cyan-700;
}


p {
  @apply mt-6;
}

h1 {
  @apply text-3xl;
}</style>
