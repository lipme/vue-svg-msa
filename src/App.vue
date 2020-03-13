<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
     <svg-seq-alignment
      :start="rangeSlider[0]"
      :end="rangeSlider[1]"
      :seqs="seqs"
      :tracks="tracks"
      :selectedseqs="selectedSeqs"
      :coloring="coloring"
      v-on="$listeners"
    ></svg-seq-alignment>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SvgSeqAlignment from './components/alignment/svg/SvgSeqAlignment.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    SvgSeqAlignment,
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
  margin-top: 60px;
}
</style>
