import { defineStore } from 'pinia';

export enum GasType {
    Low = 'low',
    Average = 'avg',
    High = 'high',
}

export const useGasTypesStore = defineStore('gasTypes', {
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
