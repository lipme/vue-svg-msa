<template lang="">
  <circle :cx="cX(x)" :cy="cY(y)" r="5" fill="red" />
</template>

<script>
import { coordinate } from '@/mixins/coordinate';
export default {
  mixins: [coordinate],
  props: {
    x: { type: Number, default: 1 },
    y: { type: Number, default: 1 }
  }
};
</script>
<style lang=""></style>
