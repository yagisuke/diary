import Vue from 'vue'
import * as types from '@/store/mutation-types'

// loginアクションないの依存関係をモック化する
const mockLoginAction = login => {
  const actionInjector = require('inject-loader!@/store/actions')

  // 注入関数でAuth APIモジュールをモック化する
  const actionMocks = actionInjector({
    '../api': {
      Auth: {
        login
      }
    }
  })
  return actionMocks.default.login
}

describe('loginアクション', () => {
  const address = 'foooooo@domain.com'
  const password = '1234567890'
  let commit
  let future

  describe('Auth.loginが成功', () => {
    const token = '1234567890qwertyuiop'
    const userId = 1

    beforeEach(done => {
      const login = authInfo => Promise.resolve({
        token,
        userId
      })
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // loginアクションの実行
      future = action({ commit }, { address, password })
      Vue.nextTick(done)
    })

    it('成功となること', () => {
      // commit が呼ばれていることを確認
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN)
      expect(commit.args[0][1].token).to.equal(token)
      expect(commit.args[0][1].userId).to.equal(userId)
    })
  })

  describe('Auth.loginが失敗', () => {
    beforeEach(done => {
      const login = authInfo => Promise.reject(new Error('login failed'))
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // login アクションの実行
      future = action({ commit })
      Vue.nextTick(done)
    })

    it('失敗となること', done => {
      // commitが呼ばれていないかの確認
      expect(commit.called).to.equal(false)

      // エラーが投げられているかチェック
      future.catch(err => {
        expect(err.message).to.equal('login failed')
        done()
      })
    })
  })
})
