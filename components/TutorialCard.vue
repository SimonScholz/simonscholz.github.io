<script setup lang="ts">
interface TutorialCardProps {
  path: string;
  id: string;
  title: string;
  timeToRead: string;
  description: string;
  author: string;
  created: string;
  updated: string;
  tags: string[];
}

const props = defineProps<TutorialCardProps>();
</script>

<template>
  <main>
    <div class="mt-4 mx-3">
      <a :href="props.path">
        <div
          class="border border-gray-400 rounded-lg p-4 flex flex-col justify-between leading-normal hover:shadow-lg dark:hover:shadow-gray-600"
        >
          <div class="mb-8">
            <div class="font-bold text-xl">
              {{ props.title }}
            </div>
            <p class="mb-2 text-gray-400">{{ props.timeToRead }}</p>
            <p class="text-base">{{ props.description }}</p>
          </div>
          <div class="flex items-center">
            <div class="text-sm flex flex-grow">
              <div class="flex flex-row flex-grow-0">
                <p class="mr-2">{{ props.author }}</p>
                <span class="mr-2">⚬</span>
                <time>{{ props.updated }}</time>
              </div>
              <div class="hidden md:flex flex-row flex-grow justify-end">
                <span
                  v-for="(tag, index) in props.tags"
                  :key="index"
                  class="px-4 mt-auto mx-1 rounded-lg bg-cyan-700 text-white items-center"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </main>
</template>
