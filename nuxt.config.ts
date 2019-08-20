import { Configuration } from '@nuxt/types';
import { pages, locales } from './i18n';

const config = require('config');
const pkg = require('./package');

const client: any = config.get('client');
const server: any = config.get('server');
const url = `http://${server.host}:${server.port}/graphql`;

const nuxtConfig: Configuration = {
    buildModules: ['@nuxt/typescript-build'],
    typescript: {
        typeCheck: true,
        ignoreNotFoundWarnings: true
    },
    dir: {
        assets: 'assets',
        layouts: 'layouts',
        middleware: 'middleware',
        pages: 'pages',
        static: 'static',
        store: 'store'
    },
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
        '@nuxtjs/auth',
        '@nuxtjs/style-resources',
        'nuxt-i18n',
        '@nuxtjs/apollo'
    ],
    /*
      ** Nuxt-i18n options
     */
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
      ** Apollo options
     */
    apollo: {
        defaultOptions: {
            $query: {
                loadingKey: 'loading'
            }
        },
        clientConfigs: {
            default:  {
                httpEndpoint: url
            }
        }
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
    ** Auth configuration
     */
    auth: {
        strategies: {
            localGraphQL: {
                _scheme: '~/apollo/scheme'
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
        middleware: ['messages', 'auth', 'role']
    },
    generate: {
        dir: './dist'
    }
};

export default nuxtConfig;
