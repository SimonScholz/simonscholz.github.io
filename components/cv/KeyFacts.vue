<script setup lang="ts">
import key from "~/assets/key.png";
</script>

<template>
  <IconLeftBorder :img-src="key" title="Key Facts">
    <div class="flex flex-row mt-3">
      <div class="grow">
        <ul class="list-disc list-inside ml-3 p-2">
          <li>Speaker at conferences</li>
          <li>Working worldwide</li>
          <li>Lead Software Engineer</li>
          <li>Explorer of new technologies</li>
        </ul>
      </div>
      <div class="grow">
        <ul class="list-disc list-inside ml-3 p-2">
          <li>Mentoring of students and colleagues</li>
          <li>Open Source addicted</li>
          <ul class="list-disc list-inside ml-3">
            <li>Contributed to several open source projects</li>
            <li>Committer of the month for the Eclipse Platform</li>
          </ul>
        </ul>
      </div>
    </div>
  </IconLeftBorder>
</template>
