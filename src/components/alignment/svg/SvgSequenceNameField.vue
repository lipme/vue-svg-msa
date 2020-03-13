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
    y: { type: Number, default: 1 },
    textFontSize: { type: Number, default: 15 },
    name: { type: String, default: '' },
    offsetX: { type: Number, default: 0 },
    isClickable: { type: Boolean, default: false },
    textColor: { type: String, default: 'black' },
  },
  computed: {
    getClass() {
      var textClass = '';
      if (this.isClickable) textClass = 'clickable';
      return textClass;
    },
    displaySeqNameLength() {
      return this.offsetX / 10;
    },
    displayedName() {
      if (this.name.length >= this.displaySeqNameLength) {
        let title = '';
        const splitName = this.name.split('');
        splitName.forEach(x => {
          if (title.length < this.displaySeqNameLength) title = title.concat(String(x));
        });
        title = title.concat('...');
        return title;
      }
      return this.name;
    },
  },
};
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
