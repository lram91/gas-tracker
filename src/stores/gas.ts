import { defineStore } from 'pinia';

export const useGasStore = defineStore('gas', {
    actions: {
        getColorByType(type: GasType): string {
            switch (type) {
                case GasType.Low:
                    return 'text-success';
                case GasType.Average:
                    return 'text-warning';
                case GasType.High:
                    return 'text-danger';
                default:
                    return 'text-success';
            }
        },
    },
});

export enum GasType {
    Low = 'low',
    Average = 'avg',
    High = 'high',
}
