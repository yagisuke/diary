<template>
  <button
    :class="classes"
    :disabled="disabled"
    :type="button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      const cls = this.type === 'text' ? ('-' + this.type) : ''
      return [`button${cls}`]
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
.button {
  padding: .6em 1.3em
}

.button-text {
  border: none;
  padding-right: 0;
  padding-left: 0;
}
</style>
