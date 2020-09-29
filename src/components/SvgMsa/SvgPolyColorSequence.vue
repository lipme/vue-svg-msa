<template>
  <g>
    <!-- draw colored rectangles -->
    <MetadataRect v-for="(r, index) in coloredRect" :key="index" :rect="r"></MetadataRect>

    <!-- display on text element for each nt -->
    <template v-for="(item, id) in seqNucleotides">
      <text
        :key="'txt-' + id"
        text-anchor="middle"
        :x="aX(id)"
        :y="aY(y)"
        :class="getClass"
        :font-size="textFontSize"
        >{{ item.letter }}</text
      >
      <rect
        :key="'rect-' + id"
        :x="item.x"
        :y="seqRectY"
        :height="getTrackHeight"
        :width="getLetterWidth"
        class="invisible"
        @click="$emit('click')"
      >
        <title style="text-align:left">
          {{ sequence.name }}{{ item.pos }} - Click to get the sequence
        </title>
      </rect>
    </template>
  </g>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
import MetadataRect from '@/components/SvgMsa/MetadataRect.vue';

export default {
  components: {
    MetadataRect
  },
  mixins: [coordinate],
  props: {
    sequence: {
      type: Object,
      default() {
        return [];
      }
    },
    y: { type: Number, default: 1 },
    textFontSize: { type: Number, default: 15 },
    coloring: { type: String, default: 'no' },
    isSelected: { type: Boolean, defaut: false },
    selectionMode: { type: Boolean, default: false }
  },
  data() {
    return {
      defaultOpacity: 0.4,
      defaultOpacityContrast: 0.2
    };
  },
  computed: {
    /**
     * return an object array. each object represents a nucleotide:
     * letter : the nucleotide,
     * x: its x position,
     * pos: a string given its position in the original sequence (without gap)
     */
    seqNucleotides() {
      return this.sequence.seq.split('').map((s, i) => ({
        letter: s,
        x: this.rectX(i),
        pos: this.sequence.oriseqpositions[i] > 0 ? ':' + this.sequence.oriseqpositions[i] : ''
      }));
    },
    /**
     * Get the rectangles to display according to the coloring value
     *  Return an array of objects
     */
    coloredRect() {
      let displayedRect = [];
      if (this.coloring.includes('auto')) {
        displayedRect = this.sequence.seq.split('').map((l, i) => {
          return this.newNtRect(i, this.y, this.getStyle(this.getNtColor(l), this.opacity));
        });
      }
      if (this.coloring.includes('seqcolor') && this.sequence.color !== '') {
        displayedRect.push(
          this.newSeqRect(this.y, this.seqLength, this.getStyle(this.sequence.color, this.opacity))
        );
      }
      return displayedRect;
    },
    seqLength() {
      return this.sequence.seq.length;
    },
    seqRectY() {
      return this.rectY(this.y);
    },
    /**
     *
     */
    getClass() {
      return {
        consensus:
          (this.sequence.isConsensus === true && this.sequence.isNode === false) ||
          this.sequence.isNode === true
      };
    },
    opacity() {
      if (this.selectionMode === false || (this.selectionMode === true && this.isSelected)) {
        return this.defaultOpacity;
      } else {
        return this.defaultOpacity - this.defaultOpacityContrast;
      }
    }
  },
  methods: {
    /**
     * return an object style given the fill and its opacity
     */
    getStyle(f, o) {
      var o_style = {};
      o_style['fill'] = f;
      o_style['fill-opacity'] = o;
      return o_style;
    },
    /**
     * Return a color for a letter.
     * @return {String} the color of the letter.
     */
    getNtColor(char) {
      switch (char) {
        case 'A':
          return 'green';
        case 'C':
          return 'orange';
        case 'G':
          return 'red';
        case 'T':
          return 'steelblue';
        case 'U':
          return 'steelblue';
        case 'N':
          return '#FFFFFF';
        default:
          return '#FFFFFF';
      }
    }
  }
};
</script>
<style scoped>
.consensus {
  font-weight: bold;
}
.selected {
  fill: white;
  fill-opacity: 0;
  stroke: black;
  stroke-opacity: 1;
  stroke-width: 2;
  stroke-dasharray: 4, 2;
}
.invisible {
  fill-opacity: 0;
}
</style>
