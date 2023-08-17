import { useFetchData } from '@/repositories/baseRepository';
import { BlockchainNetworkEnum } from "@/types/enums/BlockchainNetworkEnum";
import { GasTrackerData } from "@/types/storeDataTypes";
export function useGasTrackerDataRepository() {
    const loadGasTrackerData = async (network: BlockchainNetworkEnum): Promise<GasTrackerData  | null> => {
        const apiUrl = `${network}/gas-tracker-data.json`;

        return await useFetchData().fetchData(apiUrl);
    };

    return {
        loadGasTrackerData,
    };
}