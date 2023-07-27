<template>
  <div class="keyletter" :class="status">{{ letter }}</div>
</template>

<script setup lang="ts">
import themeColors from "@/constants/themeColors";

// eslint-disable-next-line
const props = defineProps<{
  letter: string;
  status: "unused" | "used" | "correct" | "position";
}>();
</script>

<style scoped>
.keyletter {
  color: white;
  text-transform: uppercase;
  font-size: larger;

  margin: 2px;
  padding: 5px;
}

.keyletter:hover {
  cursor: pointer;
}

.unused {
  background-color: v-bind("themeColors.greys.keys");
}

.used {
  background-color: v-bind("themeColors.greys.slots");
}

.correct {
  background-color: v-bind("themeColors.letters.correct");
}

.position {
  background-color: v-bind("themeColors.letters.position");
}

@media only screen and (min-width: 768px) {
  .keyletter {
    font-size: 30px;
  }
}
</style>
