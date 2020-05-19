import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      icon: 'home',
      title: 'Home',
    },
    component: () =>
      import(
        /* webpackChunkName: "home" */
        '../pages/home/Home.vue'
      ),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      icon: 'sign-in-alt',
      title: 'Login',
    },
    component: () =>
      import(
        /* webpackChunkName: "login" */
        '../pages/login/Login.vue'
      ),
  },
  {
    path: '/balance',
    name: 'balance',
    meta: {
      icon: 'list-ul',
      title: 'Balance',
    },
    component: () =>
      import(
        /* webpackChunkName: "balance" */
        '../pages/balance/Balance.vue'
      ),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  !localStorage.uid && to.name !== 'login' ? next({ name: 'login' }) : next()
})

export default router
