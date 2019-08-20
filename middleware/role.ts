import { Middleware, Context } from '@nuxt/types';
import * as _ from 'lodash';
import * as messages from '~/store/messages';

const roleMiddleware: Middleware = ({ route, app, store, redirect }: Context) => {
    const authData = store.state.auth;
    const currentPath = route.path;
    const authRedirects = app.$auth.options.redirect;
    const authPaths = Object.values(authRedirects);

    if (authPaths.includes(currentPath)) return;

    const { user } = authData;
    const userRoles = user.roles.length ? user.roles.map(role => role.name) : [];
    const pageRoles = getPageRoles(route);

    if (!pageRoles.length) return;

    if (!pageRoles.some(el => userRoles.includes(el))) {
        store.commit(`${messages.name}/${messages.types.SET}`, {
            type: 'error',
            translation: 'notifications.notAuthorized'
        });
        return redirect(authRedirects.home, { error: 'unauthorized' });
    }
};

const getPageRoles = (route) => {
    const roles: any = [];
    for (const m of route.matched) {
        const components = Object.values(m.components);
        if (process.client) {
            // Client
            components.forEach((component: any) => {
                if (component.options && component.options.roles) {
                    roles.push(component.options.roles);
                }
            });
        } else {
            // SSR
            components.forEach((component: any) =>
                Object.values(component._Ctor).forEach((ctor: any) => {
                    if (ctor.options && ctor.options.roles) {
                        roles.push(ctor.options.roles);
                    }
                })
            );
        }
    }

    return _.flattenDeep(roles);
};

export default roleMiddleware;
