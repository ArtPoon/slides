# MIMM4750g
## Genetic distances
![](https://imgs.xkcd.com/comics/genetic_testing.png)

---

# Aligned sequences

* Now that we can align sequences, we can make biologically meaningful comparisons.
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
  
* Call a site polymorphic if MAF is greater than 1% and less than 5%.

---

# Sequence entropy

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

# Applications of diversity measures

* Which regions of the genome are the most conserved (least diverse)?
* Conserved regions can make good targets for antibodies.

<img src="https://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0044163.g003&type=large" width="400px"/>
<small>Entropy plot of HIV-1 <i>env</i> sequences in asymptomatic chronic HIV-1 patient (10.1371/journal.pone.0044163)</small>

---

# Genetic distances

* Another approach to quantify diversity is to use a distance measure
* A genetic distance is a function $d(x,y)$ that maps sequences $x$ and $y$ to some non-negative value.
* It should have the following properties:
	* $d(x,y) \ge 0$ for all $x,y\in \Omega$
	* If $x=y$, then $d(x,y)=0$
	* $d(x,y) = d(y,x)$ (symmetry)
* It does *not* have to satisfy the triangle ineqaulity: $d(x,z) \le d(x,y) + d(y,z)$

---

# p-distances

* The simplest distance is to count the number of different residues.
```
GGGTTGCGCTCGTTG
||| ||| |||| ||  = 3 differences
GGGATGCACTCGCTG
```
* This is called the [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance).
* Hamming distance (HD) increases with sequence length.  
* We can divide the HD by sequence length.  This gives us the p-distance (*p* is for *proportional*).

> What is the p-distance for the above example?

---

# Multiple hits

* A big problem with the Hamming and *p*-distances is that they tend to  underestimate the amount of evolution.
* Suppose we are tracking the evolution of a sequence `AAAA`
* A single mutation occurs resulting `AGAA` ($p=0.25$)
* As we continue to accumulate mutations, the chance that we mutate a site *that has already undergone a mutation* increases.
* Multiple hits mask evidence of previous evolution (`A` $\rightarrow$ `G` $\rightarrow$ `A`).

---

# Modeling evolution

* Let's make a few lousy assumptions:
  1. Each residue in a sequence evolves independently of the others.
  2. A residue mutates to another at a rate that is constant over time.
  3. A residue is equally likely to mutate to any of the other residues.
  4. The frequency of every residue is the same.
* These define the *Jukes-Cantor* model.

---

<section data-state="markov-slide">
    <h1>Jukes-Cantor model</h1>
    <ul>
      <li>Based on a computer program written by grad student Charles Cantor in 1966.</li>
      <li>It is an example of a *continuous time Markov model*.</li>
    </ul>
    <center>
    <div id="markov" class="fig-container"
         data-fig-id="fig-markov"
         data-file="/include/markov-chain.html"
         style="height:300px">
    </div>
    <div></div>
    </center>
    <small>Based on JS by [Victor Powell](http://setosa.io/blog/2014/07/26/markov-chains/index.html)</small>
</section>

---

# Markov processes

* The Jukes-Cantor model describes a Markov process.
* A process has the *Markov property* if the probability of state at time *t* depends only on the state at a previous time *and no further*.
* *i.e.,* the system has no memory.
* For example, [Snakes and Ladders](https://en.wikipedia.org/wiki/Snakes_and_Ladders) is a Markov process.

> What is another example of a process with no memory? A process **with** memory?

---

# Jukes-Cantor formula

* Because of multiple hits, the actual number of mutations tends to be *greater* than the number of visible differences.
* Given a p-distance ($p$) between two sequences, the JC estimated number of mutations ($\hat{d}$) is:

  $$\hat{d}=-\frac{3}{4}\ln\left(1-\frac{4}{3}p\right)$$

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

# INCA Question #3

> Why does this calculator occasionally report a "Jukes-Cantor adjustment" of `NaN`?  (Not a Number)

Hint: think about some of the assumptions of the Jukes-Cantor model.

Another hint: The log of $x\le 0$ is not a number (undefined).

---

# Why does this matter?

* The Jukes-Cantor model enables us to estimate the divergence time of two populations (species or infections) more accurately.
* Two distantly related species might otherwise look about the same as more closely related species.

---

# Improvements to Jukes-Cantor

* Kimura's two-parameter distance (1980, K2P) has different rates for transitions and transverions.
* Tajima-Nei's (1984) distance allows unequal nucleotide frequencies.
* Tamura 3-parameter distance (1992) extends K2P to allow for GC-content bias.
* Tamura-Nei (1993, TN93) has two rates for transitions and a transverion rate, and unequal nucleotide frequencies.

---

# Which distance should I use?

* It is fairly likely that the assumption of equal nucleotide frequencies is broken.
* The HIV-1 genome is roughly 40% A's.
* The Actinobacteria (including *Streptomyces*) are also known as "high G+C Gram-positive bacteria".
* Transition/transversion bias is ubiquitous.
* Nowadays we seldom see distances other than TN93 in use.

---

# Software for calculating distances

* [MEGA](https://www.megasoftware.net/) - user-friendly software for sequence analysis.
* `dist.dna` function in the *R* package `ape`
* [tn93](https://github.com/veg/tn93) - a very fast TN93 calculator in C++

---

# BioPython demonstration
