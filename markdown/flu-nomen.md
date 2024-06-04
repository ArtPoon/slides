# Dynamics 2024
## Prospects for a molecular taxonomy of influenza A virus subtypes
### Art Poon

Western University, Canada
<div style="color: black; font-size: 0.8em">
Department of Pathology and Laboratory Medicine<br/>
Department of Computer Science<br/>
Department of Microbiology and Immunology<br/>
</div>

---


* The influenza A virus (IAV) genome comprises 8 segments, numbered in decreasing order by length.

<img src="/img/influenza_genome_image.svg" height=300/>

* IAV infections are frequently classified into HnNn subtypes based on hemagglutinin (HA, 4) and neuraminidase (NA, 6).

<small><small>
Image credit: ViralZone, Swiss-Prot group, SIB Swiss Institute of Bioinformatics
</small></small>

---

# IAV subtypes

* HA and NA are partitioned into 18 and 11 subtypes, respectively.
* Historically, subtypes were defined by antigenic characteristics, *e.g.*, double immunodiffusion (DID/IDD) assays.

Photos of IDD gel plates from Schild *et al.* (1980) where sera is deposited in central well and purified virus in the surrounding wells.  Precipitate is caused by antigen binding.
<img src="/img/schild.png">

<small><small>
Schild, G. C., Newman, R. W., Webster, R. G., Major, D., & Hinshaw, V. S. (1980). Antigenic analysis of influenza A virus surface antigens: considerations for the nomenclature of influenza virus. Comparative immunology, microbiology and infectious diseases, 3(1-2), 5-18.
</small></small>

---

![](/img/iav-subtypes.svg)

---

<div style="text-align: center; font-weight: 900; font-size: 48pt; line-height: 1em;">
Can we recapitulate this taxonomy of IAV subtypes from genomic sequences alone?
</div>

<ul>
  <li>This is a different problem than classifying with respect to serologically-defined reference genomes.</li>
  <li>Can the other segments also be clustered into subtypes?</li>
</ul>

---

# Data collection

* Downloaded all available (~1.1M) IAV protein sequences from NCBI Genbank (June 6, 2023)
* Filtered for:
  * Incomplete or misannotated sequences
  * Proteins from alternate open reading frames (PB1-F2, PA-X)
  * More than 10% ambiguous residues
* Concatenated non-overlapping portions of M1-M2 and NS1-NS2(NEP)
* Aligned with MAFFT, inspected in AliView and built trees with FastTree.

---

![](/img/treeplots.png)

Midpoint-rooted ML trees for unique HA ($n=66,864$) and NA ($n=52,146$) sequences, coloured by serotype annotations.

---

Missing serotype annotations were inferred by each sequence's nearest-neighbour in the phylogeny.  Sequences from the most common HnNn serotypes were disproportionately less likely to be unlabeled.
<img src="/img/iav-infer-subtype.svg" width="100%"/>

---

## Thanks!

<table>
<tr>
  <td>
    <img src="/img/cihr.png" width=250/><br/>
    <img src="/img/NSERC_RGB.png" width=200/>
  </td>
  <td>
  <img src="/img/lab-thumbnails.jpeg" width=400/></td>
</tr>
</table>
