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
                <img
                  src="https://img.shields.io/badge/-Comments%3F%20Feedback%3F%20Requests%3F-gray?logo=github"
                  alt="Comments /Feedback / Requests?"
                  title="Comments /Feedback / Requests?"
                /> </a
            ></span>
          </div>
          <hr />
          <BlogTableOfContents class="mt-2" :links="doc.body?.toc?.links" />
          <article class="prose col-span-full md:col-span-7 relative">
            <!-- Update date -->
            <span
              v-show="doc.dateUpdated"
              class="italic absolute -top-8 text-sm leading-sm font-light text-typography_primary/75 dark:text-typography_primary_dark/75"
              >(Updated: {{ doc.dateUpdated }})</span
            >
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
</script>
