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
      :metadata="metadata"
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

**coloring** allows the values 'no', 'seqcolor', 'auto', 'metadata'. It is allowed to mix the values, eg 'seqcolor|metadata'
If the value is 'metadata', the styles described in the **metadata** array are apply to the svg image.

```
metadata: [
  {
     label: 'Conservation level',
          categories: [
            {
              label: 'high level',
              style: {
                fill: 'red',
                'fill-opacity': 0.5
                stroke: 'black'
              },
              regions: [
                {
                  seqid: 'seqid1',
                  ranges: [[21, 176],[315,390]]
                },
                {
                  seqid: 'seq2',
                  ranges: [[21, 176]]
                }
              ]
            }, {...}]
  }, {...}
]


In a region, if the 'seqid' attribute is empty or missing, the regions of all the sequences would be colored.
In a region, if the 'ranges' attribute is empty or missing, all the sequence would be colored.

Note: 'label' attributes are not used.

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
