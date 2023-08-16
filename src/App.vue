<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useFetchData } from '@/repositories/baseRepository.ts';
import chartOptionsConfig from '@/configs/chart.ts';
import GasPriceCard from "@/components/GasPriceCard.vue";
import ChartComponent from "@/components/ChartComponent.vue";
import TabsComponent from "@/components/TabsComponent.vue";
import TimeFrameSwitcher from "@/components/TimeFrameSwitcher.vue";
import BscLogo from "@/components/svg/logo/BscLogo.vue";
import EthLogo from "@/components/svg/logo/EthLogo.vue";
import PolygonLogo from "@/components/svg/logo/PolygonLogo.vue";

enum GasType {
  Low = 'low',
  Average = 'avg',
  High = 'high',
}

interface TabData {
  title: string;
  network: string;
}

const tabsData = ref<TabData[]>({
  tabs: [
    {
      title: 'Ethereum',
      network: 'eth',
    },
    {
      title: 'Binance Smart Chain',
      network: 'bsc',
    },
    {
      title: 'Polygon',
      network: 'polygon',
    },
  ],
});

const selectedNetwork = ref<TabData>(tabsData.value.tabs[0]);

const getColorByType = (type: GasType): string => {
  switch (type) {
    case GasType.Low:
      return 'text-success';
    case GasType.Average:
      return 'text-warning';
    case GasType.High:
      return 'text-danger';
    default:
      return 'text-success';
  }
};

const loadDataByNetwork = (networkData: TabData): void => {
  selectedNetwork.value = networkData;
  loadData(networkData.network, timeFrameData.value.timeFrame);
};

const updateChartData = (): void => {
  chartData.value.options = {
    ...chartData.value.options,
    ...{
      xaxis: {
        categories: gasHistoricalData.value.dates,
        type: 'datetime',
        title: {
          text: 'Month'
        },
        labels: {
          format: 'dd/MMM',
        },
      },
    }
  };
  chartData.value.series = [
    {
      name: "High",
      data: gasHistoricalData.value.prices.high
    },
    {
      name: "Average",
      data: gasHistoricalData.value.prices.average
    },
    {
      name: "Low",
      data: gasHistoricalData.value.prices.low
    }
  ];
};

interface TimeFrameData {
  timeFrame: string;
  timeFrames: Array<{ value: string; text: string }>;
}

const timeFrameData = ref<TimeFrameData>({
  timeFrame: '1w',
  timeFrames: [
    { value: '1w', text: '7D' },
    { value: '1m', text: '30D' },
    { value: '3m', text: '90D' },
  ],
});

const changeTimeFrame = (timeFrame: string): void => {
  timeFrameData.value.timeFrame = timeFrame;
  loadData(selectedNetwork.value.network, timeFrame);
};

const {fetchData} = useFetchData();

const gasTrackerData = ref<Record<string, unknown> | null>(null);
const gasHistoricalData = ref<Record<string, unknown> | null>(null);
const chartData = ref({
  options: chartOptionsConfig,
});

const loadData = async (network: string, timeFrame: string): Promise<void> => {
  await loadGasTrackerData(network);
  await loadGasHistoricalData(network, timeFrame);
};

const loadGasTrackerData = async (network: string): Promise<void> => {
  const apiUrl = `/data/${network}/gas-tracker-data.json`;

  gasTrackerData.value = await fetchData(apiUrl);
};

const loadGasHistoricalData = async (network: string, timeFrame: string): Promise<void> => {
  const apiUrl = `/data/${network}/gas-historical-data-${timeFrame}.json`;

  gasHistoricalData.value = await fetchData(apiUrl);
  await updateChartData();
};

const show = ref(true);

const showValue = (): void => {
  setTimeout(() => {
    show.value = true;
  }, 500);
};

const hideValue = (): void => {
  show.value = false;
};

const networkLogoComponent = computed(() => {
  const network = selectedNetwork.value.network;

  switch (network) {
    case 'eth':
      return EthLogo;
    case 'bsc':
      return BscLogo;
    case 'polygon':
      return PolygonLogo;
    default:
      return null;
  }
});

watch(() => selectedNetwork.value.title, () => {
  hideValue();
  showValue();
});

onMounted(() => {
  loadData(selectedNetwork.value.network, timeFrameData.value.timeFrame);
});
</script>

<template>
  <section class="main-bg py-5">
    <section class="container">
      <TabsComponent :tabs="tabsData.tabs" @select-tab="loadDataByNetwork"/>
    </section>
    <section class="container">
      <div class="row">
        <div class="col-8 col-lg-5 mx-auto text-center text-white">
          <Transition>
            <h1 v-if="show">
              {{ selectedNetwork.title }}
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
                v-for="type in ['low', 'avg', 'high']"
                :key="type"
                v-if="gasTrackerData"
                :gas-title-number="gasTrackerData[`${type}Price`]"
                :base-priority-price="gasTrackerData[`${type}BasePriority`]"
                :total-cost="gasTrackerData[`${type}GasPriceUsd`]"
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
                :time-frames="timeFrameData.timeFrames"
                @change-time-frame="changeTimeFrame"
            />
            <component :is="networkLogoComponent" width="120" class="ml-auto"/>
          </div>
          <ChartComponent
              v-if="gasHistoricalData"
              chart-type="line"
              :chart-options=chartData.options
              :chart-series=chartData.series
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
