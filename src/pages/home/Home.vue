<template>
  <div class="home">
    <div class="row">
      <div class="col-6 home-box">
        <h5>Você gastou</h5>
        <h2 class="money" v-money-format="totals.total"></h2>
        <h5>Em 89 compras</h5>
      </div>
      <div class="col-6 home-box">
        <h5>A média de gastos é</h5>
        <h2 class="money" v-money-format="totals.avg"></h2>
      </div>
      <div class="col-6 home-box">
        <h5>Maior gasto</h5>
        <h2 class="money" v-money-format="totals.max.value"></h2>
        <h5 v-date-format="totals.max.createdAt"></h5>
      </div>
      <div class="col-6 home-box">
        <h5>Menor gasto</h5>
        <h2 class="money" v-money-format="totals.min.value"></h2>
        <h5 v-date-format="totals.min.createdAt"></h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    expenses: [],
  }),
  created() {
    this.getData()
  },
  computed: {
    totals() {
      const { expenses } = this

      const values = {
        total: 0,
        avg: 0,
        max: {},
        min: {},
      }
      if (expenses.length) {
        values.total = expenses.reduce((acc, cur) => acc + Number(cur.value), 0)
        values.avg = values.total / expenses.length
        values.max = expenses.sort((a, b) => b.value - a.value)[0]
        values.min = expenses.sort((a, b) => a.value - b.value)[0]
      }
      console.log('1', values)
      return values
    },
  },
  methods: {
    async getData() {
      const ref = await this.$firebase.database().ref(`/${localStorage.uid}`)
      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.values(values)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;
  .home-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(50vh - 15px);
    border: 1px solid var(--dark-medium);
    &:nth-child(2),
    &:nth-child(4) {
      border-left: none;
    }
    &:nth-child(3),
    &:nth-child(4) {
      border-top: none;
    }
    .money {
      color: var(--featured);
    }
  }
}
</style>
