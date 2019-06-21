<template>
  <div :width="width" :height="height" id="alignment-graphic">
    <AlignmentQueryBar
      :length="seqLengthMax"
      :letterWidth="letterWidth"
      :letterPadding="letterPadding"
      style="padding-left: 105px;"
    ></AlignmentQueryBar>

    <svg :width="widthSvg" :height="heightSvg">
      <template v-for="(seq, seqIndex) in seqs">
        <!-- Name of the sequence -->
        <text
          :key="seqIndex"
          font-size="15"
          fill="black"
          :x="1"
          :y="textY[seqIndex]"
          :style="seq.selected ? 'font-weight: bold' : 'font-weight: normal;'"
        >
          <title>{{ seq.name }}</title>
          {{ nameDisplayed(seq.name) }}
        </text>

        <!-- CASE 1 : SEQUENCE HAS A COLOR -->
        <!-- Display a long rect of one color if the sequence has a color -->
        <template v-if="seq.color !== ''">
          <rect
            v-if="seq.color !== ''"
            :key="'rect' + seqIndex"
            :x="rectX[1]"
            :y="rectY[seqIndex]"
            :width="letterAndPaddingWidth * seqLengthMax"
            :height="letterAndPaddingWidth"
            :fill="seq.color"
            fill-opacity="0.8"
          ></rect>
          <!-- display the letters -->
          <template v-for="(letter, letterIndex) in seq.seqSplit">
            <text
              :key="seqIndex + '-' + letterIndex"
              :y="textY[seqIndex]"
              :x="textX[letterIndex + 1]"
              :font-size="letterWidth"
              fill="black"
            >
              {{ letter }}
            </text>
          </template>
        </template>

        <!-- CASE 2 : SEQUENCE HAS NO COLOR: create alignment-letter -->
        <template v-else>
          <!-- display the letters -->
          <template v-for="(letter, letterIndex) in seq.seqSplit">
            <alignment-letter
              :key="seqIndex + '-' + letterIndex"
              :letter="letter"
              :width="letterWidth"
              :textX="textX[letterIndex + 1]"
              :textY="textY[seqIndex]"
              :rectX="rectX[letterIndex + 1]"
              :rectY="rectY[seqIndex]"
              :rectWidth="letterAndPaddingWidth"
              autocolored
            ></alignment-letter>
          </template>
        </template>
      </template>
    </svg>
  </div>
</template>

<script>
import AlignmentLetter from '@/components/AlignmentLetter.vue';
import AlignmentQueryBar from '@/components/AlignmentQueryBar.vue';
//import { ALPN_ENABLED } from 'constants';
export default {
  name: 'AlignmentGraphic',
  components: {
    AlignmentLetter,
    AlignmentQueryBar
  },
  props: {
    width: { type: Number },
    height: { type: Number },
    seqs: { type: Array }
  },
  data() {
    return {
      letterWidth: 13,
      letterPadding: 3,
      offsetX: 100
    };
  },
  computed: {
    /**
     * Return the bigger size of all the displayed sequences.
     * @return {number} the bigger size of all the displayed sequences.
     */
    seqLengthMax() {
      let length = 0;
      this.seqs.forEach(seq => {
        if (length < seq.seq.length) length = seq.seq.length;
      });
      return length;
    },
    /**
     * Return the width of the SVG of the alignment.
     * @return {number} the width of the SVG of the alignment.
     */
    widthSvg() {
      const adjust = this.seqLengthMax < 70 ? 1 : 5;
      return this.seqLengthMax * (this.letterWidth * 2 - adjust);
    },
    /**
     * Return the height of the SVG of the alignment.
     * @return {number} the height of the SVG of the alignment.
     */
    heightSvg() {
      return this.seqs.length * 20;
    },
    letterAndPaddingWidth() {
      return this.letterWidth + 2 * this.letterPadding;
    },
    /**
     * Return an array of the coordinate 'x' values. textX[10] 
     * is the X coordinate of the 10th letter of a sequence.
     * @return {number}  an array of the coordinate 'x' values.
     */
    textX() {
      var xs = [];
      for (var i = 0; i <= this.seqLengthMax; i++) {
        xs.push(i);
      }
      return xs.map(i => i * this.letterAndPaddingWidth + this.offsetX + this.letterPadding);
    },
    /**
     * Return an array of the coordinate 'x' values to display 'rect' element. 
     * rect[10] is the X coordinate of the rect of the 10th letter of a seq.
     * @return {number}  an array of the coordinate 'x' values.
     */
    rectX() {
      return this.textX.map(i => i - this.letterPadding);
    },

    textY() {
      return this.seqs.map((s, index) => (this.letterWidth + 6) * index + this.letterWidth + 2);
    },
    
    rectY() {
      return this.textY.map( i => i - this.letterWidth - 1);
    }
  },
  methods: {
    /**
     * Take the id of a sequence.
     * @param {Object} event The ID and the selected Boolean of the selected sequence.
     */
    onClick(data) {
      this.$emit('onClick', data);
    },
    /**
     * If the name is to long it is cut.
     * @return {string} the name of the sequence.
     */
    nameDisplayed(name) {
      if (name.length >= 16) {
        let title = '';
        const splitName = name.split('');
        splitName.forEach(x => {
          if (title.length < 11) title = title.concat(String(x));
        });
        title = title.concat('...');
        return title;
      } else return name;
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
 
