import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import LoginView from '@/components/templates/login-view.vue'

// ローカルなVueコンストラクタを作成
const localVue = createLocalVue()
// ローカルなVueコンストラクタにVuexをインストール
localVue.use(Vuex)

describe('LoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  // `LoginForm`コンポーネントのログインボタンのクリックをトリガーするヘルパー関数
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onLogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    // LoginFormコンポーネントのスタブの設定
    LoginFormComponentStub = {
      name: 'LoginForm',
      props: ['onLogin'],
      render: h => h('p', ['login form'])
    }

    // Vue Routerのモック設定
    $router = {
      push: sinon.spy()
    }

    // loginアクションの動作確認のためのVuex周りの設定
    actions = {
      login: sinon.stub()
    }

    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView
    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(LoginView, {
          mocks: {
            $router
          },
          stubs: {
            LoginForm: LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('ボードページのルートにリダイレクトすること', done => {
        // loginアクションを成功とする
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        // プロミスのフラッシュ
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('失敗', () => {
      beforeEach(() => {
        loginView = mount(LoginView, {
          stubs: {
            LoginForm: LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject') // spyでラップ
      })

      afterEach(() => {
        loginView.vm.throwReject.restore() // spyのラップ解除
      })

      it('エラー処理が呼び出されること', done => {
        // loginアクションを失敗とする
        const message = 'login failed'
        actions.login.rejects(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        // プロミスのフラッシュ
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
