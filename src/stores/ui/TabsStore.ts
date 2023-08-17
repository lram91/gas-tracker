import { defineStore } from 'pinia';

interface TabData {
    title: string;
    network: string;
}

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
        selectTab(tab: TabData) {
            this.selectedNetwork = tab;
        },
    },
    getters: {
        selectedTabTitle() {
            return this.selectedNetwork?.title || '';
        },
    },
});
