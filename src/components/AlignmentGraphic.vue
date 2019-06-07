<template>
  <div :width="width" :height="height" id="tableau">
    <div>
      <AlignmentQueryBar
        :length="seqLengthMax"
        :letterWidth="letterWidth"
        :letterPadding="letterPadding"
        style="padding-left: 105px;"
      ></AlignmentQueryBar>
    </div>
    <svg :width="widthSvg" :height="heightSvg">
      <template v-for="seq in seqs">
        <g :key="seq.id">
          <text
            :key="seq.id"
            v-tooltip="seq.name"
            font-size="15"
            fill="black"
            :x="1"
            :y="(letterWidth + 6) * seq.number + 15"
            :style="seq.selected ? 'font-weight: bold;' : 'font-weight: normal;'"
            @click="onClick({ id: seq.id, selected: seq.selected })"
          >
            {{ nameDisplayed(seq.name) }}
          </text>
          <template v-for="letter in seq.seqSplit">
            <alignment-letter
              :width="letterWidth"
              :padding="letterPadding"
              :offsetX="100"
              :offsetY="(letterWidth + 6) * seq.number + 1"
              :pos="letter.id"
              :height="letterWidth"
              :key="letter.id"
              @click.native="onClick({ id: seq.id, selected: seq.selected })"
            >
              {{ letter.value }}
            </alignment-letter>
          </template>
        </g>
      </template>
    </svg>
  </div>
</template>

<script>
import AlignmentLetter from '@/components/AlignmentLetter';
import AlignmentQueryBar from '@/components/AlignmentQueryBar';
import { ALPN_ENABLED } from 'constants';
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
      letterPadding: 3
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
#tableau {
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
 
