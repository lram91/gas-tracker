import { defineStore } from 'pinia';
import { TabData } from '@/types/commonTypes';

export const useTabStore = defineStore('tab', {
    state: () => ({
        tabs: [
            {
                title: 'Ethereum',
                network: 'eth',
            },
            {
                title: 'Binance Smart Chain',
                network: 'bsc',
            },
            {
                title: 'Polygon',
                network: 'polygon',
            },
        ] as TabData[],
        selectedNetwork: null as TabData | null,
    }),
    actions: {
        selectTab(tab: TabData): void {
            this.selectedNetwork = tab;
        },
    },
    getters: {
        selectedTabTitle(): string {
            return this.selectedNetwork?.title || '';
        },
    },
});
