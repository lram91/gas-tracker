import { defineStore } from 'pinia';
import { useFetchData } from '@/repositories/baseRepository.ts';
import chartOptionsConfig from '@/configs/chart.ts';

interface GasHistoricalData {
    dates: string[];
    prices: {
        high: number[];
        average: number[];
        low: number[];
    };
}

export const useGasHistoricalDataStore = defineStore('gasHistoricalDataStore', {
    state: () => ({
        gasHistoricalData: null as GasHistoricalData | null,
        chartData: {
            options: chartOptionsConfig,
        },
    }),

    actions: {
        async loadGasHistoricalData(network: string, timeFrame: string): Promise<void> {
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
