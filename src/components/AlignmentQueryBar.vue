<template>
  <!-- <svg :width="width" height="25px"> -->
    <g>

        <!-- <rect x="19" y="12" width="100%" height="2px"></rect> -->
        <!-- <rect
          v-for="label in labels"
          :key="label.id"
          :x="label.pos_bar"
          y="13"
          width="2px"
          height="8px"
        ></rect> -->
        <!-- <rect
          v-for="label in labels2"
          :key="label.id"
          :x="label.pos"
          y="13"
          width="1px"
          height="7px"
        ></rect>
        <text
          v-for="label in labels"
          :key="label.id"
          :x="label.pos_bar"
          y="10"
          fill="black"
          font-size="10"
        >
          {{ label.label }}
        </text> -->
    </g>
  <!-- </svg> -->
</template>

<script>
export default {
  name: 'AlignmentQueryBar',
  props: {
    length: { type: Number, default: 500 },
    letterWidth: { type: Number, defaut: 40 },
    letterPadding: { type: Number, defaut: 40 }
  },
  data() {
    return {
    };
  },
  computed: {
    /**
     * Builds a array with the length of the alignment. They return a number
     * every 5 amino acid, their position and the descriptive text .
     * @returns {array} The scale values and their positions on the Scale
     */
    labels() {
      let a_labels = [];
      if (this.length > 0)
      {
        a_labels.push(
        {
          id: 0,
          label: '1',
          pos: 100 / this.length + '%',
          pos_bar: 100 / this.length + '%'
        });
      
      let cycle_number = Math.ceil(this.length / 5);

      for (let i = 1; i < cycle_number; i++) {
        a_labels.push({
          id: i,
          label: Math.round(5 * i),
          pos: (100 / this.length) * 5 * i - 0.4 + '%',
          pos_bar: (100 / this.length) * 5 * i + '%'
        });
      }
      }

      // a_labels.push({
      //   id: cycle_number,
      //   label: this.length,
      //   pos: "99%",
      //   pos_bar: "99.7%",
      // });
      return a_labels;
    },

    /**
     * Builds a array with the length of the alignment. They return a number
     * every amino acid and their position.
     * @returns {array} The scale values and their positions on the Scale
     */
    labels2() {
      let a_labels = [];

      for (let i = 1; i <= this.length; i++) {
        a_labels.push({
          id: i,
          pos: (100 / this.length) * i + '%'
        });
      }

      return a_labels;
    },
    /**
     * Return the width of the scale calculated with the padding, the width
     * of the letter and the length of the sequence.
     * @returns {array} the width of the scale.
     */
    width() {
      return Number((this.letterPadding * 2 + this.letterWidth) * this.length + 105);
    }
  }
};
</script>
