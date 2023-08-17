import { useFetchData } from '@/repositories/baseRepository';
import { GasHistoricalData } from '@/types/storeDataTypes';
import { BlockchainNetworkEnum } from '@/types/enums/BlockchainNetworkEnum';
import { TimeFrameEnum } from '@/types/enums/TimeFrameEnum';

export function useGasHistoricalDataRepository() {
    const fetchData = useFetchData();

    async function loadGasHistoricalData(network: BlockchainNetworkEnum, timeFrame: TimeFrameEnum): Promise<GasHistoricalData | null> {
        const apiUrl = `/data/${network}/gas-historical-data-${timeFrame}.json`;
        try {
            const gasHistoricalData = await fetchData.fetchData(apiUrl);
            return gasHistoricalData;
        } catch (error) {
            console.error('Error loading gas historical data:', error);
            return null;
        }
    }

    return {
        loadGasHistoricalData,
    };
}