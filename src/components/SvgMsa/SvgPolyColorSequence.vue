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
    <template v-for="item in sequenceArray">
      <text
        :key="'txt-' + item.id"
        text-anchor="middle"
        :x="aX(item.id)"
        :y="y"
        :class="getClass"
        :font-size="textFontSize"
        fill="black"
      >{{ item.letter }}</text>
      <rect
        :key="'rect-' + item.id"
        :x="item.x"
        :y="rectY"
        :height="height"
        :width="getLetterWidth"
        class="invisible"
        @click="$emit('click')"
      >
        <title style="text-align:left">{{ seqName }} {{ item.pos }} - Click to extract the sequence</title>
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
    seqName: { type: String, default: 'seqname' },
    isSelected: { type: Boolean, defaut: false },
    metadatas: {
      type: Array,
      default() {
        return [];
      }
    },
    start: { type: Number, default: 0 }
  },
  data() {
    return {
      defaultOpacity: 0.5
    };
  },
  computed: {
    sequenceArray() {
      return this.sequence.seq.split('').map((s, i) => ({
        id: i,
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
     * build a string given the style of the metadata number i, value i2
     */
    metadataStyle() {
      return function(i, i2) {
        var style = '';
        if (
          !(
            this.metadatas.find(m => m.metadata_id === i) &&
            this.metadatas.find(m => m.metadata_id === i).values.find(v => v.value_id === i2)
          )
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
            style = style + ';fill-opacity: ' + this.defaultOpacity;
          }
        } else {
          style = 'fill:blue;fill-opacity:0';
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

      if (this.coloring === 'metadata' && this.sequence.metadatas) {
        this.sequence.metadatas.forEach(m => {
          const metadata_style = this.metadataStyle(m.metadata_id, m.value_id);

          if (!m.hasOwnProperty('ranges')) {
            displayedRect.push({
              x: this.rectX(0),
              width: this.getWidth,
              style: metadata_style
            });
          } else {
            m.ranges.forEach(pos => {
              const newPos = this.transformPos(pos);

              if (newPos != null) {
                displayedRect.push({
                  x: this.rectX(newPos[0] - this.start - 1),
                  width: (newPos[1] - newPos[0] + 1) * this.getLetterWidth,
                  style: metadata_style
                });
              }
            });
          }
        });
      } else if (this.coloring === 'auto') {
        let i = -1;
        displayedRect = this.sequence.seq.split('').map(l => {
          i += 1;
          return {
            x: this.rectX(i),
            width: this.getLetterWidth,
            style: 'fill: ' + this.getNtColor(l) + ';fill-opacity: ' + this.defaultOpacity
          };
        });
      } else if (this.coloring === 'seqcolor') {
        /* the color is the attribute sequence.color */
        if (this.sequence.color !== '') {
          displayedRect.push({
            x: this.rectX(0),
            width: this.getWidth,
            style: 'fill: ' + this.sequence.color + ';fill-opacity: ' + this.defaultOpacity
          });
        }
      }
      if (this.isSelected) {
        displayedRect.push({
          x: this.rectX(0),
          width: this.getWidth,
          style: '',
          class: 'selected'
        });
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
    },
    /**
     * Transform position array [start, end] according to start
     */
    transformPos(pos) {
      let posStart = pos[0];
      let posEnd = pos[1];

      const offSetStart = this.start;
      const offSetEnd = offSetStart + this.getSeqLength;

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

      return [posStart, posEnd];
    }
  }
};
</script>
<style scoped>
.consensus {
  font-weight: bold;
}
.selected {
  fill-opacity: 0.3;
  fill: blue;
  stroke: black;
  stroke-opacity: 1;
  stroke-width: 2;
  stroke-dasharray: 4, 2;
}
.invisible {
  fill-opacity: 0;
}
</style>
