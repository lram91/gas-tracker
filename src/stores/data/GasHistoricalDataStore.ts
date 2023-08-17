import { defineStore } from 'pinia';
import { useFetchData } from '@/repositories/baseRepository';
import { GasHistoricalData } from '@/types/storeDataTypes';
import { ChartData } from "@/types/commonTypes";
import { BlockchainNetworkEnum } from "@/types/enums/BlockchainNetworkEnum";
import { TimeFrameEnum } from "@/types/enums/TimeFrameEnum";
import chartOptionsConfig from '@/configs/chart';

export const useGasHistoricalDataStore = defineStore('gasHistoricalDataStore', {
    state: () => ({
        gasHistoricalData: null as GasHistoricalData | null,
        chartData: {
            options: chartOptionsConfig,
            series: [],
        } as ChartData,
    }),

    actions: {
        async loadGasHistoricalData(network: BlockchainNetworkEnum, timeFrame: TimeFrameEnum): Promise<void> {
            const apiUrl = `/data/${network}/gas-historical-data-${timeFrame}.json`;
            this.gasHistoricalData = await useFetchData().fetchData(apiUrl);
            this.updateChartData();
        },

        updateChartData(): void {
            this.chartData.options = {
                ...this.chartData.options,
                ...{
                    xaxis: {
                        categories: this.gasHistoricalData?.dates,
                        type: 'datetime',
                        title: {
                            text: 'Month',
                        },
                        labels: {
                            format: 'dd/MMM',
                        },
                    },
                },
            };
            this.chartData.series = [
                {
                    name: 'High',
                    data: this.gasHistoricalData?.prices.high,
                },
                {
                    name: 'Average',
                    data: this.gasHistoricalData?.prices.average,
                },
                {
                    name: 'Low',
                    data: this.gasHistoricalData?.prices.low,
                },
            ];
        },
    },
});
