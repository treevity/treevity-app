import * as messages from '~/store/messages';

export default ({ store, app }) => {
    app.router.beforeEach((to, from, next) => {
        delete to.query['error'];
        next();
    });
    store.commit(`${messages.name}/${messages.types.CLEAR}`);
};
