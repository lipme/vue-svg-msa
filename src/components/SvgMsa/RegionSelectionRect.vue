<template>
  <!-- draw a rectangle to select a region -->
  <MetadataRect :rect="rect"></MetadataRect>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
import MetadataRect from '@/components/SvgMsa/MetadataRect.vue';

export default {
  components: {
    MetadataRect
  },
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
    },
    rect() {
      return this.newRect(
        this.rectX(this.x1),
        this.rectY(this.y1),
        this.regionWidth,
        this.regionHeight,
        '',
        'selected'
      );
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
