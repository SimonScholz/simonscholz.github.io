<script setup lang="ts">
interface XlHiddenTimeFrameProps {
  timeFrame: string;
}

const props = defineProps<XlHiddenTimeFrameProps>();
</script>

<template>
  <div class="xl:hidden mb-1">
    <span class="text-gray-600">{{ props.timeFrame }}</span>
  </div>
</template>
