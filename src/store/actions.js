import * as types from './mutation-types'
import { Auth } from '../api'
// import { Auth, List, Task } from '../api'

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        commit(types.AUTH_LOGIN, { token, userId })
      })
      .catch(err => { throw err })
  },
  fetchLists: ({ commit }) => {},
  addTask: ({ commit }) => {},
  updateTask: ({ commit }) => {},
  removeTask: ({ commit }) => {},
  logout: ({ commit }) => {}
}
