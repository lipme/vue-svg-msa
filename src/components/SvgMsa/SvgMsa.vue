<template>
  <div class="seq-alignment">
    <svg :width="widthSvg" :height="heightSvg">
      <svg-track
        v-for="(track, index) in regionTracks"
        :key="'track-' + index"
        :length="maxLengthExtractSeqs"
        :y="trackY[index]"
        :fct-scale-x="coordX"
        :track="track"
        :text-font-size="seqTextFontSize"
      />

      <svg-scale-bar
        :length="maxLengthExtractSeqs"
        :y="trackY[metadataTrackNumber]"
        :fct-scale-x="coordX"
        :start="zerobasedStart"
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
          :metadatas="metadatas"
          :is-selected="isSelected(s.id)"
          :selection-mode="selectionMode"
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
     * Use to display only subsequences, from start (1-based) to end.
     * If end === -1, display until the end of the sequence.
     */
    start: {
      type: Number,
      default: 1
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
     * metadatas: array of metadata definitions
     */
    metadatas: {
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
    zerobasedStart() {
      return this.start >= 1 ? this.start - 1 : 0;
    },
    onebasedEnd() {
      return this.end >= 1 && this.end <= this.maxLengthSeqs ? this.end : this.maxLengthSeqs;
    },
    /**
     * get a list of seq object with transformed coordinates
     * according to start and end values.
     */
    extractSeqs() {
      return this.seqs.map(s => this.extractSeq(s));
    },
    /**
     * Return the max length of all the sequences.
     */
    maxLengthSeqs() {
      return Math.max(...this.seqs.map(s => s.seq.length));
    },
    /**
     * Return the max length of the displayed sequences.
     */
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
    },
    /**
     * return true if a sequence is selected
     * in that case the display opacuty would change
     */
    selectionMode() {
      return this.selectedseqs.length > 0;
    },
    /**
     * return an array of tracks with the transformed coordinate
     */
    regionTracks() {
      let regTracks = this.tracks;
      regTracks.forEach(t => {
        t.features.forEach(f => {
          if ('positions' in f) {
            f.positions = f.positions
              .map(p => {
                return this.transformPos(p);
              })
              .filter(p => p != null);
          }
        });
      });
      return regTracks;
    }
  },
  mounted() {
    this.isLoading = true;
  },
  methods: {
    /**
     * Extract the sequence to display: subseq from start to end
     * Return a sequence object representing the sequence from start to end positions
     * @return {Object}
     */
    extractSeq(s) {
      const extractSeq = Object.assign({}, s);
      const lengthSeq = s.seq.length;
      // get the 0-based start position
      let start = this.zerobasedStart;
      if (start > lengthSeq) {
        start = lengthSeq - 1;
      }
      // get the end position in 1-based
      const end = this.onebasedEnd;
      // extract the subsequence from start to end
      extractSeq.seq = s.seq.substr(start, end - start);
      // compute the positions of each nucleotide in the original sequence (without gap)
      extractSeq.oriseqpositions = this.computeOriPosition(s.seq).slice(start, end);
      // change the ccordinate of the metadata ranges
      if (extractSeq.hasOwnProperty('metadatas')) {
        extractSeq.metadatas.forEach(m => {
          if (m.hasOwnProperty('ranges')) {
            m.ranges = m.ranges
              .map(p => {
                return this.transformPos(p);
              })
              .filter(p => p != null);
          }
        });
      }
      return extractSeq;
    },
    /**
     * sequence is a string representing a sequence in a multiple alignement
     * (composed of nt and '-' characters)
     * return an array given for each character of the input string its position
     * in the original sequence. If the caracter is '-' the corresponding value would be 0
     */
    computeOriPosition(sequence) {
      var currentPos = 0;
      return sequence.split('').map(nt => {
        if (nt != '-') {
          currentPos += 1;
          return currentPos;
        } else {
          return 0;
        }
      });
    },
    /**
     * Transform position array [start, end] according to start
     */
    transformPos(pos) {
      let posStart = pos[0];
      let posEnd = pos[1];

      // zero-based start
      const offSetStart = this.zerobasedStart;
      // one-based end
      const offSetEnd = this.onebasedEnd;

      if (
        (posStart < offSetStart && posEnd < offSetStart) ||
        (posStart > offSetEnd && posEnd > offSetEnd)
      ) {
        return null;
      }

      if (posStart <= offSetStart) {
        posStart = offSetStart + 1;
      }

      if (posEnd > offSetEnd) {
        posEnd = offSetEnd;
      }

      posStart -= offSetStart;
      posEnd -= offSetStart;

      return [posStart, posEnd];
    },

    /**
     * Emit the event 'select-node' with the value= id of the sequence
     * Action only available if the sequence has the attribute isClickable
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
.seq-alignment {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 3px;
  padding: 10px;
  border: thin solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  color: black;
  overflow-x: scroll;
}
</style>
