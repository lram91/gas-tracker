import { useFetchData } from '@/repositories/baseRepository';
import { BlockchainNetworkEnum } from "@/types/enums/BlockchainNetworkEnum";

export function useGasTrackerDataRepository() {
    const loadGasTrackerData = async (network: BlockchainNetworkEnum): Promise<any | null> => {
        const apiUrl = `/data/${network}/gas-tracker-data.json`;

        return await useFetchData().fetchData(apiUrl);
    };

    return {
        loadGasTrackerData,
    };
}