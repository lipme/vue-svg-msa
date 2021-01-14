<template lang="">
  <g>
    <template v-for="c in categories">
      <template v-for="seqid in c.ids">
        <template v-if="hasIndex(seqid)">
          <glyph-circle
            v-if="form == 'circle'"
            :key="'c' + seqid"
            :col-number="colNumber"
            :seq-index="aSeqindex(seqid)"
            :circle-style="c.style"
            :label="c.label"
            :radius="radius"
            :show-label="showLabel"
            :a-y="aY"
          ></glyph-circle>
          <glyph-rect
            v-else
            :key="'c' + seqid"
            :col-number="colNumber"
            :seq-index="aSeqindex(seqid)"
            :rect-style="c.style"
            :label="c.label"
            :rect-height="radius * 2"
            :show-label="showLabel"
            :a-y="aY"
          ></glyph-rect>
        </template>
      </template>
    </template>
  </g>
</template>
<script>
import { coordinate } from '@/mixins/coordinate';
import GlyphCircle from '@/components/SvgMsa/GlyphCircle.vue';
import GlyphRect from '@/components/SvgMsa/GlyphRect.vue';

export default {
  components: {
    GlyphCircle,
    GlyphRect
  },
  mixins: [coordinate],
  props: {
    glyphSerie: {
      type: Object,
      default() {
        return {};
      }
    },
    colNumber: { type: Number, default: 1 },
    aSeqindex: { type: Function, default: () => {} },
    showLabel: { type: Boolean, default: false },
    radius: { type: Number, default: 5 },
    form: {
      type: String,
      default: 'rectangle',
      validator: function(value) {
        return ['circle', 'rectangle'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    categories() {
      return this.glyphSerie.categories;
    }
  },
  methods: {
    hasIndex(seqid) {
      return this.aSeqindex(seqid) >= 0;
    }
  }
};
</script>
<style lang=""></style>
