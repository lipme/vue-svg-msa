<!-- Copyright 2020 [LIPM]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License.
-->
<template>
  <g id="sequence">
    <!-- draw colored rectangles -->
    <MetadataRect v-for="(r, index) in coloredRect" :key="index" :rect="r"></MetadataRect>
    <text
      :y="aY(y)"
      :x="aX(0)"
      dx="-5"
      :font-size="textFontSize"
      :class="getClass"
      :textLength="textLength"
      lengthAdjust="spacingAndGlyphs"
    >
      {{ sequence.seq }}
    </text>
    <svg-rect-with-title
      :x="0"
      :y="y"
      :width="getSeqWidth"
      :descr="sequence.name"
      :a-x="aX"
      :a-y="aY"
      :rect-style="GetRectStyle"
      @click="$emit('click')"
    ></svg-rect-with-title>
  </g>
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
import { sequence } from '@/mixins/sequence';
import SvgRectWithTitle from '@/components/SvgMsa/SvgRectWithTitle.vue';
import MetadataRect from '@/components/SvgMsa/MetadataRect.vue';

export default {
  name: 'SvgSimpleSequence',
  components: { MetadataRect, SvgRectWithTitle },
  mixins: [coordinate, sequence],
  props: {
    sequence: {
      type: Object,
      default() {
        return {};
      }
    },
    y: { type: Number, default: 1 },
    textFontSize: { type: Number, default: 15 }
  },
  computed: {
    getSeqWidth() {
      return this.seqWidth(this.sequence.seq.length);
    },
    textLength() {
      var a = this.aX(this.sequence.seq.length) - this.aX(0);
      return a;
    },
    GetRectStyle() {
      if (this.coloring.includes('seqcolor') && this.sequence.color !== '') {
        return this.getStyle(this.sequence.color, this.opacity);
      }
      return { 'fill-opacity': 0 };
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
      return displayedRect;
    }
  }
};
</script>

<style scoped>
#sequence {
  font-family: monospace;
  font-weight: normal;
  fill: black;
  /* text-align: justify; */
}
.consensus {
  font-weight: bold;
}
.nodesequence {
  font-style: italic;
}
</style>
