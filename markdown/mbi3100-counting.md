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
  * 
* A [virome](https://en.wikipedia.org/wiki/Virome) refers to all viruses associated with an environment.
  * There is no gene shared by all viruses; most RNA viruses encode [RdRp](https://en.wikipedia.org/wiki/RNA-dependent_RNA_polymerase).
* [Environmental DNA](https://en.wikipedia.org/wiki/Environmental_DNA) applies metabarcoding to "macro-organisms".
  * No marker that works well for all organisms; *e.g.*, 18S rRNA for protists.

---

### Metabarcoding
# 16S rRNA

* Bacterial genomes carry from one to 15 copies of genes encoding 16S rRNA
* This gene has variable and conserved regions 

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

* An operational taxonomic unit (OTU) 

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

