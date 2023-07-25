<template>
  <div v-if="state.isVisible" class="notification">{{ state.msg }}</div>
</template>

<script setup lang="ts">
import config from "@/constants/config";
import { reactive } from "vue";

const state = reactive({ isVisible: false, msg: "" });

const show = (message: string) => {
  state.msg = message;
  state.isVisible = true;
  setTimeout(() => (state.isVisible = false), config.NOTIFICATION_TIMEOUT_MS);
};

defineExpose({ show });
</script>

<style scoped>
.notification {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
  font-size: large;

  position: fixed;
  top: 40px;
  padding: 5px;
  z-index: 1;

  background-color: white;
  opacity: 0;

  animation: pop-out v-bind("`${config.NOTIFICATION_TIMEOUT_MS / 1000}s`")
    ease-in-out;
}

@keyframes pop-out {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
