import Vue from 'vue';

Vue.mixin({
    computed: {
        userFullName(): string {
            const { user }: any = this.$auth;
            return user ? `${user.firstName} ${user.surname}` : '';
        },
        userRoles(): string {
            const { user: { roles } }: any = this.$auth;
            return roles.length ? roles.map(role => role.name) : null;
        }
    }
});
