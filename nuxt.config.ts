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
    '@d0rich/nuxt-content-mermaid',
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
    experimental: {
      clientDB: true
    },
    documentDriven: false,
    // https://content.nuxtjs.org/api/configuration
    highlight: {
      langs: [ // see https://shiki.style/languages
        'java',
        'kotlin',
        'dart',
        'javascript',
        'typescript',
        'json',
        'tsx',
        'vue',
        'vue-html',
        'terraform',
        'log',
        'bash',
        'shell',
        'console',
        'yaml',
        'toml',
        'xml',
        'html',
        'css',
        'csv',
        'properties',
        'terraform',
        'graphql'
      ],
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      },
      preload: ["kotlin", "java", "bash", "ini", "json", "yaml", "xml", "log"],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml'],
      ignore: ['/__pinceau_tokens_config.json', '/__pinceau_tokens_schema.json'],
      failOnError: false,
    }
  },
  hooks: { // Workaround for not exiting - https://github.com/nuxt/cli/issues/193#issuecomment-1722161822
    close: (nuxt) => {
      if (!nuxt.options._prepare) {
        process.exit()
      }
    },
  },
});
