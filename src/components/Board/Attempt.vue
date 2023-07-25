<template>
  <div
    ref="attempt"
    class="attempt"
    :tabindex="isActive ? 0 : -1"
    @keydown="handleKey"
  >
    <LetterCell
      v-for="(letter, idx) in state.letters"
      :key="`letter-${idx}`"
      :letter="letter"
      :is-active="isActive"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import LetterCell from "./LetterCell.vue";
import Letter from "@/types/Letter";
import { isAlphabetic } from "@/utils/stringUtils";
import { compareWords, generateEmptyWordArray } from "@/utils/wordUtils";
import config from "@/constants/config";
import api from "@/api/words";

const props = defineProps<{ word: string; isActive: boolean }>();
const emit = defineEmits({
  wordSubmitted(letters: Letter[]) {
    return letters;
  },
  invalidWord() {
    return true;
  },
});
const state = reactive({
  currentLetterIdx: 0,
  letters: [] as Letter[],
});

const attempt = ref<HTMLDivElement | null>(null);

watchEffect(() => {
  if (props.isActive) attempt.value?.focus();
});

watchEffect(() => {
  if (props.word) {
    state.currentLetterIdx = 0;
    state.letters = generateEmptyWordArray(config.WORD_LENGTH);
  }
});

const modifyLetterArray = (payload = "pop") => {
  let isBackspace = payload === "pop";

  if (isBackspace && state.currentLetterIdx === 0) return;
  if (!isBackspace && state.currentLetterIdx > config.WORD_LENGTH - 1) return;

  let letters = Array.from(state.letters);

  if (isBackspace) letters[state.currentLetterIdx - 1].text = "";
  else letters[state.currentLetterIdx].text = payload;

  if (isBackspace) state.currentLetterIdx -= 1;
  else state.currentLetterIdx += 1;
};

const submitAttempt = async () => {
  let attempt = state.letters.map((v) => v.text).join("");
  if (attempt.length !== config.WORD_LENGTH) return false;

  let isValidWord = false;
  if (props.word !== attempt) isValidWord = await api.checkWord(attempt);
  else isValidWord = true;

  if (isValidWord) {
    const letters = compareWords(attempt, props.word);
    state.letters = letters;
    emit("wordSubmitted", letters);
  } else emit("invalidWord");
};

const handleKey = (evt: { key: string }) => {
  if (!props.isActive) return;
  switch (evt.key) {
    case "Backspace":
      modifyLetterArray();
      break;
    case "Enter":
      submitAttempt();
      break;
    default:
      if (evt.key.length !== 1) return;
      if (isAlphabetic(evt.key)) modifyLetterArray(evt.key);
      break;
  }
};

const setLettersFromSave = (letters: Letter[]) => {
  state.letters = letters;
};

defineExpose({ setLettersFromSave, handleKey });
</script>

<style scoped>
.attempt {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(
    v-bind("config.WORD_LENGTH"),
    calc(90% / v-bind("config.WORD_LENGTH"))
  );
  grid-template-rows: auto;
  gap: 7px;

  align-items: center;
  justify-items: center;
  justify-content: center;

  padding: 3px 0 3px 0;
}

.attempt:focus {
  outline: none;
}
</style>
