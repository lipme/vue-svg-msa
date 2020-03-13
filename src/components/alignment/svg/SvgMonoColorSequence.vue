<template>
  <g id="sequence">
    <template v-if="unsteady">
      <!-- Display the sequence in one text element.
               Careful: the sequence is not exaclty align with the scalebar.
               TODO: to improve -->
      <text :y="y" :x="aX(0)" :font-size="textFontSize" :class="getClass" letter-spacing="2px">
        {{ sequence.seq }}
      </text>
    </template>

    <template v-else>
      <text
        v-for="(letter, letterIndex) in sequence.seq.split('')"
        :key="letterIndex"
        :y="y"
        :x="aX(letterIndex)"
        :font-size="textFontSize"
        :class="getClass"
      >
        {{ letter }}
      </text>
    </template>
    <rect :x="rectX" :y="rectY" :width="width" :height="height" :fill="fill" fill-opacity="0.2"
      ><title>{{ seqName }}</title></rect
    >
  </g>
</template>

<script>
export default {
  name: 'MonoColorSequence',
  props: {
    y: { type: Number, default: 1 },
    aX: { type: Function, default: () => {} },
    width: { type: Number, default: 500 },
    height: { type: Number, default: 20 },
    sequence: {
      type: Object,
      default: function() {
        return {};
      },
    },
    textFontSize: { type: Number, default: 12 },
    // if 'unsteady' is activated, the sequence is display in one text element
    // the display time is very short but the nt are not perfectly align with scalebar
    unsteady: { type: Boolean, default: false },
    seqName: { type: String, default: '' },
  },
  data() {
    return {
      defaultColor: 'white',
    };
  },
  computed: {
    /** x coordinate of the rectangle */
    rectX() {
      //return this.aX(i) - this.height / 2;
      return this.aX(0);
    },
    rectY() {
      return this.y - this.textFontSize + 1;
    },
    getClass() {
      return {
        consensus: this.sequence.isConsensus === true && this.sequence.isFinal === true,
        nodesequence: this.sequence.isFinal === false,
      };
    },
    fill() {
      if (this.sequence.color) return this.sequence.color;
      else {
        return this.defaultColor;
      }
    },
  },
};
</script>

<style scoped>
#sequence {
  font-weight: normal;
  fill: black;
  font-family: 'monospace';
  /* font: "fira mono"; */
  text-align: justify;
}
.consensus {
  font-weight: bold;
}
.nodesequence {
  font-style: italic;
}
</style>
