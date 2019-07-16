<template>
  <g>
    <!-- horizontal line -->
    <rect :x="a_scaleX[0] + 1" :y="scaleY" width="100%" height="2px"></rect>

    <!-- vertical line for each nt -->
    <template v-for="x in a_scaleX.length">
      <rect
        :key="'rect1-' + x"
        :y="scaleY"
        :x="a_scaleX[x - 1]"
        :width="getScaleWidth(x)"
        :height="getScaleHeight(x)"
      ></rect>

      <!-- number each 5nt -->
      <text
        v-if="x % 5 === 0 || x === 1"
        :key="'rect2-' + x"
        :x="a_scaleX[x - 1]"
        :y="scaleY - 2"
        fill="black"
        font-size="10"
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
    a_scaleX: { type: Array },
  },
  methods: {
    getScaleWidth(i) {
      return i === 1 || i % 5 === 0 ? '2px' : '1px';
    },
    getScaleHeight(i) {
      return i === 1 || i % 5 === 0 ? '8px' : '7px';
    },
  },
};
</script>
