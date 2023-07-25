<template>
  <Notification ref="notification" />
  <Board
    ref="board"
    :word="state.currentWord"
    @result-submitted="onResultSubmitted"
    @used-letters="onUsedLetters"
    @invalid-word="onInvalidWord"
    :is-loading="state.isLoading"
  />
  <KeyBoard
    v-if="!state.isLoading"
    ref="keyboard"
    @letter-clicked="onLetterClicked"
  />
  <Results
    v-if="state.showResults"
    :points="state.wordPoints"
    :total-points="state.totalPoints"
    :streak="state.streak"
    :max-streak="state.maxStreak"
    @next-step="onNextStep"
    @hide="onModalHide"
  />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Board from "./components/Board/Board.vue";
import Results from "./components/Results/Results.vue";
import api from "@/api/words";
import config from "@/constants/config";
import KeyBoard from "@/components/Keyboard/KeyBoard.vue";
import Letter from "./types/Letter";
import saveUtils from "./utils/saveUtils";
import Notification from "./components/Notification.vue";
import messageUtils from "./utils/messageUtils";

const board = ref<InstanceType<typeof Board>>();
const keyboard = ref<InstanceType<typeof KeyBoard>>();
const notification = ref<InstanceType<typeof Notification>>();

const state = reactive({
  currentWord: "",
  wordPoints: 0,
  totalPoints: 0,
  streak: 0,
  maxStreak: 0,
  showResults: false,
  isLoading: true,
});

const onResultSubmitted = (points: number) => {
  state.wordPoints = points;
  state.totalPoints += points;
  state.streak += 1;

  if (points === 0) {
    state.streak = 0;
    notification.value?.show(state.currentWord);
  } else notification.value?.show(messageUtils.getMessageForResult(points));

  if (state.streak > state.maxStreak) state.maxStreak = state.streak;

  setTimeout(() => (state.showResults = true), config.NOTIFICATION_TIMEOUT_MS);

  let save = saveUtils.getSave();
  save.stats = {
    totalPoints: state.totalPoints,
    streak: state.streak,
    maxStreak: state.maxStreak,
  };
  save.showResults = true;
  saveUtils.setSave(save);
};

const onInvalidWord = () => {
  notification.value?.show("Not a word...");
};

const onNextStep = (startOver: boolean) => {
  if (startOver) {
    state.wordPoints = 0;
    state.totalPoints = 0;
    state.streak = 0;
    state.maxStreak = 0;
    saveUtils.reset();
  } else saveUtils.resetWordData();

  state.showResults = false;
  fetchWord();
};

const onUsedLetters = (letters: Letter[]) => {
  keyboard.value?.setKeys(letters);
};

const onModalHide = () => {
  state.showResults = false;
};

const onLetterClicked = (letter: string) => {
  board.value?.putLetterFromKeyboard(letter);
};

const fetchWord = async () => {
  state.isLoading = true;

  let word = await api.getWord(config.WORD_LENGTH);
  state.currentWord = word;

  let save = saveUtils.getSave();
  save.word = word;
  saveUtils.setSave(save);

  state.isLoading = false;
};

onMounted(() => {
  if (saveUtils.checkStorage()) {
    let saveData = saveUtils.getSave();

    state.currentWord = saveData.word;
    state.totalPoints = saveData.stats.totalPoints;
    state.streak = saveData.stats.streak;
    state.maxStreak = saveData.stats.maxStreak;
    state.isLoading = false;
    state.showResults = saveData.showResults;

    return;
  }

  fetchWord();
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  font-family: "Roboto Mono", monospace;
}

#app {
  background-color: #242424;
  margin: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}
</style>
