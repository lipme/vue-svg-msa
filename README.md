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
      :selectedseqs="getselectectids"
    ></SvgMsa>
```

seqs is an array as:

```
seqs: [
{
seq: 'ATCATCATCATCATCATACTCATTTTTACAT---CATCATACTACATCATCATATACTCATTTTTACATCATC-TC',
id: 'seqid1',
name: 'sequence1',
color: 'red'
},
...
],
```

start and end are respectively the start and end positions (0-based) of the sequence to be displayed.

tracks is an array as:

```
tracks: [
{
  "features": [
    {
      "positions": [[1,20],[109,233]],
      "type": "exon",
      "color": "green"
    },
    {
      "positions": [[21,108]],
      "type": "intron",
      "color": "pink"
    }
  ],
  "trackLabel": "exon/intron"
}]
```

coloring allows the values 'no', 'seqcolor', 'auto', 'metadata'.

selectedseqs is an array of sequence ids which will be highlighted in the msa.

##Contributors

LIPM Bioinfo Team

- Erika Sallet
- Ludovic Cottret
- Sebastien Carrere
- Ludovic Legrand
- Jerome Gouzy

##Contact

erika.sallet@inrae.fr
