# MIMM4750g
## Genetic distances
![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

# Genetic distances

* How do we measure how similar two sequences are?
* A [genetic distance](https://en.wikipedia.org/wiki/Models_of_DNA_evolution) is a function $d(x,y)$ that maps sequences $x$ and $y$ to some non-negative value.
* A [distance function](https://en.wikipedia.org/wiki/Metric_(mathematics)) $d$ should have the following properties:
	* $d(x,y) \ge 0$ for all $x,y\in \Omega$
	* If $x=y$, then $d(x,y)=0$
	* $d(x,y) = d(y,x)$ (symmetry)

---

# Genetic distances and the triangle inequality

<table>
  <tr>
    <td>
      <ul>
      <li>A genetic distance does <i>not</i> have to satisfy the triangle inequality, <i>i.e.,</i></li>
      $$d(x,z) \le d(x,y) + d(y,z)$$
      <li>Suppose sequence $x=A$, $y=G$ and $z=C$.</li>
      <li>Under what condition would the triangle inequality be violated?</li>
      </ul>
    </td>
    <td width="50%">
      <img src="/img/triangle-inequality.svg" width="400px"/>
    </td>
  </tr>
</table>

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

# Some examples of k-mer based distances

* Manhattan distance ($W = W_k(s) \cup W_k(t)$):
$$d(s, t) = \sum_{w\in W} |f(s,w) - f(t,w)|$$
* Euclidean distance:
$$d(s, t) = \sqrt{\sum_{w\in W} (f(s,w) - f(t,w))^2}$$
* Canberra distance:
$$d(s, t) = \sum_{w\in W}\frac{|f(s,w) - f(t,w)|}{|f(s,w)|+|f(t,w)|}$$

---

# Aligned sequences

* If we can align sequences, we can make biologically meaningful comparisons.
  * Which parts of the gene/genome are more variable? more conserved?
  * Which sequences are more closely related than others?
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

# Markov property

* The Jukes-Cantor model describes a Markov process.
* A process has the *Markov property* if the probability of state at time *t* depends only on the state at a previous time *and no further*.
* *i.e.,* the system has no memory.
* For example, [Snakes and Ladders](https://en.wikipedia.org/wiki/Snakes_and_Ladders) is a Markov process.

> What is another example of a process with no memory? A process **with** memory?

---

<section data-state="markov-slide">
    <h1>Markov models</h1>
    <ul>
      <li>Jukes-Cantor is an example of a <i>continuous time Markov model</i>.</li>
      <li>A system is in one of two or more discrete states.  After some random amount of time, it switches between states.</li>
    </ul>
    <center>
    <div id="markov" class="fig-container"
         data-fig-id="fig-markov"
         data-file="/include/markov-chain.html"
         style="height:300px">
    </div>
    <div></div>
    </center>
    <small><small><small>
    Based on <a href="http://setosa.io/blog/2014/07/26/markov-chains/index.html"/>Markov Chains: A visual explanation by Victor Powell</a>
    </small></small></small>
</section>

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

# Genetic distance clustering

* A [cluster](https://en.wikipedia.org/wiki/Cluster_analysis) is a group of observations that are more similar to each other than observations outside the cluster.
* In distance-based (pairwise) clustering, any pair of sequences with a distance below a threshold are assigned to the same cluster.
  * The selection of this threshold can be fairly subjective!
* Several applications of clustering for infectious diseases:
  * Defining a virus nomenclature (taxonomy)
  * Finding population-level associations with transmission patterns (epidemiology)
  * Detecting outbreaks (epidemiology)

---

# Defining new virus species

* The [International Committee on the Taxonomy of Viruses](https://talk.ictvonline.org/) allows the definition of a new virus species based on genetic clustering, although this remains controversial.

> Unfortunately, in recent years, ICTV Study Groups [...] have created large number of species on the basis of a single criterion, namely a certain percentage of genome similarity between individual viruses.

---

# Demarcating virus species

<img src="/img/geminivirus.png" height="300px"/>

<small><small>
Image credit: CM Fauquet <i>et al.</i> (2008) [Geminivirus strain demarcation and nomenclature](https://link.springer.com/article/10.1007%2Fs00705-008-0037-6).  Arch Virol 153:783-821.
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

# Further readings

* [Consensus statement: Virus taxonomy in the age of metagenomics](https://www.nature.com/articles/nrmicro.2016.177)
* [ICTV: Comments to proposed modification to code rule 3.21 (defining virus species)](https://talk.ictvonline.org/ictv1/f/general_ictv_discussions-20/3930/comments-to-proposed-modification-to-code-rule-3-21-defining-virus-species)
* [Hanage *et al.* (2006) Sequences, sequence clusters and bacterial species](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1764932/)