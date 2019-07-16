import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from 'store';

export const name = 'messages';

export const types = {
    ALL: 'ALL',
    SET: 'SET',
    CLEAR: 'CLEAR'
};

export interface Message {
    type: string;
    translation: string;
}

export interface State {
    messages: Message[];
}

export const namespaced = true;

export const state = (): State => ({
    messages: []
});

export const getters: GetterTree<State, RootState> = {
    allMessages (state) {
        return state.messages;
    }
};

export interface Actions<S, R> extends ActionTree<S, R> {
    set (context: ActionContext<S, R>, payload: Message): void;
    clear (context: ActionContext<S, R>): void;
}

export const actions: Actions<State, RootState> = {
    set ({ commit }, payload: Message) {
        commit(types.SET, payload);
    },
    clear ({ commit }) {
        commit(types.CLEAR);
    }
};

export const mutations: MutationTree<State> = {
    // tslint:disable-next-line
    [types.SET] (state, message: Message) {
        state.messages = [...state.messages, message];
    },
    // tslint:disable-next-line
    [types.CLEAR] (state) {
        state.messages = [];
    }
};
