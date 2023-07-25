<template>
  <div v-if="props.isLoading" class="loading">Thinking of a word...</div>
  <div
    v-else
    class="board"
    @click="() => attempts?.at(state.activeAttemptIdx)?.$el.focus()"
  >
    <Attempt
      v-for="i in Array.from({ length: config.MAX_TRIES }, (v, i) => i)"
      :word="props.word"
      :key="i"
      :is-active="i === state.activeAttemptIdx"
      @word-submitted="handleValidAttempt"
      ref="attempts"
      @vue:mounted="onAttemptMounted"
      @invalid-word="() => emit('invalidWord')"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import Attempt from "./Attempt.vue";
import config from "@/constants/config";
import Letter from "@/types/Letter";
import saveUtils from "@/utils/saveUtils";
import { generateEmptyWordArray } from "@/utils/wordUtils";

const props = defineProps<{ word: string; isLoading: boolean }>();
const attempts = ref<InstanceType<typeof Attempt>[]>();

const emit = defineEmits({
  resultSubmitted(points: number) {
    return points;
  },
  usedLetters(letters: Letter[]) {
    return letters;
  },
  invalidWord() {
    return true;
  },
});

const state = reactive({
  activeAttemptIdx: 0,
});

const handleValidAttempt = (letters: Letter[]) => {
  const attempt = letters.map((v) => v.text).join("");

  if (attempt === props.word) {
    emit("resultSubmitted", config.MAX_TRIES - state.activeAttemptIdx);
    emit("usedLetters", letters);
    return;
  }

  if (state.activeAttemptIdx < config.MAX_TRIES - 1) {
    state.activeAttemptIdx += 1;
    emit("usedLetters", letters);
    return;
  }

  if (state.activeAttemptIdx === config.MAX_TRIES - 1) {
    emit("resultSubmitted", 0);
  }
};

watchEffect(() => {
  if (props.word) {
    if (saveUtils.checkStorage()) {
      let save = saveUtils.getSave();
      state.activeAttemptIdx = save.attempts.length;
    } else state.activeAttemptIdx = 0;
  }
});

// i don't know what type this hook uses
// i only know for sure that it has a key property 😭
const onAttemptMounted = (e: { key: number }) => {
  if (saveUtils.checkStorage()) {
    let save = saveUtils.getSave();
    let attempt = attempts.value?.at(e.key);
    attempt?.setLettersFromSave(
      save.attempts.at(e.key) ?? generateEmptyWordArray(config.WORD_LENGTH)
    );
  }
};
</script>

<style scoped>
.board {
  width: 50%;
  max-width: 500px;
  padding: 5px 0 5px 0;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: relative;

  animation: show-board 0.2s ease-in;
}

.loading {
  position: absolute;
  color: white;
  letter-spacing: 2px;
  text-transform: uppercase;

  animation: loading-text-bounce 1s ease-in-out infinite;
}

@keyframes show-board {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes loading-text-bounce {
  0% {
    transform: translate(-5px);
  }
  50% {
    transform: translate(5px);
  }
  100% {
    transform: translate(-5px);
  }
}
</style>
