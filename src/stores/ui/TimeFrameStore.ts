import { defineStore } from 'pinia';
import { TimeFrameData } from '@/types/commonTypes';
import { TimeFrameEnum } from '@/types/enums/TimeFrameEnum';

export const useTimeFrameStore = defineStore('timeFrame', {
    state: (): TimeFrameData => ({
        timeFrame: TimeFrameEnum.OneWeek,
        timeFrames: [
            { value: TimeFrameEnum.OneWeek, text: '7D' },
            { value: TimeFrameEnum.OneMonth, text: '30D' },
            { value: TimeFrameEnum.ThreeMonths, text: '90D' },
        ],
    }),
    actions: {
        changeTimeFrame(timeFrame: TimeFrameEnum): void {
            this.timeFrame = timeFrame;
        },
    },
});
