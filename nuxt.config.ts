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
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:title', content: 'my-tweet-history' },
        { property: 'og:description', content: '黒歴史bot' },
        { property: 'og:image', content: './favicon.ico' },
        { property: 'og:url', content: 'https://kuskyst.github.io/my-tweet-history/' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
      ]
    }
  },
});