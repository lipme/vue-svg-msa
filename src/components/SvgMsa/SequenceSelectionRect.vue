<template>
  <!-- draw a rectangle to select a region -->
  <!-- <rect :x="rectX(0)" :y="rectY(y)" :height="getTrackHeight" :width="getWidth" class="selected"></rect> -->
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
    y: { type: Number, default: 1 },
    seqlen: { type: Number, default: 0 }
    // style: {
    //   type: Object,
    //   default() { return {}}
  },
  computed: {
    rect() {
      return this.newSeqRect(this.y, this.seqlen, '', 'selected');
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
