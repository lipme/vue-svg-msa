<template>
  <g>
    <rect
      :x="rectX"
      :y="rectY"
      :width="width"
      :height="height"
      :fill="fill"
      fill-opacity="0.8"
    ></rect>

    <template v-if="unsteady">
      <!-- Display the sequence in one text element.
               Careful: the sequence is not exaclty align with the scalebar.
               TODO: to improve -->
      <text
        :y="textY"
        :x="atextX[0]"
        :font-size="textFontSize"
        letter-spacing="11px"
        font-family="monospace"
        fill="black"
        :font-weight="fontWeight"
      >
        {{ sequence.seq }}
      </text>
    </template>

    <template v-else>
      <text
        v-for="(letter, letterIndex) in sequence.seq.split('')"
        :key="letterIndex"
        :y="textY"
        :x="atextX[letterIndex]"
        :font-size="textFontSize"
        fill="black"
      >
        {{ letter }}
      </text>
    </template>
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
    textFontSize: { type: Number },
    // if 'unsteady' is activated, the sequence is display in one text element
    // the display time is very short but the nt are not perfectly align with scalebar
    unsteady: { type: Boolean, default: false }
  },
  data() {
    return {
      defaultColor: 'white'
    };
  },
  computed: {
    fill() {
      if (this.sequence.color) return this.sequence.color;
      else {
        return this.defaultColor;
      }
    },
    fontWeight() {
      if (this.sequence.isConsensus)
      {
        return "bold"
      }
      else {
        return "normal"
      }
    }
  }
};
</script>
