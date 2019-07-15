import * as _ from 'lodash';

export default ({ route, app, store, redirect }) => {
    const authData = store.state.auth;
    const currentPath = app.context.route.path;
    const authRedirects = app.$auth.options.redirect;
    const authPaths = Object.values(authRedirects);

    if (authPaths.includes(currentPath)) return;

    const { user } = authData;
    const userRoles = user.roles.length ? user.roles.map(role => role.name) : [];
    const pageRoles = routeOption(route, 'roles');

    if (!pageRoles.length) return;

    if (!pageRoles.some(el => userRoles.includes(el))) {
        return redirect(authRedirects.home);
    }
};

const routeOption = (route, key) => {
    const options = route.matched.map((m) => {
        if (process.client) {
            // Client
            return Object.values(m.components).map((component: any) => component.options && component.options[key]);
        }

        // SSR
        return Object.values(m.components).map((component: any) =>
            Object.values(component._Ctor).map(
                (ctor: any) => ctor.options && ctor.options[key]
            )
        );
    });

    return _.compact(_.flattenDeep(options));
};
