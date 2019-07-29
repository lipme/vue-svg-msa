<template>
  <text :x="1" :y="y" :font-size="textFontSize" fill="black" font-family="monospace" @click="$emit('click', name)" class="clickabletext">
    <title>{{ name }}</title>
    {{ displayedName }}
  </text>
</template>

<script>
export default {
  props: {
    y: { type: Number },
    textFontSize: { type: Number },
    name: { type: String },
    offsetX: { type: Number },
  },
  computed: {
    displaySeqNameLength() {
      return this.offsetX / 10;
    },
    displayedName() {
      if (this.name.length >= this.displaySeqNameLength) {
        let title = '';
        const splitName = this.name.split('');
        splitName.forEach((x) => {
          if (title.length < this.displaySeqNameLength) title = title.concat(String(x));
        });
        title = title.concat('...');
        return title;
      } return this.name;
    },
  },
};
</script>

<style> 
.clickabletext { 
  cursor:pointer;
  } 
</style>
