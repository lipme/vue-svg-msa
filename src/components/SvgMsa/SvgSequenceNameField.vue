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
  <text
    :x="1"
    :y="y"
    :font-size="textFontSize"
    :fill="textColor"
    font-family="monospace"
    :class="getClass"
    @click="$emit('click', name)"
  >
    <title>{{ name }}</title>
    {{ displayedName }}
  </text>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    y: { type: Number, default: 1 },
    offsetX: { type: Number, default: 0 },
    textFontSize: { type: Number, default: 15 },
    textColor: { type: String, default: 'black' },
    isClickable: { type: Boolean, default: false }
  },
  computed: {
    getClass() {
      let textClass = '';
      if (this.isClickable) textClass = 'clickable';
      return textClass;
    },
    displaySeqNameLength() {
      return this.offsetX / 10 + 2;
    },
    displayedName() {
      if (this.name.length > this.displaySeqNameLength) {
        let title = '';
        const splitName = this.name.split('');
        splitName.forEach(x => {
          if (title.length < this.displaySeqNameLength - 2) title = title.concat(String(x));
        });
        title = title.concat('..');
        return title;
      }
      return this.name;
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
