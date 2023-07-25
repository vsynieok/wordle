<template>
  <div
    class="letter-cell"
    :class="{
      pending: letter.status === 'notsubmitted' && letter.text !== '',
      empty: letter.text === '' && isActive,
      inactive:
        !isActive && (letter.text === '' || letter.status === 'incorrect'),
      correct: letter.status === 'correct',
      position: letter.status === 'incorrectposition',
    }"
  >
    {{ letter.text }}
  </div>
</template>

<script setup lang="ts">
import Letter from "@/types/Letter";
import themeColors from "@/constants/themeColors";
// eslint-disable-next-line
const props = defineProps<{ letter: Letter; isActive: boolean }>();
</script>

<style scoped>
.letter-cell {
  color: white;
  text-transform: uppercase;
  font-size: xx-large;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  aspect-ratio: 1 / 1;

  box-sizing: border-box;
}

.pending {
  background-color: gray;
  animation: pop-out 0.25s ease-in;
}

.correct {
  background-color: v-bind("themeColors.letters.correct");
}

.position {
  background-color: v-bind("themeColors.letters.position");
}

.empty {
  background: none;
  border: 3px rgb(63, 63, 63) solid;
}

.inactive {
  background-color: v-bind("themeColors.greys.slots");
}

@keyframes pop-out {
  0% {
    transform: scale(0.95);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
