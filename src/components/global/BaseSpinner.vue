<template>
  <div class="base-spinner fa-3x" v-if="visible">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
</template>

<script>
export default {
  name: 'BaseSpinner',
  data() {
    return {
      visible: true,
    }
  },
  created() {
    this.$root.$on('Spinner::toogle', () => (this.visible = !this.visible))
  },
}
</script>

<style lang="scss" scoped>
.base-spinner {
  z-index: 1000000;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-medium);
  color: var(--featured);
}
</style>
