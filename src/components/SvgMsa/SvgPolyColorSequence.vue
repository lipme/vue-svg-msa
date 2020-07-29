<template>
  <g>
    <!-- draw colored rectangles -->
    <rect
      v-for="(r, index) in coloredRect"
      :key="index"
      :x="r.x"
      :y="seqRectY"
      :height="getTrackHeight"
      :width="r.width"
      :style="r.style"
      :class="r.class"
    ></rect>
    <!-- display on text element for each nt -->
    <template v-for="(item, id) in seqNucleotides">
      <text
        :key="'txt-' + id"
        text-anchor="middle"
        :x="aX(id)"
        :y="aY(y)"
        :class="getClass"
        :font-size="textFontSize"
      >{{ item.letter }}</text>
      <rect
        :key="'rect-' + id"
        :x="item.x"
        :y="seqRectY"
        :height="getTrackHeight"
        :width="getLetterWidth"
        class="invisible"
        @click="$emit('click')"
      >
        <title style="text-align:left">{{ sequence.name }}{{ item.pos }} - Click to get the sequence</title>
      </rect>
    </template>
  </g>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
export default {
  mixins: [coordinate],
  props: {
    sequence: {
      type: Object,
      default() {
        return [];
      }
    },
    metadatas: {
      type: Array,
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
     * Get the rectangles to display according to the metadata values
     *  Return an array of objects
     */
    coloredRect() {
      let displayedRect = [];

      switch (this.coloring) {
        case 'metadata':
          if (!this.sequence.metadatas) break;
          this.sequence.metadatas.forEach(m => {
            const metadata_style = this.metadataStyle(m.metadata_id, m.value_id);

            if (!m.hasOwnProperty('ranges')) {
              displayedRect.push(this.newSeqRect(metadata_style));
            } else {
              m.ranges.forEach(pos => {
                displayedRect.push(
                  this.newRect(
                    this.rectX(pos[0] - 1),
                    (pos[1] - pos[0] + 1) * this.getLetterWidth,
                    metadata_style
                  )
                );
              });
            }
          });
          break;

        case 'auto':
          displayedRect = this.sequence.seq.split('').map((l, i) => {
            return this.newRect(
              this.rectX(i),
              this.getLetterWidth,
              this.getStyle(this.getNtColor(l), this.opacity)
            );
          });
          break;

        case 'seqcolor':
          if (this.sequence.color === '') break;
          displayedRect.push(this.newSeqRect(this.getStyle(this.sequence.color, this.opacity)));
          break;
      }

      /* if the sequence is selected add a dash rectangle  */
      // if (this.isSelected) {
      //   displayedRect.push(this.newSeqRect('', 'selected'));
      // }
      return displayedRect;
    },
    seqLength() {
      return this.sequence.seq.length;
    },
    seqWidth() {
      return this.aX(this.seqLength) - this.aX(0);
    },
    seqRectY() {
      return this.rectY(this.y);
    },

    /**
     * return a function which return a styule object of the value i2 of the metadata
     *
     */
    metadataStyle() {
      return function(i, i2) {
        if (
          !this.metadatas.find(m => m.metadata_id === i) ||
          !this.metadatas.find(m => m.metadata_id === i).values.find(v => v.value_id === i2)
        ) {
          return {};
        }
        var o_style = this.metadatas
          .find(m => m.metadata_id === i)
          .values.find(v => v.value_id === i2);

        if (o_style.hasOwnProperty('fill')) {
          o_style['fill-opacity'] = o_style.hasOwnProperty('fill_opacity')
            ? o_style.fill_opacity
            : this.opacity;
        } else {
          o_style['fill'] = 'white'; // ????
          o_style['fill-opacity'] = 0;
        }
        if (o_style.hasOwnProperty('stroke_dasharray')) {
          o_style['stroke-dasharray'] = o_style.stroke_dasharray;
        }

        return o_style;
      };
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
     * return a new object corresponding to a rect to color all the sequence
     */
    newSeqRect(s) {
      return {
        x: this.rectX(0),
        width: this.seqWidth,
        style: s
      };
    },
    newRect(x, w, s, c) {
      return {
        x: x,
        width: w,
        style: s,
        class: c
      };
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
