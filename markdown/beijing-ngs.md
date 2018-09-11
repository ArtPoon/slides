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
* Could not be resolved with bioinformatics &mdash; eventually, this platform was discontinued in 2013.

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
## Version tracking

* CFE lab stores a "fingerprint" of every data input and output handled by MiCall using an in-house software called Kive ([github.com/cfe-lab/Kive]()).

<img src="/img/kive-pipeline.png" width="70%"/>

---

# MiCall
## Open-source licensing

* Released source code under AGPL-3.0 license at [github.com/cfe-lab/MiCall]()
* Free to use, modify and redistribute with attribution. 
* Developing a more user friendly version at [github.com/PoonLab/MiCall-Lite]()

---

# Outline
## 3 applications of NGS

1. Finding new HIV drug resistance polymorphisms
2. Measuring the latent reservoir
3. Dating the latent reservoir

---

# Drug resistance
## INSTIs
<table>
<tr>
  <td>
    <ul>
      <li>Integrase strand transfer inhibitors.</li>
      <li>Difficult for HIV to evolve resistance, used for salvage therapy.</li>
      <li>Postdoc **Mariano Avino** with **Joint Clinical Research Centre** (JCRC) in Uganda and **Case Western Reserve University**.</li>
      <li>Examine virological failure in non-B patients failing INSTI-based regimens.</li>
    </ul>
  </td>
  <td width="30%">
    <table width>
      <tr><td colspan=2><img src="/img/mariano.jpeg" style="border: solid;"></td></tr>
      <tr><td><img src="/img/JCRC.jpg" width="120px"/></td>
      <td><img src="/img/CWRU.jpg" width="150px"/></td></tr>
    </table>
  </td>
<tr>
</table>


---

# Drug resistance
## Data collection

* Retrieved archived plasma samples from *n*=382 JCRC patients with non-B infections
  * 85 treatment naive
  * 129 first-line treatment failure
  * 116 second-line treatment failure
  * 53 failure raltegravir (RAL)-based regimen
* Sequenced two overlapping regions of HIV integrase on MiSeq

---

# Drug resistance
## SVM classification

* Encode the NGS data as a large binary matrix where `1` indicates that an amino acid is adequately present at a particular site.
* Since there are many more predictor variables (amino acids) than observations (samples), we used a **support vector machine** (SVM) that defines a model using data points instead of variables.
* Trained and validated SVM to classify RAL-exposed samples from naive samples and other treatment failures.

---

<section data-state="svm">
  <div id="svm" class="fig-container"
       data-fig-id="fig-cluster"
       data-file="/include/svm.html"
       style="height:600px"></div>
</section>

---

# Drug resistance
## Concluding remarks

* We find both known and potentially novel mutations associated with INSTI resistance. 
* NGS is useful because, in resource-limited settings, a patient may have stopped a failing treatment long before they are able to visit a clinic.
* Drug resistance mutations may have reverted to low frequencies.

---

# HIV latency
## What is the latent reservoir?

* HIV DNA becomes integrated into the host genome.
* A small fraction of infected cells enter an inactive state.
* Long-lived reservoir invisible to immune system and drug treatment; reseeds the infection.
<img src="/img/latency.jpg" width="500px"/>

<small><small>
AJ Murray *et al.* (2016) J Immunol 197:407.
</small></small>

---

# HIV latency
## How large is the reservoir?

* The reservoir is largely composed of resting CD4+ T cells.
* We measure the latent reservoir by the number of infected units per million (IUPM) cells.
* Use a limiting dilution assay to estimate the IUPM.
![](/img/limiting-dilution.png)

---

# HIV latency
## Estimating IUPM from NGS data

<table>
  <tr>
    <td>
    <ul>
      <li>A well tests posiitve if there is one or many infected cells.</li>
      <li>Detecting multiple HIV variants in a well by NGS may improve estimates.</li>
      <li>We developed a new Bayesian method to use NGS to estimate IUPM</li>
      <li>Applied to samples collected from Rakai, Uganda, by Johns Hopkins Medicine and NIAID (US).</li>
    </ul>
    </td>
    <td width="30%">
      <table>
        <tr><td colspan=2><img src="/img/prodger.jpeg"/>
        <small><small>Dr. Jessica Prodger</small></small></td></tr>
        <tr><td><img src="/img/Hopkins.png"/></td></tr>
        <tr><td><img src="/img/NIH_NIAID.jpg" width="150px"/></td></tr>
      </table>
    </td>
  </tr>
</table>

---

# HIV latency
## Results

<table>
  <tr>
    <td>
      Simulations show greater accuracy with increasing true IUPM.
      <img src="/img/iupm-barplots.png"/>
    </td>
    <td>
      <img src="/img/iupm-realdata.png"/>
    </td>
  </tr>
</table>

---

# HIV latency
## How does the reservoir persist?

* Half-life estimates for latent reservoir range from 4 to 12 years.
* Viral rebound within days of treatment interruption implies constant high rate of reactivation.
* Hypotheses:
  1. Growth of latently infected T-cells (clonal expansion).
  2. Low-level replication of HIV in drug sanctuaries.

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
