import { defineStore } from 'pinia';
import { VisabilityState } from '@/types/commonTypes';

export const useVisabilityStore = defineStore('visibility', {
    state: (): VisabilityState => ({
        show: true,
    }),

    actions: {
        showValue(): void {
            this.show = true;
        },
        hideValue(): void {
            this.show = false;
        },
    },
});
