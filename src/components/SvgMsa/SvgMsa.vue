<template>
  <div class="seq-alignment">
    <svg :width="widthSvg" :height="heightSvg">
      <vue-svg-tracks
        :tracks="regionTracks"
        :length="maxLengthExtractSeqs"
        :track-height="trackHeight"
        :sep="trackSep"
        :offset-x="offsetX"
        :width="widthSvg"
        :tooltip="false"
      ></vue-svg-tracks>
      <svg-scale-bar
        :length="maxLengthExtractSeqs"
        :y="metadataTrackGlobalHeight - 10"
        :fct-scale-x="coordX"
        :start="zerobasedStart"
      />
      <!-- display a rectangles for each selected sequence -->
      <sequence-selection-rect
        v-for="s in selectionSeqs"
        :key="'sel' + s.index"
        :a-x="coordX"
        :a-y="coordY"
        :y="s.index"
        :seqlen="maxLengthExtractSeqs"
      />

      <!-- draw metadata rectangles -->
      <metadata-draw
        v-for="(m, index) in regionMetadata"
        :key="'m-' + index"
        :metadata="m"
        :a-x="coordX"
        :a-y="coordY"
        :a-seqindex="seqInd"
        :selectionSeqs="selectionSeqs"
        :seq-len="maxLengthExtractSeqs"
        :seq-nb="sequenceNb"
      />

      <!-- display each sequence -->
      <template v-for="(s, seqIndex) in extractSeqs">
        <svg-sequence-name-field
          :key="seqIndex"
          :y="coordY(seqIndex)"
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
          :a-y="coordY"
          :y="seqIndex"
          :text-font-size="seqTextFontSize"
          :coloring="coloring"
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
import { VueSvgTracks } from 'vue-svg-tracks';
import SvgPolyColorSequence from '@/components/SvgMsa/SvgPolyColorSequence.vue';
import SvgSequenceNameField from '@/components/SvgMsa/SvgSequenceNameField.vue';
import SequenceSelectionRect from '@/components/SvgMsa/SequenceSelectionRect.vue';
import SequenceModal from '@/components/SvgMsa/SequenceModal.vue';
import MetadataDraw from '@/components/SvgMsa/MetadataDraw.vue';

import _ from 'lodash';

export default {
  /*
  When the use click to the name of a sequence, emit the event 'select-node'
  whose value is equals to id */

  name: 'SvgMsa',
  components: {
    VueSvgTracks,
    SvgScaleBar,
    SvgPolyColorSequence,
    SvgSequenceNameField,
    SequenceModal,
    SequenceSelectionRect,
    MetadataDraw
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
     * metadata: array of metadata definitions
     */
    metadata: {
      type: Array,
      default() {
        return [];
      }
    },
    selectedregs: {
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
    coloring: { type: String, default: 'no' },
    trackHeight: {
      type: Number,
      default: 15
    },
    trackSep: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      letterAdditionalWidth: 0,
      offsetX: 200,
      displaySeqDialog: false,
      displayDialogSequences: [],
      isLoading: false
    };
  },
  computed: {
    /**
     * return the width of a nucleotide
     */
    letterWidth() {
      return this.trackHeight + this.letterAdditionalWidth - 5;
    },
    /**
     * Return the width of the SVG of the alignment.
     * @return {number} the width of the SVG of the alignment.
     */
    widthSvg() {
      return this.offsetX + this.letterWidth * this.maxLengthExtractSeqs;
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
    sequenceNb() {
      return this.seqs.length;
    },

    /**
     * Text font size computed according to the height of the sequence tracks.
     */
    seqTextFontSize() {
      return this.trackHeight - 2;
    },

    metadataTrackNumber() {
      return this.tracks.length;
    },
    metadataTrackGlobalHeight() {
      return (this.metadataTrackNumber + 2) * (this.trackHeight + this.trackSep);
    },
    seqsHeight() {
      return this.seqs.length * this.trackHeight;
    },
    /**
     * Return the height of the SVG of the alignment.
     * @return {number} the height of the SVG of the alignment.
     */
    heightSvg() {
      return this.seqsHeight + this.trackHeight + this.metadataTrackGlobalHeight;
    },
    /**
     * Return a function given the coordinate 'x' values
     * coordX(10) is the X coordinate of the text of the 10th letter of a seq.
     * @return {function}
     */
    coordX() {
      const x = d3
        .scaleLinear()
        .domain([0, this.maxLengthExtractSeqs])
        .range([this.offsetX, this.widthSvg]);

      return x;
    },
    /**
     * Return a function of the coordinate 'y' values
     * coordY(10) is the Y coordinate of the 10th sequence.
     * @return {function}
     */
    coordY() {
      return i => {
        return this.metadataTrackGlobalHeight + (i + 1) * this.trackHeight;
      };
    },
    seqInd() {
      return seqid => {
        return this.extractSeqs.findIndex(o => o.id === seqid);
      };
    },
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
     * return an array of the selected sequence objects
     * add the prop index to knwo the position of the sequence in the alignment
     * (useful to comute the y position)
     */
    selectionSeqs() {
      return this.extractSeqs
        .map((s, i) => {
          s.index = i;
          return s;
        })
        .filter(s => this.selectedseqs.find(e => e === s.id));
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
      let regTracks = _.cloneDeep(this.tracks);
      regTracks.forEach(t => {
        t.features.forEach(f => {
          if ('positions' in f) f.positions = this.sliceRange(f.positions);
        });
      });
      return regTracks;
    },
    /**
     * return an array of metadata with the transformed coordinates
     */
    regionMetadata() {
      if (this.coloring.includes('metadata')) {
        // slice the coordinates
        let regionMetadata = this.metadata;
        this.metadata.forEach(m => {
          m.categories.forEach(c => {
            c.regions.forEach(r => {
              if ('ranges' in r) r.ranges = this.sliceRange(r.ranges);
            });
          });
        });
        return regionMetadata;
      }
      return [];
    }
  },
  mounted() {
    this.isLoading = true;
  },
  methods: {
    /**
     * Transform the seq object s to match with the start and end positions:
     * extract the subsequence, change the coordinates included io ranges
     * add a oriseqpositions array containing the position of each nt in the original sequence
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
          if (m.hasOwnProperty('ranges')) m.ranges = this.sliceRange(m.ranges);
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
     * ranges is an array of range
     * for each element, transfrom the position according to start and end values
     */
    sliceRange(ranges) {
      return ranges
        .map(p => {
          return this.transformPos(p);
        })
        .filter(p => p != null);
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
