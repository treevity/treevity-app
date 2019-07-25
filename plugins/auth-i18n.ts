import { redirects } from '@/i18n';

export default ({ app }) => {
    changeAuthOptions(app);
    app.router.beforeEach((to, from, next) => {
        changeAuthOptions(app);
        next();
    });
};

const changeAuthOptions = (app) => {
    const locale = app.i18n.locale;
    if (locale in redirects) {
        app.$auth.options.redirect = redirects[locale];
    }
};
