<script setup lang="ts">
interface Language {
  imgSrc: string;
  imgAlt?: string;
  name: string;
}

const languages: Language[] = [
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    name: "Kotlin",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    name: "Java",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/groovy/groovy-original.svg",
    name: "Groovy",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    name: "Dart",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg",
    name: "TypeScript",
  },
  {
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
    name: "JavaScript",
  }
];
</script>

<template>
  <main
    class="grid gap-4 max-[400px]:grid-cols-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6"
  >
    <SkillCard
      v-for="(language, index) in languages"
      :key="index"
      :img-src="language.imgSrc"
      :img-alt="language.imgAlt || language.name"
    >
      {{ language.name }}
    </SkillCard>
  </main>
</template>
