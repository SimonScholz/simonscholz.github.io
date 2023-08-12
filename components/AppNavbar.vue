<script setup lang="ts">
const scrollToTutorialsSection = () => {
  const fn = inject("scrollToTutorialsSection") as Function;
  fn();
};
const scrollToAboutMeSection = () => {
  const fn = inject("scrollToAboutMeSection") as Function;
  fn();
};
</script>

<template>
  <nav class="print:hidden">
    <!-- Covers everything, which is not root "/" and not "/tutorials" -->
    <span
      v-show="
        $route.fullPath?.length > 1 && !$route.fullPath?.match('/tutorials/.+')
      "
    >
      <NuxtLink
        to="/"
        class="ml-3 text-xl transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700"
        ><Icon name="material-symbols:arrow-left-alt" />Home</NuxtLink
      >
    </span>

    <!-- Covers everything, which is not root "/" -->
    <span v-show="$route.fullPath?.match('/tutorials/.+')">
      <NuxtLink
        to="/tutorials"
        class="ml-3 text-xl transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700"
        ><Icon name="material-symbols:arrow-left-alt" />Tutorials</NuxtLink
      >
    </span>

    <ColorModeSwitch
      class="dark:text-primary-100 transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700 absolute right-0 top-0 z-100 mr-10 mt-5 text-xl md:fixed"
    />

    <section
      class="hidden md:grid grid-cols-5 mt-20 justify-items-center gap-6 md:fixed md:grid-cols-1 md:ml-6"
    >
      <NuxtLink class="icon-btn" to="/" title="Home">
        <Icon name="uil:home-alt" />
      </NuxtLink>
      <NuxtLink
        class="icon-btn"
        rel="noreferrer"
        to="https://github.com/simonscholz"
        target="_blank"
        title="GitHub"
      >
        <Icon name="uil:github-alt" />
      </NuxtLink>
      <NuxtLink
        class="icon-btn"
        rel="noreferrer"
        to="https://www.linkedin.com/in/opensource-simon"
        target="_blank"
        title="LinkedIn"
      >
        <Icon name="uil:linkedin-alt" />
      </NuxtLink>
      <NuxtLink
        class="icon-btn"
        rel="noreferrer"
        to="https://twitter.com/simonscholz"
        target="_blank"
        title="Twitter"
      >
        <Icon name="uil:twitter-alt" />
      </NuxtLink>
      <NuxtLink class="icon-btn" title="My Tutorials" to="/tutorials">
        <Icon name="carbon:education" />
      </NuxtLink>
      <NuxtLink class="icon-btn" title="About Me" to="/about">
        <Icon name="carbon:id-management" />
      </NuxtLink>
      <NuxtLink class="icon-btn" to="/cv" title="My Resume / CV">
        <Icon name="pepicons-pop:cv" />
      </NuxtLink>
    </section>
  </nav>
</template>

<style scoped>
.icon-btn {
  @apply cursor-pointer transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700;
}
</style>
