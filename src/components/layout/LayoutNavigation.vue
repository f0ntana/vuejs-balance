<template>
  <nav class="nav flex-column justify-content-between navigation">
    <div>
      <router-link
        exact
        exact-active-class="active"
        class="nav-link"
        :key="i"
        :to="{ name: router.name }"
        v-for="(router, i) in routerLinks"
      >
        <i class="mr-2 fa" :class="`fa-${router.meta.icon}`"></i>
        {{ router.meta.title }}
      </router-link>
      <hr />
      <LayoutNewExpense />
    </div>
    <LayoutLogout />
  </nav>
</template>

<script>
import LayoutLogout from './LayoutLogout'
import LayoutNewExpense from './LayoutNewExpense'
export default {
  components: {
    LayoutLogout,
    LayoutNewExpense,
  },
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter(route => route.name !== 'login')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  height: calc(100vh - 70px);
}
.nav-link {
  color: var(--light);
  font-size: 0.9em;
  transition: 0.4s;
  &.active {
    color: var(--featured);
    font-weight: bold;
    background-color: transparent;
  }
  &:hover {
    font-size: 1em;
  }
}
</style>
