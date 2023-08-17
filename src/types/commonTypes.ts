import { BlockchainNetworkEnum } from "@/types/enums/BlockchainNetworkEnum";
import { TimeFrameEnum } from "@/types/enums/TimeFrameEnum";
import chartOptionsConfig from "@/configs/chart";

export interface TabData {
    title: string;
    network: BlockchainNetworkEnum;
}

export interface TimeFrameData {
    timeFrame: TimeFrameEnum;
    timeFrames: Array<{ value: TimeFrameEnum; text: string }>;
}

export interface VisabilityState {
    show: boolean;
}

export interface ChartData {
    options: typeof chartOptionsConfig;
    series: {
        name: string;
        data: number[] | undefined;
    }[];
}