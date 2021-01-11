<template lang="">
  <g>
    <template v-for="c in categories">
      <template v-for="seqid in c.ids">
        <circle
          v-if="hasIndex(seqid)"
          :key="'c' + seqid"
          :cx="cx"
          :cy="cy(seqid)"
          :r="radius"
          :style="c.style"
        >
          <title v-if="showLabel">{{ c.label }}</title>
        </circle>
      </template>
    </template>
  </g>
</template>
<script>
import { coordinate } from '@/mixins/coordinate';
export default {
  mixins: [coordinate],
  props: {
    glyphSerie: {
      type: Object,
      default() {
        return {};
      }
    },
    x: { type: Number, default: 1 },
    aSeqindex: { type: Function, default: () => {} },
    showLabel: { type: Boolean, default: false },
    radius: { type: Number, default: 5 }
  },
  computed: {
    categories() {
      return this.glyphSerie.categories;
    },
    cx() {
      return this.x * this.radius * 2;
    }
  },
  methods: {
    cy(seqid) {
      return this.aY(this.aSeqindex(seqid)) - this.radius;
    },
    hasIndex(seqid) {
      return this.aSeqindex(seqid) >= 0;
    }
  }
};
</script>
<style lang=""></style>
