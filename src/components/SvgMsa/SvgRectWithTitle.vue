<template>
  <rect
    :x="rectX(x)"
    :y="rectY(y)"
    :height="getTrackHeight"
    :width="width"
    :style="rectStyle"
    @click="$emit('click')"
  >
    <title style="text-align:left">
      {{ getDescr }}
    </title>
  </rect>
</template>
<script>
import { coordinate } from '@/mixins/coordinate';

export default {
  mixins: [coordinate],
  props: {
    x: { type: Number, default: 1 },
    y: { type: Number, default: 1 },
    width: { type: Number, default: 1 },
    descr: { type: String, default: '' },
    rectStyle: {
      type: Object,
      default() {
        return { 'fill-opacity': 0 };
      }
    }
  },
  computed: {
    getDescr() {
      let formattedDescr;
      if (this.descr !== '') {
        formattedDescr = this.descr + ' - ';
      }
      formattedDescr += 'Click to get the sequence';
      return formattedDescr;
    }
  }
};
</script>
<style scoped></style>
