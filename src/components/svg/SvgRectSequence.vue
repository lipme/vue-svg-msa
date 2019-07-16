<template>
 <rect
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      :fill="color"
      fill-opacity="0.8"
    ></rect>
</template>
<script>

export default {
  props: {
    x: { type: Number },
    y: { type: Number },
    width: { type: Number },
    height: { type: Number },
    color: { type: String },
  },
}
</script>