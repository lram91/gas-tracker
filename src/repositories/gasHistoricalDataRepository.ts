import { useFetchData } from '@/repositories/baseRepository';
import { GasHistoricalData } from '@/types/storeDataTypes';
import { BlockchainNetworkEnum } from '@/types/enums/BlockchainNetworkEnum';
import { TimeFrameEnum } from '@/types/enums/TimeFrameEnum';

export function useGasHistoricalDataRepository() {
    const fetchData = useFetchData();

    async function loadGasHistoricalData(network: BlockchainNetworkEnum, timeFrame: TimeFrameEnum): Promise<GasHistoricalData | null> {
        const apiUrl = `${network}/gas-historical-data-${timeFrame}.json`;

        try {
            return await fetchData.fetchData(apiUrl);
        } catch (error) {
            console.error('Error loading gas historical data:', error);
            return null;
        }
    }

    return {
        loadGasHistoricalData,
    };
}