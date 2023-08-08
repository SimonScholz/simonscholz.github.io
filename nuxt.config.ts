export default defineNuxtConfig({
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
    '@nuxthq/studio'
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
      theme: "github-dark",
      preload: ["java", "javascript"],
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
      ignore: ['/__pinceau_tokens_config.json', '/__pinceau_tokens_schema.json']
    }
  },
});