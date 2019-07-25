<template lang="pug">
    a-layout
        a-layout-header
        a-layout-content
            nuxt
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';
    import * as messages from '@/store/messages';

    const Messages = namespace(messages.name);

    @Component
    export default class AdminLayout extends Vue {
        @Messages.Getter('allMessages') allMessages;

        @Watch('allMessages')
        onNewMessages() {
            for (const message of this.allMessages) {
                this.$message[message.type](this.$t(message.translation));
            }
        }
    }
</script>

<style lang="sass" scoped>
    .ant-layout, .ant-layout-content
        height: 100%
        background: #fff
        .ant-layout-header
            color: white
</style>
