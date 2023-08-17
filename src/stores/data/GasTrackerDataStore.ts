import { defineStore } from 'pinia';
import { useGasTrackerDataRepository } from '@/repositories/gasTrackerDataRepository';
import { GasTrackerData } from '@/types/storeDataTypes';
import { BlockchainNetworkEnum } from "@/types/enums/BlockchainNetworkEnum";

export const useGasTrackerDataStore = defineStore('gasTrackerDataStore', {
    state: () => ({
        gasTrackerData: null as GasTrackerData | null,
    }),

    actions: {
        async loadGasTrackerData(network: BlockchainNetworkEnum): Promise<void> {
            this.gasTrackerData = await useGasTrackerDataRepository().loadGasTrackerData(network);
        },
    },
});
