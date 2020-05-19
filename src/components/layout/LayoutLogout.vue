<template>
  <button class="btn btn-logout" @click="logout()">
    <i class="fa fa-power-off mr-1"></i>
    Sair
  </button>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$root.$emit('Spinner::toogle')
      await this.$firebase.auth().signOut()
      localStorage.removeItem('uid')
      this.$router.push({ name: 'login' })
      this.$root.$emit('Spinner::toogle')
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-logout {
  color: var(--featured);
}
</style>
