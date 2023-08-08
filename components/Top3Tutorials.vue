<script setup>
const { data } = await useAsyncData("top3TutorialsQueryContent", () =>
  queryContent("tutorials")
    .only(["path", "title"])
    .sort({ date: -1 })
    .limit(3)
    .find()
);
</script>

<template>
  <main
    class="grid grid-cols-1 md:grid-cols-3 place-content-around justify-center gap-6 align-middle"
  >
    <NuxtLink :to="path" v-for="{ path, title } in data">
      <IndexTutorialCard class="h-full">
        {{ title }}
      </IndexTutorialCard>
    </NuxtLink>
  </main>
</template>
