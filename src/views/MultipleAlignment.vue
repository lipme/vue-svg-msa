<template>
  <div>
    <!-- <v-progress-circular indeterminate color="primary" :v-if="isLoaded"></v-progress-circular> -->
    <component :is="alignmentComponent" :width="width" :height="height" :seqs="seqs"></component>
  </div>
</template>

<script>
import AlignmentGraphic from '@/components/AlignmentGraphic.vue';
import AlignmentGraphicCanvas from '@/components/AlignmentGraphicCanvas.vue';
//import axios from 'axios';

export default {
  name: 'MultipleAlignment',
  components: {
    AlignmentGraphic,
    AlignmentGraphicCanvas
  },
  props: {
    width: { type: Number },
    height: { type: Number }
  },
  data() {
    return {
      alignmentComponent: 'alignment-graphic' // 'alignment-graphic-canvas',
    };
  },
  created() {
    this.$store.dispatch('uploadJsonAlignment', 'alignmentTest1.json');
    //this.$store.dispatch('uploadJsonAlignment', 'alignmentTest75seq.json');
  },
  computed: {
    /**
     * Return all the sequence that are aligned
     * @return {array} all the sequences that are aligned.
     */
    seqs() {
      //let a_seq1 = this.$store.getters.getDataAlignment;

      let a_seqs = this.$store.getters.getDataAlignment.filter(x => x.domainID === '1');
      for (let x in a_seqs) {
        let i = 0;
        a_seqs[x].seqSplit = a_seqs[x].seq.split('')
        a_seqs[x].selected = true;
      }
      return a_seqs;
    }
  },
  methods: {}
};
</script> 

<style scoped>
h4 {
  margin: 10px 0 10px 10px;
  min-width: 300px;
}
#text {
  margin: 10px;
  padding: 10px;
  border: thin solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
}
#top {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
 
