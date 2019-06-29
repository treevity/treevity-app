import Vue from 'vue';

Vue.mixin({
    computed: {
        userFullName(): string {
            const { user }: any = this.$auth;
            return user ? `${user.firstName} ${user.surname}` : '';
        }
    }
});
