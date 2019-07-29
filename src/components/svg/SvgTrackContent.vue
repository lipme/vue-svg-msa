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
    track: { type: Object },
    aX: { type: Function },
    height: { type: Number, default: 8 },
    y: { type: Number },
    textFontSize: {type: Number, default: 10}
  },
  data() {
    return {
      colors: []
    };
  },
  created() {
    this.track.featureTypes.forEach(t => {
      this.colors[t.type] = t.color
    });
  },
  methods: {
    // /** x coordinate of the rectangle at the index i */
    // rectX(i) {
    //   return this.aX(i); // - this.height / 2;
    // },
    /** x coordinate of the rectangle at the index i */
    rectX(i) {
      return this.aX(i) - this.getShift;
    },
  },
  computed: {
     rectY() {
      return this.y - this.textFontSize + 1;
    },

    getShift() {
      return Math.round(((this.aX(1)-this.aX(0))/2)*10) / 10
      
    },
    getRect() {
      var displayedRect = [];
      this.track.features.forEach(f => {
        f.positions.split(',').forEach(s => {
          const pos = s.split('-');
          displayedRect.push({
            x: this.rectX(pos[0] - 1),
            color: this.colors[f.type],
            width: this.rectX(pos[1]) - this.rectX(pos[0]-1) 
          });
        });
      });
      return displayedRect;
    }
  }
};
</script>
