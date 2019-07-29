<template>
  <g id="sequence">
    <rect v-if="fill !== ''"
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
        :y="y"
        :x="aX(0)"
        :font-size="textFontSize"
        :class="getClass"
        letter-spacing="2px"
      >
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
  </g>
</template>

        
<script>
export default {
  name: 'MonoColorSequence',
  props: {
    y: { type: Number },
    aX: { type: Function },
    width: { type: Number },
    height: { type: Number },
    sequence: { type: Object },
    textFontSize: { type: Number },
    // if 'unsteady' is activated, the sequence is display in one text element
    // the display time is very short but the nt are not perfectly align with scalebar
    unsteady: { type: Boolean, default: false },
  },
  data() {
    return {
      defaultColor: 'white'
    };
  },
  computed: {
    /** x coordinate of the rectangle */
    rectX() {
      //return this.aX(i) - this.height / 2;
      return this.aX(0)
    },
    rectY() {
      return this.y - this.textFontSize + 1;
    },
    getClass() {
      return {
        consensus: (this.sequence.isConsensus === true && this.sequence.isFinal === true),
        nodesequence: (this.sequence.isFinal === false)
      }
    },
    fill() {
      if (this.sequence.color) return this.sequence.color;
      else {
        return "";
      }
    },
  }
};
</script>

<style scoped>
#sequence {
  font-weight: normal;
  fill: black;
  font-family: "monospace";
  /* font: "fira mono"; */
  text-align: justify;
}
.consensus{
      font-weight: bold;
}
.nodesequence{
    font-style: italic;
}
</style>