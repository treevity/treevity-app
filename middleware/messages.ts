import { Middleware, Context } from '@nuxt/types';
import * as messages from '~/store/messages';

const messagesMiddleware: Middleware = ({ store, app }: Context) => {
    const router: any = app.router;
    router.beforeEach((to, from, next) => {
        delete to.query['error'];
        next();
    });
    store.commit(`${messages.name}/${messages.types.CLEAR}`);
};

export default messagesMiddleware;
