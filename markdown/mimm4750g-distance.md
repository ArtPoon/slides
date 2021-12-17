# MIMM4750g
## Genetic distances
![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

# Aligned sequences

* Now that we can align sequences, we can make biologically meaningful comparisons.
  * Which parts of the gene/genome are more variable? more conserved?
  * Which sequences are more closely related than others?
* It is far easier to measure similarity when the sequences are aligned.

```
GGGTTGCGCTCGTTG    GGGTTGCGCTCGTTG
|| |        |      ||| ||| |||| ||
GGTTGCGCTCGTTGA    GGGATGCACTCGCTG
```

---

# Diversity

* There are several ways to measure sequence diversity.
  * Fraction of polymorphic sites - what counts as a polymorphism?
  * Minor allele frequency (MAF): the frequency of the *second*-most common residue
  <img src="/img/MAF.png" width="500px"/>
  * Sequence entropy

* Convention is to label a site as [polymorphic](https://en.wikipedia.org/wiki/Gene_polymorphism) if MAF is greater than 1% and less than 5%.

---

`$$\alpha + \beta = 1$$`

---

# Diversity: Sequence entropy

<table>
  <tr>
    <td width="50%">
      <ul>
      <li>
        The concept of entropy comes from <a href="https://en.wikipedia.org/wiki/Information_theory">information theory</a>.
      </li>
      <li>
        For each site, we calculate:
        $$S = -\sum_i p_i \log p_i$$
        where $p_i$ is the frequency of the $i$-th residue at that site.
      </li>
      <li>Entropy is highest when residues appear at equal frequency.</li>
    </td>
    <td width="50%">
      <img src="/img/entropy.png"/>
    </td>
  </tr>
</table>

---

# Diversity: polymorphisms

* Frequency of polymorphic sites
* Mean nucleotide or amino acid entropy - calculate entropy at each site, and then take the average:
  $$\bar{S} = \sum_{j=1}^L S_j / L $$
* Nucleotide diversity ($\pi$): the average number of differences between two randomly sampled sequences

`$$\pi = \frac{2\sum_i \sum_j \pi_{ij}}{n(n-1)}$$`

---

# Applications of diversity measures

* Which regions of the genome are the most conserved (least diverse)?
* Conserved regions can make good targets for antibodies.

<img src="https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0044163.g003&type=large" width="400px"/>

<small><small>
Entropy plot of HIV-1 <i>env</i> sequences in asymptomatic chronic HIV-1 patient.  From Chaillon <i>et al.</i> 2012. [PLOS ONE 7:e44163](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0044163).
</small></small>

---

# Genetic distances

* Another approach to quantify diversity is to use a distance measure (comparing pairs of sequences).
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

<section data-state="jukes-slide">
    <h1>Jukes-Cantor simulation</h1>
    <br/>
    <div id="jukes" class="fig-container"
         data-fig-id="fig-jukes"
         data-file="/include/jukes-cantor.html"
         style="height:4000px">
    </div>
</section>

---

# In-class exercise

$$\hat{d}=-\frac{3}{4}\ln\left(1-\frac{4}{3}p\right)$$

> At what p-distance does the Jukes-Cantor formula fail?

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
