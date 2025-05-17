import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: "/small-projects/",
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

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
