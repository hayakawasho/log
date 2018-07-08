module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {},
  globals: {
    'TweenLite': true,
    'TweenMax': true,
    'Expo': true,
    'Circ': true,
    'Quad': true,
    'Quart': true,
    'Quint': true,
    'Linear': true,
    'Power0': true,
    'Power1': true,
    'Power2': true,
    'Power3': true,
    'Power4': true,
    '$': true,
  },
}
