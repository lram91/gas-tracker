import {defineStore} from 'pinia';

export const useUIStore = defineStore('ui', {
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
