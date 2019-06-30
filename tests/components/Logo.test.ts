import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/Logo.vue';

describe('Logo.vue', () => {
    test('Basic test for Logo', () => {
        const wrapper = shallowMount(Logo);
        expect(wrapper.classes()).toContain('nuxt-logo');
    });
});
