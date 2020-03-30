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
        :text-font-size="seqTextFontSize"
        :start="start"
      />

      <svg-scale-bar
        :length="maxLengthExtractSeqs"
        :y="trackY[metadataTrackNumber]"
        :fct-scale-x="coordX"
        :start="start"
      />
      <template v-for="(s, seqIndex) in extractSeqs">
        <!-- Name of the sequence -->
        <svg-sequence-name-field
          :key="seqIndex"
          :y="coordY[seqIndex]"
          :text-font-size="seqTextFontSize"
          :name="displayName(s)"
          :offset-x="offsetX"
          :is-clickable="s.isNode"
          @click="selectNode(s)"
        />
        <svg-poly-color-sequence
          :key="'rect' + seqIndex"
          :sequence="s"
          :a-x="coordX"
          :y="coordY[seqIndex]"
          :height="trackHeight"
          :text-font-size="seqTextFontSize"
          :coloring="coloring"
          :seqName="s.name"
          :is-selected="isSelected(s.id)"
          :start="start"
          @click="showSeqDialog(seqIndex)"
        />
      </template>
    </svg>
    <sequence-modal
      v-if="displaySeqDialog"
      :seqs="displayDialogSequences"
      @close="displaySeqDialog = false"
    ></sequence-modal>
  </div>
</template>

<script>
import * as d3 from 'd3-scale';
import SvgScaleBar from '@/components/SvgMsa/SvgScaleBar.vue';
import SvgTrack from '@/components/SvgMsa/SvgTrack.vue';
import SvgPolyColorSequence from '@/components/SvgMsa/SvgPolyColorSequence.vue';
import SvgSequenceNameField from '@/components/SvgMsa/SvgSequenceNameField.vue';
import SequenceModal from '@/components/SvgMsa/SequenceModal.vue';

export default {
  /*
  When the use click to the name of a sequence, emit the event 'select-node'
  whose value is equals to id */

  name: 'SvgMsa',
  components: {
    SvgTrack,
    SvgScaleBar,
    SvgPolyColorSequence,
    SvgSequenceNameField,
    SequenceModal
  },
  props: {
    /**
     * Array of object sequence. Allowed attributes:
     * mandatory: seq
     * optional: id, name, isConsensus, isNode
     */
    seqs: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * Use to display only subsequences, from start (0-based) to end.
     * If end === -1, display until the end of the sequence.
     */
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      default: -1
    },
    /**
     * Array of object track
     */
    tracks: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * Array of id, of the sequences to display as selected
     */
    selectedseqs: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * String to change the coloration
     * Allowed values:  'no', 'metadata', 'seqcolor', 'auto'
     */
    coloring: { type: String, default: 'no' }
  },
  data() {
    return {
      letterWidth: 10,
      trackHeight: 15,
      offsetX: 200,
      displaySeqDialog: false,
      displayDialogSequences: [],
      isLoading: false
    };
  },
  computed: {
    extractSeqs() {
      return this.seqs.map(s => this.extractSeq(s));
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
      return this.trackHeight - 2;
    },
    /**
     * Return the bigger size of all the displayed sequences.
     * @return {number} the bigger size of all the displayed sequences.
     */
    seqLengthMax() {
      let maxlen = 0;
      this.seqs.forEach(s => {
        if (maxlen < s.seq.length) {
          maxlen = s.seq.length;
        }
      });
      return maxlen;
    },
    /**
     *@return alignment width
     */
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
      return (this.tracks.length + 2) * this.trackHeight;
    },
    /**
     * Return the height of the SVG of the alignment.
     * @return {number} the height of the SVG of the alignment.
     */
    heightSvg() {
      return (this.seqs.length + 1) * this.trackHeight + this.metadataTrackGlobalHeight;
    },

    /**
     * Return an array of the coordinate 'x' values
     * coordX[10] is the X coordinate of the text of the 10th letter of a seq.
     * @return {number}  an array of the coordinate 'x' values.
     */
    coordX() {
      const x = d3
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
        (s, index) => this.metadataTrackGlobalHeight + (index + 1) * this.trackHeight
      );
    },
    /**
     * Return an array of the coordinate 'y' values
     * of the metadat tracks
     * @return {number}  an array of the coordinate 'y' values.
     */
    trackY() {
      const metadataTrackY = [];
      for (let i = 0; i <= this.tracks.length; i += 1) {
        metadataTrackY.push(this.trackHeight * (i + 1));
      }
      return metadataTrackY;
    }
  },
  mounted() {
    this.isLoading = true;
  },
  methods: {
    /**
     * Extract the sequence to display: subseq from start to end
     * @return {Object}
     */
    extractSeq(s) {
      const extractSeq = Object.assign({}, s);
      const lengthSeq = s.seq.length;
      let start = this.start >= 0 ? this.start : 0;
      // just to deal with the last position
      if (start > lengthSeq) {
        start = lengthSeq - 1;
      }
      const end = this.end >= 0 && this.end < lengthSeq ? this.end : lengthSeq - 1;
      const length = end - start + 1;

      extractSeq.seq = s.seq.substr(start, length);
      return extractSeq;
    },
    /**
     * Emit the event 'select-node' with the value= id of the sequence
     * Action only available if the obehect ahs the attribute isConsensus or
     * isNode === true
     */
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
    displayName(s) {
      if (s.isNode) {
        return `+${s.name}`;
      }
      return `${s.name}`;
    }
  }
};
</script>

<style scoped>
#seq-alignment {
  margin: 3px;
  padding: 10px;
  border: thin solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  color: black;
  overflow-x: scroll;
}
</style>
