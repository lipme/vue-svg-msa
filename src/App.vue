<template>
  <div id="app">
    <h2>Test vue-svg-msa component</h2>
    <button @click="loadExample">Load an exemple (11 sequences)</button>
    <hr width="100%" />
    <h4>Parameters</h4>
    <label>Start (1-based) </label
    ><input v-model.number="start" type="number" placeholder="start position" /> <label>End</label
    ><input v-model.number="end" type="number" placeholder="stop position" />
    <label>Selected regions</label><input v-model="selectedregions" placeholder="4-4,70-80" />
    <label>Selected sequences</label>
    <select id="select1" v-model="selectedseqs" multiple>
      <option v-for="seq in testSeqs" :key="seq.id" :value="seq.id">{{ seq.name }}</option>
    </select>
    <p><button @click="applyParam">Apply</button><button @click="reinit">Reinit</button></p>

    <hr width="100%" />
    <p>
      <label>Coloring</label>
      <select v-model="coloring">
        <option>no</option>
        <option>seqcolor</option>
        <option>auto</option>
        <option>metadata</option>
      </select>
    </p>

    <hr width="100%" />

    <h3>Rendering</h3>
    <svg-msa
      v-if="seqs.length > 0"
      :start="activestart"
      :end="activeend"
      :seqs="seqs"
      :tracks="tracks"
      :coloring="activecoloring"
      :selectedseqs="selectedseqs"
      :metadata="activemetadata"
      type="nt"
    ></svg-msa>
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
      selectedseqs: [],
      activestart: 1,
      activeend: 0,
      activeselectedfield: '',
      activeselectedregions: '',
      start: 1,
      end: 0,
      seqs: [],
      selectedfield: '',
      selectedregions: '',

      metadata: {
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
      mmm: [
        {
          label: 'drought resistance',
          categories: [
            {
              label: 'high',
              style: {
                stroke: 'red',
                'stroke-dasharray': '4,2',
                fill: 'red'
              },
              regions: [
                {
                  id: 'seq2',
                  ranges: [
                    [1, 20],
                    [177, 234]
                  ]
                },
                {
                  id: 'seq1',
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
      testSeqs: [
        {
          seq:
            'ATCATCATCGGGGGATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
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
      coloring: 'metadata' //'auto'
    };
  },
  computed: {
    getselectedids() {
      return this.activeselectedseqs;
    },
    selectedregionsArray() {
      return [
        {
          ranges: this.selectedregions.split(',').map(a => a.split('-'))
        }
      ];
    },
    getselectedregioddns() {
      return [];
    },
    activecoloring() {
      //let c = this.coloring;
      return this.coloring + '|metadata';
    },
    activemetadata() {
      let m = [];
      if (this.coloring === 'metadata') {
        m.push(this.metadata);
      }
      if (this.activeselectedregions != '') {
        m.push(this.getSelectedRegions());
      }
      return m;
    }
  },
  methods: {
    loadExample() {
      this.seqs = this.testSeqs;
      this.tracks = this.testTracks;
      this.reinit();
    },
    applyParam() {
      (this.activestart = this.start),
        (this.activeend = this.end),
        (this.activeselectedfield = this.selectedfield),
        (this.activeselectedseqs = []),
        (this.activeselectedseqs = this.selectedseqs),
        (this.activeselectedregions = this.selectedregions);
    },
    initParam() {
      (this.start = 1),
        (this.end = 0),
        (this.selectedfield = ''),
        (this.selectedregions = ''),
        (this.selectedseqs = []),
        (this.activeselectedseqs = []);
    },
    reinit() {
      this.initParam();
      this.applyParam();
    },

    getSelectedRegions() {
      let r = this.selectedregionsArray;

      let m = {
        label: 'select',
        categories: [
          {
            label: '',
            style: {
              'fill-opacity': 0.3,
              fill: 'black'
            },
            regions: r
          }
        ]
      };
      console.log(m);
      return m;
    }
  }
};
</script>
