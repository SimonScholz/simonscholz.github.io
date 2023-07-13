<script setup lang="ts">
import me from '~/assets/me.png'

const findMe = ref(null)
const findMeContent = ref(null)
const tutorialsSection = ref(null)
const aboutMeSection = ref(null)

function scrollToTutorialsSection() {
  tutorialsSection.value.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}

function scrollToaboutMeSection() {
  aboutMeSection.value.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}

useIntersectionObserver(
  findMe,
  (entries: IntersectionObserverEntry[]) => {
    if (entries.some(entry => entry.isIntersecting))
      findMe.value.classList.add('show')
    else
      findMe.value.classList.remove('show')
  },
)

useIntersectionObserver(
  findMeContent,
  (entries: IntersectionObserverEntry[]) => {
    if (entries.some(entry => entry.isIntersecting))
      findMeContent.value.classList.add('show')
    else
      findMeContent.value.classList.remove('show')
  },
)

useFadeIn(() => Array.from(document.getElementsByClassName('fadeSection')))
</script>

<template>
  <div flex flex-col snap-y snap-mandatory>
    <section snap-center snap-always>
      <section flex flex-grow flex-row select-none justify-center text-8xl tracking-wider font-mono>
        Hello<div i-mdi-hand-wave ml-3 skew-y-6 />
      </section>
      <section mt-30 flex flex-col select-none justify-center md:flex-row>
        <span text-4xl md:mt-10 md:w-150 md:text-left>My Name is <span align-text-bottom text-6xl>Simon Scholz</span> and I belief it is the mindset what makes a good Software Engineer <span align-middle font-mono italic text-fuchsia-700>&&</span> his or her eagerness to learn new things.</span>
        <img mt-10 h-80 w-80 self-center border-4 rounded-full md:ml-20 md:mt-0 :src="me" alt="me">
      </section>
      <div mt-10 flex flex-col items-center justify-center text-3xl md:mt-45>
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
      <div flex flex-row>
        Tools I am working with <span i-carbon-tool-kit ml-2 />
      </div>
    </section>
    <section ref="tutorialsSection" mt-80 flex flex-col snap-center snap-always items-center justify-center text-3xl class="fadeSection">
      <div flex flex-row>
        Tutorials <span i-carbon-education ml-2 />
      </div>
    </section>
    <section ref="aboutMeSection" mt-80 flex flex-col snap-center snap-always items-center justify-center class="fadeSection">
      <div flex flex-row text-3xl>
        About Me <span i-carbon-id-management ml-2 />
      </div>
      <div mt-6 flex flex-col items-center justify-center text-left>
        <div class="flex-row border-2 border-opacity-50 rounded-lg bg-opacity-50 p-2 text-xl md:w-2/3">
          I love <span font-bold>open source</span> and to
          <span font-bold>share</span> my knowledge.
          <br>
          Besides that I've started to develop my first website at the age of
          twelve and have been computer addicted even earlier.
          <br>
          This <span font-bold>fascination</span> for computers
          and technologies remains until today ({{ new Date().toUTCString() }})
          <br>
          If you're <span font-bold>passionate</span> about
          something you're usually also good at doing it...
          <br>
          And one of the best things of being a developer is that you can
          craft code to automate things you're
          <span font-bold>not</span> passionate about. <br>
          Automatization over manual work is kind of my credo and I've already
          pushed a lot of customers in that direction for the better. 😉
          <br>
          <br>
          Currently I work as principal software engineer at MediaMarktSaturn.
          <br>I am leading the team, which is reponsible for calculating
          delivery times, giving delivery promises, doing reservations of
          products and implementing the rules on how to determine a proper
          outlet/warehouse as source for the products to deliver.
          <br> The applications, which serve this purpose are realized with
          Spring Boot and Quarkus and written in Kotlin. For more insights on
          the tech stack I am usually using you can also check out the tutorials section.
          <br>I also have the honor to be competency lead of the team with
          the goal to offer great opportunities for my team members to evolve.
          <br>
          <br> Before being with MediaMarktSaturn I've been working for the
          vogella GmbH, an open source company founded by the Java Champion
          Lars Vogel. While being with vogella I gave a lot of trainings for a
          large variety of companies all over the world, but mainly in
          germany.
          <br> Besides trainings we offered remote and onsite support for
          the technologies we taught during our trainings. In order to deliver
          high quality bleeding edge knowledge for the customers, we were also
          heavily involved in contributing to the Open Source technologies
          that we taught during our trainings, e.g., Eclipse 4 RCP, Testing,
          Spring Boot, build tools (Gradle + Maven) to name a few.
          <br>
          <br>
          One core value of the vogella company is "acquire and distribute
          knowledge", which I'd still love to do. During that time I've done a
          couple of talks and workshops on Hackathons, Eclipse Demo Camps,
          Java User Groups, EclipseCon, Jax, Java Forum Stuttgart and Devoxx.
          <br>
          I'd also publish a lot of tutorials on vogella.com and wrote
          articles in different magazines like Eclipse Magazine and the Java
          Magazine. Also see
          <a btn href="https://entwickler.de/experten/simon-scholz">
            https://entwickler.de/experten/simon-scholz
          </a>
        </div>
        <div mt-3>
          For more details, also see my <a btn href="#CV">CV</a>
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
