<script setup>
import { onMounted, ref, watch } from "vue";
import handleFetchError from '@/helpers/errorHandler';
import chartOptionsConfig from '@/configs/chart.js';
import GasPriceCard from "@/components/GasPriceCard.vue";
import ChartComponent from "@/components/ChartComponent.vue";
import TabsComponent from "@/components/TabsComponent.vue";
import TimeFrameSwitcher from "@/components/TimeFrameSwitcher.vue";
import BscLogo from "@/components/svg/logo/BscLogo.vue";
import EthLogo from "@/components/svg/logo/EthLogo.vue";
import PolygonLogo from "@/components/svg/logo/PolygonLogo.vue";

const tabsData = ref({
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
  ]
});

const selectedNetwork = ref(tabsData.value.tabs[0]);

const loadDataByNetwork = (network) => {
  selectedNetwork.value = network;
  loadGasTrackerData();
  loadGasHistoricalData(timeFrameData.value.timeFrame);
};

const chartData = ref({
  options: chartOptionsConfig,
});

const updateChartData = () => {
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

const timeFrameData = ref({
  timeFrame: "1w",
  timeFrames: [
    {value: "1w", text: '7D'},
    {value: "1m", text: '30D'},
    {value: "3m", text: '90D'}
  ],
});

const changeTimeFrame = (timeFrame) => {
  timeFrameData.value.timeFrame = timeFrame;
  loadGasHistoricalData(timeFrame);
};

const gasHistoricalData = ref(null);

const loadGasHistoricalData = async (timeFrame) => {
  const network = selectedNetwork.value.network;
  const apiUrl = `/data/${network}/gas-historical-data-${timeFrame}.json`;

  try {
    const response = await fetch(apiUrl);

    gasHistoricalData.value = await handleFetchError(response);
    await updateChartData();
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
};

const gasTrackerData = ref(null);

const loadGasTrackerData = async () => {
  const network = selectedNetwork.value.network;
  const apiUrl = `/data/${network}/gas-tracker-data.json`;

  try {
    const response = await fetch(apiUrl);

    gasTrackerData.value = await handleFetchError(response);
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
};

const show = ref(true);

const showValue = () => {
  setTimeout(() => {
    show.value = true;
  }, 500);
};

const hideValue = () => {
  show.value = false;
};

watch(() => selectedNetwork.value.title, () => {
  hideValue();
  showValue();
});

onMounted(() => {
  loadGasTrackerData();
  loadGasHistoricalData(timeFrameData.value.timeFrame);
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
            <div class="col-md-4">
              <GasPriceCard
                  v-if="gasTrackerData"
                  :gas-title-number=gasTrackerData.lowPrice
                  :base-priority-price=gasTrackerData.lowBasePriority
                  :total-cost=gasTrackerData.lowGasPriceUsd
                  title="Low"
                  color="text-success"
              />
            </div>
            <div class="col-md-4">
              <GasPriceCard
                  v-if="gasTrackerData"
                  :gas-title-number=gasTrackerData.avgPrice
                  :base-priority-price=gasTrackerData.proposeBasePriority
                  :total-cost=gasTrackerData.avgGasPriceUsd
                  title="Average"
                  color="text-warning"
              />
            </div>
            <div class="col-md-4">
              <GasPriceCard
                  v-if="gasTrackerData"
                  :gas-title-number=gasTrackerData.highPrice
                  :base-priority-price=gasTrackerData.highBasePriority
                  :total-cost=gasTrackerData.highGasPriceUsd
                  title="High"
                  color="text-danger"
              />
            </div>
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
            <EthLogo v-if="selectedNetwork.network === 'eth'" width="120" class="ml-auto" />
            <BscLogo v-if="selectedNetwork.network === 'bsc'" width="120" class="ml-auto" />
            <PolygonLogo v-if="selectedNetwork.network === 'polygon'" width="120" class="ml-auto" />
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
