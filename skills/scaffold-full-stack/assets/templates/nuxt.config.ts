import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  nitro: {
    externals: {
      inline: ['@unhead/vue', 'unhead', 'hookable'],
    },
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
