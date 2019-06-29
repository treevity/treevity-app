<template lang="pug">
    a-layout
        a-layout-header
            a-row(type="flex", justify="space-between")
                language-switcher
                user
        a-layout-content
            nuxt
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import User from '@/components/header/User.vue';
import LanguageSwitcher from '@/components/header/LanguageSwitcher.vue';

@Component({
    components: {
        User,
        LanguageSwitcher
    }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="sass" scoped>
    .ant-layout, .ant-layout-content
        height: 100%
        background: #fff
    .ant-layout-header
        color: white
</style>
