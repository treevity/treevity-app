export const locales = [
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
    { code: 'cz', iso: 'cs-CZ', name: 'Česky', file: 'cz.json' }
];

export const redirects = {
    en: {
        login: '/login',
        logout: '/login',
        callback: '/login',
        home: '/'
    },
    cz: {
        login: '/cz/prihlaseni',
        logout: '/cz/prihlaseni',
        callback: '/cz/prihlaseni',
        home: '/cz'
    }
};

export const pages = {
    index: {
        en: '/',
        cz: '/'
    },
    login: {
        en: '/login',
        cz: '/prihlaseni'
    }
};
