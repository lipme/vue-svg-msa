<template>
  <!-- draw a rectangle to select a region -->
  <rect :x="rectX(0)" :y="rectY(y)" :height="getTrackHeight" :width="getWidth" class="selected"></rect>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
export default {
  mixins: [coordinate],
  props: {
    y: { type: Number, default: 1 },
    seqlen: { type: Number, default: 0 }
  },
  computed: {
    getWidth() {
      return this.aX(this.seqlen) - this.aX(0);
    }
  }
};
</script>
<style scoped>
.selected {
  fill-opacity: 0;
  stroke: black;
  stroke-opacity: 1;
  stroke-width: 2;
  stroke-dasharray: 4, 2;
}
</style>
