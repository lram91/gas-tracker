import { defineStore } from 'pinia';

export const useVisabilityStore = defineStore('visability', {
    state: () => ({
        show: true,
    }),
    actions: {
        showValue() {
            this.show = true;
        },
        hideValue() {
            this.show = false;
        },
    },
});
