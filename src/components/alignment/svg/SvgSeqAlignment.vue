<template>
  <div id="seq-alignment">
    <svg :width="widthSvg" :height="heightSvg">
      <svg-track
        v-for="(track, index) in tracks"
        :key="'track-' + index"
        :length="maxLengthExtractSeqs"
        :y="trackY[index]"
        :fct-scale-x="coordX"
        :track="track"
        :text-font-size="labelTextFontSize"
        :start="start"
      ></svg-track>

      <svg-scale-bar
        :length="maxLengthExtractSeqs"
        :y="trackY[metadataTrackNumber]"
        :fct-scale-x="coordX"
        :start="start"
      ></svg-scale-bar>

      <!-- <template v-for="(s, seqIndex) in displayedSeqs"> -->
      <template v-for="(s, seqIndex) in extractSeqs">
        <!-- Name of the sequence -->
        <svg-sequence-name-field
          :key="seqIndex"
          :y="coordY[seqIndex]"
          :text-font-size="labelTextFontSize"
          :name="displayName(s)"
          :offset-x="offsetX"
          :is-clickable="s.isNode"
          @click="selectNode(s)"
        ></svg-sequence-name-field>

        <!-- CASE 1 : color of each nt is automotically computed -->
        <template v-if="!unsteady">
          <svg-poly-color-sequence
            :key="'rect' + seqIndex"
            :sequence="s"
            :a-x="coordX"
            :y="coordY[seqIndex]"
            :height="seqTrackHeight"
            :text-font-size="seqTextFontSize"
            :coloring="coloring"
            :seqName="s.name"
            :is-selected="isSelected(s.id)"
            :start="start"
            @click="showSeqDialog(seqIndex)"
          ></svg-poly-color-sequence>
        </template>
        <!-- CASE 2 : only one color by sequence -->
        <template v-else>
          <svg-mono-color-sequence
            :key="'rect' + seqIndex"
            :sequence="s"
            :a-x="coordX"
            :y="coordY[seqIndex]"
            :height="seqTrackHeight"
            :width="aligmentWidth"
            :unsteady="unsteady"
            :text-font-size="seqTextFontSize"
          ></svg-mono-color-sequence>
        </template>
      </template>
    </svg>

    <seq-dialog
      v-if="displaySeqDialog"
      :seqs="displayDialogSequences"
      @close="displaySeqDialog = false"
    ></seq-dialog>
  </div>
</template>

<script>
import * as d3 from 'd3-scale';
import SvgScaleBar from '@/components/alignment/svg/SvgScaleBar.vue';
import SvgTrack from '@/components/alignment/svg/SvgTrack.vue';
import SvgMonoColorSequence from '@/components/alignment/svg/SvgMonoColorSequence.vue';
import SvgPolyColorSequence from '@/components/alignment/svg/SvgPolyColorSequence.vue';
import SvgSequenceNameField from '@/components/alignment/svg/SvgSequenceNameField.vue';
import SeqDialog from '@/components/generic/SeqDialog.vue';

export default {
  name: 'AlignmentGraphic',
  components: {
    SvgTrack,
    SvgScaleBar,
    SvgMonoColorSequence,
    SvgPolyColorSequence,
    SvgSequenceNameField,
    SeqDialog,
  },
  props: {
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 10000000,
    },
    seqs: {
      type: Array,
      default: function() {
        return [];
      },
    },
    tracks: {
      type: Array,
      default: function() {
        return [];
      },
    },
    selectedseqs: {
      type: Array,
      default: function() {
        return [];
      },
    },
    coloring: { type: String, default: 'no' },
    // if 'unsteady' is activated, the sequence is display in one text element
    // the display time is very short but the nt are not perfectly align with scalebar
    unsteady: { type: Boolean, default: false },
  },
  data() {
    return {
      letterWidth: 10,
      seqTrackHeight: 15,
      metadataTrackHeight: 15,
      offsetX: 200,
      labelTextFontSize: 12,
      lastDisplayedSeqIndex: 35,
      displaySeqDialog: false,
      displayDialogSequences: null,
      isLoading: false,
    };
  },
  computed: {
    extractSeqs() {
      return this.seqs.map(s => {
        return this.extractSeq(s);
      });
    },
    maxLengthExtractSeqs() {
      return Math.max(...this.extractSeqs.map(s => s.seq.length));
    },

    metadataTrackNumber() {
      return this.tracks.length;
    },
    /**
     * Text font size computed according to the height of the sequence tracks.
     */
    seqTextFontSize() {
      return this.seqTrackHeight - 2;
    },
    /**
     * Return the bigger size of all the displayed sequences.
     * @return {number} the bigger size of all the displayed sequences.
     */
    seqLengthMax() {
      let maxlen = 0;
      this.seqs.forEach(seq => {
        if (maxlen < seq.seq.length) {
          maxlen = seq.seq.length;
        }
      });
      return maxlen;
    },

    aligmentWidth() {
      return this.letterWidth * this.maxLengthExtractSeqs;
    },
    /**
     * Return the width of the SVG of the alignment.
     * @return {number} the width of the SVG of the alignment.
     */
    widthSvg() {
      return this.offsetX + this.aligmentWidth;
    },
    metadataTrackGlobalHeight() {
      return (this.tracks.length + 2) * this.metadataTrackHeight;
    },
    /**
     * Return the height of the SVG of the alignment.
     * @return {number} the height of the SVG of the alignment.
     */
    heightSvg() {
      return (this.displayedSeqs.length + 1) * this.seqTrackHeight + this.metadataTrackGlobalHeight;
    },

    /**
     * Return an array of the coordinate 'x' values
     * coordX[10] is the X coordinate of the text of the 10th letter of a seq.
     * @return {number}  an array of the coordinate 'x' values.
     */
    coordX() {
      var x = d3
        .scaleLinear()
        .domain([0, this.maxLengthExtractSeqs])
        .range([this.offsetX, this.widthSvg]);

      return x;
    },
    /**
     * Return an array of the coordinate 'y' values
     * coordY[10] is the Y coordinate of the 10th sequence.
     * @return {number}  an array of the coordinate 'y' values.
     */
    coordY() {
      return this.seqs.map(
        (s, index) => this.metadataTrackGlobalHeight + (index + 1) * this.seqTrackHeight
      );
    },
    /**
     * Return an array of the coordinate 'y' values
     * of the metadat tracks
     * @return {number}  an array of the coordinate 'y' values.
     */
    trackY() {
      var metadataTrackY = [];
      for (var i = 0; i <= this.tracks.length; i++) {
        metadataTrackY.push(this.metadataTrackHeight * (i + 1));
      }
      return metadataTrackY;
    },

    /* return an array of the sequences to display */
    /* todo: corriger pour que le scroll fonctionne a nouveau!! */
    displayedSeqs() {
      return this.seqs; // this.currentseqs.slice(0, this.lastDisplayedSeqIndex);
    },
  },
  mounted() {
    //this.scroll();
    this.isLoading = true;
  },
  methods: {
    extractSeq(s) {
      let extractSeq = Object.assign({}, s);
      let lengthSeq = s.seq.length;
      let start = this.start >= 0 ? this.start : 0;
      // just to deal with the last position
      if (start > lengthSeq) {
        start = lengthSeq - 1;
      }
      let end = this.end >= 0 && this.end < lengthSeq ? this.end : lengthSeq - 1;
      let length = end - start + 1;

      extractSeq.seq = s.seq.substr(start, length);
      return extractSeq;
    },
    selectNode(s) {
      if (s.isConsensus && s.isNode) {
        this.$emit('select-node', [s.id]);
      }
    },
    isSelected(id) {
      if (this.selectedseqs.find(i => i === id)) {
        return true;
      }
      return false;
    },
    showSeqDialog(seqIndex) {
      this.displayDialogSequences = [this.seqs[seqIndex]];
      this.displaySeqDialog = true;
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        let roundBottomOfWindow =
          Math.round(document.documentElement.scrollTop + window.innerHeight) ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow || roundBottomOfWindow) {
          this.lastDisplayedSeqIndex += 5;
        }
      };
    },
    displayName(s) {
      if (s.isNode) {
        return '+' + s.name;
      } else {
        return '' + s.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#seq-alignment {
  margin: 3px;
  padding: 10px;
  border: thin solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  color: black;
  overflow-x: scroll;
}
</style>
