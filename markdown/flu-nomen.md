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

Sequences from the most common HnNn serotypes were disproportionately less likely to be unlabeled (inferred from nearest neighbours in tree).
<img src="/img/iav-infer-subtype.svg" width="100%"/>

---

# Adapting clade definitions

* Clades within an IAV subtype are defined at nodes on the basis of (1) bootstrap support, (2) mean distance between clades, and (3) mean distance within clade.
  * Bootstrap support and the length of the branch associated with the node tend to be highly correlated.
* I calculated the mean patristic distance ($y_i$), and the distance from $i$ to its closest 'sibling' node ($v_i$) by postorder traversal of nodes ($i$).
  * Labeled this approach as "nodewise clustering".

---

There is no configuration of nodewise clusters that match the defined HA subtypes.

![](/img/flu-subtree-results.svg)

---

# Problems with nodewise clustering

* An increasing number of sequences fall outside of subtrees (unclassified) with decreasing patristic distance ($y$) threshold.
* Increasing $y$ results in subtrees comprising multiple serotypes.
* More challenging to locate an optimum with two or more parameters.
* There must be an easier way!

---

# Edgewise clustering

![](/img/edgewise.svg)

---

Edgewise clustering results for HA
<table>
  <tr>
    <td><img src="/img/chainsaw-ha.svg" width=500/></td>
    <td><img src="/img/chainsaw-ha-table.svg" width=400/></td>
  </tr>
</table>

---

Edgewise clustering results for NA
<table>
  <tr>
    <td><img src="/img/chainsaw-na.svg" width=500/></td>
    <td><img src="/img/chainsaw-na-table.svg" width=400/></td>
  </tr>
</table>

---

# Do we need to revise the subtype taxonomy?

* A subtree in both HA and NA trees consists of only two infections.
  * Divergent H9N2 genomes isolated from bats in Egypt (Kandeil *et al.* 2019) and South Africa (Rademan *et al.* 2023).
* This analysis supports merging H7 with H15, and H13 with H16.
  * Consistent with previous work reporting mean amino acid identities of 80% and 81%, respectively.
  * Other subtypes tend to have identities around 50%.

---

Edgewise clustering only supports about 4-5 subtrees &mdash; (1) equine H7N7, (2)  H9N2 in bats, (3) H17N10, (4) H18N11, and (5) everything else.

![](/img/chainsaw-others.svg)

---

# Why go molecular?

* The number of published IAV genome sequences is growing exponentially.
  * More sampling from non-human, non-domesticated host species likely to uncover more unclassifiable genomes.
  * RNA from environmental and metagenomic samples cannot be serotyped.
* A molecular taxonomy can be more transparent and reproducible.

<table><tr>
  <td>
    <img style="padding: 0;" src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" width=50/>
  </td>
  <td style="padding-left: 0; vertical-align: middle; font-size: 32pt;">
    <a style="color: SteelBlue;" href="https://github.com/PoonLab/fluclades">PoonLab/fluclades</a>
  </td>
</tr></table>

<a href="https://zenodo.org/records/8119571">
    <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.8119571.svg" width=300/>
</a>

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
