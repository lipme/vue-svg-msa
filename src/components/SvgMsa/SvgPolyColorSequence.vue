<template>
  <g>
    <!-- draw colored rectangles -->
    <MetadataRect v-for="(r, index) in coloredRect" :key="index" :rect="r"></MetadataRect>

    <!-- display on text element for each nt -->
    <template v-for="(item, id) in seqNucleotides">
      <text
        :key="'txt-' + id"
        text-anchor="middle"
        :x="aX(id)"
        :y="aY(y)"
        :class="getClass"
        :font-size="textFontSize"
        >{{ item.letter }}</text
      >
      <svg-rect-with-title
        :key="'rect-' + id"
        :x="id"
        :y="y"
        :width="getLetterWidth"
        :descr="sequence.name + item.pos"
        :a-x="aX"
        :a-y="aY"
        @click="$emit('click')"
      ></svg-rect-with-title>
    </template>
  </g>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
import { sequence } from '@/mixins/sequence';

import MetadataRect from '@/components/SvgMsa/MetadataRect.vue';
import SvgRectWithTitle from '@/components/SvgMsa/SvgRectWithTitle.vue';

export default {
  components: {
    MetadataRect,
    SvgRectWithTitle
  },
  mixins: [coordinate, sequence],
  computed: {
    /**
     * return an object array. each object represents a nucleotide:
     * letter : the nucleotide,
     * x: its x position,
     * pos: a string given its position in the original sequence (without gap)
     */
    seqNucleotides() {
      return this.sequence.seq.split('').map((s, i) => ({
        letter: s,
        x: this.rectX(i),
        pos: this.sequence.oriseqpositions[i] > 0 ? ':' + this.sequence.oriseqpositions[i] : ''
      }));
    },
    /**
     * Get the rectangles to display according to the coloring value
     *  Return an array of objects
     */
    coloredRect() {
      let displayedRect = [];
      if (this.coloring.includes('auto')) {
        displayedRect = this.sequence.seq.split('').map((l, i) => {
          return this.newNtRect(i, this.y, this.getStyle(this.getNtColor(l), this.opacity));
        });
      }
      if (this.coloring.includes('seqcolor') && this.sequence.color !== '') {
        displayedRect.push(
          this.newSeqRect(this.y, this.seqLength, this.getStyle(this.sequence.color, this.opacity))
        );
      }
      return displayedRect;
    },
    seqLength() {
      return this.sequence.seq.length;
    }
  }
};
</script>
<style scoped>
.consensus {
  font-weight: bold;
}
</style>
