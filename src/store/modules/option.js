import {API_KEY, BACKEND_API_URL} from '../../constants/default'
import axios from 'axios'
import { getHeaders } from '../../utils'

const state = () => ({
  options: [],
  googleAccountOptions: []
})

const getters = {
  getOptions (state) {
    return state.options
  },
  getGoogleAccountOptions (state) {
    return state.googleAccountOptions
  }
}

const actions = {
  setOptions (context, payload) {
    context.commit('SET_OPTIONS', payload)
  },
  setGoogleAccountOptions (context, payload) {
    context.commit('SET_GOOGLE_ACCOUNT_OPTIONS', payload)
  },
  fetchOptions ({ commit }) {
    const url = `${BACKEND_API_URL}/Options?apiKey=${API_KEY}`
    axios
      .get(url, {
        headers: getHeaders()
      })
      .then(res => {
        if (res.data && res.data?.data) {
          commit('SET_OPTIONS', res.data.data)
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  fetchGoogleAccountOptions ({ commit }, payload) {
    const url = `${BACKEND_API_URL}/Options/${payload}?apiKey=${API_KEY}`
    axios
      .get(url, {
        headers: getHeaders()
      })
      .then(res => {
        if (res.data && res.data?.data) {
          commit('SET_GOOGLE_ACCOUNT_OPTIONS', res.data.data)
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  createGoogleAccountOptions ({commit}, payload) {
    const data = {
      googleId: payload.googleId,
      dotDigitalId: payload.dotDigitalId,
      optionName: payload.optionName,
      optionValue: payload.optionValue,
      platformName: payload.platformName,
    }
    const url = `${BACKEND_API_URL}/Options?apiKey=${API_KEY}`
    axios
      .post(url, data, {
        headers: getHeaders()
      })
      .then(res => {
        if (res.data && res.data?.data) {
          commit('APPEND_GOOGLE_ACCOUNT_OPTIONS', res.data.data)
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  updateGoogleAccountOption ({commit}, payload) {
    const { index, data } = payload
    const updatedData = {
      googleId: data.googleId,
      optionValue: data.optionValue,
      platformName: data.platformName,
    }
    const url = `${BACKEND_API_URL}/Options/${data.rooftopGoogleOptionId}?apiKey=${API_KEY}`
    axios
      .patch(url, updatedData, {
        headers: getHeaders()
      })
      .then(res => {
        if (res.data && res.data?.data) {
          commit('UPDATE_GOOGLE_ACCOUNT_OPTIONS', { index, data: res.data.data })
        }
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  deleteGoogleAccountOption ({commit}, payload) {
    const { index, id } = payload
    const url = `${BACKEND_API_URL}/Options/${id}?apiKey=${API_KEY}`
    axios
      .delete(url, {
        headers: getHeaders()
      })
      .then(() => {
        commit('DELETE_GOOGLE_ACCOUNT_OPTIONS', index)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

const mutations = {
  SET_OPTIONS (state, payload) {
    state.options = payload
  },
  SET_GOOGLE_ACCOUNT_OPTIONS (state, payload) {
    state.googleAccountOptions = payload
  },
  APPEND_GOOGLE_ACCOUNT_OPTIONS (state, payload) {
    state.googleAccountOptions = [...state.googleAccountOptions, payload]
  },
  UPDATE_GOOGLE_ACCOUNT_OPTIONS (state, payload) {
    const options = [...state.googleAccountOptions]
    options[payload.index] = payload.data
    state.googleAccountOptions = options
  },
  DELETE_GOOGLE_ACCOUNT_OPTIONS (state, payload) {
    const options = state.googleAccountOptions.filter((item, index) => index !== payload)
    state.googleAccountOptions = options
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
