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
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
