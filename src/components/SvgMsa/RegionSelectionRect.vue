<template>
  <!-- draw a rectangle to select a region -->
  <rect :x="rectX(x1)" :y="rectY(y1)" :height="regionHeight" :width="regionWidth" class="selected"></rect>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
export default {
  mixins: [coordinate],
  props: {
    x1: { type: Number, default: 1 },
    y1: { type: Number, default: 1 },
    x2: { type: Number, default: 1 },
    y2: { type: Number, default: 1 }
  },
  computed: {
    regionWidth() {
      return (this.x2 - this.x1 + 1) * this.getLetterWidth;
    },
    regionHeight() {
      return (this.y2 - this.y1) * this.getTrackHeight;
    }
  }
};
</script>
<style scoped>
.selected {
  fill-opacity: 0.1;
  stroke: black;
  stroke-opacity: 1;
  stroke-width: 1.5;
  stroke-dasharray: 4, 2;
}
</style>
