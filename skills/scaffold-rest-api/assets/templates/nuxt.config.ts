export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  nitro: {
    preset: process.env.NITRO_PRESET || 'node-server',
  },
  typescript: {
    typeCheck: true,
  },
})
