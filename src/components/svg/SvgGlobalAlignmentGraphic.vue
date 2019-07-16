<template>
  <div :width="width" :height="height" id="global-alignment-graphic">
    <svg :width="width" :height="height">
      <!--<svg-scale-bar :scaleY="scaleBarY" :a_scaleX="textX"></svg-scale-bar>-->
      <!-- <svg-rect-sequence
        v-for="(s, seqIndex) in seqs"
        :key="seqIndex"
        :x="1"
        :y="rectY[seqIndex]"
        :width="aligmentWidth"
        :height="rectHeight"
        :color="s.color"
      ></svg-rect-sequence> -->
      <!-- <svg-rect-sequence
        v-for="(g, seqIndex) in groups"
        :key="seqIndex"
        :x="1"
        :y="g.y"
        :width="aligmentWidth"
        :height="rectHeight"
        :color="g.color"
      ></svg-rect-sequence> -->
      <svg-global-sequence
        v-for="(s, seqIndex) in seqs"
        :key="seqIndex"
        :sequence="s.seq"
        :y="rectY[seqIndex]"
         :height="rectHeight"
         :color="s.color"
      ></svg-global-sequence>
    </svg>
  </div>
</template>
<script>
import SvgRectSequence from '@/components/svg/SvgRectSequence.vue';
import SvgGlobalSequence from '@/components/svg/SvgGlobalSequence.vue';

export default {
  components: {
    SvgRectSequence,
    SvgGlobalSequence
  },
  props: {
    width: { type: Number, default: 1500 },
    height: { type: Number, default: 800 },
    seqs: { type: Array }
  },
  data() {
    return {
      minRectHeight: 2,
      maxRectHeight: 20
    };
  },
  computed: {
    //
    seqNumber() {
      return this.seqs.length;
    },
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
      return this.rectHeight * this.seqLengthMax;
    },
    alignmentHeight() {
      return this.rectHeight * this.seqNumber;
    },
    rectY() {
      return this.seqs.map((s, index) => index * (this.rectHeight + 1));
    },

    seqRectHeight() {
      return Math.trunc(this.height / this.seqNumber);
    },
    rectHeight() {
      var testHeight = this.seqRectHeight;

      if (testHeight > this.maxRectHeight) {
        testHeight = this.maxRectHeight;
      } else {
        if (testHeight < this.minRectHeight) {
          console.log('two much sequence to display all the rect');
          testHeight = this.minRectHeight;
        }
      }
      //console.log('rectHeight' + testHeight);
      return testHeight;
    },
    groups() {
      if (this.seqRectHeight >= this.minRectHeight) {
        console.log('able to display all the sequence');
        return this.seqs.map((s, index) => ({
          color: s.color,
          y: this.rectY[index]
        }));
      } else {
        return {};
      }
    }
  }
};
</script>