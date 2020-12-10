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
  <g>
    <MetadataRect v-for="(r, index) in coloredRect" :key="'m-' + index" :rect="r"></MetadataRect>
  </g>
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
    metadata: {
      type: Object,
      default() {
        return {};
      }
    },
    seqLen: { type: Number, default: 0 },
    seqNb: { type: Number, default: 0 },
    aSeqindex: { type: Function, default: () => {} },
    selectionSeqs: { type: Array, default: () => [] }
  },
  data() {
    return {
      defaultOpacity: 0.4,
      defaultOpacityContrast: 0.2
    };
  },
  computed: {
    /**
     * return true if some sequence are selected
     */
    selectionMode() {
      return this.selectionSeqs.length > 0;
    },

    /**
     * Get an array of rectangles to display
     */
    coloredRect() {
      let displayedRect = [];
      // for each categorie
      this.metadata.categories.forEach(c => {
        c.regions.forEach(r => {
          // draw rectangle on the sequence
          if (r.hasOwnProperty('id') && r.id !== '' && r.id !== '_all') {
            var regionStyle = this.consolidateStyle(c.style, r.id);
            displayedRect.push(this.buildRect(this.aSeqindex(r.id), r, regionStyle, this.seqlen));
          } else {
            // draw rectangle on all the sequences
            displayedRect.push(this.buildRegionRect(r, this.seqNb, c.style, ''));
          }
        });
      });
      displayedRect = displayedRect.flat();

      return displayedRect;
    }
  },
  methods: {
    /**
     * modify the style according to the sequence: if it is a selected
     * sequence or not, change the opacity
     */
    consolidateStyle(s, seqid) {
      var regionStyle = Object.assign({}, s);

      if (regionStyle.hasOwnProperty('fill')) {
        if (!regionStyle.hasOwnProperty('fill-opacity')) {
          regionStyle['fill-opacity'] = this.defaultOpacity;
        }

        // fill the opacity according to the state of the sequence (selected or not)
        if (
          this.selectionMode === true &&
          this.selectionSeqs.find(o => o.id == seqid) == undefined
        ) {
          regionStyle['fill-opacity'] = regionStyle['fill-opacity'] - this.defaultOpacityContrast;
        }
      }
      if (!regionStyle.hasOwnProperty('fill-opacity')) regionStyle['fill-opacity'] = 0.0;

      return regionStyle;
    }
  }
};
</script>

<style></style>
