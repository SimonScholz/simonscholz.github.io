<script setup lang="ts">
import routes from '~pages'

const tutorials = routes.filter(element => element.path.startsWith('/tutorials/')).sort((a, b) => new Date(b?.meta?.frontmatter?.date).getTime() - new Date(a?.meta?.frontmatter?.date).getTime())
</script>

<template>
  <section mt-20 flex flex-col snap-center snap-always items-center justify-center text-3xl>
    <div mb-10 flex flex-row>
      Tutorials <span i-carbon-education ml-2 />
    </div>
    <div v-for="(tutorial, index) in tutorials" :key="index">
      {{ console.log(tutorial) }}
      <TutorialCard :href="tutorial.path">
        {{ tutorial?.meta?.frontmatter?.title }} at {{ tutorial?.meta?.frontmatter?.date }}
      </TutorialCard>
    </div>
  </section>
</template>
