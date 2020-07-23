<template>
  <div id="app">
    <svg-msa
      :start="start"
      :end="end"
      :seqs="testSeqs"
      :tracks="testTracks"
      coloring="metadata"
      :metadatas="metadatas"
      :selectedseqs="selectedseqid"
    ></svg-msa>

    <svg-msa :seqs="seqs2" coloring="auto"></svg-msa>
  </div>
</template>

<script>
import SvgMsa from './components/SvgMsa/SvgMsa.vue';

export default {
  name: 'App',
  components: {
    SvgMsa
  },
  data() {
    return {
      start: 1,
      end: -1,
      selectedseqid: ['seq1', 'seq2', 'seq5'],
      //selectedseqid: [],
      metadatas: [
        {
          metadata_id: 1,
          values: [
            { value_id: 1, fill: 'blue' },
            { value_id: 2, fill: 'red' }
          ]
        }
      ],
      // metadatas: [
      //   {
      //     metadata_id: 0,
      //     label: 'conservation level',
      //     values: [
      //       {
      //         value_id: 0,
      //         label: 'high level',
      //         fill: 'blue',
      //         fillopacity: 0.3
      //       },
      //       {
      //         value_id: 1,
      //         label: 'moderate level',
      //         fill: 'pink',
      //         fillopacity: 0.8
      //       }
      //     ]
      //   },
      //   {
      //     metadata_id: 1,
      //     label: 'drought resistance',
      //     values: [
      //       { value_id: 0, label: 'high', stroke: 'green', strokedash: true },
      //       { value_id: 1, label: 'weak', stroke: 'blue', strokedash: false }
      //     ]
      //   }
      // ],

      testSeqs: [
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq1',
          name: 'seq1',
          color: 'red',
          metadatas: [
            {
              metadata_id: 1,
              value_id: 1,
              ranges: [
                [1, 20],
                [177, 234]
              ]
            },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATAC----ACACAGACGACGACAGCAGTCGACGTTTCATATACTCA---TTACATCATCAAT',
          id: 'seq2',
          name: 'seq2',
          color: 'red',
          metadatas: [
            {
              metadata_id: 1,
              value_id: 1,
              ranges: [
                [1, 20],
                [177, 234]
              ]
            },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCC-GACG--GATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq3',
          name: 'seq3',
          color: 'red',
          metadatas: [
            {
              metadata_id: 1,
              value_id: 1,
              ranges: [
                [1, 20],
                [177, 234]
              ]
            },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            'ATCATCATCATCATGGTACTCA---TTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATT------------AGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq4',
          name: 'seq4',
          color: 'blue',
          metadatas: [
            {
              metadata_id: 1,
              value_id: 1,
              ranges: [
                [1, 20],
                [177, 234]
              ]
            },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            'ATCATCATCATCATGGTACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATT------------AGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq5',
          name: 'seq5',
          color: 'blue',
          metadatas: [
            {
              metadata_id: 1,
              value_id: 1,
              ranges: [
                [1, 20],
                [177, 234]
              ]
            },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq6',
          name: 'seq6',
          color: 'green',
          metadatas: [
            { metadata_id: 1, value_id: 1, ranges: [[177, 234]] },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq7',
          name: 'seq7',
          color: 'green',

          metadatas: [
            { metadata_id: 1, value_id: 1, ranges: [[177, 234]] },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAA----------GGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACCCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCAGGAAT',
          name: 'seq8',
          id: 'seq8',
          color: 'green',

          metadatas: [
            { metadata_id: 1, value_id: 1, ranges: [[177, 234]] },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGA-----GGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq9',
          name: 'seq9',
          color: 'green',
          metadatas: [
            { metadata_id: 1, value_id: 1, ranges: [[177, 234]] },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGA---TGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq10',
          name: 'seq10',
          color: 'green',
          metadatas: [
            { metadata_id: 1, value_id: 1, ranges: [[177, 234]] },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        },
        {
          seq:
            '--------------------CATTTTTACATCATTATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGA---T-TCAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq11',
          name: 'seq11',
          color: 'green',
          metadatas: [
            { metadata_id: 1, value_id: 1, ranges: [[177, 234]] },
            { metadata_id: 1, value_id: 2, ranges: [[21, 176]] }
          ]
        }
      ],

      seqs2: [
        {
          seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCATATACTCATTTTTACATCATC-AT',
          seqid: 's1',
          isNode: true,
          isConsensus: true
        },
        {
          seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATCATCATATACTCATTTTTACATCATCATC',
          seqid: 's2',
          isNode: false,
          isConsensus: false
        }
      ],
      testTracks: [
        {
          features: [
            {
              positions: [
                [1, 20],
                [109, 234]
              ],
              type: 'label1',
              color: 'green'
            },
            {
              positions: [[21, 108]],
              type: 'label2',
              color: 'pink'
            }
          ],
          trackLabel: 'label1/label2'
        }
      ],
      coloring: 'auto' //'auto'
    };
  }
};
</script>
