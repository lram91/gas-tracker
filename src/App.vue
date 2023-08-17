<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
// Stores
import { useGasTypesStore } from "@/stores/ui/GasTypesStore";
import { useVisabilityStore } from "@/stores/ui/VisabilityStore";
import { useTabStore } from "@/stores/ui/TabsStore";
import { useGasTrackerDataStore } from "@/stores/data/GasTrackerDataStore";
import { useGasHistoricalDataStore } from "@/stores/data/GasHistoricalDataStore";
import { useTimeFrameStore  } from "@/stores/ui/TimeFrameStore";
// Enums
import { BlockchainNetworkEnum } from "@/types/enums/BlockchainNetworkEnum"
import { GasTypeEnum } from "@/types/enums/GasTypeEnum";
// Components
import GasPriceCard from "@/components/GasPriceCard.vue";
import ChartComponent from "@/components/ChartComponent.vue";
import TabsComponent from "@/components/TabsComponent.vue";
import TimeFrameSwitcher from "@/components/TimeFrameSwitcher.vue";
import BscLogo from "@/components/svg/logo/BscLogo.vue";
import EthLogo from "@/components/svg/logo/EthLogo.vue";
import PolygonLogo from "@/components/svg/logo/PolygonLogo.vue";

const tabStore = useTabStore();
const gasTypesStore = useGasTypesStore();
const visabilityStore = useVisabilityStore();
const gasTrackerDataStore = useGasTrackerDataStore();
const gasHistoricalDataStore = useGasHistoricalDataStore();
const timeFrameStore = useTimeFrameStore();

const getColorByType = (type: GasTypeEnum): string => {
  return gasTypesStore.getColorByType(type);
};

const loadDataByNetwork = (networkData: TabData): void => {
  tabStore.selectTab(networkData);
  loadData(networkData.network, timeFrameStore.timeFrame);
};

const changeTimeFrame = (timeFrame: string): void => {
  timeFrameStore.changeTimeFrame(timeFrame);
  loadData(tabStore.selectedNetwork.network, timeFrameStore.timeFrame);
};

const loadData = (network: string, timeFrame: string): void => {
  gasTrackerDataStore.loadGasTrackerData(network);
  gasHistoricalDataStore.loadGasHistoricalData(network, timeFrame);
};

const networkLogoComponent = computed(() => {
  if (tabStore.selectedNetwork) {
    const network = tabStore.selectedNetwork.network;

    switch (network) {
      case BlockchainNetworkEnum.Eth:
        return EthLogo;
      case BlockchainNetworkEnum.Bsc:
        return BscLogo;
      case BlockchainNetworkEnum.Polygon:
        return PolygonLogo;
      default:
        return null;
    }
  }
  return null;
});

const selectedNetworkTitle = computed(() => {
  return tabStore.selectedNetwork?.title || '';
});

watch(() => tabStore.selectedTabTitle, () => {
  visabilityStore.hideValue();
  visabilityStore.showValue();
});

onMounted(() => {
  const initialTab = tabStore.tabs[0];
  tabStore.selectTab(initialTab);
  loadData(initialTab.network, timeFrameStore.timeFrame);
});
</script>

<template>
  <section class="main-bg py-5">
    <section class="container">
      <TabsComponent :tabs="tabStore.tabs" @select-tab="loadDataByNetwork"/>
    </section>
    <section class="container">
      <div class="row">
        <div class="col-8 col-lg-5 mx-auto text-center text-white">
          <Transition>
            <h1 v-if="visabilityStore.show">
              {{ selectedNetworkTitle }}
            </h1>
          </Transition>
          <p>
            Gas prices refer to the fees paid by users to execute transactions or interact with
            smart contracts on the network, measured in units called Gwei, which determine the speed and priority of the
            transactions.
          </p>
        </div>
      </div>
    </section>
    <section class="container">
      <h2 class="text-center text-white">
        Gas Tracker
      </h2>
      <div class="row">
        <div class="col-xl-8 mx-auto">
          <div class="row">
            <GasPriceCard
                v-for="type in [GasTypeEnum.Low, GasTypeEnum.Average, GasTypeEnum.High]"
                :key="type"
                v-if="gasTrackerDataStore.gasTrackerData"
                :gas-title-number="gasTrackerDataStore.gasTrackerData[`${type}Price`]"
                :base-priority-price="gasTrackerDataStore.gasTrackerData[`${type}BasePriority`]"
                :total-cost="gasTrackerDataStore.gasTrackerData[`${type}GasPriceUsd`]"
                :title="type"
                :color="getColorByType(type)"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="container px-3">
      <h2 class="text-center text-white">
        Historical gas price changes
      </h2>
      <div class="row">
        <div class="card col-lg-5 bg-light mx-auto">
          <div class="d-flex">
            <TimeFrameSwitcher
                :time-frames="timeFrameStore.timeFrames"
                @change-time-frame="changeTimeFrame"
            />
            <component :is="networkLogoComponent" width="120" class="ml-auto"/>
          </div>
          <ChartComponent
              v-if="gasHistoricalDataStore.gasHistoricalData"
              chart-type="line"
              :chart-options="gasHistoricalDataStore.chartData.options"
              :chart-series="gasHistoricalDataStore.chartData.series"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss">
@import "./scss/app";

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
