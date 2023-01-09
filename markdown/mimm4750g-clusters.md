# MIMM4750G
## Clustering and infectious disease
<img src="https://imgs.xkcd.com/comics/chat_systems.png" width="600px"/>

---

# Genetic distance clustering

* A [cluster](https://en.wikipedia.org/wiki/Cluster_analysis) is a group of observations that are more similar to each other than observations outside the cluster.
  * Since we often have only genetic sequences to work with, we tend to cluster infections by genetic distance.

* Several applications of clustering for infectious diseases
  * Defining a virus nomenclature (taxonomy)
  * Finding population-level associations with transmission patterns (epidemiology)
  * Detecting outbreaks (epidemiology)

---

# Pairwise clustering

* Calculate a pairwise distance matrix for a set of sequences.
  * We usually use a multiple sequence alignment, but this is not strictly necessary.
* There are several ways to convert the distance matrix to clusters, *i.e.*, hierarchical clustering.
* The most common method is [single linkage clustering](https://en.wikipedia.org/wiki/Single-linkage_clustering).
  * Any pair of sequences with a distance $d(x,y)$ below a threshold $d_{\mathrm{max}}$ are assigned to the same cluster.

---

# Choosing thresholds

* There is no general rule about how to select the threshold $d_{\mathrm{max}}$.
* The number and sizes of clusters changes with different thresholds.
  * As $d_{\mathrm{max}}\rightarrow 0$, every infection becomes a cluster of one.
  * As $d_{\mathrm{max}}\rightarrow \infty$, all infections collapse into a single giant cluster.

---

<section data-state="tn93-slide">
  <br/>
  <div id="tn93" class="fig-container"
       data-fig-id="fig-tn93"
       data-file="/include/clustering.html"
       style="width:800px; margin:0 auto; height:700px">
  </div>
</section>

---

# Virus taxonomy

* Taxonomy is the classification of organisms into groups.
* Virus taxonomy is complicated:
  * Do not meet conventional species definitions (*e.g.*, reproductive isolation)
  * Exchange genetic material with each other and the host genome.
  * Often a virus is known only through its genome sequence.
* Genetic clusters provide a framework for defining a virus taxonomy.

---

# Example: hepatitis C virus (HCV)

* HCV is a positive-sense single-stranded RNA virus that can establish a persistent infection in humans.
  * Infection can progress to severe liver disease.
  * Mostly transmitted by injection.
* Early studies found substantial variation (p-distances up to 35%) among infections.
  * Simmonds (1995) wrote an early proposal to cluster HCV sequences into "genotypes" and "subtypes" based on genetic distances.

---

A histogram of p-distances among 76 HCV NS5 gene sequences from around the world.  Thresholds at 0.27 and 0.12 demarcate genotypes and subtypes, respectively.
<img src="/img/hcv-dists.png" height="400px"/>

<small><small>
Image source: Peter Simmonds (1995) Variability of hepatitis C virus. Hepatology 21(2): 570-583.
</small></small>

---

# HCV genotypes

* This initial proposal eventually developed into a global consensus ([Simmonds et al. 2005](https://aasldpubs.onlinelibrary.wiley.com/doi/10.1002/hep.20819))
  * Six genotypes (labelled 1-6) at p-distance threshold 30%.
  * Varying number of subtypes within each genotype (*e.g.*, 1a, 1b) at threshold 20% to 25%.
* Clinical significance: HCV genotypes responded differently to standard treatment at the time ([ribavirin](https://en.wikipedia.org/wiki/Ribavirin) and [pegylated interferon](https://en.wikipedia.org/wiki/Peginterferon_alfa-2a)).

---

# Current geographic distribution of HCV genotypes

Genotype 4 is concentrated in central and north Africa; genotype 3 in central Asia.

<img src="/img/hcv-global.png"/>

<small><small>
Image source: The Polaris Observatory HCV Collaborators (2017) Global prevalence and genotype distribution of hepatitis C virus infection in 2015: a modelling study. Lancet Gastroenterol Hepatol 2: 161-176.
</small></small>

---

<table>
  <tr>
    <td style="vertical-align:middle; font-size: 24px;">
      <h1>HIV groups and subtypes</h1>
      <ul>
        <li>Defining groupings within species (HIV-1)</li>
        <li>Four HIV-1 groups (M-P) associated with different zoonotic events.</li>
        <li>Group M is split into subtypes (A-J).</li>
        <li>A and F are split into sub-subtypes (A1-A7, F1, F2).</li>    
        </ul>
        <small><small>
        Image credit: N D&eacute;sir&eacute; <i>et al.</i> (2018) Characterization update of HIV-1 M subtypes diversity and proposal for subtypes A and D sub-subtypes reclassification. <a href="https://retrovirology.biomedcentral.com/articles/10.1186/s12977-018-0461-y">Retrovirology 15: 80</a>.
        </small></small>
    </td>
    <td width="40%">
      <img height="600px" src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs12977-018-0461-y/MediaObjects/12977_2018_461_Fig1_HTML.png"/>
    </td>
  </tr>
</table>

---

# Spread of HIV subtypes around the world
<img src="/img/1-s2.0-S1473309910701869-gr2_lrg.jpg" height="500px"/>

<small><small>
Image source: Tebit and Arts (2011) Tracking a century of global expansion and evolution of HIV to drive understanding and to combat disease. Lancet Inf Dis 11: 45-56.
</small></small>

---

# Viral nomenclature

* Viral nomenclature is the assignment of viruses to taxonomic groups, and labelling those groups.
  * The primary objective of viral nomenclature is stability.
* There is no agreement on what to call groups below the species level.
  * *e.g.*, serotypes, genotypes, subtypes, clades, strains, variants, isolates

---

# Example: SARS-CoV-2

* A unique opportunity to see a new virus species become established and diversify in a novel host population.
* Several competing nomenclature systems:
  * [Nextstrain year-letter naming](https://nextstrain.org/blog/2020-06-02-SARSCoV2-clade-naming), *e.g.*, 21A
  * [Network for Genomic Surveillance in South Africa](https://www.medrxiv.org/content/10.1101/2021.03.30.21254323v1), *e.g.*, 501Y.V2
  * [Public Health England](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/959360/Variant_of_Concern_VOC_202012_01_Technical_Briefing_3.pdf), *e.g.*, VOC 202012/01
  * [PANGO](https://www.nature.com/articles/s41564-020-0770-5), *e.g.*, B.1.351

---

# PANGO nomenclature system

* A PANGO lineage is a defined cluster of SARS-CoV-2 genomes.
* A new lineage must:
  * comprise at least 5 genome sequences, at least 95% complete.
  * have at least 1 shared mutation from the ancestral lineage.
  * be reproducible at least 75% of resampled datasets.
* Lineage names begin with a letter, *e.g.*, `B.1`
  * The evolutionary history of a lineage is recorded by a sequence of numbers separated by dots, *e.g.*, `B.1.1.529.5.3.1.1.1.1.1`

---

# PANGO nomenclature system (2)

* To avoid running out of letter prefixes, the system started using two-letter combinations, *e.g.*, `AA`.
* Past a maximum of three "sublevels", the lineage name is replaced by an "alias"
  * *e.g.*, `B.1.1.529.5` became `BA.5`
  * `BA.5.3.1.1` became `BE.1`, `BE.1.1.1.1` became `BQ.1`, and `BQ.1.1.1.1` became `CZ.1`
* Recombinant lineages are prefixed with an `X`, *e.g.*, `XBB.1.5`

---

# Clustering bacteria

<table>
  <tr>
    <td>
      <ul>
        <li>Bacterial genomes tend to be more fluid than viruses, with less conserved genes.</li>
        <li>Calculating distances requires a conserved locus (<i>e.g.</i>, 16S rRNA) or set of "core" genes, <i>e.g.</i>, multi-locus sequence typing, MLST.</li>
        <li>Gradually being replaced with whole genome methods that predict core and accessory loci (right)</li>
      </ul>
    </td>
    <td width="50%">
      <img src="https://poppunk.readthedocs.io/en/latest/_images/unconstrained_refine.png" width="500px">
      <small>
      Image source: <a href="https://poppunk.readthedocs.io/en/latest/model_fitting.html">PopPUNK documentation, Lees and Croucher (2020)</a>
      </small>
    </td>
  </tr>
</table>

---

# Defining new virus species

* The [International Committee on the Taxonomy of Viruses](https://talk.ictvonline.org/) allows the definition of a new virus species based on genetic clustering, although this remains controversial.

> Unfortunately, in recent years, ICTV Study Groups [...] have created large number of species on the basis of a single criterion, namely a certain percentage of genome similarity between individual viruses.

---

# Example: Geminiviruses

* Circulate ssDNA viruses infecting plants - causes significant loss in crop yields.
* In 2005, Fauquet and others proposed a distance threshold-based system for defining genera and species.

<img src="/img/geminivirus.png" height="300px"/>

<small><small>
Image credit: CM Fauquet <i>et al.</i> (2008) [Geminivirus strain demarcation and nomenclature](https://link.springer.com/article/10.1007%2Fs00705-008-0037-6).  Arch Virol 153:783-821.
</small></small>

---

# Further readings

* [Consensus statement: Virus taxonomy in the age of metagenomics](https://www.nature.com/articles/nrmicro.2016.177)
* [Hanage *et al.* (2006) Sequences, sequence clusters and bacterial species](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1764932/)
* [Viral taxonomy: The effect of metagenomics on understanding the diversity and evolution of viruses](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5623832/) by Philip Hunter.
* ['A bloody mess': Confusion reigns over naming of new COVID variants](https://www.nature.com/articles/d41586-021-00097-w)