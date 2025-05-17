import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  target: "static",
  app: {
    baseURL: "/small-projects/",
  },

  css: ["~/assets/css/main.css"],

  modules: ["nuxt-quasar-ui", "@vesp/nuxt-fontawesome"],

  fontawesome: {
    icons: {
      solid: ["sort-up"],
      regular: ["comment"],
      brands: ["twitter"],
    },
    proIcons: {
      solid: [],
      regular: [],
      light: [],
      thin: [],
      duotone: [],
    },
    sharpIcons: {
      solid: [],
      regular: [],
      light: [],
      thin: [],
    },
  },
});
