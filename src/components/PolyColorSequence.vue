<template>
  <g>
    <template v-for="(letter, letterIndex) in sequence.seqSplit">
      <rect
        :key="'rect-' + letterIndex"
        v-if="autoColoring"
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
    rectY:  { type: Number },
    atextX: { type: Array },
    textY:  { type: Number },
    height: { type: Number },
    textFontSize: { type: Number },
    autoColoring: { type: Boolean, default: false }
  },
  methods: {
    /**
     * Return a color for a letter.
     * @return {String} the color of the letter.
     */
    getAminoColor(char) {
      if (this.autoColoring === 'false')
      {
        return '#FFFFFF'
      }

      switch (char) {
        case 'A':
          return '#DBFA60';
          break;
        case 'C':
          return '#F9FA60';
          break;
        case 'D':
          return '#F9605F';
          break;
        case 'E':
          return '#F9609C';
          break;
        case 'F':
          return '#5FF99D';
          break;
        case 'G':
          return '#F9BC5F';
          break;
        case 'H':
          return '#609DF9';
          break;
        case 'I':
          return '#99F95A';
          break;
        case 'K':
          return '#A062FF';
          break;
        case 'L':
          return '#7EF960';
          break;
        case 'M':
          return '#63FF63';
          break;
        case 'N':
          return '#D95DF9';
          break;
        case 'P':
          return '#F9DA60';
          break;
        case 'Q':
          return '#F955D8';
          break;
        case 'R':
          return '#5360FB';
          break;
        case 'S':
          return '#F97E60';
          break;
        case 'T':
          return '#FFA563';
          break;
        case 'V':
          return '#C0F86B';
          break;
        case 'W':
          return '#FDD9F9';
          break;
        case 'Y':
          return '#60F9DA';
          break;
        default:
          return '#FFFFFF';
      }
    }
  }
};
</script>