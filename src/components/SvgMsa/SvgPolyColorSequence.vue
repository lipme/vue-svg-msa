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
      :fill="r.color"
      fill-opacity="0.5"
    ></rect>
    <template v-for="item in sequenceArray">
      <text
        :key="'txt-' + item.id"
        text-anchor="middle"
        :x="aX(item.id)"
        :y="y"
        :class="getClass"
        :font-size="textFontSize"
        fill="black"
      >
        {{ item.letter }}
      </text>
    </template>
    <!-- draw a rectangle only to display a tooltip -->
    <rect
      :x="rectX(0)"
      :y="rectY"
      :height="height"
      :width="getWidth"
      :class="selectClass"
      @click="$emit('click')"
      ><title>Click to extract the sequence {{ seqName }}</title></rect
    >
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
    start: { type: Number, default: 0 }
  },
  computed: {
    sequenceArray() {
      return this.sequence.seq.split('').map((s, i) => ({ id: i, letter: s }));
    },
    selectClass() {
      if (this.isSelected) {
        return 'selected';
      }
      return 'unselected';
    },
    getWidth() {
      return this.aX(this.sequence.seq.length) - this.aX(0);
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

    // Get the rectangles to display according to the metadata values
    // Return an array of objects
    getColoredRect() {
      let displayedRect = [];

      if (this.coloring === 'metadata' && this.sequence.metadata) {
        this.sequence.metadata.forEach(m => {
          m.positions.forEach(pos => {
            const newPos = this.transformPos(pos);

            if (newPos != null) {
              displayedRect.push({
                x: this.rectX(newPos[0] - this.start - 1),
                color: m.color,
                width: (newPos[1] - newPos[0] + 1) * this.getLetterWidth
              });
            }
          });
        });
      } else if (this.coloring === 'auto') {
        let i = -1;
        displayedRect = this.sequence.seq.split('').map(l => {
          i += 1;
          return {
            x: this.rectX(i),
            color: this.getNtColor(l),
            width: this.getLetterWidth
          };
        });
      } else if (this.coloring === 'seqcolor') {
        /* the color is the attribute sequence.color */
        if (this.sequence.color !== '') {
          displayedRect.push({
            x: this.rectX(0),
            color: this.sequence.color,
            width: this.getWidth
          });
        }
      }
      return displayedRect;
    },
    getClass() {
      return {
        consensus: this.sequence.isConsensus === true && this.sequence.isNode === false,
        nodesequence: this.sequence.isNode === true
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
      const offSetEnd = offSetStart + this.sequence.seq.length;

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
.nodesequence {
  font-weight: bold;
}
.selected {
  fill-opacity: 0;
  stroke: black;
  stroke-width: 2;
  stroke-opacity: 0.9;
}
.unselected {
  fill-opacity: 0;
}
</style>
