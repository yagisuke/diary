import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },
  [types.FETCH_ALL_TASKLIST] (state, payload) {},
  [types.ADD_TASK] (state, payload) {},
  [types.UPDATE_TASK] (state, payload) {},
  [types.REMOVE_TASK] (state, payload) {},
  [types.AUTH_LOGOUT] (state, payload) {}
}
