# MBI 3100A
## Counting reads and metagenomics
![](https://imgs.xkcd.com/comics/land_mammals.png)

---

# Counting reads

* Reference-based mapping algorithms can align reads to:
  * Different loci in a genome
  * Different genomes
* Counting how many reads map to different targets transforms the primary data type from genetic sequences to numbers:
  * Differences in gene expression, *i.e.*, RNA-seq
  * Relative abundance of species in a community, *i.e.*, metagenomics

---

# Metagenomics

* Analysis of samples containing genomes from different species.
* Early work focused on a single marker gene shared by all organisms of interest, *e.g.*, [16S rRNA](https://en.wikipedia.org/wiki/16S_ribosomal_RNA) for bacteria.
  * This is [metabarcoding](https://en.wikipedia.org/wiki/Metabarcoding), although many 16S studies will use the term "metagenomics".
* Metagenomics uses random shearing and shotgun sequencing of all DNA in the sample.

<img src="/img/metagenomics.svg" width=500/>

---

### Metagenomics
# Communities

* [Microbiome](https://en.wikipedia.org/wiki/Microbiome) refers to bacterial communities (some prefer "microbiota" because a [biome](https://en.wikipedia.org/wiki/Biome) is a geographical region with a distinct climate and ecosystem).
  * Only about 1% of all bacteria can be grown in the lab.
* A [virome](https://en.wikipedia.org/wiki/Virome) refers to all viruses associated with an environment.
  * There is no gene shared by all viruses; most RNA viruses encode [RdRp](https://en.wikipedia.org/wiki/RNA-dependent_RNA_polymerase).
* [Environmental DNA](https://en.wikipedia.org/wiki/Environmental_DNA) applies metabarcoding to "macro-organisms".
  * No marker that works well for all organisms; *e.g.*, 18S rRNA for protists.

---

### Metabarcodingå
# 16S rRNA

* Bacterial genomes carry from one to 15 copies of genes encoding [16S rRNA](https://en.wikipedia.org/wiki/16S_ribosomal_RNA), a component of the ribosome.
  * This gene has hypervariable regions flanked by conserved regions that can be targeted by primers.
  * Sequences covering V3 or V4-V5 are commonly used for metabarcoding ([Siegwald *et al.* 2017](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0169563)).
<img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Journal.pone.0035647.g002.tif/lossy-page1-1280px-Journal.pone.0035647.g002.tif.jpg" height="250px">

---

# Pipelines for 16S metabarcoding

* The development of bioinformatic pipelines like [QIIME](https://qiime2.org/) and [mothur](https://mothur.org/) greatly promoted 16S metabarcoding.
* These pipelines generally share the following steps: 
  1. Quality control: pre-processing and filtering
  2. Clustering sequences into OTUs
  3. Taxonomic assignment
  4. Quantifying abundances
  5. Phylogenetic analysis

---


<div style="display: flex; align-items: center; justify-content: space-around;">
<div style="flex: 1.1;">
<h1>Chimera detection</h1>
<ul>
<li>During PCR amplification of 16S rRNA, a partial copy can act as a primer for a different 16S rRNA gene, creating a chimeric sequence.</li>
<li>Chimera detection programs generally work by comparing each 16S sequence to a reference database, calculating distances in sliding windows.</li>
</ul>
</div>
<div style="flex: 1;">
<img src="/img/chimera-formation.jpeg" height="250px">
<br/>
<img src="/img/pintail.jpg" height="200px">
</div>
</div>

<small>
Image credits: Haas <i>et al.</i> 2011, <a href="https://genome.cshlp.org/content/21/3/494">Genome Res 21(3): 494-504</a>; Tiwarekar <i>et al.</i> 2023, <a href="https://www.biorxiv.org/content/10.1101/2023.04.10.535501v1.full">bioRxiv</a>.
</small>

---

# OTUs

* An operational taxonomic unit (OTU) is a group of closely-related individuals.
* Clustering sequences can remove sequencing error
* Discard OTUs with only one read

---

# Compositional data



---



# Batch effects

---

# Quality control: PCA

---

# Correlation plot

* Pairwise comparisons of all covariates in your study

---

# Stacked barplots

---

# Heatmaps

---

# Taxon set analysis

