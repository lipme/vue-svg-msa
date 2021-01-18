<template>
  <rect :x="rectx" :y="recty" :height="rectHeight" :width="rectHeight" :style="rectStyle">
    <title v-if="showLabel" style="text-align:left">
      {{ label }}
    </title>
  </rect>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
export default {
  mixins: [coordinate],
  props: {
    colNumber: { type: Number, default: 1 },
    seqIndex: { type: Number, default: 1 },
    rectStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    rectHeight: { type: Number, default: 1 },
    label: {
      type: String,
      default: ''
    },
    showLabel: { type: Boolean, default: false },
    radius: { type: Number, default: 5 }
  },
  computed: {
    rectx() {
      return (this.colNumber - 1) * this.rectHeight;
    },
    recty() {
      return this.rectY(this.seqIndex) + this.rectHeight / 4;
    }
  }
};
</script>
