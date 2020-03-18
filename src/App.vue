<template>
  <div id="app">
    <svg-seq-alignment
      :start="start"
      :end="end"
      :seqs="seqs"
      :tracks="tracks"
      :coloring="coloring"
      unsteady="true"
      v-on="$listeners"
    ></svg-seq-alignment>
  </div>
</template>

<script>
import SvgSeqAlignment from './components/alignment/svg/SvgSeqAlignment.vue';

export default {
  name: 'App',
  components: {
    SvgSeqAlignment
  },
  data() {
    return {
      start: 1,
      end: 30,
      seqs: [
        {
          seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCAT',
          id: 'seqid1',
          name: 'seq1'
        },
        { seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCAT', id: 'seqid2', name: 'seq2' }
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
