<script setup lang="ts">
import me from "~/assets/me.webp";

useHead({
  title: "CV / Resume",
  meta: [{ name: "description", content: "CV or resume of Simon Scholz" }],
});
</script>

<template>
  <div class="flex flex-col mx-auto md:flex-row md:w-5/6">
    <div class="md:w-1/3 p-2 text-center print:hidden">
      <img
        :src="me"
        alt="Simon Scholz"
        title="Simon Scholz"
        class="rounded-3xl m-3 p-4"
      />
      <span class="font-semibold text-xl text-cyan-500">
        Simon Scholz
        <br />* 27.04.1986
      </span>
    </div>
    <div class="hidden print:block p-6">
      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <h1 class="text-3xl text-cyan-500 mb-4">Simon Scholz</h1>
          <div
            class="flex flex-col bg-cyan-500 mt-2 pt-6 pl-6 pb-6 pr-10 rounded-md text-gray-300"
          >
            <div class="p-1">
              <Icon name="fa6-solid:location-dot" class="mr-1" />
              <span>Uckermarkweg 12a, 22415 Hamburg</span>
            </div>
            <span class="p-1">
              <Icon name="fa-solid:baby" class="mr-1" />
              born 27.04.1986 in Schleswig
            </span>
            <span class="p-1">
              <Icon name="fa-solid:paper-plane" class="mr-1" />
              <a href="mailto:me@simonscholz.dev">
                me@simonscholz.dev
              </a>
            </span>
            <span class="p-1">
              <Icon name="fa:phone" class="mr-1" />
              +49 15679 161354 
            </span>
            <span class="p-1">
              <Icon name="material-symbols:house-outline" class="mr-1" />
              <a href="https://simonscholz.github.io">
                https://simonscholz.github.io
              </a>
            </span>
          </div>
        </div>
        <div class="w-1/3">
          <img
            :src="me"
            alt="Simon Scholz"
            title="Simon Scholz"
            class="rounded-3xl m-3"
          />
        </div>
      </div>
    </div>
    <div class="md:w-2/3 p-2 mt-2">
      <ProfessionalBackground />
      <Education />
      <SpecialSkills />
      <TrainingsCertificates />
    </div>
  </div>
</template>
