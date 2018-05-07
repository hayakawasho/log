module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'my-project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  srcDir: 'src/',
  loading: { color: '#3B8070' },
  css: [
    '~assets/styles/main.styl'
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'gsap',
      'axios',
    ],
    postcss: {
      plugins: {
        'postcss-cssnext': {
          browsers: ['last 2 versions', 'IE >= 11', 'Android >= 5.0']
        },
        'postcss-flexbugs-fixes': {},
        'css-mqpacker': {},
        'postcss-utilities': {},
        'postcss-easings': {},
      }
    },
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      // find the stylus loader
      const stylus = config.module.rules[0].options.loaders.stylus.find(e => e.loader == 'stylus-loader')
      // extend default options
      Object.assign(stylus.options, {
        import: [
          '~assets/styles/settings/index.styl',
        ]
      })
    }
  }
}
