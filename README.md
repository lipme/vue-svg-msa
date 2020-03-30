# vue-svg-msa

VueJs component to build a svg multiple sequence alignment.

## Install

npm install --save vue-svg-msa

## Usage

```
import {SvgMsa} from 'vue-svg-msa';
...
<SvgMsa
      :seqs="seqs"
      :start="start"
      :end="end"
      :tracks="tracks"
      :coloring="coloring"
    ></SvgMsa>
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
