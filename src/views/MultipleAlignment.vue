<template>
  <section>
    <!-- <v-progress-circular indeterminate color="primary" :v-if="isLoaded"></v-progress-circular> -->
    <section v-if="errored">
      <p>
        Enable to load json file. Please make sure the json file is well formatted.
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <component
          :is="alignmentComponent"
          :width="width"
          :height="height"
          :seqs="seqs"
        ></component>
      </div>
    </section>
  </section>
</template>

<script>
import AlignmentGraphic from '@/components/AlignmentGraphic.vue';
import AlignmentGraphicCanvas from '@/components/AlignmentGraphicCanvas.vue';
import axios from 'axios';

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
      alignmentComponent: 'alignment-graphic',
      alignments: {},
      errored: false,
      loading: true
    };
  },
  mounted() {
    //const fileName = 'alignmentTest1.json';
    const fileName = 'alignmentTest75coloredseq.json';
  //const fileName = '1000seq.json';
    //this.$store.dispatch('uploadJsonAlignment', '1000seq.json');
    //this.$store.dispatch('uploadJsonAlignment', 'alignmentTest1.json');
    //    this.$store.dispatch('uploadJsonAlignment', 'alignmentTest1NoColor.json');
    //this.$store.dispatch('uploadJsonAlignment', 'alignmentTest75seq.json');
    //this.$store.dispatch('uploadJsonAlignment', 'alignmentTest75coloredseq.json');
    console.log("JSON read START")
    axios
      .get(fileName)
      .then(resp => {
        this.alignments = resp.data.alignment;
      })
      .catch(error => {
        console.log('impossible to read ' + filename + ' json file.');
        this.errored = true;
      })
      .finally(() => {
        console.log("JSON read END")
        this.loading = false;
      });
  },
  created() {
    //this.$store.dispatch('uploadJsonAlignment', '1000seq.json');
    //this.$store.dispatch('uploadJsonAlignment', 'alignmentTest1.json');
    //    this.$store.dispatch('uploadJsonAlignment', 'alignmentTest1NoColor.json');
    //this.$store.dispatch('uploadJsonAlignment', 'alignmentTest75seq.json');
    //this.$store.dispatch('uploadJsonAlignment', 'alignmentTest75coloredseq.json');
  },
  computed: {
    /**
     * Return all the sequence that are aligned
     * @return {array} all the sequences that are aligned.
     */
    seqs() {
      //let a_seq1 = this.$store.getters.getDataAlignment;

      //let a_seqs = this.$store.getters.getDataAlignment.filter(x => x.groupID === '1');
      let a_seqs = this.alignments.filter(x => x.groupID === '1');
      for (let x in a_seqs) {
        a_seqs[x].seqSplit = a_seqs[x].seq.split('');
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
 
