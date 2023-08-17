import { defineStore } from 'pinia';

interface TimeFrameData {
    timeFrame: string;
    timeFrames: Array<{ value: string; text: string }>;
}

export const useTimeFrameStore = defineStore('timeFrame', {
    state: (): TimeFrameData => ({
        timeFrame: '1w',
        timeFrames: [
            { value: '1w', text: '7D' },
            { value: '1m', text: '30D' },
            { value: '3m', text: '90D' },
        ],
    }),
    actions: {
        changeTimeFrame(timeFrame: string): void {
            this.timeFrame = timeFrame;
        },
    },
});
