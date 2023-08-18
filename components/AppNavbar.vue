<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

const hideMobileMenu = ref(true);
const mobileMenu = ref<HTMLInputElement | null>(null);

onClickOutside(mobileMenu, (event) => {
  if (event.target.closest("button")?.id !== "burgerMenu") {
    closeMobileMenu();
  }
});

function showMobileMenu() {
  hideMobileMenu.value = !hideMobileMenu.value;
}

function closeMobileMenu() {
  if (!hideMobileMenu.value) {
    hideMobileMenu.value = true;
  }
}
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
        class="ml-3 mt-3 text-xl transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700"
        ><Icon name="material-symbols:arrow-left-alt" />Home</NuxtLink
      >
    </span>

    <!-- Covers everything, which is not root "/" -->
    <span v-show="$route.fullPath?.match('/tutorials/.+')">
      <NuxtLink
        to="/tutorials"
        class="ml-3 mt-3 text-xl transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700"
        ><Icon name="material-symbols:arrow-left-alt" />Tutorials</NuxtLink
      >
    </span>

    <ColorModeSwitch
      class="dark:text-primary-100 transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700 absolute right-0 top-0 z-100 mr-10 mt-5 text-xl md:fixed print:hidden"
    />

    <button
      id="burgerMenu"
      @click="showMobileMenu"
      class="dark:text-primary-100 transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700 absolute left-0 top-0 z-100 ml-10 mt-5 text-xl md:hidden print:hidden"
    >
      <Icon name="mdi:menu" title="menu" class="w-5 h-5" />
    </button>

    <menu
      ref="mobileMenu"
      :class="{ hidden: hideMobileMenu }"
      class="fixed top-0 right-0 w-1/2 h-full bg-opacity-100 z-50 bg-gray-100 dark:bg-gray-800 pt-8 pl-4 text-xl print:hidden"
    >
      <button class="absolute top-2 right-3" @click="closeMobileMenu">
        <Icon name="mdi:close" />
      </button>
      <NuxtLink
        class="icon-btn align-middle flex flex-row text-xl place-items-center"
        to="/"
        title="Home"
        @click="closeMobileMenu"
      >
        <Icon name="uil:home-alt" />
        <span class="ml-3">Home</span>
      </NuxtLink>

      <NuxtLink
        class="icon-btn align-middle flex flex-row text-xl place-items-center mt-3"
        rel="noreferrer"
        to="https://github.com/simonscholz"
        target="_blank"
        title="GitHub"
      >
        <Icon name="uil:github-alt" />
        <span class="ml-3">GitHub</span>
      </NuxtLink>
      <NuxtLink
        class="icon-btn align-middle flex flex-row text-xl place-items-center mt-3"
        rel="noreferrer"
        to="https://www.linkedin.com/in/opensource-simon"
        target="_blank"
        title="LinkedIn"
      >
        <Icon name="uil:linkedin-alt" />
        <span class="ml-3">LinkedIn</span>
      </NuxtLink>
      <NuxtLink
        class="icon-btn align-middle flex flex-row text-xl place-items-center mt-3"
        rel="noreferrer"
        to="https://twitter.com/simonscholz"
        target="_blank"
        title="Twitter"
      >
        <Icon name="uil:twitter-alt" />
        <span class="ml-3">Twitter</span>
      </NuxtLink>
      <NuxtLink
        class="icon-btn align-middle flex flex-row text-xl place-items-center mt-3"
        title="My Tutorials"
        to="/tutorials"
        @click="closeMobileMenu"
      >
        <Icon name="carbon:education" />
        <span class="ml-3">Tutorials</span>
      </NuxtLink>
      <NuxtLink
        class="icon-btn align-middle flex flex-row text-xl place-items-center mt-3"
        title="About Me"
        to="/about"
        @click="closeMobileMenu"
      >
        <Icon name="carbon:id-management" />
        <span class="ml-3">About</span>
      </NuxtLink>
      <NuxtLink
        class="icon-btn align-middle flex flex-row text-xl place-items-center mt-3"
        to="/cv"
        title="My Resume / CV"
        @click="closeMobileMenu"
      >
        <Icon name="pepicons-pop:cv" />
        <span class="ml-3">Resume</span>
      </NuxtLink>
    </menu>

    <section
      class="hidden md:grid mt-20 justify-items-center gap-6 md:fixed md:grid-cols-1 md:ml-6"
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
