<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-button size="sm" class="mb-3 mr-2" variant="primary">
          <b-icon icon="arrow-up" aria-hidden="true"></b-icon>
        </b-button>
        <h4>OPTIONS UPDATER</h4>
      </b-row>
      <b-row>
        <GoogleOptions />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import GoogleOptions from './components/GoogleOptions.vue'

export default {
  name: 'App',
  components: {
    GoogleOptions
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
