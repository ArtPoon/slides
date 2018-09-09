# Chinese CDC 2018
## Using NGS to investigate within-host HIV evolution and latency
### Art Poon
<small>
Department of Pathology & Laboratory Medicine<br/>
Western University
</small>
![](/img/UWO_Logo.svg)

---

# Background
## Next-generation sequencing and HIV

* HIV-1 rapidly accumulates genetic variation within each host
* NGS is useful for measuring this diversity
* Applications:
  1. To measure the frequency of different variants (mutations).
  2. To detect rare (clinically significant) variants.
  3. Others?

---

# Background
## Aligning NGS from HIV samples

* The diversity of HIV makes these samples difficult to process.
* *de novo* assembly can be successful for a consensus, but we lose variation.
* Others have tried to develop *haplotype reconstruction methods* with limited success (Schirmer *et al.* 2012).
* Continuum of variation, frequent recombination makes this difficult!

---

# Background
## Reference mapping

* Easier than *de novo* assembly.
* Build index of reference genome.
* Index stores the location of the fragment in reference genome.
* Fragment sequence serves as "address" for rapid look-up of location.

---

# Background
## BC Centre for Excellence in HIV/AIDS

* Responsible for HIV-1 genotyping for Canada (except Quebec).
* ~2,000 samples per year.
* Extensive experience with 454 for HIV genotyping, coreceptor tropism testing.
* Nearly 50 publications in the literature.

---

# Background
## Problems with the 454

* High error rates in homopolymers (single nucleotide repeats).
* Some homopolymers associated with HIV drug resistance (e.g., K103N) &mdash; genome is ~40% A!
* Could not be resolved with bioinformatics &mdash; eventually, this platform was discontinued.

<img src="/img/K103N.png" width="60%"/>

---

# Background
## Transition to the MiSeq

* For these reasons, many HIV groups transitioning to Illumina MiSeq.
* Shorter read lengths, no homopolymer issue.
* Many more reads per run (lower cost per base).
* The BC-CFE lab needed a new pipeline for MiSeq data.

<img src="/img/broken-pipe.jpg" width="400px"/>

---

# MiCall
## bowtie2

* An open-source mapper that is tolerant of mutations ([github.com/BenLangmead/bowtie2]())
```
10000 reads; of these:
  10000 (100.00%) were paired; of these:
    10000 (100.00%) aligned concordantly 0 times
    0 (0.00%) aligned concordantly exactly 1 time
    0 (0.00%) aligned concordantly >1 times
    ----
    10000 pairs aligned concordantly 0 times; of these:
      0 (0.00%) aligned discordantly 1 time
    ----
    10000 pairs aligned 0 times concordantly or discordantly; of these:
      20000 mates make up the pairs; of these:
        19979 (99.89%) aligned 0 times
        21 (0.10%) aligned exactly 1 time
        0 (0.00%) aligned >1 times
0.10% overall alignment rate
```

---

# MiCall
## Iterative remapping

* Any reads that mapped to initial (seed) reference were used to "evolve" the reference with Python script.

```
10000 reads; of these:
  10000 (100.00%) were paired; of these:
    403 (4.03%) aligned concordantly 0 times
    9597 (95.97%) aligned concordantly exactly 1 time
    0 (0.00%) aligned concordantly >1 times
    ----
    403 pairs aligned 0 times concordantly or discordantly; of these:
      806 mates make up the pairs; of these:
        749 (92.93%) aligned 0 times
        57 (7.07%) aligned exactly 1 time
        0 (0.00%) aligned >1 times
96.25% overall alignment rate
```

---

# MiCall
## Processing *bowtie2* outputs

* Paired-end reads are merged and discordant calls in overlapping regions are resolved
* Group aligned reads by unique sequence (reduce file size ~half)
* Outputs coverage, nucleotide and amino acid frequencies, and alignment.
* Released this pipeline as open-source, [github.com/cfe-lab/MiCall]()

---

# MiCall
## Bad tile-cycle combinations

* Every HIV RT sample in this run had ~3% E138A
* Quality scores for these bases were normal.

<img src="/img/E138A.svg" width="55%"\>

---

# MiCall
## Bad tile-cycle combinations

* An Illumina system generates a set of "InterOp" files for every run.
* The file `ErrorMetricsOut.bin` reports &phi;X174 error rates.
* The 3% E138A was due to one bad tile-cycle combo - this was not reflected in base quality scores!

<img src="/img/bad-cycles1.png" width="75%"/>

---

# MiCall
## Bad tile-cycle combinations

* We modified MiCall to read this InterOp file and throw out any bad tile-cycle combinations (version 6.7.3+).
* This removed E138A from all samples in that run.
* This affects "amplicon" runs the most, because a given cycle represents the same nucleotide in the affected reads.

---

# MiCall
## Pipeline tracking

* [github.com/cfe-lab/Kive]() stores a "fingerprint" of every data input and output handled by MiCall.

<img src="/img/kive-pipeline.png" width="75%"/>

---

# Acknowledgements

* The laboratory results I have cited were obtained by my former colleagues at 
 the *BC Centre for Excellence in HIV/AIDS* 
  * Chanson J. Brumme
  * Luke C. Swenson
  * Hope Lapointe
  * P. Richard Harrigan

---

# Thanks!

<table>
  <tr>
    <td><img src="/img/OGI_Logo2015.png" height="100"/></td>
    <td><img src="/img/GenomeCanadaLogo.png" height="100"/></td>
    <td><img src="/img/NIH_NIAID.jpg" height="150"></td>
  </tr>
  <tr>
    <td><img src="/img/cihr.png"  height="150"/></td>
    <td><img src="/img/NSERC_RGB.png"/></td>
  </tr>
</table>
