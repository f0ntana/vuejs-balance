<template>
  <div id="app">
    <LayoutNotification />
    <BaseSpinner />
    <div class="container-fluid " v-if="isLogged">
      <div class="row">
        <div class="col-6 col-sm-3 col-md-3 navigation-sidebar">
          <h2 class="text-center mt-3 mb-3">{{ appTitle }}</h2>
          <LayoutNavigation />
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>
    <router-view v-if="!isLogged" />
  </div>
</template>

<script>
import BaseSpinner from '@/components/global/BaseSpinner'
import LayoutNavigation from '@/components/layout/LayoutNavigation'
import LayoutNotification from '@/components/layout/LayoutNotification'
export default {
  name: 'App',
  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification,
  },
  data: () => ({ isLogged: false, appTitle: 'Balance' }),
  mounted() {
    this.$firebase.auth().onAuthStateChanged(user => {
      this.isLogged = !!user
      if (user) {
        localStorage.uid = user.uid
      }
    })
    setTimeout(() => this.$root.$emit('Spinner::toogle'), 500)
  },
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: var(--light);
  background-color: var(--darker);
  .navigation-sidebar {
    background-color: var(--dark-medium);
    padding: 0;
  }
}
</style>
