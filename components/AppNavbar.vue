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
  </nav>
</template>
