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

* [Microbiome](https://en.wikipedia.org/wiki/Microbiome) refers to microbial communities (some prefer "microbiota" because a [biome](https://en.wikipedia.org/wiki/Biome) is a geographical region with a distinct climate and ecosystem).
  * Only about 1% of all bacteria can be grown in the lab.
* A [virome](https://en.wikipedia.org/wiki/Virome) refers to all viruses associated with an environment.
  * There is no gene shared by all viruses; most RNA viruses encode [RNA-dependent RNA polymerase](https://en.wikipedia.org/wiki/RNA-dependent_RNA_polymerase) (RdRp).
* [Environmental DNA](https://en.wikipedia.org/wiki/Environmental_DNA) typically refers to metabarcoding for "macro-organisms".
  * No marker that works well for all plants and animals.

---

### Metabarcoding
# 16S rRNA

* Bacterial genomes carry from one to 15 copies of genes encoding [16S rRNA](https://en.wikipedia.org/wiki/16S_ribosomal_RNA), a component of the ribosome.
  * This gene has hypervariable regions flanked by conserved regions that can be targeted by primers.
  * Sequences covering V3 or V4-V5 are commonly used for metabarcoding ([Siegwald *et al.* 2017](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0169563)).
<img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Journal.pone.0035647.g002.tif/lossy-page1-1280px-Journal.pone.0035647.g002.tif.jpg" height="250px">

---

# Pipelines for 16S metabarcoding

* The development of bioinformatic pipelines like [QIIME2](https://qiime2.org/) and [mothur](https://mothur.org/) greatly promoted 16S metabarcoding.
* These pipelines generally shared the following steps: 
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

* An [operational taxonomic unit](https://en.wikipedia.org/wiki/Operational_taxonomic_unit) (OTU) is a sequence that represents a group of related organisms.
  * It is a working definition of a group when it is not feasible to identify known species, genera, etc.
* Clustering sequences can remove sequencing error by averaging out this variation.
  * Discarding OTUs with only one sequence is also a quality control step.
* Generating OTU clusters can also greatly reduce the data by several orders of magnitude.

---

### OTU clustering
# Calculating distances


<div style="display: flex; align-items: center; justify-content: space-around;">
<div style="flex: 1.2;">
<ul>
<li>To calculate distances, the 16S sequences have to be aligned.</li>
<li>For example, <code>mothur</code>:
  <ol>
  <li>uses a k-mer search to identify the best 16S reference for an input sequence</li>
  <li>performs pairwise global alignment (<i>e.g.</i>, Needleman-Wunsch) to that reference.</li>
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

1. **Closed reference clustering** &mdash; sequences are assigned to the closest 16S reference
  * Unclear how to handle ties to multiple references, or sequences that are unrelated to any reference.
2. ***de novo* clustering** &mdash; *e.g.*, use hierarchical clustering to group sequences without references.
  * More computationally demanding; not obvious which method to use (*e.g.*, average vs. single linkage).
3. **Open reference clustering** - applies *de novo* clustering to sequences that are not assigned by closed reference clustering.

<small>
Source: Westcott and Schloss (2017) <a href="https://journals.asm.org/doi/full/10.1128/mspheredirect.00073-17">MSphere 2(2): e00073-17</a>.
</small>

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
  * [GreenGenes](https://ftp.microbio.me/greengenes_release/) - the first 16S database
  * [RDP](https://mothur.org/wiki/rdp_reference_files/) (Ribosomal Database Project)
  * [Silva](https://www.arb-silva.de/) (from Latin for *forest*)
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

* `mothur` and `QIIME2` both have implementations of the RDP Naive Bayes classifier to assign taxonomic labels to OTUs (<a href="https://journals.asm.org/doi/full/10.1128/aem.00062-07">Wang <i>et al.</i>, 2007</a>).
  * The feature space $X$ consists of all possible $k$-mers (for $k=8$).  Let $x_k$ represent a specific $k$-mer.
  * The classifier attempts to assign each sequence to a genus (the $i$-th class, $y_i$).
* Assumes that $K$ features `$\{x_k\}$` are <a href="https://en.wikipedia.org/wiki/Independence_(probability_theory)">mutually independent</a>.
  * This is usually not true, hence the model is *naive*.

---

### Taxonomic assignment
# Conditional probability

* The "Bayes" part of naive Bayes means that we treat both data and hypotheses (classes) as [random variables](https://en.wikipedia.org/wiki/Random_variable).
<img src="/img/RDP-Venn.svg" height="100px"/>

* The *conditional probability* that $Y=y_k$ given that $X=x_k$ is:
  
  $$
  P(Y=y_i | X = x_k) = \frac{P(Y=y_i, X=x_k)}{P(X=x_k)}
  $$
  where $P(Y=y_i, X=x_k)$ is the [*joint probability*](https://en.wikipedia.org/wiki/Joint_probability_distribution) that both are true.

---

### Taxonomic assignment
# Independence assumption

* What we really want is the probability that $Y=y_i$, given that a sequence consists of some combination of features:

$$
P(Y | X_1, X_2, \ldots, X_N) = \frac{P(Y, X_1, X_2, \ldots, X_N)}{P(X_1, X_2, \ldots, X_N)}
$$

* Because we assume that features are independent outcomes, the numerator simplifies to a product:

$$
\begin{split}
P(Y, X_1, X_2, \ldots, X_N) & = P(X_1 | X_2, \ldots, X_N, Y) P(X_2, \ldots, X_N, Y)\\\\
 & = P(X_1 | Y) P(X_2 | X_3 \ldots, X_N, Y) P(X_3 \ldots, X_N, Y)\\\\
 & = P(X_1 | Y) P(X_2 | Y) \ldots P(X_N | Y) P(Y)
\end{split}
$$



---

### Taxonomic assignment
# Derivation

* Then the *maximum a posteriori* class is calculated as:
`$$
\hat{y} = \underset{y_j}{\operatorname{argmax}} P(Y=y_i) \prod_{j=1}^{N} P(X_j|y_i)
$$`
where $P(Y=y_i)$ is the prior probability of class $y_i$, and $P(X_j|y_i)$ is the probability of $j$-th feature given the sequence belongs to class $y_i$.
  * The [argmax](https://en.wikipedia.org/wiki/Arg_max) operator returns the [argument](https://en.wikipedia.org/wiki/Argument_of_a_function) that maximizes the function.
* The RDP classifier assumes a uniform prior on genera, *i.e.*, $P(Y)$ is a constant and drops out of the model.

---

### Taxonomic assignment
# Simplified example of Naive Bayes classifier

<div style="display: flex; align-items: center; justify-content: space-around; padding-left: 1em; padding-top: 1em;">

<div style="flex:0.4;">
Training data:<br/><br/>

Genus A: 
<pre style="font-size: 16pt;">
ATTA
ATTG
ACTA
</pre>
Genus B: 
<pre style="font-size: 16pt;">
ACCG
ATCA
ATTA
</pre>
</div>

<div style="flex:1;">
Count k-mers
<table>
<thead>
<tr><th>k-mer</th><th>A</th><th>B</th></tr>
</thead>
<tbody>
<tr> <td>AC</td> <td>1</td> <td>1</td> </tr>
<tr> <td>AT</td> <td>2</td> <td>2</td> </tr>
<tr> <td>CC</td> <td>0</td> <td>1</td> </tr>
<tr> <td>CT</td> <td>1</td> <td>0</td> </tr>
<tr> <td>TA</td> <td>2</td> <td>1</td> </tr>
<tr> <td>TC</td> <td>0</td> <td>1</td> </tr>
<tr> <td>TG</td> <td>1</td> <td>0</td> </tr>
<tr> <td>TT</td> <td>2</td> <td>1</td> </tr>
</tbody>
</table>
</div>

<div style="flex:1;">
Conditional probabilities
<table>
<thead>
<tr><th>k-mer</th><th>A</th><th>B</th></tr>
</thead>
<tbody>
<tr> <td>AC</td> <td>0.11</td> <td>0.11</td> </tr>
<tr> <td>AT</td> <td>0.22</td> <td>0.22</td> </tr>
<tr> <td>CC</td> <td>0</td> <td>0.11</td> </tr>
<tr> <td>CT</td> <td>0.11</td> <td>0</td> </tr>
<tr> <td>TA</td> <td>0.22</td> <td>0.11</td> </tr>
<tr> <td>TC</td> <td>0</td> <td>0.11</td> </tr>
<tr> <td>TG</td> <td>0.11</td> <td>0</td> </tr>
<tr> <td>TT</td> <td>0.22</td> <td>0.11</td> </tr>
</tbody>
</table>
</div>

<div style="flex:1;">
New sequence: `ATTA`<br/>
<br/>

P(`ATTA` | Genus A)
$=0.22\times 0.22 \times 0.22$
<br/><br/>

P(`ATTA` | Genus B)
$=0.22\times 0.11 \times 0.11$
<br/><br/>

argmax = "Genus A"
</div>
</div>

---

<div style="display: flex; align-items: center; justify-content: space-around; padding-left: 1em; padding-top: 1em;">
  <div style="flex:2;">
  <h3>Taxonomic assignment</h3>
  <h1>RDP classifier</h1>

  <ul>
  <li>The RDP classifier was trained on <a href="https://en.wikipedia.org/wiki/Bergey%27s_Manual_of_Systematic_Bacteriology">Bergey's Taxonomic Outline of the Prokaryotes</a> (release 5.0), consisting of 5,014 16S rRNA sequences for 988 genera.</li>
  <li>So far, deep neural networks have not improved on the RDP classifier (<a href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009345#sec018">Zhao <i>et al.</i> 2021</a>)</li>
  </ul>
  </div>
  <div style="flex:1;">
  <img src="/img/zam0160780800001.jpeg">
  <br/>
  <small>
  Image credit: Wang <i>et al.</i> (2007) <a href="https://journals.asm.org/doi/full/10.1128/aem.00062-07">Appl Environ Microbiol 73(16): 5261-7</a>.
  </small>
  </div>
</div>

---

![](https://upload.wikimedia.org/wikipedia/commons/5/56/Owen_Sound_October_14_2010_%288760231245%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original)

<small>
Image source: Georgian Bay panorama, <a href="https://commons.wikimedia.org/wiki/File:Owen_Sound_October_14_2010_(8760231245).jpg">Northern Lights Graffiti from Owen Sound, Ontario</a> (CC-BY 2.0).
</small>

---

# Quantifying abundances

* Taxonomic assignment labels each OTU consensus sequence with a genus or higher grouping (family, order).
  * The total number of sequences in OTUs assigned to the same taxon is a raw estimate of that taxon's abundance in the community.
* A major issue is that differences in library size (total number of reads) will cause samples to have different numbers of OTUs.
  * This influences the chance of seeing rare taxa in a sample.
  * One method to correct this is to generate random samples of the same number of OTUs ([rarefaction](https://journals.asm.org/doi/10.1128/msphere.00354-23)).

---

# Comparing samples

* There are several distances that are used to compare the relative abundances of different samples
  * Let $P_i$ be the *absolute* number of sequences in taxon $i$ in sample $A$.
  * Let $p_i$ is the *relative* abundance of taxon $i$ in sample $A$.
  * Let $Q_i$ and $q_i$ be the analogous quantities for sample $B$.

| Sample | Genus 1 | Genus 2 | Genus 3 | Total |
|--------|---------|---------|---------|-------|
| A      | 100     | 20      | 5       | 125   |
| B      | 20      | 10      | 2       | 32    |

| Sample | Genus 1 | Genus 2 | Genus 3 |
|--------|---------|---------|---------|
| A      | 0.8     | 0.16      | 0.04    |
| B      | 0.625      | 0.3125      | 0.0625   |

---

# Bray-Curtis dissimilarity

* The Bray-Curtis dissimilarity is the sum of differences in the relative abundances between samples, normalized by their sum:<br/><br/>
$$d_{\text{BC}} = \frac{\sum_i |p_i - q_i|}{\sum_i (p_i+q_i)}$$

| Sample | Genus 1 | Genus 2 | Genus 3 | Total |
|--------|---------|---------|---------|-------|
| A      | 0.8     | 0.16      | 0.04    |   |
| B      | 0.625      | 0.3125      | 0.0625   |   |
| $\vert p_i-q_i\vert$ | 0.175 | 0.1525 | 0.0225 | 0.35 |
| $p_i+q_i$ | 1.425 | 0.4725 | 0.1025 | 2.0 |

<div style="text-align: center; font-weight: 500; padding-top: 1ex;">
$d_{\text{BC}}=0.35/2 = 0.175$
</div>

---

# Jensen-Shannon divergence

* The [Kullback-Leibler divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence) is a measure of the difference between two probability distributions:
  $$d_{\text{KL}}(p||q) = \sum_i p_i \log\left(\frac{p_i}{q_i}\right)$$

* The [Jensen-Shannon divergence](https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence) is a symmetric version of the KL divergence: 
`$d_{\text{JS}} = \big[d_{\text{KL}}(p||q) + d_{\text{KL}}(q||p)\big]/2$`

| Sample | Genus 1 | Genus 2 | Genus 3 | Total |
|--------|---------|---------|---------|-------|
| A      | 0.8     | 0.16      | 0.04    |   |
| B      | 0.625      | 0.3125      | 0.0625   |   |
| $p_i\log(p_i/q_i)$ | 0.197 | $-$0.107 | $-$0.018 | 0.0725 |
| $q_i\log(q_i/p_i)$  | $-$0.154 | 0.209 | 0.028 | 0.0828 |

<div style="text-align: center; font-weight: 500; padding-top: 1ex;">
$d_{\text{JS}}=0.35/2 = (0.0725 + 0.0828)/2 = 0.07765$
</div>

---

# UniFrac distance

* Bray-Curtis and Jensen-Shannon do not account for the evolutionary relationships among OTUs / taxa.
  * Two taxa that are 10% divergent tend to be more ecologically similar than 50% divergent taxa.
* The UniFrac distance maps all taxa observed in either sample to a phylogenetic tree:
<div style="display: flex; align-items: center; justify-content: space-around; padding-top: 1ex;">
<div style="flex: 1.3;">
<img src="/img/unifrac-trees.svg" height="200px">
</div>
<div style="flex: 1; padding-left: 2em; font-size: 18pt;">
Branches that are ancestral to only one of two samples count towards the distance.
</div>

---

### UniFrac
# Formula

* Let `$b_i$` be the length of the branch associated with node `$i$`.  Then:<br/><br/>
$$
d_{U} = \frac{\sum_i b_i |\mathbf{1}(p_i>0) - \mathbf{1}(q_i>0)|}
{\sum_i b_i \mathbf{1}(p_i+q_i>0)}
$$

* $p_i$ is the relative abundance of all descendants of node $i$.
* $\mathbf{1}(x)$ is an [indicator function](https://en.wikipedia.org/wiki/Indicator_function) that returns 1 if $x$ is True, and 0 otherwise.  
  * $|\mathbf{1}(p_i>0) - \mathbf{1}(q_i>0)|$ tests if there is discordant presence/absence between samples.
  * $\mathbf{1}(p_i+q_i>0)$ tests if descendants of node $i$ are present in either sample.

---

### UniFrac
# Example

<div style="display: flex; align-items: center; justify-content: space-around;">
  <div style="flex: 1;">
    <img src="/img/simple-tree.svg" height="150px">
  </div>
  <div style="flex: 1">
    <table>
    <thead>
    <tr><th>Sample</th><th>Genus 1</th><th>Genus 2</th><th>Genus 3</th></tr>
    </thead>
    <tbody>
    <tr><td>A</td><td> 0.5 </td><td> 0.5 </td><td> 0  </td></tr>
    <tr><td>B  </td><td> 0.5 </td><td> 0 </td><td> 0.5  </td></tr>
    <tr><td>C  </td><td> 0 </td><td> 0.5 </td><td> 0.5 </td></tr>
    </tbody>
    </table>
  </div>
</div>

* In this example, the `$d_\text{BC}$` are all the same, and `$d_\text{JS}$` is undefined.

<div style="font-size: 16pt;">
$$
\begin{split}
d_{U}(A,B) = \frac{b_2 + b_3}{b_1+b_2+b_3+b_{1,2}} = \frac{0.13 + 0.73}{0.13+0.13+0.73+0.6} = \frac{0.86}{1.59} = 0.54\\[12pt]
d_{U}(B,C) = \frac{b_1 + b_2}{b_1+b_2+b_3+b_{1,2}} = \frac{0.13 + 0.13}{0.13+0.13+0.73+0.6} = \frac{0.26}{1.59} = 0.164
\end{split}
$$
<ul>
<li style="font-size: 24pt; margin-top: 12pt;">Samples B and C share the more distinct genus 3 in common.</li>
</ul>
</div>

---

# Multidimensional scaling

* Given a matrix of distances `$d_{ij}$`, classical [MDS](https://en.wikipedia.org/wiki/Multidimensional_scaling) embeds these points in a lower-dimensional space to minimize the stress function:<br/>
`$$
S = \sqrt{ \frac{\sum_{i<j}(d_{ij}-\delta_{ij})^2} {\sum_{i<j} d_{ij}^2} }
$$`
<br/>
where $\delta_{ij}$ is the distance between points $i$ and $j$ in the new space.
  * This is like squashing a marshmallow and toothpick sculpture onto a table.
* Also known as principal coordinates analysis (PCoA)

<small>
Source: Bartholomew <i>et al.</i> (2008) <a href="https://www.bristol.ac.uk/cmm/team/fs/aimdss-2nd-ed/downloads.html">Analysis of multivariate social science data.</a>
</small>

---

### Multidimensional scaling
# Goodness of fit

* Minimizing the stress function involves an [eigenvalue decomposition](https://en.wikipedia.org/wiki/Eigendecomposition_of_a_matrix) that we will skip over.
* The user has to specify the dimensionality of the new coordinate space, $k$.
  * Usually $k=2$ or $k=3$ so the results can be visualized.
* The [eigenvalues](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors) roughly represent the amount of variation explained by each dimension: $\lambda_i/\sum_i \max(\lambda_i, 0)$.
  * Negative eigenvalues imply that classical MDS is a poor approximation, and <a href="https://en.wikipedia.org/wiki/Multidimensional_scaling#Non-metric_multidimensional_scaling_(NMDS)">non-metric MDS</a> is recommended.

---

<div style="display: flex; align-items: center; justify-content: space-around;">
<div style="flex:1;">
  <h3>Multidimensional scaling</h3>
  <h1 style="line-height: 1.2; margin-bottom: 0;">Example: Plastic-specific bacteria in the oceans</h1>
  <ul style="font-size: 18pt; margin-top: 0pt;">
  <li>Scales <i>et al.</i> (2021) used 16S rRNA metabarcoding to study biofilms on microplastic and non-plastic particles in the Sargasso, Mediterranean, and Baltic seas.
  <li>Their classical MDS (PCoA) plot of Bray-Curtis dissimilarities showed that substrate had a greater effect on community than sample location.</li>
  </ul>
  <small>
  Source: Scales <i>et al.</i> (2021) <a href="https://journals.asm.org/doi/10.1128/msphere.00851-20">mSphere 6(3): e00851-20</a>. 
  </small>
</div>
<div style="flex:1;">
  <img src="/img/msphere.00851-20-f001.gif" height="200px">
  <img src="/img/msphere.00851-20-f002.gif" height="350px">
</div>
</div>


---

# Compositional data

<div style="display: flex; align-items: center; justify-content: space-around;">
<div style="flex: 1.3;">
<ul style="margin-left: 0;">
<li>Another problem is that the statistical methods that we will want to apply to these data generally assume independent observations.</li>
  <ul style="margin-left: 0;">
  <li>Observing a sequence from genus $A$ in a sample takes away a "spot" that would have been occupied by some other genus.</li>
  </ul>
<li>This cannot be fixed with rarefaction, which simply reduces the number of spots.</li>
</ul>
</div>
<div style="flex: 1; padding-left: 1ex;">
<img src="/img/compositional1.png">
<small>
Image credit: Gloor <i>et al.</i> (2017) <a href="https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2017.02224/full">Front Microbiol 8:2224</a>.
</small>
</div>
</div>

---

### Compositional data
# Spurious correlations

<div style="display: flex; align-items: center; justify-content: space-around;">
  <div style="flex: 1.2;">
    <ul>
    <li>Spurious correlation arises when the data are constrained by a fixed denominator, <i>e.g.</i>, proportions.</li>
      <ul style="margin-left: 0;">
      <li>For example, we can simulate communities by drawing species abundances at random, with one dominant species.</li>
      <li>This yields strong positive correlations between relative abundances, even though the absolute abundances are independent!</li>
      </ul>
    </ul>
  </div>
  <div style="flex: 1; margin-left: 1ex;">
    <img src="/img/pairs.svg" height="350px">
    <br/>
    <small>
    "Pairs" plot where each scatterplot (lower-left) compares pairs of five species in 200 samples, and Pearson correlation statistics are reported in the upper-right.
    </small>
  </div>
</div>

---

### Compositional data
# Transformations

* The centered log-ratio transformation (*clr*, Aitchison 1986) may be used to adjust for this effect.
* Given a sample $X = \\{x_1, x_2, \ldots, x_N\\}$ where $x_i$ is the count of the $i$-th taxon or OTU, and $N$ is the number of taxa or OTUs.
* The *clr* for $x_i$ is:
  $$
  \log\left(\frac{x_i}{\sqrt[N]{x_1\cdot x_2\cdot \ldots \cdot x_N}}\right) =
  \log(x_i) - \frac{1}{N}\sum_{j=1}^N \log (x_j)
  $$
  where the denominator is the [geometric mean](https://en.wikipedia.org/wiki/Geometric_mean).

---

### Compositional data
# Centered-log ratio example

<div style="display: flex; align-items: center; justify-content: space-around;">
  <div style="flex: 1;">
  Before correction
  <img src="/img/pairs.svg" height="350px">
  </div>
  <div style="flex: 1;">
  After correction
  <img src="/img/pairs-clr.svg" height="350px">
  </div>
</div>

---

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

<ul>
<li>Metabarcoding amplifies a single marker gene from different genomes, and involves chimera detection, OTU clustering, and taxonomic assignment.</li>
<li>A prominent method for taxonomic assignment is a naive Bayes classifier.</li>
<li>There are several distances used to compare the relative abundances of samples, <i>e.g.,</i> Bray-Curtis.</li>
<li>These data are compositional and susceptible to false positive correlations.</li>
</ul>

</section>
