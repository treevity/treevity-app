<template lang="pug">
    a-row(type="flex", justify="center", align="middle", class="row")
        a-col(:span="12")
            h1(class="title") {{ $t('admin.index.title') }}
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Meta } from '@/utils/custom-decorators';
    import BasePage from '@/components/admin/BasePage.vue';

    @Component({
        extends: BasePage
    })
    export default class AdminIndex extends Vue {
        @Meta
        head() {
            return {
                title: this.$i18n.t('admin.index.title')
            };
        }
    }
</script>
