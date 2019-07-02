<template>
  <g>
    <rect :x="rectX"
      :y="rectY"
      :width="width"
      :height="height"
      :fill="sequence.color"
      fill-opacity="0.8"
    ></rect>
    <!-- display the letters -->
    <text
      v-for="(letter, letterIndex) in sequence.seqSplit"
      :key="letterIndex"
      :y="textY"
      :x="atextX[letterIndex]"
      :font-size="textFontSize"
      fill="black"
    >
      {{ letter }}
    </text>
  </g>
</template>

<script>
export default {
  name: 'MonoColorSequence',
  props: {
    rectX: { type: Number },
    rectY: { type: Number },
    textY: { type: Number },
    atextX: { type: Array },
    width: { type: Number },
    height: { type: Number },
    sequence: { type: Object },
    textFontSize: { type: Number }
  }
};
</script> 