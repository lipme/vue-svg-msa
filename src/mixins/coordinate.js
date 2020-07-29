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
    }
  }
};
