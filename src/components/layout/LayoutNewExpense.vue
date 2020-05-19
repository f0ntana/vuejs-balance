<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="showModal()" class="btn btn-primary btn-lg w-75">
      <i class="fa fa-plus"></i>
      Novo Gasto
    </button>
    <div
      class="modal fade"
      :class="{ show: showingModal }"
      :style="{ display: showingModal ? 'block' : 'none' }"
    >
      <form @submit.prevent="handleForm()">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Adicionar Gasto</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="closeModal()"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for="description">Descrição</label>
                  <input
                    type="text"
                    class="form-control"
                    required
                    v-model="form.description"
                  />
                </div>
                <div class="form-group col-4">
                  <label for="value">Valor</label>
                  <input
                    type="text"
                    class="form-control"
                    required
                    v-model="form.value"
                  />
                </div>
                <div class="form-group col-12 d-flex justify-content-center">
                  <input
                    ref="inputFile"
                    type="file"
                    class="d-none"
                    accept="image/*"
                    @change="handleFile($event)"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="openFileDialog()"
                  >
                    Adicionar Comprovante
                  </button>
                </div>
                <div class="mt-2 w-100 text-center" v-if="form.receipt">
                  {{ form.receipt.name }}
                  <button
                    type="button"
                    class="btn badge badge-light"
                    @click="form.receipt = null"
                  >
                    <i class="fa fa-trash text-danger"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary">Salvar</button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal()"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div
      class="modal-backdrop fade"
      :style="{ display: showingModal ? 'block' : 'none' }"
      :class="{ show: showingModal }"
    ></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showingModal: false,
    form: {
      receipt: '',
      description: '',
      value: '',
    },
  }),
  computed: {
    fileName() {
      const { receipt } = this.form
      const split = receipt.name.split('.')
      return !receipt ? '' : `${split[0]}-${new Date().getTime()}.${split[1]}`
    },
  },
  methods: {
    openFileDialog() {
      this.$refs.inputFile.value = null
      this.$refs.inputFile.click()
    },
    handleFile(event) {
      this.form.receipt = event.target.files[0]
    },
    async handleForm() {
      try {
        let url = ''
        this.$root.$emit('Spinner:toogle')
        const ref = this.$firebase.database().ref(localStorage.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase
            .storage()
            .ref(localStorage.uid)
            .child(this.fileName)
            .put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const data = {
          ...this.form,
          id,
          receipt: url,
          createdAt: new Date().getTime(),
        }

        ref.child(id).set(data, err =>
          err
            ? this.$root.$emit('Notification::show', {
                type: 'danger',
                message: 'Falha ao salvar',
              })
            : this.closeModal()
        )

        this.$root.$emit('Notification::show', {
          type: 'success',
          message: 'Inserido com sucesso',
        })

        this.$root.$emit('Spinner:toogle')
      } catch (error) {
        console.log(error)
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Falha ao salvar',
        })
      }
    },
    closeModal() {
      this.form.description = ''
      this.form.value = ''
      this.form.receipt = ''
      this.showingModal = false
    },
    showModal() {
      this.showingModal = true
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  color: var(--dark);
}
</style>
