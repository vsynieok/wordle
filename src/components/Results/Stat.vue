<template>
  <div class="stat">
    <h2>{{ title }}:</h2>
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import themeColors from "@/constants/themeColors";
// eslint-disable-next-line
const props = defineProps<{ title: string; value: number }>();
</script>

<style scoped>
.stat {
  background-color: v-bind("themeColors.greys.background");
  padding: 15px;
}

h2 {
  margin-top: 0;
}
</style>
