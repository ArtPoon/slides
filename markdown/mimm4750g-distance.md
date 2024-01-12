# MBI 4750G
## Genetic distances

![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

# Genetic sequences

* A single infection can be represented by one sequence that is an average of the population.
  * Alternatively, we can sequence many individual genomes from an infection with high-throughput methods.
* A nucleotide sequence consists of `A`, `C`, `G` and `T`.
  * Uncertain or missing bases are represented by other letters.  For example, `N` represents *any* base.

---

# Genetic distances

* How do we measure how similar two sequences are?
* A [genetic distance](https://en.wikipedia.org/wiki/Models_of_DNA_evolution) is a function $d(x,y)$ that maps sequences $x$ and $y$ to some non-negative value.
* A [distance function](https://en.wikipedia.org/wiki/Metric_(mathematics)) $d$ should have the following properties:
	* $d(x,y) \ge 0$ for all $x,y\in \Omega$
	* If $x=y$, then $d(x,y)=0$
	* $d(x,y) = d(y,x)$ (symmetry)

---

# Alignment-free methods

* A $k$-mer is a substring of length $k$ characters.
  * For example, `GGGTT` has the following 2-mers: `GG`, `GT` and `TT`.
* Map a sequence to a "feature space" of all possible k-mers for given k.
  * Let $W_k(s)$ represent the set of all k-mers in sequence $s$.
  * Let $f(s, w)$ represent the frequency of k-mer $w\in W_k(s)$.
* We can compare two sequences by comparing their frequency distributions $f(s, w)$ and $f(t, w)$.

---

<img src="https://media.springernature.com/full/springer-static/image/art%3A10.1186%2Fs13059-017-1319-7/MediaObjects/13059_2017_1319_Fig1_HTML.gif" width="600px"/>

<small><small>
Image credit: A Zielezinski <i>et al.</i> 2017, [Alignment-free sequence comparison: benefits, applications, and tools]((https://genomebiology.biomedcentral.com/articles/10.1186/s13059-017-1319-7)).  <i>Genome Biol</i> 18:186.
</small></small>

---

# Pros and cons of alignment-free methods

* Linear [time complexity](https://en.wikipedia.org/wiki/Time_complexity): we only have to calculate the quantities $W_k(s)$ and $f(s, w)$ once for each sequence $s$.
  * Alignment is quadratic with the length of the two sequences $s$ and $t$.
* There are nearly 100 different alignment-free methods - which one should we use?
* By breaking a sequence down into "words", we lose information about where these features are.
  * In fact, we can use alignment-free methods to compare completely unrelated sequences!

---

# Aligned sequences

* If we can align sequences, we can make more biologically meaningful comparisons.
  * Which parts of the gene/genome are more variable? more conserved?
  * Are there parts of a sequence that was inserted?  deleted?
* It is far easier to measure similarity when the sequences are aligned.

```
GGGTTGCGCTCGTTG    GGGTTGCGCTCGTTG
|| |        |      ||| ||| |||| ||
GGTTGCGCTCGTTGA    GGGATGCACTCGCTG
```

---

# p-distances

* The simplest distance is to count the number of different residues, <i>i.e.</i>,  the [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) (HD):
```
GGGTTGCGCTCGTTG
||| ||| |||| ||  = 3 differences
GGGATGCACTCGCTG
```
* HD increases with sequence length.
* We can divide the HD by sequence length.  This gives us the [p-distance](https://www.megasoftware.net/web_help_7/hc_p_distance_nucleotide.htm) (*p* is for *proportional*).

> What is the p-distance for the above example?

---

# Multiple hits

* A big problem with the Hamming and *p*-distances is that they tend to  underestimate the amount of evolution.
  * Suppose we are tracking the evolution of a sequence `AAAA`
  * A single mutation occurs resulting in `AGAA` ($p=0.25$)
  * As we continue to accumulate mutations, the chance that we mutate a site *that has already undergone a mutation* increases.
* Multiple hits mask evidence of previous evolution (`A` $\rightarrow$ `G` $\rightarrow$ `A`).

---

# Modeling multiple hits

* Let's make a few lousy assumptions:
  1. Each residue in a sequence evolves independently of the others.
  2. A residue mutates to another at a rate that is constant over time.
  3. A residue is equally likely to mutate to any of the other residues.
  4. The frequency of every residue is the same.
* These define the *Jukes-Cantor* model.

---

# Jukes-Cantor formula

* Because of multiple hits, the actual number of mutations tends to be *greater* than the number of visible differences.
* Given a p-distance ($p$) between two sequences, the JC estimated number of mutations ($\hat{d}$) is:

  $$\hat{d}=-\frac{3}{4}\ln\left(1-\frac{4}{3}p\right)$$

* Note this is the mean (expected) estimate &mdash; evolution is stochastic, so there will be variation around this mean!

---

<section data-state="jukes-slide"
    <br/><br/><br/>
    <div id="jukes" class="fig-container"
         data-fig-id="fig-jukes"
         data-file="/include/jukes-cantor.html"
         style="height:800px">
    </div>
</section>

---

# Why does this matter?

* The Jukes-Cantor model enables us to estimate the divergence time of two populations (species or infections) more accurately.
* Two distantly related species might otherwise look about the same as more closely related species.
  * The expected p-distance asymptotes to a maximum value.
  * A small change in p-distance can imply an enormous change in evolutionary time.

---

# Improvements to Jukes-Cantor

* [Kimura](https://en.wikipedia.org/wiki/Motoo_Kimura)'s two-parameter distance (1980, K2P) has different rates for transitions and transverions.
* [Tajima](https://www.genetics.org/content/204/2/389)-[Nei](https://en.wikipedia.org/wiki/Masatoshi_Nei)'s (1984) distance allows unequal nucleotide frequencies.
* [Tamura](http://www.biol.se.tmu.ac.jp/member/tamura/en/) 3-parameter distance (1992) extends K2P to allow for GC-content bias.
* Tamura-Nei (1993, TN93) has two rates for transitions and a transverion rate, and unequal nucleotide frequencies.

---

# Which distance should I use?

* It is fairly likely that the assumption of equal nucleotide frequencies is broken.
  * The [HIV-1 genome](https://en.wikipedia.org/wiki/Structure_and_genome_of_HIV) is roughly 40% A's.
  * The [Actinobacteria](https://en.wikipedia.org/wiki/Actinobacteria) (including *Streptomyces*) are also known as "high G+C [Gram-positive bacteria](https://en.wikipedia.org/wiki/Gram-positive_bacteria)".
* Transition/transversion bias is ubiquitous.
* TN93 is the most realistic distance for which a [closed-form expression](https://en.wikipedia.org/wiki/Closed-form_expression) exists.

---

# Software for calculating distances

* [MEGA](https://www.megasoftware.net/) - user-friendly software for sequence analysis.
* `dist.dna` function in the *R* package `ape`
* [tn93](https://github.com/veg/tn93) - a very fast TN93 calculator in C++

---

# Distance clustering

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

# Further readings

* [Consensus statement: Virus taxonomy in the age of metagenomics](https://www.nature.com/articles/nrmicro.2016.177)
* [Hanage *et al.* (2006) Sequences, sequence clusters and bacterial species](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1764932/)
* [Bioinformatics of Infectious Diseases: Genetic diversity](https://artpoon.github.io/BioID/Clustering.html) - an online textbook (in progress)
* [An extended IUPAC nomenclature code for polymorphic nucleic acids](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2865858/)

