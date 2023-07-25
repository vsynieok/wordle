<template>
  <div class="keyboard">
    <div class="keyboard-row">
      <KeyLetter
        v-for="k in state.keys[0].split('')"
        @click="() => $emit('letterClicked', k)"
        :letter="k"
        :key="k"
        :status="getStatus(k)"
      />
    </div>
    <div class="keyboard-row">
      <KeyLetter
        v-for="k in state.keys[1].split('')"
        @click="() => $emit('letterClicked', k)"
        :letter="k"
        :key="k"
        :status="getStatus(k)"
      />
    </div>
    <div class="keyboard-row">
      <KeyLetter
        v-for="k in state.keys[2].split('')"
        @click="
          () =>
            $emit(
              'letterClicked',
              k === '#' ? 'Enter' : k === '$' ? 'Backspace' : k
            )
        "
        :letter="k === '#' ? 'Enter' : k === '$' ? 'Backspace' : k"
        :key="k"
        :status="getStatus(k)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import KeyLetter from "./KeyLetter.vue";
import Letter from "@/types/Letter";
import saveUtils from "@/utils/saveUtils";

// # - enter
// $ - backspace

const state = reactive({
  keys: ["qwertyuiop", "asdfghjkl", "zxcvbnm#$"],
  correctKeys: [] as string[],
  wrongKeys: [] as string[],
  positionKeys: [] as string[],
});

const getStatus = (l: string) => {
  if (state.correctKeys.includes(l)) return "correct";
  else if (state.wrongKeys.includes(l)) return "used";
  else if (state.positionKeys.includes(l)) return "position";
  return "unused";
};

const setKeys = (letters: Letter[]) => {
  let save = saveUtils.getSave();
  save.attempts.push(letters);
  save.useSave = true;

  letters.forEach((l) => {
    switch (l.status) {
      case "correct":
        state.correctKeys.push(l.text);
        save.keys.correct.push(l.text);
        break;
      case "incorrect":
        state.wrongKeys.push(l.text);
        save.keys.used.push(l.text);
        break;
      case "incorrectposition":
        state.positionKeys.push(l.text);
        save.keys.position.push(l.text);
        break;
      default:
        return;
    }
  });

  saveUtils.setSave(save);
};

const loadSaveData = () => {
  let save = saveUtils.getSave();
  state.correctKeys = save.keys.correct;
  state.wrongKeys = save.keys.used;
  state.positionKeys = save.keys.position;
};

onMounted(() => {
  if (saveUtils.checkStorage()) {
    loadSaveData();
  }
});

defineExpose({ setKeys, loadSaveData });
defineEmits({
  letterClicked(letter: string) {
    return letter;
  },
});
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;

  align-items: center;
}
.keyboard-row {
  display: inline-flex;
  flex-direction: row;
}
</style>
