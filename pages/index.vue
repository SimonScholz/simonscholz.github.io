<script setup lang="ts">
useHead({
  title: null,
  meta: [
    {
      name: "description",
      content:
        "Profile of Simon Scholz including quotes, about me, tutorials and tech stack",
    },
    {
      name: "google-site-verification",
      content: "5yp0dYpg1Ju9MGSKzgARXou20J1q0iKY1dapJyR8daI",
    }
  ],
});
import type { UseIntersectionObserverReturn } from "@vueuse/core";
import { useIntersectionObserver } from "@vueuse/core";
import me from "~/assets/me.webp";

const findMe = ref<HTMLInputElement | null>(null);
const findMeContent = ref<HTMLInputElement | null>(null);
const tutorialsSection = ref<HTMLInputElement | null>(null);
const aboutMeSection = ref<HTMLInputElement | null>(null);

function scrollToAboutMeSection(e: Event) {
  e.preventDefault();
  aboutMeSection?.value?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
  return false;
}

const findMeObserver: UseIntersectionObserverReturn = useIntersectionObserver(
  findMe,
  (entries: IntersectionObserverEntry[]) => {
    if (entries.some((entry) => entry.isIntersecting))
      findMe?.value?.classList?.add("show");
    else findMe?.value?.classList?.remove("show");
  }
);

const findMeContentObserver: UseIntersectionObserverReturn =
  useIntersectionObserver(
    findMeContent,
    (entries: IntersectionObserverEntry[]) => {
      if (entries.some((entry) => entry.isIntersecting))
        findMeContent?.value?.classList?.add("show");
      else findMeContent?.value?.classList?.remove("show");
    }
  );

onUnmounted(() => {
  findMeObserver.stop();
  findMeContentObserver.stop();
});

useFadeIn(() => Array.from(document.getElementsByClassName("fadeSection")));
</script>

<template>
  <div class="flex flex-col snap-y snap-mandatory">
    <section class="snap-center snap-always">
      <section
        class="mt-12 md:mt-0 flex flex-grow flex-row select-none justify-center text-8xl font-mono"
      >
        <span class="tracking-wider">Hello</span
        ><Icon name="mdi:hand-wave" class="ml-3" />
      </section>
      <section
        class="mt-20 flex flex-col select-none justify-center md:flex-row"
      >
        <span class="text-2xl m-3 md:w-1/3 md:mt-10 md:text-left fadeSection">
          <div class="m-auto">
            <p>
              If you're <b>passionate</b> about something you're usually also
              good at doing it.
            </p>
            <br />
            <p>
              And one of the best things of being a developer is that you can
              craft code to automate things you're <b>not passionate</b> about.
            </p>
            <br />
            <p>
              Automatization over manual work is kind of my credo
              <span class="align-middle font-mono italic text-fuchsia-700 mx-2"
                >&&</span
              >
              I've already pushed a lot of customers in that direction for the
              better.
            </p>
          </div>
        </span>
        <img
          class="mt-10 h-80 w-80 self-center border-4 rounded-full md:ml-20 md:mt-0"
          :src="me"
          alt="me"
          title="me"
          height="80"
          width="80"
        />
      </section>
      <div
        class="mt-10 flex flex-col items-center justify-center text-3xl md:mt-32"
      >
        <div
          ref="findMe"
          class="flex flex-row select-none text-3xl findMeHidden"
        >
          Find me here <Icon name="carbon:location-heart" class="ml-2" />
        </div>
        <div ref="findMeContent" class="flex flex-row findMeContentsHidden">
          <div
            class="grow grid grid-cols-4 mt-10 gap-y-32 justify-items-center space-x-4"
          >
            <NuxtLink
              class="icon-btn px-10"
              rel="noreferrer"
              href="https://github.com/simonscholz"
              target="_blank"
              title="GitHub"
            >
              <Icon name="uil:github-alt" />
            </NuxtLink>
            <NuxtLink
              class="icon-btn"
              rel="noreferrer"
              href="https://www.linkedin.com/in/opensource-simon"
              target="_blank"
              title="LinkedIn"
            >
              <Icon name="uil:linkedin-alt" />
            </NuxtLink>
            <NuxtLink
              class="icon-btn"
              rel="noreferrer"
              href="https://twitter.com/simonscholz"
              target="_blank"
              title="Twitter"
            >
              <Icon name="uil:twitter-alt" />
            </NuxtLink>
            <NuxtLink
              class="icon-btn hover:hand"
              title="About Me"
              @click.prevent="scrollToAboutMeSection"
            >
              <Icon name="carbon:id-management" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section
      id="tutorials"
      ref="tutorialsSection"
      class="mt-32 md:mt-40 flex flex-col snap-center snap-always items-center justify-center text-3xl fadeSection md:mx-10"
    >
      <div class="mb-10 flex flex-row">
        Latest Tutorials <Icon name="carbon:education" class="ml-2" />
      </div>
      <div class="md:w-2/3">
        <Top3Tutorials />
      </div>
      <div class="mt-8">
        <NuxtLink
          to="/tutorials"
          title="All Tutorials"
          class="text-xl border-0 p-2 px-4 transition duration-500 hover:duration-500 bg-cyan-600 hover:bg-cyan-700 rounded-md"
          >Show all tutorials</NuxtLink
        >
      </div>
    </section>
    <section
      id="about"
      ref="aboutMeSection"
      class="fadeSection mt-20 md:mt-32 flex flex-col snap-center snap-always items-center justify-center"
    >
      <div class="flex flex-row text-3xl">
        About Me <Icon name="carbon:id-management" class="ml-2" />
      </div>
      <div class="mt-6 flex flex-col items-center justify-center text-center">
        <div
          class="aboutme flex-row border-2 border-opacity-50 rounded-lg bg-opacity-50 p-2 text-xl md:w-2/3"
        >
          <p>
            I am a passionate advocate for <b>open source</b> and sharing
            knowledge. With a deep-rooted love for computers and technology from
            an early age, I embarked on my coding journey, developing my first
            website at the age of twelve. Since then, my fascination with the
            endless possibilities of technology has only grown stronger.
          </p>

          <p>
            Currently serving as the Principal Engineer for the Apps & Store
            Touchpoints domain of MediamarktSaturn Technology...
          </p>
          <NuxtLink
            to="/about"
            title="About Me"
            class="mr-2 mt-4 flex flex-row justify-end text-2xl icon-btn"
          >
            ... Read more <Icon name="uil:book-reader" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>
    <section
      class="mt-20 md:mt-32 flex flex-col snap-center snap-always items-center justify-center text-3xl fadeSection md:mx-10 mb-10"
    >
      <div class="mb-6 flex flex-row">
        Languages & Tools <Icon name="carbon:tool-kit" class="ml-2" />
      </div>
      <div class="flex flex-row flex-wrap justify-center md:w-2/3">
        <Tools />
      </div>
    </section>
  </div>
</template>

<style scoped>
.icon-btn {
  @apply cursor-pointer transition duration-500 hover:duration-500 hover:text-cyan-700 dark:hover:text-cyan-700;
}
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
