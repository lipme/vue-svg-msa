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
