<template>
  <main class="md:m-10">
    <ContentDoc>
      <template v-slot="{ doc }">
        <div class="flex flex-col md:ml-10 md:mr-10">
          <img :src="'https://' + doc.vgWort" width="1" height="1" alt="" />
          <span class="text-4xl">
            {{ doc.title }}
          </span>
          <div class="flex flex-row mt-2">
            <span>{{ doc.author }}</span>
            <span class="ml-3">⚬</span>
            <span class="ml-3">{{ doc.date }}</span>
            <span class="ml-3">⚬</span>
            <span class="ml-3">{{ doc.readingTime.text }}</span>
            <span class="ml-3">⚬</span>
            <span class="ml-3">
              <a
                :href="
                  'https://github.com/SimonScholz/simonscholz.github.io/issues/new?labels=website,tutorial&title=[' +
                  doc.id +
                  ']'
                "
              >
                <img
                  src="https://img.shields.io/badge/-Feedback%3F%20Requests%3F-gray?logo=github"
                  alt="Feedback / Requests?"
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
        </div>
      </template>
    </ContentDoc>
  </main>
</template>
