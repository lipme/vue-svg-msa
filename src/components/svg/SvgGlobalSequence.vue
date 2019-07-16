<template>
  <g>
    <rect
      v-for="(r, rindex) in getRect"
      :key="'r'+rindex"
      :x="r.x1"
      :y="y"
      :width="r.x2 - r.x1 + 1"
      :fill="color"
      :height="height"
    >
    </rect>

    <line
      v-for="(l, lindex) in getLines"
      :key="'l'+lindex"
      :x1="l.x1"
      :y1="y"
      :x2="l.x2"
      :y2="y"
      :style="getLineStyle"
    >
    </line>
  </g>
</template>

<script>
export default {
  props: {
    sequence: String,
    y: Number,
    height: Number,
    color: String
  },
  data() {
    return {};
  },
  computed: {
    buildElt() {
      var elt = [];
      const a = this.sequence.split('');
      //console.log(this.sequence);
      var prevElt = '';
      var prevPos = -1;
      var curElt = '';
      a.forEach((e, i) => {
        curElt = this.elt(e);
        if (curElt != prevElt) {
          if (prevPos !== -1) {
            elt.push({ elt: prevElt, x1: prevPos, x2: i - 1 });
            //console.log('create a elt from ' + prevPos + ' to ' + (i - 1));
          }
          prevPos = i;
          prevElt = curElt;
        }
      });
      elt.push({ elt: prevElt, x1: prevPos, x2: this.sequence.length - 1 });
      return elt;
    },
    getRect() {
      return this.buildElt.filter(e => e.elt === 'rect');
    },
    getLines() {
      return this.buildElt.filter(e => e.elt === 'line');
    },
    getLineStyle() {
        return "stroke:"+this.color+";"
    }
  },
  methods: {
    elt(e) {
      var type = 'rect';
      if (e === '-') type = 'line';
      return type;
    }
  }
};
</script>
