<template lang="pug">
    a-row(type="flex", justify="center", align="middle", class="row")
        a-col(:span="12")
            h1(class="title") Secret page
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Meta } from '@/utils/custom-decorators';

    @Component({
        roles: ['superAdmin']
    })
    export default class Secret extends Vue {
        @Meta
        head() {
            return {
                title: 'Secret'
            };
        }
    }
</script>

<style lang="sass" scoped>
    .row
        height: 100vh
    .ant-col-12
        text-align: center
    .title
        font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
        font-weight: 300
        font-size: 100px
        color: #35495e
</style>
