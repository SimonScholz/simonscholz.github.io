<template>
  <main class="mt-10 md:mx-36 mb-10">
    <ContentDoc>
      <template v-slot="{ doc }">
        <div class="flex flex-col md:ml-10 md:mr-10">
          <img :src="'https://' + doc.vgWort" width="1" height="1" alt="" />
          <span class="text-4xl">
            {{ doc.title }}
          </span>
          <div class="flex flex-col md:flex-row mt-2">
            <span>{{ doc.author }}</span>
            <span class="hidden md:block ml-3">⚬</span>
            <span v-if="doc.created !== doc.updated" class="md:ml-3">created {{ doc.created }}</span>
            <span v-if="doc.created !== doc.updated" class="hidden md:block ml-3">⚬</span>
            <span v-if="doc.created !== doc.updated" class="md:ml-3">updated {{ doc.updated }}</span>
            <span v-else class="md:ml-3">{{ doc.created }}</span>
            <span class="hidden md:block ml-3">⚬</span>
            <span class="md:ml-3">{{ doc.readingTime.text }}</span>
            <span class="hidden md:block ml-3">⚬</span>
            <span class="md:ml-3">
              <a href="#comments">
                <img src="https://img.shields.io/badge/-Comments%3F%20Feedback%3F%20Requests%3F-gray?logo=github"
                  alt="Comments /Feedback / Requests?" title="Comments /Feedback / Requests?" /> </a></span>
          </div>
          <hr />
          <div class="flex flex-col md:flex-row gap-4 mt-2">
            <!-- Table of Contents -->
            <BlogTableOfContents class="flex-1" :links="doc.body?.toc?.links" />

            <!-- Teaser Section -->
            <div
              class="flex flex-col lg:flex-row items-center justify-between m-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
              <!-- Text Section -->
              <div class="flex flex-col justify-center p-4 lg:w-1/2">
                <h3 class="text-xl font-semibold">Want to dive deeper?</h3>
                <p class="mt-1 text-sm">Book a 1:1 session with me to discuss your challenges and get tailored
                  solutions.</p>
                <NuxtLink to="/contact"
                  class="inline-block self-start mt-3 px-4 py-2 rounded-md bg-cyan-600 text-white transition duration-300 hover:bg-cyan-700">
                  Book a session
                </NuxtLink>
              </div>

              <!-- Image Section -->
              <div class="hidden lg:flex justify-center items-center lg:w-1/2">
                <img class="h-40 w-40 border-4 border-black dark:border-white rounded-full" :src="me" alt="me"
                  title="me" height="160" width="160" />
              </div>
            </div>

          </div>
          <article class="prose col-span-full md:col-span-7 relative">
            <!-- Update date -->
            <span v-show="doc.dateUpdated"
              class="italic absolute -top-8 text-sm leading-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75">(Updated:
              {{ doc.dateUpdated }})</span>
            <!-- Blog content -->
            <ContentRenderer :value="doc" class="ml-1 mr-1" />
          </article>
          <Giscus />
        </div>
      </template>
    </ContentDoc>
  </main>
</template>

<script setup>
import Giscus from '~/components/Giscus.vue'
import me from "~/assets/me.webp";
</script>
