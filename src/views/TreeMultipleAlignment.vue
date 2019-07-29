<template>
  <section>
    <section v-if="errored">
      <p>
        Enable to load json file. Please make sure the json file is well formatted.
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <svg-tree-alignment-graphic :track="track" :tree="tree"></svg-tree-alignment-graphic>
      </div>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import SvgTreeAlignmentGraphic from '@/components/svg/SvgTreeAlignmentGraphic.vue';

export default {
  name: 'TreeMultipleAlignment',
  components: {
    SvgTreeAlignmentGraphic
  },
  props: {
    width: { type: Number },
    height: { type: Number }
  },
  data() {
    return {
      errored: false,
      loading: true,
      jsonFileName: 'isc-20190725-37geno.pc80.ATLAS.fa.Chr01g0000001.json',
      trackFileName: 'exonTrack.json',
      tree: {},
      track: {}
    };
  },
  mounted() {
    this.LoadJsonTreeFile();
    this.LoadJsonTrackFile();
  },
  created() {},
  methods: {
    LoadJsonTreeFile() {
      axios
        .get(this.jsonFileName)
        .then(resp => {
          this.tree = resp.data;
        })
        .catch(error => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    LoadJsonTrackFile() {
      axios
      .get(this.trackFileName)
        .then(resp => {
          this.track = resp.data;
        })
        .catch(error => {
          console.log("Error during track loading of " + this.trackFileName)
        })
        .finally(() => {
        });
    }
  }
};
</script>
