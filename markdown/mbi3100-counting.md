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
  * This gene has hypervariable regions flanked by conserved regions that can be targeted by primers.
  * Sequences covering V3 or V4-V5 are commonly used for metabarcoding ([Siegwald *et al.* 2017](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0169563)).
<img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Journal.pone.0035647.g002.tif/lossy-page1-1280px-Journal.pone.0035647.g002.tif.jpg" height="250px">

---

# Pipelines for 16S metabarcoding

* The development of bioinformatic pipelines like [QIIME](https://qiime2.org/) and [mothur](https://mothur.org/) greatly promoted 16S metabarcoding.
* These pipelines generally share the following steps: 
  1. Quality control: chimera detection
  2. Clustering sequences into OTUs
  3. Taxonomic assignment
  4. Quantifying abundances
  5. Phylogenetic analysis

---


<div style="display: flex; align-items: center; justify-content: space-around;">
<div style="flex: 1.1;">
<h3>Quality control</h3>
<h1>Chimera detection</h1>
<ul>
<li>During PCR amplification of 16S rRNA, a partial copy can act as a primer for a different 16S rRNA gene, creating a chimeric sequence.</li>
<li>Chimera detection programs generally work by comparing each 16S sequence to a reference database, calculating distances in sliding windows.</li>
</ul>
</div>
<div style="flex: 1; padding-left: 12pt;">
<img src="/img/chimera-formation.jpeg" height="230px">
<small>
Model of chimera formation.
</small>
<br/><br/>
<img src="/img/pintail.jpg" height="200px">
<small>
Output from Pintail, showing expected difference in grey and observed difference in red.
</small>
</div>
</div>

<small>
Image credits: Haas <i>et al.</i> 2011, <a href="https://genome.cshlp.org/content/21/3/494">Genome Res 21(3): 494-504</a>; Tiwarekar <i>et al.</i> 2023, <a href="https://www.biorxiv.org/content/10.1101/2023.04.10.535501v1.full">bioRxiv</a>.
</small>

---

# What are OTUs?

* An [operational taxonomic unit](https://en.wikipedia.org/wiki/Operational_taxonomic_unit) (OTU) is a group of closely-related individuals.
  * It is a working definition of a group when it is not feasible to identify known species, genera, etc.
* Clustering sequences can remove sequencing error by averaging out this variation.
  * Discarding OTUs with only one sequence is also a quality control step.
* Generating OTU clusters can also greatly reduce the data by several orders of magnitude.

---

### OTU clustering
# Calculating distances


<div style="display: flex; align-items: center; justify-content: space-around;">
<div style="flex: 1;">
<ul>
<li>To calculate distances, the 16S sequences have to be aligned.</li>
<li>For example, `mothur`:
  <ol>
  <li>uses a k-mer search to identify the best 16S reference for an input sequence</li>
  <li>performs pairwise global alignment (*e.g.* Needleman-Wunsch) to that reference.</li>
  <li>re-inserts gaps from the reference alignment.</li>
  </ol>
</ul>
</div>
<div style="flex: 1; padding-left: 1em;">
<img src="/img/NAST.png">
<br/>
<small>
Image credit: deSantis Jr <i>et al.</i> 2006, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC1538769/">Nucl Acids Res 34: W394-W399</a>.
</small>
</div>
</div>

---

### OTU clustering
# Methods to generate clusters

1. Closed reference clustering - sequences are assigned to the closest 16S reference
  * Unclear how to handle ties to multiple references, or sequences that are unrelated to any reference.
2. *de novo* clustering - *e.g.*, use hierarchical clustering to group sequences without references.
  * More computationally demanding; not obvious which method to use (*e.g.*, average vs. single linkage).
3. Open reference clustering - applies *de novo* clustering to sequences that are not assigned by closed reference clustering.

---

### OTU clustering
# Clustering thresholds

* OTUs are typically generated from the p-distance (%similarity).
  * The p-distance underestimates the evolutionary distance due to multiple hits.
* Studies previously used a 97% identity threshold to define clusters, but this may be too loose:
<img src="https://www.drive5.com/usearch/manual/lcr_prob_species.jpg" height="250px">
<small>
Image credit: RC Edgar (2017), <a href="https://academic.oup.com/bioinformatics/article/34/14/2371/4913809">Bioinformatics 34(14): 2371-2375</a>.
</small>

---

# Taxonomic assignment

* The [consensus sequence](https://en.wikipedia.org/wiki/Consensus_sequence) of each OTU is classified to a taxonomic group (*e.g.*, genus) based on its similarity to a reference database.
* There are several 16S reference databases, including:
  * [RDP](https://mothur.org/wiki/rdp_reference_files/) (Ribosomal Database Project)
  * [Silva](https://www.arb-silva.de/) (from Latin for *forest*)
  * [GreenGenes](https://ftp.microbio.me/greengenes_release/) - default for QIIME
* These databases are constantly being updated, and using different databases can yield conflicting annotations ([Edgar 2018](https://peerj.com/articles/5030/))

---

### Taxonomic assignment

Impact of 16S region and database on assignments

![](/img/Zymo-mock.png)

<small>
Image credit: Abellan-Schneyder <i>et al.</i> 2021, <a href="https://journals.asm.org/doi/full/10.1128/msphere.01202-20">mSphere 6: e01202-20</a>.
</small>


---

### Taxonomic assignment
# Naive Bayes classifier

* `mothur` and QIIME2 both use Naive Bayes classifiers to assign taxonomic labels to OTUs.
* This model assumes that $K$ features `$\{x_k\}$` are <a href="https://en.wikipedia.org/wiki/Independence_(probability_theory)">mutually independent</a>.
  * This is usually not true, hence the model is *naive*.
* Then the *maximum a posteriori* class is calculated as:
`$$
\hat{y} = \underset{y_j}{\operatorname{argmax}} P(y_j) \prod_{k=1}^{K} P(x_k|y_j)
$$`
where $P(y_j)$ is the prior probability of class $y_j$, and $P(x_k|y_j)$ is the probability of feature $x_k$ given the object belongs to class $y_j$.

---

### Taxonomic assignment
# RDP classifier

* The feature space consists of all possible $k$-mers for $k=8$.
* The classifier was trained on <a href="https://en.wikipedia.org/wiki/Bergey%27s_Manual_of_Systematic_Bacteriology">Bergey's Taxonomic Outline of the Prokaryotes</a> (release 5.0), consisting of 5,014 16S rRNA sequences for 988 genera.

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

