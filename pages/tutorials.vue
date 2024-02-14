<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

useHead({
  title: "Tutorials",
  meta: [
    {
      name: "description",
      content:
        "Tutorials about a lot of tech topics, like kotlin, spring boot, quarkus, keycloak, docker, kubernetes and much more...",
    },
  ],
});

const { data } = await useAsyncData("tutorialsQueryContent", () =>
  queryContent("tutorials").sort({ updated: -1 }).find()
);

const filterText = ref("");

const filteredTutorials: Ref<ParsedContent[] | undefined> = computed(() => {
  const filter = filterText.value;
  return data.value?.filter((tutorial: any) => {
    const { description, title, tags, draft } = tutorial;

    return (
      !draft &&
      (description.toLowerCase().includes(filter.toLowerCase()) ||
      title.toLowerCase().includes(filter.toLowerCase()) ||
      (tags && tags.join("").toLowerCase().includes(filter.toLowerCase())))
    );
  });
});

function clearFilterText() {
  filterText.value = "";
}
</script>

<template>
  <main class="md:mx-16 mt-4 mb-10">
    <div class="flex items-center border-b border-gray-500 py-2 mt-3 mx-3">
      <input
        class="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Search... (ESC to clear input)"
        aria-label="Search..."
        autoFocus
        v-model="filterText"
        @keyup.esc="clearFilterText"
      />
      <div
        class="rounded-full h-6 w-6 flex items-center justify-center border-2 border-cyan-700 bg-cyan-700 text-white text-sm"
      >
        {{ filteredTutorials?.length || "0" }}
      </div>
    </div>
    <div v-for="tutorial in filteredTutorials" :key="tutorial._path">
      <TutorialCard
        :path="tutorial._path!!"
        :id="tutorial.id"
        :title="tutorial.title!!"
        :time-to-read="tutorial.readingTime.text"
        :description="tutorial.description"
        :author="tutorial.author"
        :created="tutorial.created"
        :updated="tutorial.updated"
        :tags="tutorial.tags"
      />
    </div>
  </main>
</template>
