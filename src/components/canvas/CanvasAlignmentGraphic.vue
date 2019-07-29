<template>
  <div :width="width" :height="height" id="alignment-graphic">
    <canvas-wrapper :width="widthCanvas" :height="heightCanvas">
      <!--style="width: 100%; height: 600px;"> -->
      <template v-for="(s, seqIndex) in seqs">
        <canvas-sequence-name-field
          :key="'name' + seqIndex"
          :y="textY[seqIndex]"
          :text-font-size="letterWidth"
          :name="s.name"
          :offset-x="offsetX"
        >
        </canvas-sequence-name-field>
        <canvas-mono-color-sequence
          :key="seqIndex"
          :rect-x="rectX[0]"
          :rect-y="rectY[seqIndex]"
          :atext-x="textX"
          :text-y="textY[seqIndex]"
          :height="letterAndPaddingWidth"
          :text-font-size="letterWidth"
          :width="aligmentWidth"
          :sequence="s"
        >
        </canvas-mono-color-sequence>
      </template>
    </canvas-wrapper>
  </div>
</template>


<script>
import CanvasWrapper from '@/components/canvas/CanvasWrapper.vue';
import CanvasMonoColorSequence from '@/components/canvas/CanvasMonoColorSequence.vue';
import CanvasSequenceNameField from '@/components/canvas/CanvasSequenceNameField.vue';

export default {
  name: 'app',
  components: {
    CanvasWrapper,
    CanvasMonoColorSequence,
    CanvasSequenceNameField,
  },
  props: {
    width: { type: Number },
    height: { type: Number },
    seqs: { type: Array },
  },
  data() {
    return {
      scaleBarY: 10,
      letterWidth: 13,
      letterPadding: 3,
      offsetX: 150,
    };
  },

  computed: {
    /**
     * Return the bigger size of all the displayed sequences.
     * @return {number} the bigger size of all the displayed sequences.
     */
    seqLengthMax() {
      let maxLength = 0;
      this.seqs.forEach((seq) => {
        if (maxLength < seq.seq.length) maxLength = seq.seq.length;
      });
      return maxLength;
    },
    aligmentWidth() {
      return this.letterAndPaddingWidth * this.seqLengthMax;
    },
    /**
     * Return the width of the canvas of the alignment.
     * @return {number} the width of the canvas of the alignment.
     */
    widthCanvas() {
      return this.offsetX + this.aligmentWidth;
    },
    /**
     * Return the height of the canvas of the alignment.
     * @return {number} the height of the canvas of the alignment.
     */
    heightCanvas() {
      const h = this.seqs.length * this.letterAndPaddingWidth + 2 * this.letterAndPaddingWidth;
      console.log("heightCanvas: "+ h);
      return h;
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
    },
  },
};
</script>