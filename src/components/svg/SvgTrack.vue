<template>
  <g>
    <svg-track-label :y="y" :maxWidth="fctScaleX(0) + 1" :label="track.trackLabel" :textFontSize="textFontSize"></svg-track-label>
    <svg-track-content :y="y" :track="track" :aX="fctScaleX" :height="height"></svg-track-content>
  </g>
</template>

<script>
import SvgTrackLabel from '@/components/svg/SvgTrackLabel.vue'
import SvgTrackContent from '@/components/svg/SvgTrackContent.vue'
export default {
    components:{
    SvgTrackLabel,
    SvgTrackContent
    },
  props: {
    track: {type: Object},
    y: { type: Number },
    fctScaleX: { type: Function },
    length: {type: Number},
    textFontSize: {type: Number, default: 10}
  },
  data() {
    return {
    step: 10,
    height: 10,
    }
  },
  methods: {
    getScaleWidth(i) {
      return i === 1 || (i % this.step) === 0 ? '2px' : '1px';
    },
    getScaleHeight(i) {
      return i === 1 || (i % this.step) === 0 ? '8px' : '7px';
    },
  },
  computed:
  {
    getGlobalWidth()
    {
      var l = this.fctScaleX(this.length-1) - this.fctScaleX(0) + 5
      return l
    }
  }
};
</script>

<style scoped>
.numberText {
  fill: black;
  text-anchor: middle;
  font-family: 'monospace';
}

</style>
