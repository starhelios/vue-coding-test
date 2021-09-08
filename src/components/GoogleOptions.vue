<template>
  <div class="w-100">
    <b-card>
      <b-row>
        <b-col>
          <b-form-select v-model="selectedGoogleId" :options="accounts" size="sm" />
        </b-col>
        <b-col>
          <b-button :disabled=" !selectedGoogleId" variant="primary" size="sm" class="px-5" @click="showCreateModal">
            Add Option
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="mt-4">
      <b-row>
        <b-col sm="12" align="left">
          <h5>OPTIONS</h5>
          <b-table
            hover
            small
            head-variant="light"
            :items="items"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
          >
            <template #cell(actions)="row">
              <b-button variant="primary" size="sm" @click="showEditModal(row.item, row.index)" class="mr-1">
                Edit
              </b-button>
              <b-button variant="primary" size="sm" @click="deleteOption(row.item, row.index)" class="mr-1">
                Delete
              </b-button>
            </template>
          </b-table>

          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            v-if="items && items.length > perPage"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-card>
    <CreateOptionModal id="create-modal" title="Create Option" @ok="createOption"/>
    <CreateOptionModal id="edit-modal" title="Edit Option" :values="editItem" @ok="updateOption"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import CreateOptionModal from "./CreateOptionModal";

export default {
  name: 'GoogleOptions',
  components: {
    CreateOptionModal
  },
  props: {
    msg: String
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      selectedGoogleId: null,
      editItem: null,
      editIndex: null,
      fields: [
        { key: 'platformName', label: 'Option Platform', sortable: false, sortDirection: 'desc' },
        { key: 'optionName', label: 'Option Name', sortable: false, class: 'text-left' },
        { key: 'optionValue', label: 'Option Value', sortable: false, class: 'text-left' },
        { key: 'dotDigitalId', label: 'DOT Digital ID', sortable: false, class: 'text-left' },
        { key: 'actions', label: '' }
      ],
    }
  },
  computed: {
    ...mapGetters({
      googleAccounts: 'getGoogleAccounts',
      options: 'getGoogleAccountOptions'
    }),
    items () {
      return this.options.map(item => ({
        rooftopGoogleOptionId: item.rooftopGoogleOptionId,
        optionName: item.optionName,
        optionValue: item.optionValue,
        platformName: item.platformName,
        dotDigitalId: item.dotDigitalId,
      }))
    },
    accounts () {
      return [
        { value: null, text: 'Select Google Account' },
        ...this.googleAccounts.map(item => ({
        text: item.viewName,
        value: item.googleId,
      }))]
    },
    rows() {
      return this.items.length
    }
  },
  created() {
    this.$store.dispatch('fetchGoogleAccounts')
  },
  watch: {
    selectedGoogleId (value) {
      if (value) {
        this.currentPage = 1
        this.$store.dispatch('fetchGoogleAccountOptions', value)
      } else {
        this.$store.dispatch('setGoogleAccountOptions', [])
      }
    }
  },
  methods: {
    showCreateModal() {
      this.$bvModal.show('create-modal')
    },
    showEditModal(item, index) {
      this.editItem = item
      this.editIndex = index
      this.$bvModal.show('edit-modal')
    },
    createOption(values) {
      const payload = {
        ...values,
        googleId: this.selectedGoogleId
      }
      this.$store.dispatch('createGoogleAccountOptions', payload)
    },
    updateOption(values) {
      const payload = {
        ...values,
        googleId: this.selectedGoogleId,
        rooftopGoogleOptionId: this.editItem.rooftopGoogleOptionId
      }
      this.$store.dispatch('updateGoogleAccountOption', { index: this.editIndex, data: payload })
    },
    deleteOption(item, index) {
      this.$bvModal.msgBoxConfirm(`Please confirm you want to delete option "${item.optionName}"`, {
        title: 'Delete option',
        size: 'md',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Delete',
        cancelTitle: 'Cancel',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            this.$store.dispatch('deleteGoogleAccountOption', { index, id: item.rooftopGoogleOptionId })
          }
        })
        .catch(err => {
          console.log('Error', err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
