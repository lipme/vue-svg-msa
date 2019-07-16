<template>
  <section>
    <section v-if="errored">
      <p>
        Enable to load json file. Please make sure the json file is well formatted.
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <svg-alignment-graphic :seqs="seqs" :unsteady="true"></svg-alignment-graphic>
      </div>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import SvgAlignmentGraphic from '@/components/svg/SvgAlignmentGraphic.vue';

export default {
  name: 'TreeMultipleAlignment',
  components: {
    SvgAlignmentGraphic
  },
  props: {
    width: { type: Number },
    height: { type: Number }
  },
  data() {
    return {
      errored: false,
      loading: true,
      fileName: 'isc-20190725-37geno.pc80.ATLAS.fa.Chr01g0000001.json',
      tree: {}
    };
  },
  mounted() {
    this.LoadTestFile();
  },
  created() {},
  computed: {
    seqs() {
        return this.getSequencesByNodeNumberAndByDepth(1,3)
      //return this.getSequencesByNodeNumber(5);
    }
  },
  methods: {
    LoadTestFile() {
      axios
        .get(this.fileName)
        .then(resp => {
          this.tree = resp.data;
        })
        .catch(error => {
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /* return the node object which has the number n */
    getNode(n) {
      if (this.loading === false) return this.getNodeInObject(this.tree, n);
    },
    /* search, in the object o, the node object which has the number n and return it */
    getNodeInObject(o, n) {
      if (o.node_number == n) {
        return o;
      } else {
        if (o.nodes.length > 0) {
          var aa = o.nodes.map(node => this.getNodeInObject(node, n)).filter(a => a != null);
          if (aa.length > 0) {
            return aa[0];
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    },
    /* return an array composed of the sequences containing under the nodes numbered n */
    getSequencesByNodeNumber(n) {
      const node = this.getNode(n);
      var seqs = [];
      this.getSequencesByNode(node, seqs);
      // add the consensus sequence 
      seqs.push(this.buildConsensusSeq(node.consensus, node.node_number))
      return seqs;
    },
    /* search the sequences containing under the nodes node, and add them in the array seqs */
    getSequencesByNode(node, seqs) {
      if (node.leaves.length > 0) {
        node.leaves.forEach(l => seqs.push(l));
      }
      node.nodes.forEach(n => this.getSequencesByNode(n, seqs));
    },

    getSequencesByNodeNumberAndByDepth(n, depth){
      var seqs = [];
      const node = this.getNode(n);
      this.getSequencesByDepth(node, depth, seqs)
      return seqs
    },
    getSequencesByDepth(node, depth, seqs)
    {
        if (depth == 0)
        {
            seqs.push(this.buildConsensusSeq(node.consensus, node.node_number))
        }
        else
        {   
            node.leaves.forEach(l => seqs.push(l));
            node.nodes.forEach(n => this.getSequencesByDepth(n, depth-1,seqs));
        }
    },

    buildConsensusSeq(sequence, nb) {
        return {"leave_number": nb, 
                    "name": "CONSENSUS",
                    "seq": sequence,
                    "isConsensus": "true"}
    },
  }
};
</script>
