export default defineNuxtConfig({
  app: {
    // baseURL: '/simonscholz.github.io/',
    buildAssetsDir: 'assets',
  },
  components: [
    { path: '~/components/cv', pathPrefix: false, },
    '~/components'
  ],
  extends: [
    process.env.THEME_ELEMENTS || '@nuxt-themes/elements',
    process.env.THEME_TYPOGRAPHY || '@nuxt-themes/typography'
  ],
  modules: [
    'nuxt-content-assets', // make sure to add before content!
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxthq/studio',
    '@nuxtjs/robots',
  ],
  ssr: true,
  experimental: {
    payloadExtraction: false,
  },
  // https://color-mode.nuxtjs.org
  colorMode: {
    classSuffix: ''
  },
  router: {
    options: {
      strict: false,
    },
  },
  sourcemap: false,
  content: {
    documentDriven: true,
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      preload: ["kotlin", "java", "bash"],
    },
    markdown: {
      // https://www.npmjs.com/package/remark-reading-time
      remarkPlugins: ["remark-reading-time"],
      // https://github.com/rehypejs/rehype-external-links
      rehypePlugins: [
        [
          "rehype-external-links",
          {
            target: "_blank",
            rel: "noopener noreferer",
          },
        ],
      ],
    },
  },
  experimental: {
    inlineSSRStyles: false
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
      ignore: ['/__pinceau_tokens_config.json', '/__pinceau_tokens_schema.json'],
      failOnError: false,
    }
  },
});
