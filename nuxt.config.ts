// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: [
    '~/assets/styles/index.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // injects the variables file into every .scss or .vue style
          additionalData: `@use '~/assets/styles/_variables.scss' as *;`
        }
      }
    }
  },
  devServer: {
    port: 3001, // Change this to your desired port
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap' }
      ]
    }
  },
})
