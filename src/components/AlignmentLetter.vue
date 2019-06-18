<template>
  <g>
    <rect
      :x="rectX"
      :y="rectY"
      :width="rectWidth"
      :height="rectWidth"
      :fill="fill"
      fill-opacity="0.8"
    ></rect>
    <text :x="textX" :y="textY" :font-size="width" fill="black">
      {{ letter }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'alignment-letter',
  props: {
    width: { type: Number, default: 10 },
    offsetX: { type: Number, default: 100 },
    offsetY: { type: Number, default: 0 },
    pos: { type: Number, default: 0 },
    padding: { type: Number, default: 2 },
    letter: { type: String, default: ' ' },
    color: { type: String, default: '#FFFFFF' }
  },
  data() {
    return {
      fill: this.color
    };
  },
  computed: {
    /**
     * Return the x position of the rectangle.
     * @return {number} the x position of the rectangle.
     */
    x() {
      return this.offsetX + this.pos * (this.width + this.padding * 2);
    },
    rectWidth() {
      return this.width + this.padding * 2;
    },
    rectX() {
      return this.x - this.padding;
    },
    rectY() {
      return this.offsetY + 3 - this.padding
    },
    textX() {
      return this.x + this.padding;
    },
    textY() {
      return this.offsetY + this.width + 1;
    }
  },
  methods: {
    /**
     * Change the color of the rectangle according to the letter.
     */
    changeColor() {
      console.log('changeColor');
      this.fill = getAminoColor(this.letter.toUpperCase());
    }
  },
  mounted() {
    //this.changeColor();
  },
  updated() {
    //this.changeColor();
  }
};

/**
 * Return a color for a letter.
 * @return {String} the color of the letter.
 */
function getAminoColor(char) {
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
</script>

<style scoped>
</style>

