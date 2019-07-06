<template lang="pug">
    a-col(:span="6", class="user")
        strong {{ $t('header.user') }}:&nbsp;
        span {{ userFullName }} (#[a(@click.prevent="handleLogout") {{ $t('header.logout') }}])
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getErrors } from "@/utils/helpers";

@Component({})
export default class User extends Vue {
    async handleLogout(): Promise<any> {
        try {
            await this.$auth.logout();
            await this.$message.success(this.$i18n.t('notifications.logout'));
        } catch (error) {
            await this.$message.error(getErrors(error));
        }
    }
}
</script>

<style lang="sass" scoped>
    .user
        text-align: right
</style>
