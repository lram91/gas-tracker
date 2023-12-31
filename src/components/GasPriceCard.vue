<script setup lang="ts">
import { watch, computed, onMounted } from "vue";
import { useVisabilityStore } from "@/stores/ui/VisabilityStore";
import { ColorOptionsEnum } from "@/types/enums/ColorOptionsEnum";
import LadderGuy from "@/components/svg/LadderGuy.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  gasTitleNumber: {
    type: String,
    required: true,
  },
  basePriorityPrice: {
    type: String,
    required: true,
  },
  totalCost: {
    type: String,
    required: true,
  },
});

const visabilityStore = useVisabilityStore();

const getColorCodeForSvg = (color: ColorOptionsEnum): string => {
  switch (color) {
    case ColorOptionsEnum.Success:
      return '#198754';
    case ColorOptionsEnum.Warning:
      return '#ffc107';
    case ColorOptionsEnum.Danger:
      return '#dc3545';
    default:
      return '#198754';
  }
};

const colorCode = computed(() => getColorCodeForSvg(props.color));

watch(() => props.gasTitleNumber, () => {
  visabilityStore.hideValue();
  setTimeout(() => {
    visabilityStore.showValue();
  }, 500);
});

onMounted(() => {
  visabilityStore.showValue();
});
</script>

<template>
  <div class="card bg-light p-2 mb-3 mx-auto">
    <h4 class="text-capitalize fw-bold text-center text-dark">
      {{ props.title }}
    </h4>
    <Transition name="bounce">
      <p v-if="visabilityStore.show" :class="color" class="h2 text-center">
        {{ props.gasTitleNumber }} gwei
      </p>
    </Transition>
    <div class="mx-auto">
      <LadderGuy :color="colorCode" width="150"/>
    </div>
    <div>
      <small class="text-dark">
        {{ props.basePriorityPrice }}
      </small>
      <p class="h6 text-dark">
        {{ props.totalCost }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  max-width: 14rem;
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
