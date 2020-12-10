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
