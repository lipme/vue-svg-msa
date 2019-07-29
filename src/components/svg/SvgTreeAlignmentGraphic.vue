<template>
  <div>
    <!-- a mettrze dans un autre composant!! -->
    <v-text-field label="depth" outlined v-model="currentDepth"></v-text-field>
    <v-btn small @click="currentNodeId = tree.id">allsequences</v-btn>
    <v-btn small @click="changeDepth(1)">Depth+</v-btn>
    <v-btn small @click="changeDepth(-1)">Depth-</v-btn>
    <v-btn small @click="ascendCurrentNode()">Ascend in the tree</v-btn>
    <v-btn small @click="coloring = 'auto'">Color by nt</v-btn>
    <v-btn small @click="coloring = 'no'">No colort</v-btn>
    <v-btn small @click="coloring = 'metadata'">Color with metadata</v-btn>

    <div id="alignment-graphic">
      <svg :width="widthSvg" :height="heightSvg">
        <svg-scale-bar
          :length="seqLengthMax"
          :scale-y="trackY[0]"
          :fct-scale-x="coordX"
        ></svg-scale-bar>
        <svg-track
          :length="seqLengthMax"
          :y="trackY[1]"
          :fct-scale-x="coordX"
          :track="track"
          :text-font-size="labelTextFontSize"
        ></svg-track>

        <template v-for="(s, seqIndex) in displayedSeqs">
          <!-- Name of the sequence -->
          <svg-sequence-name-field
            :key="seqIndex"
            :y="coordY[seqIndex]"
            :text-font-size="labelTextFontSize"
            :name="s.name"
            :offset-x="offsetX"
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
              :text-font-size="labelTextFontSize"
              :coloring="coloring"
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
              :text-font-size="labelTextFontSize"
            ></svg-mono-color-sequence>
          </template>
        </template>
      </svg>
    </div>
  </div>
</template>


<script>
import * as d3 from 'd3-scale';
import SvgScaleBar from '@/components/svg/SvgScaleBar.vue';
import SvgTrack from '@/components/svg/SvgTrack.vue';
import SvgMonoColorSequence from '@/components/svg/SvgMonoColorSequence.vue';
import SvgPolyColorSequence from '@/components/svg/SvgPolyColorSequence.vue';
import SvgSequenceNameField from '@/components/svg/SvgSequenceNameField.vue';

// import { ALPN_ENABLED } from 'constants';
export default {
  name: 'AlignmentGraphic',
  components: {
    SvgTrack,
    SvgScaleBar,
    SvgMonoColorSequence,
    SvgPolyColorSequence,
    SvgSequenceNameField
  },
  props: {
    tree: { type: Object },
    track: { type: Object },
    // if 'unsteady' is activated, the sequence is display in one text element
    // the display time is very short but the nt are not perfectly align with scalebar
    unsteady: { type: Boolean, default: false }
  },
  data() {
    return {
      letterWidth: 10,
      seqTrackHeight: 15,
      metadataTrackHeight: 20,
      metadataTrackNumber: 2,
      offsetX: 150,
      coloring: 'no',

      currentNodeId: this.tree.id,
      currentDepth: 3,
      lastDisplayedSeqIndex: 25,
      displaySeqStep: 5
    };
  },
  mounted() {
    this.scroll();
  },
  computed: {
    /**
     * Text font size computed according to the height of the sequence tracks.
     */
    labelTextFontSize() {
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
      return this.letterWidth * this.seqLengthMax;
    },
    /**
     * Return the width of the SVG of the alignment.
     * @return {number} the width of the SVG of the alignment.
     */
    widthSvg() {
      return this.offsetX + this.aligmentWidth;
    },
    /**
     * Return the height of the SVG of the alignment.
     * @return {number} the height of the SVG of the alignment.
     */
    heightSvg() {
      return (
        (this.displayedSeqs.length+1) * this.seqTrackHeight +
        this.metadataTrackNumber * this.metadataTrackHeight
      );
    },

    /**
     * Return an array of the coordinate 'x' values
     * coordX[10] is the X coordinate of the text of the 10th letter of a seq.
     * @return {number}  an array of the coordinate 'x' values.
     */
    coordX() {
      var x = d3
        .scaleLinear()
        .domain([0, this.seqLengthMax])
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
        (s, index) => this.metadataTrackHeight * this.metadataTrackNumber + (index + 1) * this.seqTrackHeight
      );
    },
     /**
     * Return an array of the coordinate 'y' values
     * of the metadat tracks
     * @return {number}  an array of the coordinate 'y' values.
     */
    trackY() {
      var metadataTrackY = []
      for (var i = 1; i <= this.metadataTrackNumber; i++) {
        metadataTrackY.push(this.metadataTrackHeight*i)
      }
      return metadataTrackY
    },

    seqs() {
      return this.getSequencesByNodeIdAndByDepth(this.currentNodeId, this.currentDepth);
    },
    /* return an array of the sequences to display */
    displayedSeqs() {
      return this.seqs.slice(0, this.lastDisplayedSeqIndex);
    }
  },
  methods: {
    selectNode(s) {
      if (s.isConsensus && !s.isFinal) {
        this.currentNodeId = s.id;
      }
    },
    ascendCurrentNode() {
      this.currentNodeId = this.getParent(this.currentNodeId, this.tree, '');
    },

    getParent(id, currentNode, parentNodeId) {
      if (currentNode.id === id) {
        if (parentNodeId === '') {
          return id;
        } else {
          return parentNodeId;
        }
      } else {
        if (currentNode.nodes.length > 0) {
          var aa = currentNode.nodes
            .map(node => this.getParent(id, node, currentNode.id))
            .filter(a => a !== '');
          if (aa.length > 0) {
            return aa[0];
          } else {
            return '';
          }
        } else {
          return '';
        }
      }
    },
    /* return the node object which has the id i n */
    getNode(i) {
      return this.getNodeInObject(this.tree, i);
    },
    /* search, in the object o, the node object which has the id n and return it */
    getNodeInObject(o, id) {
      if (o.id === id) {
        return o;
      } else {
        if (o.nodes.length > 0) {
          var aa = o.nodes.map(node => this.getNodeInObject(node, id)).filter(a => a != null);
          if (aa.length > 0) {
            return aa[0];
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    },
    /* return an array composed of the sequences containing under the nodes numbered n */
    getSequencesByNodeId(id) {
      const node = this.getNode(id);

      var seqs = [];
      this.getSequencesByNode(node, seqs);

      // add the consensus sequence
      seqs.push(this.buildConsensusSeq(node));
      return seqs;
    },
    /* search the sequences containing under the nodes node, and add them in the array seqs */
    getSequencesByNode(node, seqs) {
      if (node.leaves.length > 0) {
        node.leaves.forEach(l => seqs.push(l));
      }
      node.nodes.forEach(n => this.getSequencesByNode(n, seqs));
    },

    getSequencesByNodeIdAndByDepth(id, depth) {
      var seqs = [];
      const node = this.getNode(id);
      this.getSequencesByDepth(node, depth, seqs);

      var consensus = this.buildConsensusSeq(node);

      // propagate metadata of the consensus on seqs
      seqs.forEach(s => this.transferMetadata(consensus, s));

      // add the consensus sequence
      seqs.push(this.buildConsensusSeq(node));

      return seqs;
    },

    transferMetadata(source, target) {
      const consSplit = source.seq.split('');
      const seqsplit = target.seq.split('');

      // initialize metadata attribute of the target object
      target.metadata = [];

      // for each metadata of the source object
      source.metadata.forEach(m => {
        // list all the positions where source and target are identical
        var conservedPos = [];
        m.positions.split(',').forEach(s => {
          const pos = s.split('-').map( a => parseInt(a));
          for (var p = pos[0]; p <= pos[1]; p++) {
            if (seqsplit[p - 1] === consSplit[p - 1]) conservedPos.push(p);
          }
        });
        // create a new metadata elements with the conserved positions
        target.metadata.push({
          positions: this.convertPosToRange(conservedPos),
          color: m.color,
          label: m.label
        });
      });
    },

/**
 * 
 */
    convertPosToRange(aPositions) {
      var newpositions = '';
      var start = -1;
      var prev = -1;
      aPositions.forEach(pos => {
        if (prev + 1 !== pos) {
          if (prev !== -1) newpositions += start + '-' + prev + ',';
          start = pos;
        }
        prev = pos;
      });
      if (prev !== -1) newpositions += start + '-' + prev;

      console.log(aPositions)
      console.log(newpositions)
      return newpositions;
    },

    getSequencesByDepth(node, depth, seqs) {
      if (depth == 0) {
        seqs.push(this.buildConsensusSeq(node, false));
      } else {
        node.leaves.forEach(l => seqs.push(l));
        node.nodes.forEach(n => this.getSequencesByDepth(n, depth - 1, seqs));
      }
    },

    buildConsensusSeq(node, final = true) {
      var name = 'CONSENSUS';
      if (final !== true) {
        name = 'cons' + node.node_number;
      }
      var c = {
        id: node.id,
        name: name,
        seq: node.consensus,
        isConsensus: true,
        isFinal: final
      };
      if (final === true && node.hasOwnProperty('metadata')) c.metadata = node.metadata;

      return c;
    },
    changeDepth(val) {
      this.currentDepth += val;
      if (this.currentDepth <= 0) this.currentDepth = 1;
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
  }
};
</script>

<style lang="scss" scoped>
#alignment-graphic {
  margin: 3px;
  padding: 10px;
  border: thin solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  color: black;
  overflow-x: scroll;
  //overflow-y: scroll;
}
</style>
