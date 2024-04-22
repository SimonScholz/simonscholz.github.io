<script setup lang="ts">
import crown from "~/assets/crown.png";
</script>

<template>
  <IconLeftBorder :imgSrc="crown" title="Trainings">
    <div class="flex flex-col mt-3">
      <h2 class="font-semibold">
        I've been trainer for courses of the vogella GmbH
      </h2>
      <ul class="list-disc list-inside ml-3">
        <li>Spring Boot &amp; React JS</li>
        <li>Spring Webflux and Project Reactor with MongoDB</li>
        <li>Groovy &amp; Gradle &amp; Testing</li>
        <li>Apache Maven and Testing</li>
        <li>Eclipse RCP</li>
        <li>Eclipse IDE Extensions</li>
        <li>Android Development</li>
        <li>and more...</li>
      </ul>
    </div>
  </IconLeftBorder>
</template>
