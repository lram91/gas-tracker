import { defineStore } from 'pinia';
import { useFetchData } from '@/repositories/baseRepository.ts';

export const useGasTrackerDataStore = defineStore('gasTrackerDataStore', {
    state: () => ({
        gasTrackerData: null as Record<string, unknown> | null,
    }),

    actions: {
        async loadGasTrackerData(network: string): Promise<void> {
            const apiUrl = `/data/${network}/gas-tracker-data.json`;
            this.gasTrackerData = await useFetchData().fetchData(apiUrl);
        },
    },
});