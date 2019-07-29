<template>
  <g>
    <rect
      v-for="(r, index) in getColoredRect"
      :key="index"
      :x="r.x"
      :y="rectY"
      :height="height"
      :width="r.width"
      :fill="r.color"
      fill-opacity="0.8"
    ></rect>
    <template v-for="(letter, letterIndex) in sequence.seq.split('')">
      <text
        :key="'txt-' + letterIndex"
        text-anchor="middle"
        :x="aX(letterIndex)"
        :y="y"
        :class="getClass"
        :font-size="textFontSize"
        fill="black"
      >
        {{ letter }}
      </text>
    </template>
  </g>
</template>

<script>
export default {
  props: {
    sequence: { type: Object },
    aX: { type: Function },
    y: { type: Number },
    height: { type: Number },
    textFontSize: { type: Number },
    coloring: { type: String, default: '' }
  },
  computed: {
    getLetterWidth(){
      return this.aX(1)-this.aX(0)
    },
    getShift() {
      return Math.round(((this.getLetterWidth)/2)*10) / 10
    },
    rectY() {
      return this.y - this.textFontSize + 1;
    },
    getColoredRect() {
      var displayedRect = [];
      if (this.coloring === 'metadata') {
        this.sequence.metadata.forEach(m => {
          m.positions.split(',').forEach(s => {
            const pos = s.split('-');
            displayedRect.push({
              x: this.rectX(pos[0] - 1),
              color: m.color,
              width: (pos[1] - pos[0] +1) * this.getLetterWidth
            });
          });
        });
      } else if (this.coloring === 'auto') {
        var i = -1;
        displayedRect = this.sequence.seq.split('').map(l => {
          i++;
          return {
            x: this.rectX(i),
            color: this.getAminoColor(l),
            width: this.getLetterWidth
          };
        });
      }
      return displayedRect;
    },
    getClass() {
      return {
        consensus: (this.sequence.isConsensus === true && this.sequence.isFinal === true),
        nodesequence: (this.sequence.isFinal === false)
      }
    },
  },
  methods: {
    /** x coordinate of the rectangle at the index i */
    rectX(i) {
      return this.aX(i)  - this.getShift
    },
    /**
     * Return a color for a letter.
     * @return {String} the color of the letter.
     */
    getAminoColor(char) {
      switch (char) {
        case 'A':
          return '#DBFA60';
        case 'C':
          return '#F9FA60';
        case 'D':
          return '#F9605F';
        case 'E':
          return '#F9609C';
        case 'F':
          return '#5FF99D';
        case 'G':
          return '#F9BC5F';
        case 'H':
          return '#609DF9';
        case 'I':
          return '#99F95A';
        case 'K':
          return '#A062FF';
        case 'L':
          return '#7EF960';
        case 'M':
          return '#63FF63';
        case 'N':
          return '#D95DF9';
        case 'P':
          return '#F9DA60';
        case 'Q':
          return '#F955D8';
        case 'R':
          return '#5360FB';
        case 'S':
          return '#F97E60';
        case 'T':
          return '#FFA563';
        case 'V':
          return '#C0F86B';
        case 'W':
          return '#FDD9F9';
        case 'Y':
          return '#60F9DA';
        default:
          return '#FFFFFF';
      }
    }
  }
};
</script>
<style scoped>
#sequence {
  font-weight: normal;
  fill: black;
  font-family: "monospace";
}
.consensus{
      font-weight: bold;
}
.nodesequence{
    font-style: italic;
}
</style>