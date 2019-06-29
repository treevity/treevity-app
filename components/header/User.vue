<template lang="pug">
    a-col(:span="6", class="user")
        strong {{ $t('header.user') }}:&nbsp;
        span {{ userFullName }} (#[a(@click.prevent="handleLogout") {{ $t('header.logout') }}])
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class User extends Vue {
    async handleLogout(): Promise<any> {
        try {
            await this.$auth.logout();
        } catch (error) {
            await this.$message.error(error.message);
        }
    }
}
</script>

<style lang="sass" scoped>
    .user
        text-align: right
</style>
