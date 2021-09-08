<template>
    <div class="w-100">
        <b-modal :id="id" :title="title" hide-footer centered>
            <b-form @submit="submit">
            <b-form-input
                v-model="form.platformName"
                type="text"
                placeholder="Platform Name"
                class="mb-3"
                required
            ></b-form-input>
            <b-form-input
                v-model="form.optionName"
                type="text"
                placeholder="Option Name"
                class="mb-3"
                :required="!values"
                :disabled="!!values"
            ></b-form-input>
            <b-form-input
                v-model="form.optionValue"
                type="text"
                placeholder="Option Value"
                class="mb-3"
                required
            ></b-form-input>
            <b-form-input
                v-model="form.dotDigitalId"
                type="number"
                min="1"
                placeholder="Dot Digital Id"
                class="mb-4"
                :required="!values"
                :disabled="!!values"
            ></b-form-input>

            <b-button size="sm" variant="primary" type="submit">
                Save
            </b-button>
            <b-button size="sm" @click="onCancel()" class="ml-2">
                Cancel
            </b-button>
            </b-form>
        </b-modal>
  </div>
</template>

<script>
const initialForm = {
  platformName: '',
  optionName: '',
  optionValue: '',
  dotDigitalId: 1
}
export default {
  name: 'CreateOptionModal',
  props: {
    id: String,
    title: String,
    values: Object
  },
  data() {
    return {
      form: {
        ...initialForm
      }
    }
  },
  watch: {
    values: {
      handler(value) {
        if (value) {
          this.form = {}
          // merge edit values with initial values
          Object.keys(initialForm).map(key => {
            this.form[key] = value[key] || initialForm[key]
          })
        }
      },
      deep: true
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      this.$emit('ok', {...this.form})
      this.form = {...initialForm}
      this.$root.$emit('bv::hide::modal', this.id, '')
    },
    onCancel() {
      this.form = {...initialForm}
      this.$emit('close')
      this.$root.$emit('bv::hide::modal', this.id, '')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
