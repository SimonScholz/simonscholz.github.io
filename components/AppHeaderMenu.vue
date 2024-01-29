<script setup lang="ts">
</script>

<template>
    <div class="flex items-center justify-end space-x-6 mr-16 print:hidden">
        <!-- <NuxtLink to="/offers" class="transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700">Offers</NuxtLink> -->
        <NuxtLink to="/tutorials"
            class="align-middle flex flex-row items-center transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700">
            <Icon name="carbon:education" />
            <span class="ml-3">Tutorials</span>
        </NuxtLink>
        <!--
        <NuxtLink to="/projects"
            class="align-middle flex flex-row items-center transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700">
            <Icon name="carbon:code" />
            <span class="ml-3">Projects</span>
        </NuxtLink>
        -->
        <NuxtLink to="/about"
            class="align-middle flex flex-row items-center transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700">
            <Icon name="carbon:id-management" />
            <span class="ml-3">About</span>
        </NuxtLink>
        <NuxtLink to="/cv"
            class="align-middle flex flex-row items-center transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700">
            <Icon name="pepicons-pop:cv" />
            <span class="ml-3">Resume</span>
        </NuxtLink>

        <NuxtLink to="/contact"
            class="border-0 p-1 px-4 rounded-md bg-cyan-600 transition duration-500 hover:duration-500 hover:bg-cyan-700">
            Contact
        </NuxtLink>
    </div>
</template>

  
<style scoped>
/* You can add additional styling if needed */
</style>
  