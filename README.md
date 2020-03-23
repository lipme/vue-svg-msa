# vue-svg-msa

VueJs component to build a svg multiple sequence alignment.

## Install

npm install --save vue-svg-msa

## Usage

```
import {svg-msa} from vue-svg-msa;
...
<svg-msa
      :seqs="seqs"
      :start="start"
      :end="end"
      :tracks="tracks"
      :coloring="coloring"
    ></svg-msa>
```

seqs is an array as:

```
seqs: [
{
seq: 'ATCATCATCATCATCATACTCATTTTTACAT---CATCATACTACATCATCATATACTCATTTTTACATCATC-TC',
id: 'seqid1',
name: 'sequence1'
},
{
seq: 'ATCATCATCATCATCATACTCATTTTTACATCATCATCATA--ACATCATCATATACTCATTTTTACATCATCATC',
id: 'seqid2',
name: 'sequence2'
}
],
```

## Contributing

## License
