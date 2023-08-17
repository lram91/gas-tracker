export interface GasHistoricalData {
    dates: string[];
    prices: {
        high: number[];
        average: number[];
        low: number[];
    };
}

export interface GasTrackerData {
    lowPrice: number;
    avgPrice: number;
    highPrice: number;
    lowGasPriceUsd: string;
    avgGasPriceUsd: string;
    highGasPriceUsd: string;
    lowBasePriority: string;
    avgBasePriority: string;
    highBasePriority: string;
}