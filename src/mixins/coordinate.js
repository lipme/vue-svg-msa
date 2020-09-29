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
    regionWidth(x1, x2) {
      return (x2 - x1 + 1) * this.getLetterWidth;
    },
    regionHeight(y1, y2) {
      return (y2 - y1) * this.getTrackHeight;
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

    buildRegionRect(o, seqnb, o_style, regionClass) {
      let displayedRect = [];
      o.ranges.forEach(pos => {
        displayedRect.push(
          this.newRegionRect(pos[0] - 1, pos[1] - 1, 0, seqnb, o_style, regionClass)
        );
      });

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

    /**
     * {return a rectangle to colorate one nucleotide
     * @param {*} x
     * @param {*} y
     * @param {*} style
     */
    newNtRect(x, y, style) {
      return this.newRect(
        this.rectX(x),
        this.rectY(y),
        this.getLetterWidth,
        this.getTrackHeight,
        style
      );
    },

    newRegionRect(x1, x2, y1, y2, regionStyle, regionClass) {
      return this.newRect(
        this.rectX(x1),
        this.rectY(y1),
        this.regionWidth(x1, x2),
        this.regionHeight(y1, y2),
        regionStyle,
        regionClass
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
