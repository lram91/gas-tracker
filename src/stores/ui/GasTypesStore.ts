import { defineStore } from 'pinia';
import { GasTypeEnum } from "@/types/enums/GasTypeEnum";
import { ColorOptionsEnum } from "@/types/enums/ColorOptionsEnum";
export const useGasTypesStore = defineStore('gasTypes', {
    actions: {
        getColorByType(type: GasTypeEnum): string {
            switch (type) {
                case GasTypeEnum.Low:
                    return ColorOptionsEnum.Success;
                case GasTypeEnum.Average:
                    return ColorOptionsEnum.Warning;
                case GasTypeEnum.High:
                    return ColorOptionsEnum.Danger;
                default:
                    return ColorOptionsEnum.Success;
            }
        },
    },
});
