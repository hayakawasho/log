import mutations from './mutations'
import actions from './actions'
import state from './state'

import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // development時のみ厳格モード有効
    state,
    mutations,
    actions,
  })
}

export default store
