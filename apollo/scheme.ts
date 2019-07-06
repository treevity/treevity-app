import { loginGql, logoutGql, currentUserGql } from '~/apollo';

const DEFAULTS = {
    tokenRequired: true,
    tokenType: 'Bearer',
    globalToken: true,
    tokenName: 'Authorization'
};

export default class ApolloScheme {
    private readonly name: string = '';
    private $auth: any;
    private app: any;
    private client;
    private options;

    constructor(auth, options) {
        this.$auth = auth;
        this.name = options._name;
        this.app = this.$auth.ctx.app;
        this.client = this.app.apolloProvider.defaultClient;
        this.options = Object.assign({}, DEFAULTS, options);
    }

    private async setToken(token) {
        if (this.options.globalToken) {
            await this.app.$apolloHelpers.onLogin(token);
        }
    }

    private async clearToken() {
        if (this.options.globalToken) {
            await this.app.$apolloHelpers.onLogout();
        }
    }

    private async logoutLocally() {
        if (this.options.tokenRequired) {
            await this.clearToken();
        }

        return this.$auth.reset();
    }

    async mounted() {
        if (this.options.tokenRequired) {
            const token = this.$auth.syncToken(this.name);
            await this.setToken(token);
        }

        return this.$auth.fetchUserOnce();
    }

    async login(args) {
        await this.logoutLocally();

        const res = await this.client.mutate({
            mutation: loginGql,
            variables: { email: args.email, password: args.password }
        });

        const { accessToken } = res.data.login;

        if (this.options.tokenRequired) {
            this.$auth.setToken(this.name, accessToken);
            await this.setToken(accessToken);
        }

        return this.fetchUser();
    }

    async setUserToken(tokenValue) {
        await this.logoutLocally();

        if (this.options.tokenRequired) {
            this.$auth.setToken(this.name, tokenValue);
            await this.setToken(tokenValue);
        }

        return this.fetchUser();
    }

    async fetchUser() {
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
        await this.client.mutate({
            mutation: logoutGql
        });

        return this.logoutLocally();
    }
}
