<template>
  <div id="app">
    <svg-msa :seqs="seqs2"></svg-msa>
    <svg-msa
      :start="start"
      :end="end"
      :seqs="seqs"
      :tracks="tracks"
      :coloring="coloring"
      unsteady="true"
      v-on="$listeners"
    ></svg-msa>
  </div>
</template>

<script>
import SvgMsa from './components/SvgMsa/SvgMsa.vue';

export default {
  name: 'App',
  components: {
    SvgMsa
  },
  data() {
    return {
      start: 10,
      end: 20,
      seqs: [
        {
          seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCATATACTCATTTTTACATCATC-AT',
          id: 'seqid1',
          name: 'seq1'
        },
        {
          seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCATATACTCATTTTTACATCATCATC',
          id: 'seqid2',
          name: 'seq2'
        }
      ],
      seqs2: [
        {
          seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCATATACTCATTTTTACATCATC-AT'
        },
        {
          seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCATATACTCATTTTTACATCATCATC'
        }
      ],
      tracks: [],
      coloring: 'auto'
    };
  }
};
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
