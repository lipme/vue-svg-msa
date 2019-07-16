<template>
  <g>
    <template v-for="(letter, letterIndex) in sequence.seq.split('')">
      <rect
        :key="'rect-' + letterIndex"
        v-if="autocoloring"
        :x="arectX[letterIndex]"
        :y="rectY"
        :height="height"
        :width="height"
        :fill="getAminoColor(letter)"
        fill-opacity="0.8"
      ></rect>
      <text
        :key="'txt-' + letterIndex"
        :x="atextX[letterIndex]"
        :y="textY"
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
    arectX: { type: Array },
    rectY: { type: Number },
    atextX: { type: Array },
    textY: { type: Number },
    height: { type: Number },
    textFontSize: { type: Number },
    autocoloring: { type: Boolean, default: false },
  },
  methods: {
    /**
     * Return a color for a letter.
     * @return {String} the color of the letter.
     */
    getAminoColor(char) {
      if (this.autoColoring === 'false') {
        return '#FFFFFF';
      }

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
    },
  },
};
</script>
