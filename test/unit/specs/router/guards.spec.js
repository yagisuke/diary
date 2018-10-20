import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const App = {
  name: 'app',
  render: h => h('router-view')
}

const Top = {
  name: 'top',
  render: h => h('p', ['top'])
}

const Login = {
  name: 'login',
  render: h => h('p', ['login'])
}

const mockAuthorizeToken = store => {
  const injector = require('inject-loader!@/router/guards')
  const storeMock = injector({
    '../store': store
  })
  return storeMock.authorizeToken
}

const setup = state => {
  const store = new Vuex.Store({ state })
  const router = new VueRouter({
    routes: [{
      path: '/',
      component: Top,
      meta: { requiresAuth: true }
    }, {
      path: '/login',
      component: Login
    }]
  })

  router.beforeEach(mockAuthorizeToken(store))

  return mount(App, {
    localVue,
    store,
    router
  })
}

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

describe('beforeEachガードフック', () => {
  describe('認証トークンあり', () => {
    it('そのまま解決すること', () => {
      const app = setup({
        auth: {
          token: '1234567890qwertyuiop',
          userId: 1
        }
      })
      expect(app.text()).to.equal('top')
    })
  })

  describe('認証トークンなし', () => {
    it('/login にリダイレクトして解決すること', () => {
      const app = setup({ auth: {} })
      expect(app.text()).to.equal('login')
    })
  })
})
