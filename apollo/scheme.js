import loginGql from '~/apollo/mutations/login.gql';
import currentUserGql from '~/apollo/queries/currentUser.gql';
import logoutGql from '~/apollo/mutations/logout.gql';

export default class ApolloScheme {
    constructor(auth, options) {
        this.$auth = auth;
        this.name = options._name;
        this.app = this.$auth.ctx.app;
        this.client = this.app.apolloProvider.defaultClient;

        this.options = Object.assign({}, DEFAULTS, options);
    }

    async _setToken(token) {
        if (this.options.globalToken) {
            await this.app.$apolloHelpers.onLogin(token);
        }
    }

    async _clearToken() {
        if (this.options.globalToken) {
            await this.app.$apolloHelpers.onLogout();
        }
    }

    async mounted() {
        if (this.options.tokenRequired) {
            const token = this.$auth.syncToken(this.name);
            await this._setToken(token);
        }

        return this.$auth.fetchUserOnce();
    }

    async login(args) {
        await this._logoutLocally();

        const res = await this.client.mutate({
            mutation: loginGql,
            variables: { email: args.email, password: args.password }
        });

        const { accessToken } = res.data.login;

        if (this.options.tokenRequired) {
            this.$auth.setToken(this.name, accessToken);
            await this._setToken(accessToken);
        }

        return this.fetchUser();
    }

    async setUserToken(tokenValue) {
        await this._logoutLocally();

        if (this.options.tokenRequired) {
            this.$auth.setToken(this.name, tokenValue);
            await this._setToken(tokenValue);
        }

        return this.fetchUser();
    }

    async fetchUser(args) {
        if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
            return;
        }

        const res = await this.client.query({
            query: currentUserGql
        });

        const { currentUser } = res.data;

        this.$auth.setUser(currentUser);
    }

    async logout(args) {
        if (this.options.endpoints.logout) {
            await this.client.mutate({
                mutation: logoutGql
            });
        }

        return this._logoutLocally();
    }

    async _logoutLocally() {
        if (this.options.tokenRequired) {
            await this._clearToken();
        }

        return this.$auth.reset();
    }
}

const DEFAULTS = {
    tokenRequired: true,
    tokenType: 'Bearer',
    globalToken: true,
    tokenName: 'Authorization'
};
