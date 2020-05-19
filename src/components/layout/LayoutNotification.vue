<template>
  <div
    v-if="show"
    :class="`alert-${type}`"
    class="alert alert-dismissible fade show"
    role="alert"
  >
    {{ message }}
    <button type="button" class="close" @click="close()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false,
    type: 'danger',
    message: '',
  }),
  methods: {
    close() {
      this.message = ''
      this.type = 'danger'
      this.show = false
    },
  },
  created() {
    this.$root.$on(
      'Notification::show',
      ({ type, message, timeout = 4000 }) => {
        this.show = true
        this.type = type
        this.message = message

        setTimeout(() => this.close(), timeout)
      }
    )
  },
}
</script>

<style lang="scss" scoped>
.alert {
  z-index: 10000;
  top: 2em;
  right: 2em;
  max-width: 25em;
  position: absolute;
}
</style>
