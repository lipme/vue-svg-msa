<template>
  <g>
    <rect
      v-for="(r, index) in getRect"
      :key="index"
      :x="r.x"
      :y="rectY"
      :height="height"
      :width="r.width"
      :fill="r.color"
      fill-opacity="0.8"
    ></rect>
  </g>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
      default() {
        return {};
      }
    },
    aX: { type: Function, default: () => {} },
    height: { type: Number, default: 8 },
    y: { type: Number, default: 1 },
    textFontSize: { type: Number, default: 10 },
    length: { type: Number, default: 150 }
  },
  computed: {
    rectY() {
      return this.y - this.textFontSize + 1;
    },

    getShift() {
      return Math.round(((this.aX(1) - this.aX(0)) / 2) * 10) / 10;
    },
    /**
     * Build an array of objects with attributes x,color, width
     */
    getRect() {
      const displayedRect = [];
      this.track.features.forEach(f => {
        if ('positions' in f) {
          f.positions.forEach(pos => {
            if (typeof pos !== 'undefined' && pos.length === 2) {
              displayedRect.push({
                x: this.rectX(pos[0] - 1),
                color: f.color,
                width: this.rectX(pos[1]) - this.rectX(pos[0] - 1)
              });
            }
          });
        }
      });
      return displayedRect;
    }
  },
  methods: {
    /** x coordinate of the rectangle at the index i */
    rectX(i) {
      return this.aX(i) - this.getShift;
    }
  }
};
</script>
