<template>
  <div :width="width" :height="height" id="alignment-graphic">
    <svg :width="widthSvg" :height="heightSvg">
      <svg-scale-bar :scaleY="scaleBarY" :a_scaleX="textX"></svg-scale-bar>

      <template v-for="(s, seqIndex) in seqs">
        <!-- Name of the sequence -->
        <svg-sequence-name-field
          :key="seqIndex"
          :y="textY[seqIndex]"
          :text-font-size="letterWidth"
          :name="s.name"
          :offset-x="offsetX"
        ></svg-sequence-name-field>

        <!-- CASE 1 : color of each nt is automotically computed -->
        <template v-if="autocoloring">
          <svg-poly-color-sequence
            :key="'rect' + seqIndex"
            :sequence="s"
            :arect-x="rectX"
            :rect-y="rectY[seqIndex]"
            :atext-x="textX"
            :text-y="textY[seqIndex]"
            :height="letterAndPaddingWidth"
            :text-font-size="letterWidth"
            autocoloring
          ></svg-poly-color-sequence>
        </template>
        <!-- CASE 2 : only one color by sequence -->
        <template v-else>
          <svg-mono-color-sequence
            :key="'rect' + seqIndex"
            :sequence="s"
            :rect-x="rectX[0]"
            :rect-y="rectY[seqIndex]"
            :atext-x="textX"
            :text-y="textY[seqIndex]"
            :height="letterAndPaddingWidth"
            :text-font-size="letterWidth"
            :width="aligmentWidth"
            :unsteady="unsteady"
          ></svg-mono-color-sequence>
        </template>
      </template>
    </svg>
  </div>
</template>


<script>
import SvgScaleBar from '@/components/svg/SvgScaleBar.vue';
import SvgMonoColorSequence from '@/components/svg/SvgMonoColorSequence.vue';
import SvgPolyColorSequence from '@/components/svg/SvgPolyColorSequence.vue';
import SvgSequenceNameField from '@/components/svg/SvgSequenceNameField.vue';

// import { ALPN_ENABLED } from 'constants';
export default {
  name: 'AlignmentGraphic',
  components: {
    SvgScaleBar,
    SvgMonoColorSequence,
    SvgPolyColorSequence,
    SvgSequenceNameField
  },
  props: {
    autocoloring: { type: Boolean, default: false },
    width: { type: Number },
    height: { type: Number },
    seqs: { type: Array },
    // if 'unsteady' is activated, the sequence is display in one text element
    // the display time is very short but the nt are not perfectly align with scalebar
    unsteady: { type: Boolean, default: false }
  },
  data() {
    return {
      scaleBarY: 10,
      letterWidth: 13,
      letterPadding: 3,
      offsetX: 200
    };
  },
  computed: {
    /**
     * Return the bigger size of all the displayed sequences.
     * @return {number} the bigger size of all the displayed sequences.
     */
    seqLengthMax() {
      let maxlen = 0;
      this.seqs.forEach(seq => {
        if (maxlen < seq.seq.length) {
          maxlen = seq.seq.length;
        }
      });
      return maxlen;
    },
    aligmentWidth() {
      return this.letterAndPaddingWidth * this.seqLengthMax;
    },
    /**
     * Return the width of the SVG of the alignment.
     * @return {number} the width of the SVG of the alignment.
     */
    widthSvg() {
      return this.offsetX + this.aligmentWidth;
    },
    /**
     * Return the height of the SVG of the alignment.
     * @return {number} the height of the SVG of the alignment.
     */
    heightSvg() {
      return this.seqs.length * this.letterAndPaddingWidth + 2 * this.letterAndPaddingWidth;
    },
    letterAndPaddingWidth() {
      return this.letterWidth + 2 * this.letterPadding;
    },

    /**
     * Return an array of the coordinate 'x' values to display 'rect' element.
     * rect[10] is the X coordinate of the rect of the 10th letter of a seq.
     * @return {number}  an array of the coordinate 'x' values.
     */
    rectX() {
      const xs = [];
      for (let i = 0; i <= this.seqLengthMax; i += 1) {
        xs.push(i);
      }
      return xs.map(i => this.offsetX + (i + 1) * this.letterAndPaddingWidth);
    },
    /**
     * Return an array of the coordinate 'x' values. textX[10]
     * is the X coordinate of the 10th letter of a sequence.
     * @return {number}  an array of the coordinate 'x' values.
     */
    textX() {
      return this.rectX.map(i => i + this.letterPadding);
    },

    rectY() {
      return this.seqs.map((s, index) => (index + 1) * this.letterAndPaddingWidth + 1);
    },
    textY() {
      return this.rectY.map(i => i + this.letterWidth + 1);
    }
  },
  methods: {
    /**
     * Take the id of a sequence.
     * @param {Object} event The ID and the selected Boolean of the selected sequence.
     */
    onClick(data) {
      this.$emit('onClick', data);
    }
  }
};
</script>

<style lang="scss">
#alignment-graphic {
  margin: 3px;
  padding: 10px;
  border: thin solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  color: black;
  overflow-x: scroll;
}

.tooltip {
  display: block;
  z-index: 10000;

  .tooltip-inner {
    background: lightgrey;
    color: black;
    border-radius: 6px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: lightgrey;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
