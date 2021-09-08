import {API_KEY, BACKEND_API_URL} from '../../constants/default'
import axios from 'axios'
import { getHeaders } from '../../utils'

const state = () => ({
  googleAccounts: []
})

const getters = {
  getGoogleAccounts (state) {
    return state.googleAccounts
  }
}

const actions = {
  setAccounts (context, payload) {
    context.commit('SET_ACCOUNTS', payload)
  },
  fetchGoogleAccounts ({ commit }) {
    const url = `${BACKEND_API_URL}/Accounts/Google?apiKey=${API_KEY}`
    axios
      .get(url, {
        headers: getHeaders()
      })
      .then(res => {
        if (res.data && res.data?.data) {
          commit('SET_ACCOUNTS', res.data.data)
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

const mutations = {
  SET_ACCOUNTS (state, payload) {
    state.googleAccounts = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
