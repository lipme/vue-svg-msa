<template>
  <g>
    <rect
      :x="x - padding"
      :y="offsetY + 3 - padding"
      :width="width + padding * 2"
      :height="width + padding * 2"
      :fill="fill"
      fill-opacity="0.8"
    ></rect>
    <text :x="x + padding" :y="offsetY + width + 1" :font-size="width" fill="black">
      <slot></slot>
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
    padding: { type: Number, default: 2 }
  },
  data() {
    return {
      fill: '#BADA55'
    };
  },
  computed: {
    /**
     * Return the x position of the rectangle.
     * @return {number} the x position of the rectangle.
     */
    x() {
      return this.offsetX + this.pos * (this.width + this.padding * 2);
    }
  },
  methods: {
    /**
     * Change the color of the rectangle according to the letter.
     */
    changeColor() {
      var c = ' ';
      if (this.$slots.default) {
        var c = this.$slots.default[0].text;
        if (!c) {
          console.error('Please indicate a letter in the alignment-letter tag');
        }
        c = c.trim();
        if (c.length > 1) {
          console.error('Please indicate exactly one letter in the alignment-letter tag');
          return;
        } else if (c.length == 0) {
          c = ' ';
        }
      }
      this.fill = getAminoColor(c.toUpperCase());
    }
  },
  mounted() {
    this.changeColor();
  },
  updated() {
    this.changeColor();
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

