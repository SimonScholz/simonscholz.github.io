<script setup lang="ts">
import education from "~/assets/education.png";
</script>

<template>
  <IconLeftBorder :img-src="education" title="Education">
    <div class="flex md:flex-row mt-3">
      <FlexInitialXlBlock>
        <span>2007 — 2011</span>
      </FlexInitialXlBlock>
      <div class="flex-1 flex flex-col">
        <span class="font-semibold">
          Business Informatics (B. Sc.), Flensburg
        </span>
        <XlHiddenTimeFrame timeFrame="2007 — 2011" />
        <span class="mb-1">University of Applied Sciences</span>
        <span class="underline">Title of the bachelor thesis:</span>
        <span>
          "Development of a software component for improving the usability of a
          content management system"
        </span>
        <div class="flex flex-row">
          <span class="underline mr-2">Grade: </span>
          <span>1.0</span>
        </div>
        <span class="underline mt-1">Voluntary extra courses:</span>
        <ul class="list-disc list-inside ml-3 print:hidden">
          <li>Java Basics</li>
          <li>Java with GWT</li>
          <li>Android Development</li>
          <li>Tutor for new students concerning software development</li>
        </ul>
        <div class="hidden print:block">
          Java Basics, Java with GWT, Android Development, Tutor for new
          students concerning software development
        </div>
      </div>
    </div>
    <div class="flex md:flex-row mt-3">
      <FlexInitialXlBlock>
        <span>1998 — 2007</span>
      </FlexInitialXlBlock>
      <div class="flex-1 flex flex-col">
        <span class="font-semibold"> Gymnasium Lornsenschule, Schleswig </span>
        <XlHiddenTimeFrame timeFrame="1998 — 2007" />
        <div>
          <span class="underline mr-2">Degree:</span>
          <span>Abitur</span>
        </div>
        <span class="underline mt-1 print:hidden"> Examination subjects: </span>
        <ul class="list-disc list-inside ml-3 print:hidden">
          <li>Math</li>
          <li>English</li>
          <li>History</li>
          <li>Informatics</li>
        </ul>
        <div class="hidden print:block">
          <span class="underline">Examination subjects:</span> Math, English,
          History and Informatics
        </div>
      </div>
    </div>
  </IconLeftBorder>
</template>
