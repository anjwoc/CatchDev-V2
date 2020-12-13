import dotenv from 'dotenv';
const config = dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed;
console.log(config.browserBaseURL || process.env.browserBaseURL);
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'Catch Dev',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/css/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/tiptap-vuetify.js', mode: 'client' },
    { src: '~/plugins/vue-input-tag.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', { treeShake: true }],
    '@nuxtjs/moment',
  ],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    'vuetify-dialog/nuxt',
    'nuxt-material-design-icons',
  ],
  axios: {
    browserBaseURL: config.browserBaseURL || process.env.browserBaseURL,
    baseURL: config.baseURL || process.env.baseURL,
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeshake: true,
  },
  env: {
    baseUrl: config.baseUrl || process.env.baseUrl,
    default_img: config.default_img || process.env.default_img,
    no_img: config.no_img || process.env.no_img,
    default_cover: config.default_cover || process.env.default_cover,
    WS_URL: config.WS_URL || process.env.WS_URL,
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config, { isServer, isDev }) {
      if (isServer && !isDev) {
        config.devtool = 'hidden-source-map';
      }
    },
  },
};
