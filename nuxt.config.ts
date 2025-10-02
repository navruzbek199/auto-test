// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt 3 starter",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/devtools",
    // 'nuxt3-socket.io'
  ],
  // socket: {

  //   // JSON serializable options only.
  //   // options object to pass when instantiating socket server.
  //   serverOptions: {}
  // },
  css: ["~/assets/styles/css/tailwind.css", "~/assets/styles/scss/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      IMAGE_BASE_URL: process.env.NUXT_IMAGE_BASE_URL,
    },
  },
});
