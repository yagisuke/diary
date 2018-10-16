<template>
  <div class="login-view">
    <h1>Kanban App</h1>
    <LoginForm :on-login="handleLogin" />
  </div>
</template>

<script>
import LoginForm from '@/components/molecules/login-form.vue'

export default {
  name: 'LoginView',
  components: {
    LoginForm
  },
  methods: {
    handleLogin (authInfo) {
      return this.$store.dispatch('login', authInfo)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(err => this.throwReject(err))
    },
    throwReject (err) {
      return Promise.reject(err)
    }
  }
}
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
