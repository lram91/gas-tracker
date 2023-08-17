import { defineStore } from 'pinia';
import { useFetchData } from '@/repositories/baseRepository';
import { GasTrackerData } from '@/types/storeDataTypes';

export const useGasTrackerDataStore = defineStore('gasTrackerDataStore', {
    state: () => ({
        gasTrackerData: null as GasTrackerData | null,
    }),

    actions: {
        async loadGasTrackerData(network: string): Promise<void> {
            const apiUrl = `/data/${network}/gas-tracker-data.json`;
            this.gasTrackerData = await useFetchData().fetchData(apiUrl);
        },
    },
});
