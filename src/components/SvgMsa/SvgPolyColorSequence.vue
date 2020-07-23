<template>
  <g>
    <!-- draw colored rectangles -->
    <rect
      v-for="(r, index) in getColoredRect"
      :key="index"
      :x="r.x"
      :y="rectY"
      :height="height"
      :width="r.width"
      :style="r.style"
      :class="r.class"
    ></rect>
    <!-- display on text element for each nt -->
    <template v-for="(item, id) in sequenceArray">
      <text
        :key="'txt-' + id"
        text-anchor="middle"
        :x="aX(id)"
        :y="y"
        :class="getClass"
        :font-size="textFontSize"
        fill="black"
      >{{ item.letter }}</text>
      <rect
        :key="'rect-' + id"
        :x="item.x"
        :y="rectY"
        :height="height"
        :width="getLetterWidth"
        class="invisible"
        @click="$emit('click')"
      >
        <title
          style="text-align:left"
        >{{ sequence.name }} {{ item.pos }} - Click to extract the sequence</title>
      </rect>
    </template>
  </g>
</template>

<script>
export default {
  props: {
    sequence: {
      type: Object,
      default() {
        return [];
      }
    },
    aX: { type: Function, default: () => {} },
    y: { type: Number, default: 1 },
    height: { type: Number, default: 20 },
    textFontSize: { type: Number, default: 15 },
    coloring: { type: String, default: 'no' },
    isSelected: { type: Boolean, defaut: false },
    metadatas: {
      type: Array,
      default() {
        return [];
      }
    },
    selectionMode: { type: Boolean, default: false }
  },
  data() {
    return {
      defaultOpacity: 0.4,
      defaultOpacityContrast: 0.2
    };
  },
  computed: {
    opacity() {
      if (this.selectionMode === false || (this.selectionMode === true && this.isSelected)) {
        return this.defaultOpacity;
      } else {
        return this.defaultOpacity - this.defaultOpacityContrast;
      }
    },
    sequenceArray() {
      return this.sequence.seq.split('').map((s, i) => ({
        letter: s,
        x: this.rectX(i),
        pos: this.sequence.oriseqpositions[i] > 0 ? 'pos ' + this.sequence.oriseqpositions[i] : ''
      }));
    },
    getSeqLength() {
      return this.sequence.seq.length;
    },
    getWidth() {
      return this.aX(this.getSeqLength) - this.aX(0);
    },
    getLetterWidth() {
      return this.aX(1) - this.aX(0);
    },
    getShift() {
      return Math.round((this.getLetterWidth / 2) * 10) / 10;
    },
    rectY() {
      return this.y - this.textFontSize + 1;
    },
    /**
     * build a string given the style of the metadata i, value i2
     */
    metadataStyle() {
      return function(i, i2) {
        var style = '';
        if (
          !this.metadatas.find(m => m.metadata_id === i) ||
          !this.metadatas.find(m => m.metadata_id === i).values.find(v => v.value_id === i2)
        ) {
          return '';
        }
        const o_style = this.metadatas
          .find(m => m.metadata_id === i)
          .values.find(v => v.value_id === i2);

        if (o_style.hasOwnProperty('fill')) {
          style = 'fill: ' + o_style.fill;
          if (o_style.hasOwnProperty('fillopacity')) {
            style = style + ';fill-opacity: ' + o_style.fillopacity;
          } else {
            style = style + ';fill-opacity: ' + this.opacity;
          }
        } else {
          style = 'fill-opacity:0';
        }
        if (o_style.hasOwnProperty('stroke')) {
          style = style + ';stroke:' + o_style.stroke;
        }
        if (o_style.hasOwnProperty('strokedash') && o_style.strokedash == true) {
          style = style + ';stroke-dasharray: 4,2';
        }

        return style;
      };
    },
    /**
     * Get the rectangles to display according to the metadata values
     *  Return an array of objects
     */
    getColoredRect() {
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
      if (this.isSelected) {
        displayedRect.push(this.newSeqRect('', 'selected'));
      }
      return displayedRect;
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
    }
  },
  methods: {
    /** x coordinate of the rectangle at the index i */
    rectX(i) {
      return this.aX(i) - this.getShift;
    },
    /**
     * return a string given the fill and its opacity
     */
    getStyle(f, o) {
      return 'fill: ' + f + ';fill-opacity: ' + o;
    },
    /**
     * return a new object corresponding to a rect to color all the sequence
     */
    newSeqRect(s, c) {
      return {
        x: this.rectX(0),
        width: this.getWidth,
        style: s,
        class: c
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
