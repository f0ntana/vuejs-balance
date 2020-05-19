<template>
  <form @submit.prevent="handleLogin()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
        <h2 class="mb-0">Balance</h2>
      </div>
      <div class="card-body">
        <p class="alert alert-danger pt-2 pb-2" v-if="error">
          {{ error }}
        </p>
        <div class="form-group">
          <input
            v-model="email"
            required
            type="email"
            class="form-control"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            required
            type="password"
            class="form-control"
            placeholder="Senha"
          />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          <template v-if="loading">
            <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-if="!loading">
            Logar
            <i class="fa fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    loading: false,
    error: '',
    email: 'felipefontanaf@gmail.com',
    password: '123456',
  }),
  mounted() {
    if (localStorage.uid !== undefined) {
      this.$router.push({ name: 'home' })
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      this.loading = true
      try {
        const response = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
        localStorage.uid = response.user.uid
        this.$root.$emit('Notification::show', {
          type: 'success',
          message: 'Logado com sucesso, redirecionando..',
        })
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Dados inválidos',
        })
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .card {
    width: 35vw;
    color: var(--dark);
  }
}
</style>
