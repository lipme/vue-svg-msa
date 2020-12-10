<!-- Copyright 2020 [LIPM]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License.
-->
<template>
  <div id="app">
    <h2>Test vue-svg-msa component</h2>
    <button @click="loadExample">Load 11 sequences</button>
    <button @click="loadExampleJson(myjson500seq, myjson500metadata)">Load 500 sequences</button>
    <button @click="loadExampleJson(myjson1000seq, myjson1000metadata)">Load 1000 sequences</button>
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
      <label>Coloring </label>
      <select v-model="coloring">
        <option>no</option>
        <option>seqcolor</option>
        <option>auto</option>
        <option>metadata</option>
      </select>
      <label> Rendering resolution </label>
      <select v-model="resolution">
        <option>medium</option>
        <option>high</option>
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
      :offset-x="150"
      :resolution="resolution"
    ></svg-msa>
  </div>
</template>

<script>
import SvgMsa from './components/SvgMsa/SvgMsa.vue';
import json500seq from './test500seq.json';
import json500metadata from './test500seq_metadata.json';
import json1000seq from './test1000seq.json';
import json1000metadata from './test1000seq_metadata.json';
export default {
  name: 'App',
  components: {
    SvgMsa
  },
  data() {
    return {
      resolution: 'medium',
      myjson500seq: json500seq,
      myjson500metadata: json500metadata,
      myjson1000seq: json1000seq,
      myjson1000metadata: json1000metadata,
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
      currentmetadata: {},
      metadata: {
        label: 'Conservation level',
        categories: [
          {
            label: 'high level',
            style: {
              fill: 'red',
              'fill-opacity': '0.5'
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
            'ATCATCATTCGGGGGATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq1',
          name: 'sequence-maize-A1-A0-v1',
          color: 'red'
        },
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATAC----ACACAGACGACGACAGCAGTCGACGTTTCATATACTCA---TTACATCATCAAT',
          id: 'seq2',
          name: 'sequence-maize-A2',
          color: 'red'
        },
        {
          seq:
            'ATCATCATCATCATCATACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCC-GACG--GATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq3',
          name: 'seque-maize-A3',
          color: 'red'
        },
        {
          seq:
            'ATCATCATCATCATGGTACTCA---TTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATT------------AGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq4',
          name: 'sequen-maize-A4',
          color: 'blue'
        },
        {
          seq:
            'ATCATCATCATCATGGTACTCATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATT------------AGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq5',
          name: 'sequenc-maize-A5',
          color: 'blue'
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq6',
          name: 'sequence-maize-A6',
          color: 'green'
        },
        {
          seq:
            '--------------------CATTTTTACATCATCATCATACTACATGACGACGACAGCAGCCCTTACGACGATTTACGCGAGAACACTATCATCACAGACGAATTAGAGAGGGGGACAGAGGGACAGCAGCAGCCCAGACAGACGACCCGATTTATACTCATACTCACAGCATACGATGACACAGACGACGACAGCAGACGACGCATCATATACTCATTTTTACATCATCAAT',
          id: 'seq7',
          name: 'ssequence-maize-A7',
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
          color: 'green',
          isConsensus: true,
          isNode: true
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
          name: 'seq11-consensus',
          color: 'green',
          isConsensus: true,
          isNode: false
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
              color: 'green',
              'fill-opacity': 0.2
            },
            {
              positions: [[21, 108]],
              type: 'label2',
              color: 'pink',
              'fill-opacity': 0.5
            }
          ],
          trackLabel: 'Structural annotation'
        },
        {
          features: [
            {
              positions: [
                [1, 32],
                [109, 234]
              ],
              type: 'label1',
              color: 'green'
            },
            {
              positions: [[33, 108]],
              type: 'label2',
              color: 'red'
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
        m.push(this.currentmetadata);
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
      this.currentmetadata = this.metadata;
      this.reinit();
    },

    loadExampleJson(j, m) {
      this.seqs = j.seqs;
      this.currentmetadata = m;
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
            regions: r
          }
        ]
      };
      return m;
    }
  }
};
</script>
