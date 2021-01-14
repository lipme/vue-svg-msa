<template>
  <circle :cx="cx" :cy="cy" :r="radius" :style="circleStyle">
    <title v-if="showLabel">{{ label }}</title>
  </circle>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
export default {
  mixins: [coordinate],
  props: {
    colNumber: { type: Number, default: 1 },
    seqIndex: { type: Number, default: 1 },
    circleStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    label: {
      type: String,
      default: ''
    },
    showLabel: { type: Boolean, default: false },
    radius: { type: Number, default: 5 }
  },
  computed: {
    cx() {
      return this.colNumber * this.radius * 2;
    },
    cy() {
      return this.aY(this.seqIndex) - this.radius;
    }
  }
};
</script>
