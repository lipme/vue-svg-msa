<template>
  <g id="scalebar">
    <!-- horizontal line -->
    <rect :x="fctScaleX(0) + 1" :y="scaleY" :width="getGlobalWidth" height="2px"></rect>

    <!-- vertical line for each nt -->
    <template v-for="x in length">
      <rect
        :key="'rect1-' + x"
        :y="scaleY"
        :x="fctScaleX(x - 1)"
        :width="getScaleWidth(x)"
        :height="getScaleHeight(x)"
      ></rect>

      <!-- number each 5nt -->
      <text
        v-if="(x % step) === 0 || x === 1"
        :key="'rect2-' + x"
        :x="fctScaleX(x - 1)"
        :y="scaleY - 2"
        font-size=10
        class="numberText"
      >
        {{ x }}
      </text>
    </template>
  </g>
</template>

<script>
export default {
  props: {
    scaleY: { type: Number },
    fctScaleX: { type: Function },
    length: {type: Number}
  },
  data() {
    return {
    step: 10,
    }
  },
  methods: {
    getScaleWidth(i) {
      return i === 1 || (i % this.step) === 0 ? '2px' : '1px';
    },
    getScaleHeight(i) {
      return i === 1 || (i % this.step) === 0 ? '8px' : '7px';
    },
  },
  computed:
  {
    getGlobalWidth()
    {
      var l = this.fctScaleX(this.length-1) - this.fctScaleX(0) + 5
      return l
    }
  }
};
</script>

<style scoped>
.numberText {
  fill: black;
  text-anchor: middle;
  font-family: 'monospace';
}

</style>
