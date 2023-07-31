<script setup>
import { watch, onMounted, ref } from "vue";
import LadderGuy from "./svg/LadderGuy.vue";

const props = defineProps({
  title: String,
  color: String,
  gasTitleNumber: String,
  basePriorityPrice: String,
  totalCost: String,
});

const show = ref(false);

const showValue = () => {
  setTimeout(() => {
    show.value = true;
  }, 500);
};

const hideValue = () => {
  show.value = false;
};

watch(() => props.gasTitleNumber, () => {
  hideValue();
  showValue();
});

onMounted(() => {
  showValue();
});
</script>

<template>
  <div class="card bg-light p-2 mb-3 mx-auto">
    <h4 class="fw-bold text-center text-dark">
      {{ title }}
    </h4>
    <Transition name="bounce">
      <p v-if="show" :class="color" class="h2 text-center">
        {{ gasTitleNumber }} gwei
      </p>
    </Transition>
    <div class="mx-auto">
      <LadderGuy v-if="color === 'text-success'" color="#198754" width="150"/>
      <LadderGuy v-if="color === 'text-warning'" color="#ffc107" width="150"/>
      <LadderGuy v-if="color === 'text-danger'" color="#dc3545" width="150"/>
    </div>
    <div>
      <small class="text-dark">
        {{ basePriorityPrice }}
      </small>
      <p class="h6 text-dark">
        {{ totalCost }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  max-width: 15rem;
}

.bounce-enter-active {
  animation: bounce-in 2s;
}

.bounce-leave-active {
  animation: bounce-in 2s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
