<template>
  <div class="results">
    <div class="modal">
      <div class="header">
        <h1>Results</h1>
      </div>
      <div class="content">
        <Stat title="Points for this round" :value="points" />
        <Stat title="Total points" :value="totalPoints" />
        <Stat title="Current streak" :value="streak" />
        <Stat title="Max streak" :value="maxStreak" />
      </div>
      <div class="footer">
        <button @click="() => emit('nextStep', true)">Start over</button>
        <button @click="() => emit('nextStep', false)">Next word</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import themeColors from "@/constants/themeColors";
import Stat from "./Stat.vue";
// eslint-disable-next-line
const props = defineProps<{
  points: number;
  totalPoints: number;
  maxStreak: number;
  streak: number;
}>();

const emit = defineEmits({
  nextStep(startOver: boolean) {
    return startOver;
  },
  hide() {
    return true;
  },
});
</script>

<style scoped>
.results {
  position: fixed;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;

  animation: show-results 0.3s ease;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);

  background-color: v-bind("themeColors.greys.keys");
  animation: show-modal 0.3s ease;
  color: whitesmoke;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  text-align: center;
}

button {
  text-transform: uppercase;
  letter-spacing: 2px;
  color: whitesmoke;
  font-family: inherit;

  background-color: v-bind("themeColors.greys.slots");
  border: none;

  padding: 10px;
  margin: 10px;
}

button:focus,
button:hover {
  outline: none;
  background-color: v-bind("themeColors.greys.background");
}

.content {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 40%);
  grid-template-rows: repeat(2, auto);
  gap: 15px;

  justify-content: center;
}

.footer {
  display: inline-flex;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 30px;
  width: 100%;
}

@keyframes show-results {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes show-modal {
  0% {
    transform: translate(-50%, -45%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

@media only screen and (max-width: 565px) {
  .modal {
    width: calc(100% - 50px);
  }
}
</style>
