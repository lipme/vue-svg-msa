<template>
  <g>
    <svg-track-label
      :y="y"
      :max-width="fctScaleX(0) + 1"
      :label="track.trackLabel"
      :text-font-size="textFontSize"
    ></svg-track-label>
    <svg-track-content
      :start="start"
      :length="length"
      :y="y"
      :track="track"
      :a-x="fctScaleX"
      :height="height"
    ></svg-track-content>
  </g>
</template>

<script>
import SvgTrackLabel from '@/components/alignment/svg/SvgTrackLabel.vue';
import SvgTrackContent from '@/components/alignment/svg/SvgTrackContent.vue';
export default {
  components: {
    SvgTrackLabel,
    SvgTrackContent,
  },
  props: {
    track: {
      type: Object,
      default: function() {
        return {};
      },
    },
    y: { type: Number, default: 1 },
    fctScaleX: { type: Function, default: () => {} },
    length: { type: Number, default: 150 },
    textFontSize: { type: Number, default: 10 },
    start: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      step: 10,
      height: 10,
    };
  },
  computed: {
    getGlobalWidth() {
      var l = this.fctScaleX(this.length - 1) - this.fctScaleX(0) + 5;
      return l;
    },
  },
  methods: {
    getScaleWidth(i) {
      return i === 1 || i % this.step === 0 ? '2px' : '1px';
    },
    getScaleHeight(i) {
      return i === 1 || i % this.step === 0 ? '8px' : '7px';
    },
  },
};
</script>

<style scoped>
.numberText {
  fill: black;
  text-anchor: middle;
  font-family: 'monospace';
}
</style>
