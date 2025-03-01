# MBI 4750G
## The coalescent
<img src="https://imgs.xkcd.com/comics/strengths_and_weaknesses.png" width="800px"/>

---

# Review: Bayesian inference

* Bayesian inference is extremely useful for dealing with complex models like *trees*.
* A tree is a model that is made up of branching patterns and branch lengths.  This is a lot of parameters!
* A maximum likelihood estimate of a tree is only one point in a *massive* space of all possible trees.

---

<section data-state="numtrees-slide">
  <h1>How many trees?</h1>
  <ul>
    <li>There are an enormous number of possible trees relating even a small number of species!</li>
  </ul>
  <div id="howmany" class="fig-container"
        data-fig-id="fig-howmany"
        data-file="/include/numtrees.html"
        style="height:200px;">
  </div>

  <blockquote style="font-style: normal; font-weight: 500; padding: 24px;">
  Why are there always more possible rooted trees than unrooted trees?
  </blockquote>
</section>

---

# Review: Prior distributions

* A prior probability distribution represents our belief about the hypothesis $\theta$ *before* seeing the data.
  * An uninformative prior does not place weight on any value $\theta$.
* Setting an informative (narrow) prior can mean we waste less time sampling unrealistic values of $\theta$.
  * This might help us deal with the size of tree space.

---

# Priors on trees

* We've learned about priors on continuous variables.  There are also priors for discrete variables.
* What about trees?
* We'd need some way of arranging trees along a meaningful axis in order to draw a prior distribution the usual way.

<img src="/img/silly-tree-prior.png" width="500px"/>

---

# Common ancestry

* A tree is a model of common ancestry.
* How far back in time do we have to go to reach the common ancestor of two people we pick at random?
* Assumptions:
  1. Every individual has the same chance of contributing offspring (no selection).
  2. The size of the population does not change.
  3. Everyone reproduces at the same time and dies (discrete generations).
  4. The size of the population is large.

---

# The coalescent

* To make things simple, assume everyone has one and only one ancestor (pathogens!).
* The probability that two *randomly sampled* individuals have a common ancestor in the previous generation is $1/N$
  * $N$ is the population size.
* Every individual is equally likely to be the ancestor.

---

<section data-state="coalescent-slide">
    <div id="coalescent" class="fig-container"
         data-fig-id="fig-coalescent"
         data-file="/include/coaltrace.html"
         style="height:600px">
    </div>
    <small><small><a href="http://bedford.io/projects/coaltrace/">coaltrace</a> by Trevor Bedford</small></small>
</section>

---

# Review: Geometric distribution

* The expected number of generations we go back is described by a [geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution):
  $$P(t) = (1-p)^{t-1} p$$

* $t-1$ "failures" until a success.

* $p=1/N$, gives us:
  $$P(t) = \left(1-\frac{1}{N}\right)^{t-1} \frac{1}{N}$$

---

# Mean time to ancestor

* The mean for the geometric distribution is simply $1/p$.
  * Since $p=1/N$, we expect to go $N$ generations until we reach the common ancestor of two random individuals.
* *We can learn something about the entire population from sampling a much smaller number of individuals.*
* The model assumes that only one coalescent event can occur per generation!
  * Compatible with small sample size relative to population.

---

# Sampling more than two

<table>
  <tr>
    <td style="font-size: 20pt">
      <ul>
        <li>If we sample $n$ individuals at random, then there are
        $${n\choose 2} = \frac{n!}{(n-2)!2!} = \frac{n(n-1)}{2} \text{ pairs.}$$
        </li>
        <li>We multiply the $p$ by this amount (go back in time until <i>any</i> pair coalesces).</li>
        <li>After each coalescence, we subtract 1 from $n$.  The total coalescence rate gets slower!</li>
      </ul>
    </td>
    <td width="30%">
      <img src="/img/rcoal.png"/>
    </td>
  </tr>
</table>

---

# The MRCA

* MRCA = most recent common ancestor.
* The "most recent" recognizes the idea that the ancestor of the MRCA is *also* a common ancestor of the entire sample.
* The *total* mean time to get to the MRCA of all *n* individuals:

  $$2N\sum_{k=n}^{2} \frac{1}{k(k-1)} = 2N\left(1-\frac{1}{n}\right) \xrightarrow[]{n\rightarrow \infty} 2N \textrm{ generations}$$

---

# Sampling the MRCA

* One of the interesting results of the coalescent is that we don't have to sample many descendants to sample the ancestor.
$$E[T_{\textrm{MRCA}}] = 2N\left(1-\frac{1}{n}\right)$$
* We converge rapidly to $2N$ with increasing sample size $n$.
* NOTE: the coalescent says nothing about which nodes are related!

---

# Continuous approximation

* We've been assuming discrete, non-overlapping generations, but time is continuous!
* The continuous analogue of the geometric distribution is the [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution).
* The coalescent process can be described in continuous time with a series of exponential distributions ($k=\\{n, n-1, \ldots, 2\\}$):
$$f(\tau_k)=\lambda_k \exp(-\lambda_k \tau_k),\\; \lambda_k = \frac{{k\choose 2}}{N}$$

---

# Effective population size

* The *effective* population size ($N_e$) is what $N$ *would* be if the population actually met all  assumptions of the coalescent model.
* Some examples of $N_e$ estimates:

| Species | $N_e$ |
|---------|-------|
| *Homo sapiens* | 10,400 |
| *Drosophila melanogaster* | 1,150,000 |
| *Caenorhabditis elegans* | 80,000 |
| *Escherichia coli* | 25,000,000 |

<small><small>
Source: Brian Charlesworth (2009). Effective population size and patterns of molecular evolution and variation.  <a href="https://www.nature.com/articles/nrg2526">Nature Rev Genet 10: 195-205</a>.
</small></small>

---

# Effective sizes for pathogens

* The model is even worse for pathogens!
* Pathogen populations are even more structured than "large organism" populations.
  * Each host is a population.
  * We usually use one bulk (average) sequence from each host!
* We often talk about *effective number of infections*, but it is a lot more complicated  ([Frost and Volz 2010](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2880113/)).

---

# Within-host coalescent

* We can reconstruct a tree relating copies of a pathogen genome within a single host.
  * Technically, this tree is a geneaology, not a phylogeny, because it relates individuals and not populations.
* The coalescent model was applied to HIV-1 within host trees to estimate $N_e=10^3-10^4$ (*e.g.*, [Leigh Brown 1997](https://www.pnas.org/content/94/5/1862.short)).
  * High $N_e$ implies deterministic evolution, whereas low $N_e$ means stronger genetic drift.

---

# Generation time

* The time to coalescent events is expressed in units of generations.
  * We have to know the generation time $g_c$ in order to express this in units of real time!
$$T_{\textrm{MRCA}} = 2N_e\textrm{ generations} \times g_c \frac{\textrm{years}}{\textrm{generation}}$$

* If we have another way of estimating $T_{\textrm{MRCA}}$ or take the time elapsed between samples, then we can solve for $g_c$.
  * This method was used to estimate $g_c$ for HIV-1 within hosts (1.2 days; [Rodrigo *et al.* 1999](https://www.pnas.org/content/96/5/2187.short)).

---

# Generation time for pathogens

* In epidemiology, the [generation time](https://royalsocietypublishing.org/doi/10.1098/rsif.2020.0756) ($G_{ij}$) is the expected waiting time between two infections in a transmission chain.
* Serial interval ($S_{ij}$) is time between symptomatic onsets.

<img src="/img/rsif.2020.0756.svg" width="400px"/>

<small><small>
Image source: Lehtinen <i>et al.</i> (2020) <a href="https://royalsocietypublishing.org/doi/full/10.1098/rsif.2020.0756">J R Soc Interface 18: 20200756</a>.
</small></small>

---

# Adding the tree prior

* We use the coalescent as a prior distribution on trees, $P(T|\Theta)$.
  * $N_e$ is a parameter of the tree prior (a [hyperparameter](https://en.wikipedia.org/wiki/Hyperparameter)) to estimate from the data.
  * It has its own prior distribution (a [hyperprior](https://en.wikipedia.org/wiki/Hyperprior)) with parameters that go into $\Theta$.

$$P(T, \Theta|D) = \frac{P(D |T,\Theta)\color{red}{P(T,\Theta)}}{P(D)} = \frac{P(D|T, \Theta) \color{red}{P(T|\Theta) P(\Theta)}}{P(D)}$$

---


<section data-background="#333" style="color:white">

<h1 style="color:white">Key points</h1>

* A tree prior is a probability distribution on an enormous space of all possible trees.
* The coalescent is a model of how individuals sampled from a population share common ancestors in the past.
  * Because the coalescent defines a probability for any tree, it can be used as a tree prior.
* The time to common ancestors depends more on the total population size ($N$) than the sample size ($n$).
  * The effective population size $N_e$ is the size if every assumption of the coalescent is true.


</section>
