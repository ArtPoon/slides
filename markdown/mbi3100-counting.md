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

### Metabarcoding
# 16S rRNA

* Bacterial genomes carry from one to 15 copies of genes encoding [16S rRNA](https://en.wikipedia.org/wiki/16S_ribosomal_RNA), a component of the ribosome.
  * This gene has hypervariable regions flanked by conserved regions.
  * Sequences covering V1/V2-V3 or V3-V4/V5 are commonly used for metabarcoding.
<img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Journal.pone.0035647.g002.tif/lossy-page1-1280px-Journal.pone.0035647.g002.tif.jpg" height="250px">

---

# Pipelines for 16S metabarcoding

* The development of bioinformatic pipelines like QIIME and mothur greatly promoted 16S metabarcoding.
* These pipelines generally share the following steps: 
  1. Quality control: pre-processing and filtering
  2. Clustering sequences into OTUs
  3. Taxonomic assignment
  4. Quantifying abundances
  5. Phylogenetic analysis

---

# OTUs

* An operational taxonomic unit (OTU) is a group of closely-related individuals.
* Clustering sequences can remove sequencing error

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

