# vue-svg-msa

VueJs component to build a svg multiple sequence alignment.

## Installation

npm install --save vue-svg-msa

## Usage

```
import {SvgMsa} from 'vue-svg-msa'
import 'vue-svg-msa/dist/vue-svg-msa.css'
```

```
<SvgMsa :seqs="seqs">
<SvgMsa
      :seqs="seqs"
      :start="start"
      :end="end"
      :tracks="tracks"
      coloring="auto"
      :metadatas="metadata"
      :selectedseqs="getselectectids"
    ></SvgMsa>
```

Only the 'seqs' attribute is mandatory.
**seqs** is an array as:

```
seqs: [
{
seq: 'ATCATCATCATCATCATACTCATTTTTACAT---CATCATACTACATCATCATATACTCATTTTTACATCATC-TCTT',
id: 'seqid1',
name: 'sequence1',
color: 'red'
},
...
],
```

**start** and **end** are respectively the start and end positions (1-based) of the sequence regions to be displayed.

To display additional tracks in the top of the svg, complete the **tracks** array.
**tracks** is an array as:

```
tracks: [
{
  "features": [
    {
      "positions": [[1,20],[52,80]],
      "type": "exon",
      "color": "green"
    },
    {
      "positions": [[21,51]],
      "type": "intron",
      "color": "pink"
    }
  ],
  "trackLabel": "exon/intron"
}]
```

**coloring** allows the values 'no', 'seqcolor', 'auto', 'metadata'.
If the value is 'metadata', the sequences are colored with the colors containing in the **metadatas** array.

```
metadatas: [
  {
    metadata_id: 0,
    label: 'conservation level',
    values: [
    {
      value_id: 0,
      label: 'high level',
      fill: 'blue',
      fillopacity: 0.3,
      stroke: 'black',
      strokedash: false
    },
    {
      value_id: 1,
      label: 'moderate level',
      fill: 'pink',
      fillopacity: 0.8,
    }
    ]
  }
]

seqs: [
{
  seq: 'ATCATCATCATCATCATACTCATTTTTACAT---CATCATACTACATCATCATATACTCATTTTTACATCATC-TCTT',
  ..
  metadatas: [
    { metadata_id: 0, value_id: 0, ranges: [[1, 40],[100, 234]]},
    { metadata_id: 0, value_id: 1, ranges: [[41, 99]] }
  ]
},
{
  seq: 'ATCATCATCATCATCATACTCATTTTTACATTTTCATCATACTACATCATCATATACTCATTTTTACATCATCTTCTT',
  ...
  metadatas: [ { metadata_id: 0, value_id: 1}]
}
...
]

In the second example the metadata coloring would be apply on all the sequence

**selectedseqs** is an array of sequence ids which will be highlighted in the msa.

##Contributors

LIPM Bioinfo Team

- Erika Sallet
- Ludovic Cottret
- Sebastien Carrere
- Ludovic Legrand
- Jerome Gouzy

##Contact

erika.sallet@inrae.fr
```
