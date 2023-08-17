<script setup lang="ts">
import { ref } from 'vue';
import { TabData } from "@/types/commonTypes";

const { tabs } = defineProps({
  tabs: Array as () => TabData[],
});

const emit = defineEmits();
const activeTab = ref(0);

const setActiveTab = (index, tabData: TabData): void => {
  activeTab.value = index;
  emit('select-tab', tabData);
};
</script>

<template>
  <div class="d-inline-block">
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="(tab, index) in tabs" :key="index" class="nav-item" role="tab">
        <a
            :href="'#tab-' + index"
            class="nav-link"
            :class="{ active: activeTab === index }"
            @click.prevent="setActiveTab(index, tab)"
        >
          {{ tab.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/variables";

.nav-link {
  @media only screen and (max-width: $sm) {
    font-size: 0.7rem;
  }
  color: $white;

  &:hover {
    color: $white;
  }
}
</style>