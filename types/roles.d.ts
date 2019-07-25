import Vue, { ComponentOptions } from 'vue';

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        roles?: string[] | string;
    }
}
