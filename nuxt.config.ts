import NuxtConfiguration from '@nuxt/config';
import { pages, locales } from './i18n';

const config = require('config');
const pkg = require('./package');

const client: any = config.get('client');
const server: any = config.get('server');

const nuxtConfig: NuxtConfiguration = {
    mode: 'universal',
    srcDir: './',
    server: {
        port: client.port,
        host: client.host
    },
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s | Treevity',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap&subset=latin-ext' }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        'ant-design-vue/dist/antd.css',
        '@/assets/css/main.sass'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/style-resources',
        'nuxt-i18n'
    ],
    i18n: {
        locales,
        pages,
        defaultLocale: 'en',
        lazy: true,
        langDir: 'i18n/locales/',
        parsePages: false,
        seo: false
    },
    /*
     ** Global style resources
     */
    styleResources: {
        sass: [
            '~/assets/css/variables.sass'
        ]
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/ui',
        '~/plugins/mixins'
    ],
    /*
    ** axios configuration
     */
    axios: {
        baseURL: `http://${server.host}:${server.port}`
    },
    /*
    ** Auth configuration
     */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/auth/login', method: 'post', propertyName: 'accessToken' },
                    logout: { url: '/auth/logout', method: 'post' },
                    user: { url: '/users/me', method: 'get', propertyName: false }
                }
            }
        },
        watchLoggedIn: true,
        rewriteRedirects: false,
        resetOnError: true,
        plugins: ['~/plugins/auth-i18n']
    },
    /*
    ** Router configuration
     */
    router: {
        middleware: ['auth']
    },
    generate: {
        dir: './dist'
    }
};

export default nuxtConfig;
