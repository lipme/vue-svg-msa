<template>
  <section>
    <!-- <v-progress-circular indeterminate color="primary"
     :v-if="isLoaded"></v-progress-circular> -->
    <section v-if="errored">
      <p>
        Enable to load json file. Please make sure the json file is well formatted.
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <v-btn @click="alignmentComponent = 'svg-alignment-graphic'">SVG</v-btn>
        <v-btn @click="alignmentComponent = 'canvas-alignment-graphic'">Canvas</v-btn>

        <v-btn @click="LoadNewFile('alignmentTest1\.json')">Basic Test</v-btn>
        <v-btn @click="LoadNewFile('alignmentTest75coloredseq\.json')">75 sequences</v-btn>
        <v-btn @click="LoadNewFile('1000seq\.json')">1000 sequences</v-btn>
        <h3>{{ alignmentComponent }}</h3>
        <component
          :is="alignmentComponent"
          :width="width"
          :height="height"
          :seqs="seqs"
        ></component>

        <svg-global-alignment-graphic
          :width="width"
          :height="height"
          :seqs="seqs"
        ></svg-global-alignment-graphic>
      </div>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import SvgAlignmentGraphic from '@/components/svg/SvgAlignmentGraphic.vue';
import CanvasAlignmentGraphic from '@/components/canvas/CanvasAlignmentGraphic.vue';
import SvgGlobalAlignmentGraphic from '@/components/svg/SvgGlobalAlignmentGraphic.vue';

export default {
  name: 'MultipleAlignment',
  components: {
    SvgAlignmentGraphic,
    SvgGlobalAlignmentGraphic,
    CanvasAlignmentGraphic
  },
  props: {
    width: { type: Number },
    height: { type: Number }
  },
  data() {
    return {
      // alignmentComponent: 'canvas-alignment-graphic', // 'svg-alignement-graphic'
      alignmentComponent: 'svg-alignment-graphic', // 'svg-alignement-graphic'
      alignments: {},
      errored: false,
      loading: true,
      fileName: 'alignmentTest1.json'
    };
  },
  mounted() {
    // const fileName = 'alignmentTest1.json';
    // const fileName = 'alignmentTest75coloredseq.json';
    // const fileName = '1000seq.json';
    // this.$store.dispatch('uploadJsonAlignment', '1000seq.json');

    this.LoadFile();
  },
  created() {},
  computed: {
    /**
     * Return all the sequence that are aligned
     * @return {array} all the sequences that are aligned.
     */
    seqs() {
      // let aSeqs = this.$store.getters.getDataAlignment.filter(x => x.groupID === '1');
      const aSeqs = this.alignments.filter(x => x.groupID === '1');
      return aSeqs;
    }
  },
  methods: {
    LoadFile() {
      this.loading = true;
      axios
        .get(this.fileName)
        .then(resp => {
          this.alignments = resp.data.alignment;
        })
        .catch(error => {
          console.log(`impossible to read ${this.fileName} json file.${error}`);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    LoadNewFile(f) {
      // console.log("Load new file")
      this.fileName = f;
      this.LoadFile();
    }
  }
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
