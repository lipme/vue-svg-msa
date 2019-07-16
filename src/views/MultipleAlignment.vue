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
        <v-layout row wrap>
          <v-flex xs2>
            <v-btn @click="alignmentComponent = 'global'">GLOBAL view</v-btn>
            <v-divider></v-divider>
            <v-btn @click="alignmentComponent = 'svg-alignment-graphic-unsteady'"
              >SVG unsteady</v-btn
            >
            <v-btn @click="alignmentComponent = 'svg-alignment-graphic'">SVG</v-btn>
            <v-btn @click="alignmentComponent = 'canvas-alignment-graphic'">Canvas</v-btn>
            <v-divider></v-divider>
            <v-btn @click="LoadNewFile('1016-ANN-2192-HanXRQr2_Chr17g0798961-A2-A3\.76seq\.json')"
              >75 seq</v-btn
            >
            <v-btn @click="LoadNewFile('1016-ANN-2192-HanXRQr2_Chr17g0798961-A2-A3\.json')"
              >1000 seq</v-btn
            >
            <v-btn @click="LoadNewFile('alignmentTest1\.json')">10 seq (AA)</v-btn>
            <v-btn @click="LoadNewFile('alignmentTest75coloredseq\.json')">75 seq (AA)</v-btn>
            <v-btn @click="LoadNewFile('1000seq\.json')">1000 seq (AA)</v-btn>
            <v-divider></v-divider>

            <h3>{{ fileName }} displayed with {{ alignmentComponent }}</h3>
          </v-flex>

          <v-flex x10>
            <svg-alignment-graphic
              v-if="alignmentComponent === 'svg-alignment-graphic-unsteady'"
              :width="width"
              :height="height"
              :seqs="seqs"
              :unsteady="true"
            ></svg-alignment-graphic>
            <svg-alignment-graphic
              v-else-if="alignmentComponent === 'svg-alignment-graphic'"
              :width="width"
              :height="height"
              :seqs="seqs"
            ></svg-alignment-graphic>
            <canvas-alignment-graphic
              v-else-if="alignmentComponent === 'canvas-alignment-graphic'"
              :width="width"
              :height="height"
              :seqs="seqs"
            >
            </canvas-alignment-graphic>
            <svg-global-alignment-graphic
              v-else-if="alignmentComponent === 'global'"
              :width="width"
              :height="height"
              :seqs="seqs"
            ></svg-global-alignment-graphic>
          </v-flex>
        </v-layout>
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
      alignmentComponent: 'global', // 'svg-alignment-graphic-unsteady', // 'svg-alignement-graphic'
      alignments: {},
      errored: false,
      loading: true,
      fileName: '1016-ANN-2192-HanXRQr2_Chr17g0798961-A2-A3.76seq.json',
    };
  },
  mounted() {
    this.LoadFile();
  },
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
    },
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
