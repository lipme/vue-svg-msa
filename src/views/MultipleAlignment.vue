<template>
  <div>
    <!-- header: domain number and download button  -->
    <div id="top" v-if="domainRequest && seqs.length > 0">
      <div>
        <h4>Domain {{ domainRequest }}</h4>
      </div>
      <div>
        <v-tooltip bottom>
          <v-btn flat icon small color="deep-orange" @click="0" slot="activator">
            <v-icon>arrow_downward</v-icon>
          </v-btn>

          <span> Download </span>
        </v-tooltip>
      </div>
    </div>

    <!-- alignment svg -->
    <alignment-graphic
      v-if="domainRequest && seqs.length > 0"
      :width="width"
      :height="height"
      :seqs="seqs"
    >
    </alignment-graphic>

    <!-- text to display if no sequence or no selected domain -->
    <div v-if="!domainRequest || seqs.length === 0" :width="width" :height="height" id="text">
      {{ textIndication }}
    </div>
  </div>
</template>

<script>
import AlignmentGraphic from '@/components/AlignmentGraphic';
import axios from 'axios';

export default {
  name: 'MultipleAlignment',
  components: {
    AlignmentGraphic
  },
  props: {
    width: { type: Number },
    height: { type: Number },
    graphDisplay: { type: Object }
  },
  data() {
    return {
      letterWidth: 13,
      letterPadding: 3
    };
  },
  created() {
    this.$store.dispatch('uploadCheckerURL', 'alignmentTest1.json');
  },
  computed: {
    /**
     * Return the name of the domain that are selected on the Domain Panel.
     * @return {String} the domain that are selected on the Domain Panel.
     */
    domainRequest() {
      return this.$store.getters.getDomainIdSelectedAlignment;
    },

    /**
     * Return the text for the user, for display the alignment.
     * @return {String} the text for the user.
     */
    textIndication() {
      return !this.domainRequest
        ? 'select a domain to display alignment'
        : 'we cannot display the alignment';
    },

    /**
     * Return all the sequence that are aligned according to the domainID, the protein ID, the
     * name, if it is selected.
     * @return {array} all the sequences that are aligned.
     */
    seqs() {
      //let a_seq1 = this.$store.getters.getDataAlignment;
      //console.log(a_seq1);
      let a_seqs = this.$store.getters.getDataAlignment.filter(x => x.domainID === '1');
      for (let x in a_seqs) {
        let i = 0;
        a_seqs[x].seqSplit = a_seqs[x].seq.split('').map(l => {
          i++;
          return { value: l, id: i };
        });
        a_seqs[x].number = Number(x);
        a_seqs[x].selected = true;
      }
      console.log(a_seqs);

      return a_seqs;
    }
  },
  methods: {}
};
</script> 

<style scoped>
h4 {
  margin: 10px 0 10px 10px;
  min-width: 300px;
}
#text {
  margin: 10px;
  padding: 10px;
  border: thin solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
}
#top {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
 
