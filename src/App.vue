<template>
  <div id="app">
    <svg-msa
      :start="start"
      :end="end"
      :seqs="testSeqsNEW"
      :tracks="testTracks"
      coloring="metadata"
      type="nt"
      :metadata="metadata"
      :selectedseqs="selectedseqid"
    ></svg-msa>

    <!-- <svg-msa :seqs="seqs2" coloring="auto"></svg-msa> -->
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
      start: 5,
      end: -1,
      selectedseqid: ['seq1', 'seq2', 'seq5'],
      // selectedseqid: [],

      metadata: [
        {
          label: 'Conservation level',
          categories: [
            {
              label: 'high level',
              style: {
                fill: 'red'
              },
              regions: [
                {
                  id: 'seq1',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq2',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq3',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq4',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq5',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq6',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq7',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq8',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq9',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq10',
                  ranges: [[21, 176]]
                },
                {
                  id: 'seq11',
                  ranges: [[21, 176]]
                }
              ]
            },
            {
              label: 'moderate level',
              style: {
                fill: 'blue'
              },
              regions: [
                {
                  id: 'seq1',
                  ranges: [
                    [1, 20],
                    [177, 234]
                  ]
                },
                {
                  id: 'seq2',
                  ranges: [
                    [1, 20],
                    [177, 234]
                  ]
                },
                {
                  id: 'seq3',
                  ranges: [
                    [1, 20],
                    [177, 234]
                  ]
                },
                {
                  id: 'seq4',
                  ranges: [
                    [1, 20],
                    [177, 234]
                  ]
                },
                {
                  id: 'seq5',
                  ranges: [
                    [1, 20],
                    [177, 234]
                  ]
                },
                {
                  id: 'seq6',
                  ranges: [[177, 234]]
                },
                {
                  id: 'seq7',
                  ranges: [[177, 234]]
                },
                {
                  id: 'seq8',
                  ranges: [[177, 234]]
                },
                {
                  id: 'seq9',
                  ranges: [[177, 234]]
                },
                {
                  id: 'seq10',
                  ranges: [[177, 234]]
                },
                {
                  id: 'seq11',
                  ranges: [[177, 234]]
                }
              ]
            }
          ]
        },
        {
          label: 'polymorph region',
          categories: [
            {
              label: 'polymorph region',
              style: {
                'fill-opacity': 0.3,
                fill: 'black'
              },
              regions: [
                {
                  ranges: [
                    [35, 35],
                    [90, 96]
                  ]
                }
              ]
            }
          ]
        }
      ],
      mmm: [
        {
          label: 'drought resistance',
          categories: [
            {
              label: 'high',
              style: {
                stroke: 'red',
                'stroke-dasharray': '4,2'
              },
              regions: [
                {
                  id: 'seq2',
                  ranges: [
                    [1, 20],
                    [177, 234]
                  ]
                }
              ]
            },
            {
              label: 'low',
              style: {
                stroke: 'blue',
                fill: 'pink',
                fill_opacity: 0.9
              },
              regions: []
            }
          ]
        }
      ],
      testSeqsNEW: [
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq1',
          name: 'seq1',
          color: 'red'
        },
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATAC----ACACAGACGACGACAGCAGTCGACGTTTCATATACTCA---TTACATCATCAAT',
          id: 'seq2',
          name: 'seq2',
          color: 'red'
        },
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCC-GACG--GATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq3',
          name: 'seq3',
          color: 'red'
        },
        {
          seq:
            'ATCATCATCATCATGGTACTCA---TTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATT------------AGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq4',
          name: 'seq4',
          color: 'blue'
        },
        {
          seq:
            'ATCATCATCATCATGGTACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATT------------AGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq5',
          name: 'seq5',
          color: 'blue'
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq6',
          name: 'seq6',
          color: 'green'
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq7',
          name: 'seq7',
          color: 'green'
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAA----------GGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACCCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCAGGAAT',
          name: 'seq8',
          id: 'seq8',
          color: 'green'
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGA-----GGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq9',
          name: 'seq9',
          color: 'green'
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGA---TGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq10',
          name: 'seq10',
          color: 'green'
        },
        {
          seq:
            '--------------------CATTTTTACATCATTATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGA---T-TCAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq11',
          name: 'seq11',
          color: 'green'
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
          trackLabel: 'track1'
        },
        {
          features: [
            {
              positions: [
                [2, 32],
                [109, 234]
              ],
              type: 'label1',
              color: 'green'
            },
            {
              positions: [[33, 108]],
              type: 'label2',
              color: 'pink'
            }
          ],
          trackLabel: 'track2'
        }
      ],
      coloring: 'auto' //'auto'
    };
  }
};
</script>
