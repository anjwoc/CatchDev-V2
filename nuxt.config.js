import dotenv from 'dotenv';
const config = dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed;

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
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    'vuetify-dialog/nuxt',
    'nuxt-material-design-icons',
  ],
  axios: {
    browserBaseURL: config.browserBaseURL,
    baseURL: config.baseURL,
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },
  env: {
    baseUrl: config.baseUrl,
    default_img: config.default_img,
    no_img: config.no_img,
    default_cover: config.default_cover,
    WS_URL: config.WS_URL,
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
    standalone: true,
  },
};
