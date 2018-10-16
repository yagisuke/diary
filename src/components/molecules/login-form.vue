<template>
  <form
    class="form"
    novalidate>
    <div>
      <label
        class="form-label"
        for="email">メールアドレス</label>
      <input
        id="email"
        v-model="email"
        type="text"
        autocomplete="off"
        placeholder="例: kanban@domain.com"
        class="form-input"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.email.format">メールアドレスの形式が不正です。</li>
        <li v-if="!validation.email.required">メールアドレスが入力されていません。</li>
      </ul>
    </div>
    <div>
      <label
        class="form-label"
        for="passowrd">パスワード</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="off"
        placeholder="例: xxxxxxxx"
        class="form-input"
        @focus="resetError">
      <ul class="validation-errors">
        <li v-if="!validation.password.required">パスワードが入力されていません。</li>
      </ul>
    </div>
    <div class="form-actions">
      <Button
        :disabled="disableLoginAction"
        @click="handleClick">ログイン</Button>
      <p
        v-if="progress"
        class="login-progress">ログイン中...</p>
      <p
        v-if="error"
        class="login-error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import Button from '@/components/atoms/button.vue'
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const required = val => !!val.trim()

export default {
  name: 'LoginForm',

  components: {
    Button
  },
  props: {
    onLogin: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      email: '',
      password: '',
      progress: false,
      error: ''
    }
  },
  computed: {
    validation () {
      return {
        email: {
          required: required(this.email),
          format: REGEX_EMAIL.test(this.email)
        },
        password: {
          required: required(this.password)
        }
      }
    },
    valid () {
      const validation = this.validation
      const fields = Object.keys(validation)
      let valid = true
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        valid = Object.keys(validation[field])
          .every(key => validation[field][key])
        if (!valid) break
      }
      return valid
    },
    disableLoginAction () {
      return !this.valid || this.progress
    }
  },
  methods: {
    resetError () {
      this.error = ''
    },
    handleClick (ev) {
      if (this.disableLoginAction) return

      this.progress = true
      this.resetError()

      this.$nextTick(() => {
        this.onLogin({ email: this.email, password: this.password })
          .catch(err => {
            this.error = err.message
          })
          .then(() => {
            this.progress = false
          })
      })
    }
  }
}
</script>

<style scoped>
.form {
  display: block;
  margin: 0 auto;
  text-align: left;
}

.form-label {
  display: block;
}

.form-input {
  width: 100%;
  padding: .5em;
  font: inherit;
}

.validation-errors {
  height: 32px;
  margin: 0.25em 0;
  padding: 0;
  list-style-type: none;
}

.validation-errors > li {
  font-size: 0.5em;
}

.form-actions > p {
  font-size: 0.5em;
}
</style>
