import * as messages from '~/store/messages';

export default ({ store }) => {
    store.commit(`${messages.name}/${messages.types.CLEAR}`);
};
