<script setup lang="ts">
import {ref} from 'vue';

interface TimeFrame {
  text: string;
  value: string;
}

const {timeFrames} = defineProps({
  timeFrames: Array as () => Array<TimeFrame>,
});
const emit = defineEmits();

const activeButton = ref(0);

const changeTimeFrame = (index: number, timeframe: string): void => {
  activeButton.value = index;
  emit('change-time-frame', timeframe);
};
</script>

<template>
  <div class="p-2 me-auto">
    <button v-for="(timeFrame, index) in timeFrames"
            :key="index"
            @click="changeTimeFrame(index, timeFrame.value)"
            :class="{ active: activeButton === index }" class="rounded m-1">
      {{ timeFrame.text }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/variables";

button {
  background-color: $white;
  color: $primary;
  border: 1px solid $primary;

  &:hover {
    background-color: $primary;
    color: $white;
  }
}

button.active {
  background-color: $primary;
  color: $white;
}
</style>