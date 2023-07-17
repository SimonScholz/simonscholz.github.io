<script setup lang="ts">
import type { UseIntersectionObserverReturn } from '@vueuse/core'
import me from '~/assets/me.png'
import routes from '~pages'

const tutorials = routes.filter(element => element.path.startsWith('/tutorials/')).sort((a, b) => new Date(b?.meta?.frontmatter?.date).getTime() - new Date(a?.meta?.frontmatter?.date).getTime()).slice(0, 2)

const findMe = ref<HTMLInputElement | null>(null)
const findMeContent = ref<HTMLInputElement | null>(null)
const tutorialsSection = ref<HTMLInputElement | null>(null)
const aboutMeSection = ref<HTMLInputElement | null>(null)

function scrollToTutorialsSection() {
  tutorialsSection?.value?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}

function scrollToaboutMeSection() {
  aboutMeSection?.value?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}

const findMeObserver: UseIntersectionObserverReturn = useIntersectionObserver(
  findMe,
  (entries: IntersectionObserverEntry[]) => {
    if (entries.some(entry => entry.isIntersecting))
      findMe?.value?.classList?.add('show')
    else
      findMe?.value?.classList?.remove('show')
  },
)

const findMeContentObserver: UseIntersectionObserverReturn = useIntersectionObserver(
  findMeContent,
  (entries: IntersectionObserverEntry[]) => {
    if (entries.some(entry => entry.isIntersecting))
      findMeContent?.value?.classList?.add('show')
    else
      findMeContent?.value?.classList?.remove('show')
  },
)

onUnmounted(() => {
  findMeObserver.stop()
  findMeContentObserver.stop()
})

useFadeIn(() => Array.from(document.getElementsByClassName('fadeSection')))
</script>

<template>
  <div flex flex-col snap-y snap-mandatory>
    <section snap-center snap-always>
      <section flex flex-grow flex-row select-none justify-center text-8xl tracking-wider font-mono>
        Hello<div i-mdi-hand-wave ml-3 />
      </section>
      <section mt-20 flex flex-col select-none justify-center md:flex-row>
        <span text-2xl md:mt-10 md:w-150 md:text-left class="fadeSection">
          <Intro />
        </span>
        <img mt-10 h-80 w-80 self-center border-4 rounded-full md:ml-20 md:mt-0 :src="me" alt="me">
      </section>
      <div mt-10 flex flex-col items-center justify-center text-3xl md:mt-20>
        <div ref="findMe" flex flex-row select-none class="findMeHidden">
          Find me here <span i-carbon-location-heart ml-2 />
        </div>
        <div ref="findMeContent" flex flex-row class="findMeContentsHidden">
          <div grid grid-cols-4 mt-10 justify-items-center md:w-150 space-x-4>
            <a icon-btn rel="noreferrer" href="https://github.com/simonscholz" target="_blank" title="GitHub">
              <div i-uil-github-alt />
            </a>
            <a icon-btn rel="noreferrer" href="https://www.linkedin.com/in/opensource-simon" target="_blank" title="LinkedIn">
              <div i-uil-linkedin-alt />
            </a>
            <a icon-btn rel="noreferrer" href="https://twitter.com/simonscholz" target="_blank" title="Twitter">
              <div i-uil-twitter-alt />
            </a>
            <a icon-btn title="About Me" @click="scrollToaboutMeSection">
              <div i-carbon-id-management />
            </a>
          </div>
        </div>
      </div>
    </section>
    <section mt-40 flex flex-col snap-center snap-always items-center justify-center text-3xl class="fadeSection">
      <div mb-6 flex flex-row>
        Languages & Tools <span i-carbon-tool-kit ml-2 />
      </div>
      <div class="md:w-2/3" flex flex-row flex-wrap justify-center>
        <Tools />
      </div>
    </section>
    <section ref="tutorialsSection" mt-20 flex flex-col snap-center snap-always items-center justify-center text-3xl class="fadeSection">
      <div mb-10 flex flex-row>
        Tutorials <span i-carbon-education ml-2 />
      </div>
      <div class="md:w-2/3" flex flex-row flex-wrap justify-center>
        <div v-for="(tutorial, index) in tutorials" :key="index">
          <TutorialCard :href="tutorial.path">
            {{ tutorial?.meta?.frontmatter?.title }}
          </TutorialCard>
        </div>
      </div>
      <div>
        <a href="/tutorials" title="All Tutorials" text-xl>Show all tutorials</a>
      </div>
    </section>
    <section ref="aboutMeSection" mt-30 flex flex-col snap-center snap-always items-center justify-center class="fadeSection">
      <div flex flex-row text-3xl>
        About Me <span i-carbon-id-management ml-2 />
      </div>
      <div mt-6 flex flex-col items-center justify-center text-center>
        <div class="aboutme flex-row border-2 border-opacity-50 rounded-lg bg-opacity-50 p-2 text-xl">
          <AboutMeStart />
          <a href="/about" target="_blank" title="GitHub" mr-2 flex flex-row justify-end text-2xl icon-btn>
            ... Read more <div i-uil-book-reader mb-2 ml-2 />
          </a>
        </div>
      </div>
    </section>
    <section grid grid-cols-5 mt-20 justify-items-center gap-6 md:fixed md:grid-cols-1 md:ml-5>
      <a icon-btn rel="noreferrer" href="https://github.com/simonscholz" target="_blank" title="GitHub">
        <div i-uil-github-alt />
      </a>
      <a icon-btn rel="noreferrer" href="https://www.linkedin.com/in/opensource-simon" target="_blank" title="LinkedIn">
        <div i-uil-linkedin-alt />
      </a>
      <a icon-btn rel="noreferrer" href="https://twitter.com/simonscholz" target="_blank" title="Twitter">
        <div i-uil-twitter-alt />
      </a>
      <a icon-btn title="My Tutorials" @click="scrollToTutorialsSection">
        <div i-carbon-education />
      </a>
      <a icon-btn title="About Me" @click="scrollToaboutMeSection">
        <div i-carbon-id-management />
      </a>
    </section>
  </div>
</template>

<style scoped>
.findMeHidden {
  opacity: 0;
  transition-property: transform, opacity, blur;
  transition-duration: 1s;
  transition-timing-function: linear;
  filter: blur(5px);
  transform: translateX(-100%);
}

.findMeContentsHidden {
  opacity: 0;
  transition-property: transform, opacity, blur;
  transition-duration: 1s;
  transition-timing-function: linear;
  filter: blur(5px);
  transform: translateY(100%);
}

.fadeSection {
  opacity: 0;
  transition-property: transform, opacity, blur;
  transition-duration: 1s;
  transition-timing-function: linear;
  filter: blur(5px);
  transform: translateY(50px);
}

.show {
  opacity: 1;
  filter: blur(0);
  transform: none;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
