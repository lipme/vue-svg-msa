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
  <g id="scalebar">
    <!-- horizontal line -->
    <rect :x="fctScaleX(0) + 1" :y="y" :width="getGlobalWidth" height="2px"></rect>

    <!-- vertical line for each nt -->
    <template v-for="x in length">
      {{ x }}
      <rect
        :key="'rect1-' + x"
        :y="y"
        :x="fctScaleX(x - 1)"
        :width="getScaleWidth(x)"
        :height="getScaleHeight(x)"
      ></rect>

      <!-- number each step nt -->
      <text
        v-if="(x + start) % step === 0"
        :key="'rect2-' + x"
        :x="fctScaleX(x - 1)"
        :y="y - 2"
        font-size="10"
        >{{ x + start }}</text
      >
    </template>
  </g>
</template>

<script>
export default {
  props: {
    y: { type: Number, default: 1 },
    fctScaleX: { type: Function, default: () => {} },
    length: { type: Number, default: 800 },
    start: { type: Number, default: 0 }
  },
  data() {
    return {
      step: 10
    };
  },
  computed: {
    getGlobalWidth() {
      const l = this.fctScaleX(this.length - 1) - this.fctScaleX(0) + 5;
      return l;
    }
  },
  methods: {
    getScaleWidth(i) {
      return i === 1 || (i + this.start) % this.step === 0 ? '2px' : '1px';
    },
    getScaleHeight(i) {
      return i === 1 || (i + this.start) % this.step === 0 ? '8px' : '7px';
    }
  }
};
</script>
