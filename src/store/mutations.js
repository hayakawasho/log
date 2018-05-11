
export default {
  initClient(state) {
    // state.client.defaults.baseURL = state.siteUrl + '/wp-json/wp/v2'
    // state.client.defaults.baseURL = state.siteUrl
    // state.client.defaults.timeout = 10000
    // state.client.defaults.headers = { 'X-WP-Nonce': window.wpSettings.nonce }
  },
  changeIsFontLoaded(state, boolean) {
    state.isFontLoaded = boolean
  },
  changeIsLoading(state, boolean) {
    state.isLoading = boolean
  },
  changeIsMenuOpened(state, boolean) {
    state.isMenuOpened = boolean
  },
}

