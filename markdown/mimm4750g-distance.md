# MBI 4750G
## Genetic distances

![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

# Genetic sequences

* A single infection can be represented by one sequence that is an average of the population.
  * Alternatively, we can sequence many individual genomes from an infection with high-throughput methods.
* A nucleotide sequence consists of `A`, `C`, `G` and `T`.
  * Uncertain or missing bases are represented by other letters.  For example, `N` represents *any* base.
* Sequences are easier to compare when they are *aligned*, such that [homologous](https://en.wikipedia.org/wiki/Homology_(biology)) nucleotides occupy the same horizontal position.

---

# Genetic distances

* How do we measure how similar two sequences are?
* A [genetic distance](https://en.wikipedia.org/wiki/Models_of_DNA_evolution) is a function $d(x,y)$ that maps sequences $x$ and $y$ to some non-negative value.
* A [distance function](https://en.wikipedia.org/wiki/Metric_(mathematics)) $d$ should have the following properties:
	* $d(x,y) \ge 0$ for all $x,y\in \Omega$
	* If $x=y$, then $d(x,y)=0$
	* $d(x,y) = d(y,x)$ (symmetry)

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

<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* A genetic distance is a function takes two sequences as input and produces a non-negative number.
* The Jukes-Cantor distance corrects for the problem of multiple hits.
* Distances can be used to cluster sequences, with several applications for epidemiology.
* For example, hepatitis C virus genomes are clustered into six genotypes at a distance threshold of 30%.

</section>
