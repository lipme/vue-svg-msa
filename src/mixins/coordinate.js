export const coordinate = {
  props: {
    aX: { type: Function, default: () => {} },
    aY: { type: Function, default: () => {} }
  },
  computed: {
    getLetterWidth() {
      return this.aX(1) - this.aX(0);
    },
    getShift() {
      return Math.round((this.getLetterWidth / 2) * 10) / 10;
    },
    getTrackHeight() {
      return this.aY(1) - this.aY(0);
    }
  },
  methods: {
    /** x coordinate of the rectangle at the index i */
    rectX(i) {
      return this.aX(i) - this.getShift;
    },
    rectY(i) {
      return this.aY(i) - this.getTrackHeight + 3;
    },
    seqWidth(seqLength) {
      return this.aX(seqLength) - this.aX(0);
    },
    /**
     * Return an array of rectangle objects to display
     * @param {*} y
     * @param {*} o
     * @param {*} o_style
     * @param {*} seqLen
     */
    buildRect(y, o, o_style, seqLen) {
      let displayedRect = [];
      if (!o.hasOwnProperty('ranges')) {
        displayedRect.push(this.newSeqRect(y, seqLen, o_style));
      } else {
        o.ranges.forEach(pos => {
          displayedRect.push(
            this.newRect(
              this.rectX(pos[0] - 1),
              this.rectY(y),
              (pos[1] - pos[0] + 1) * this.getLetterWidth,
              this.getTrackHeight,
              o_style
            )
          );
        });
      }
      return displayedRect;
    },
    /**
     * return a new object corresponding to a rect to color all the sequence
     */
    newSeqRect(y, seqLen, style, rectclass) {
      return this.newRect(
        this.rectX(0),
        this.rectY(y),
        this.seqWidth(seqLen),
        this.getTrackHeight,
        style,
        rectclass
      );
    },

    newNtRect(x, y, style) {
      return this.newRect(
        this.rectX(x),
        this.rectY(y),
        this.getLetterWidth,
        this.getTrackHeight,
        style
      );
    },
    newRect(x, y, w, h, s, c) {
      return {
        x: x,
        y: y,
        width: w,
        height: h,
        style: s,
        class: c
      };
    }
  }
};
