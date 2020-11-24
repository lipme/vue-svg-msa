export const sequence = {
  props: {
    sequence: {
      type: Object,
      default() {
        return [];
      }
    },
    y: { type: Number, default: 1 },
    textFontSize: { type: Number, default: 15 },
    isSelected: { type: Boolean, defaut: false },
    selectionMode: { type: Boolean, default: false },
    coloring: { type: String, default: 'no' },
    letterType: { type: String, default: 'nt' }
  },
  data() {
    return {
      defaultOpacity: 0.4,
      defaultOpacityContrast: 0.2
    };
  },
  computed: {
    getClass() {
      return {
        consensus:
          (this.sequence.isConsensus === true && this.sequence.isNode === false) ||
          this.sequence.isNode === true
      };
    },
    opacity() {
      if (this.selectionMode === false || (this.selectionMode === true && this.isSelected)) {
        return this.defaultOpacity;
      } else {
        return this.defaultOpacity - this.defaultOpacityContrast;
      }
    },
    colors() {
      const a_allColors = {
        nt: {
          A: 'green',
          C: 'orange',
          G: 'red',
          T: 'steelblue',
          U: 'steelblue',
          N: 'white',
          '.': 'white',
          '-': 'white'
        },
        // Clustal colors found in
        // http://www.jalview.org/help/html/colourSchemes/index.html
        aa: {
          A: '#80a0f0',
          R: '#f01505',
          N: '#00ff00',
          D: '#c048c0',
          C: '#f08080',
          Q: '#00ff00',
          E: '#c048c0',
          G: '#f09048',
          H: '#15a4a4',
          I: '#80a0f0',
          L: '#80a0f0',
          K: '#f01505',
          M: '#80a0f0',
          F: '#80a0f0',
          P: '#ffff00',
          S: '#00ff00',
          T: '#00ff00',
          W: '#80a0f0',
          Y: '#15a4a4',
          V: '#80a0f0',
          '.': 'white',
          '-': 'white',
          B: 'grey',
          X: 'grey',
          Z: 'grey'
        }
      };
      return a_allColors[this.letterType];
    }
  },
  methods: {
    /**
     * return an object style given the fill and its opacity
     */
    getStyle(f, o) {
      var o_style = {};
      o_style['fill'] = f;
      o_style['fill-opacity'] = o;
      return o_style;
    },
    /**
     * Return a color for a letter.
     * @return {String} the color of the letter.
     */
    getNtColor(letter) {
      const uppLetter = letter.toUpperCase();

      if (!(uppLetter in this.colors)) {
        return 'white';
      }

      return this.colors[uppLetter];
    }
  }
};
