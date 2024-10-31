export default defineNuxtConfig({
  app: {
    baseURL: '/my-tweet-history/',
    head: {
      title: 'my-tweet-history',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
      ]
    }
  },
});