# MBI 4750G
## Birth-death models
![](https://imgs.xkcd.com/comics/natural_parenting.png)

---

# Review: The coalescent

* The coalescent model assumes that the sample is small relative to the population size ($n\ll N$).
  * This means that the probability of encounting two or more common ancestors in the same generation is negligibly small.
* It also assumes no selection &mdash; that every individual has the same probability of leaving descendants in the next generation.
  * There are extensions of the coalescent model that relax this assumption (ancestral selection graphs), but they are too complex to use in practice.

---

# Birth-death models

* Coalescent models are not the only tree priors in BEAST!
* Recall that a Markov process means a stochastic process that has no memory.
  * The probability of a state change at time $t$ only depends on the current state and nothing else.
* A birth-death model is a continuous-time Markov process that describes how the size of a population changes over time.

---

# Yule model

* Let's start with a "pure birth" process or Yule (1925) model.
  * $N(t)$ is the size of the population at time $t$.
  * The birth rate is $\lambda_N = N(t)\lambda$.
  * The time between births is exponentially distributed with rate $\lambda_N$.
![](/img/bdtree.svg)
<small><small>
A realization of a pure birth process using the `bdtree` function in R package `phytools`.
</small></small>

---

# Differences from the coalescent

* Birth-death models are processes that move forward in time.
* The number of tips is a random outcome.
  * For the coalescent,  the number and times associated with tips are *data*.
* For BD models, we have to model how infections are sampled from the population.
  * The simplest model is that a given number $n$ is sampled at the same time.

---

# Birth-death processes

* Let every lineage go extinct ("death") at a rate $\mu$.
* At a lineage level, the waiting time till either birth or death is exponentially distributed:
$$\tau \sim (\lambda + \mu) e^{-(\lambda+\mu)\tau}$$
* The probability that the next event is a birth is:
$$\frac{\lambda}{\lambda+\mu}$$

---

# Deterministic growth or decay

<table>
<tr>
  <td style="font-size: 20pt;">
    <ul>
      <li>The net diversification rate is $r=\lambda-\mu$.</li>
      <li>The deterministic (expected) number of lineages at time $t$ is simply an exponential growth model:</li>
    </ul>
    $$N_t = N_0 e^{r t}$$
  </td>
  <td width="50%">
    <img src="https://lukejharmon.github.io/pcm/images/figure10-3.png" height="400px"/>
    Expected number of lineages for $r>0$ (top line) and $r<0$ (bottom line).
  </td>
</tr>
</table>

<small><small>
Image source: Luke Harmon, Phylogenetic Comparative Methods, <a href="https://lukejharmon.github.io/pcm/chapter10_birthdeath/">Chapter 10</a>.
</small></small>

---

# Stochastic growth

* Let $p_n(t)$ be the probability of $n$ lineages existing at time $t$.
* We can write the following differential equations:

`$$
\begin{align}
\frac{dp_0(t)}{dt} = &\; \mu p_1(t)\\[6pt]
\frac{dp_n(t)}{dt} = &\; (n-1)\lambda p_{n-1}(t) - n(\lambda+\mu) p_n(t) +\\
 &\; (n+1)\mu p_{n+1}(t)\\
\end{align}
$$`

---

# Stochastic growth

* These differential equations have a closed form solution.  
  * For the simplest case where we start with one lineage at $t=0$:

`$$
\begin{align*}
p_0(t)&=\alpha & p_n(t) &= (1-\alpha)(1-\beta)\beta^{n-1}\\[6pt]
\alpha &= \frac{ \epsilon (e^{rt}-1) }
              { e^{rt} - \epsilon } &
\beta &= \frac{\alpha}{\epsilon}\\[6pt]
\epsilon &= \frac{\mu}{\lambda} & r &= \lambda - \mu\\
\end{align*}
$$`

* $\alpha$ is the probability of going extinct before time $t$.

<small><small>
Source: Luke Harmon, <a href="https://lukejharmon.github.io/pcm/chapter10_birthdeath/">Phylogenetic comparative methods, chapter 10</a>.
</small></small>

---

Probability distributions for $\lambda=0.1$, $t=5.0$, and $\mu=0$ or $\mu=0.05$

![](/img/bddists.svg)

```R
bddist <- function(t, n, lambda, mu) {
  eps <- mu/lambda; r <- lambda-mu; ert <- exp(r*t)
  alpha <- eps*(ert-1)/(ert-eps); beta <- (ert-1)/(ert-eps)
  pn <- (1-alpha)*(1-beta)*beta^(1:n-1)
  c(alpha, pn)
}
```


---

# Tree probability

* How do we calculate the probability of a tree under a birth-death model?
* We assume *complete sampling*: all $n$ lineages that have survived to the present day have been sampled.
* Let the root of the tree, where a lineage splits into two (the first birth event), have time $t_1$.
  * There are $n-1$ splits at times $t_1, t_2, \ldots, t_{n-1}$.
  * We will measure time in reverse, so the most recent time is 0, and $t_{i-1} > t_{i}$.

---

# Tree probability (2)

<table>
  <tr>
    <td>
      <ul>
        <li>Let $D_N(t)$ be the probability that a lineage at some time $t$ in the past is ancestral to a present-day subtree (clade) $N$.</li>
        <li>Let $E(t)$ be the probability that a lineage at time $t$ leaves no descendants in the present day.</li>
        <li>Start at the tips of the tree and calculate $D_N(t)$ and $E(t)$, moving back towards the root.</li>
      </ul>
    </td>
    <td width="40%">
      <img src="/img/figure11-5.png"/>
      $D_N(t)=1$ for sampled tips.
      <small>
      Source: Luke Harmon, <a href="https://lukejharmon.github.io/pcm/chapter10_birthdeath/">Phylogenetic comparative methods, chapter 10</a>.
      </small>
    </td>
  </tr>
</table>

---

# Tree probability (3)

* We use differential equations to solve for how $D_N(t)$ and $E(t)$ change as we move along a branch back in time:

`$$
\begin{align}
\frac{dD_N(t)}{dt} &= -(\lambda+\mu)D_N(t) + 2\lambda E(t) D_N(t)\\[6pt]
\frac{dE(t)}{dt} &= \mu - (\mu+\lambda)E(t) + \lambda E(t)^2\\
\end{align}
$$`

* For the case of complete sampling and constant rates $\mu$ and $\lambda$, these have a closed-form solution.

---

# Tree probability (4)
* When we reach a branching point, we combine probabilities:

$$D_{N'}(t) = D_N(t) D_M(t) \lambda$$

* To calculate the joint probability of the tree, we multiply across all $2n-2$ nodes (branches) of the tree.
<img src="https://lukejharmon.github.io/pcm/images/figure11-7.png" height="250px"/>

<small><small>
Source: Luke Harmon, <a href="https://lukejharmon.github.io/pcm/chapter10_birthdeath/">Phylogenetic comparative methods, chapter 10</a>.
</small></small>

---

# Incomplete sampling


<img src="https://lukejharmon.github.io/pcm/images/figure10-5.png" height="300px"/>

* In complete sampling, extinct lineages (A) cannot be sampled (B).
* Sampling is almost always incomplete (C).

<small><small>
Source: Luke Harmon, <a href="https://lukejharmon.github.io/pcm/chapter10_birthdeath/">Phylogenetic comparative methods, chapter 10</a>.
</small></small>

---

# Incomplete sampling (2)

* If we don't account for incomplete sampling, then our estimates of $\mu$ and $\lambda$ will be biased.
* If sampling of tips is completely at random, then we can just modify each $D_N(0)$ from $1$ to $1-\rho$.
  * $\rho$ is the "sampling probability" or "fraction".
* $E(0)$ increases from $0$ to $\rho$ - failing to be sampled is the same as going extinct.

---

# Birth-death models for infectious diseases

* There needed to be further improvements to the birth-death model before it could be used for infectious diseases.
* The current model assumes that all tips are sampled at a single time point.
  * Infections are sampled at different points in time (serial sampling).
* We assume that birth and death rates are constant over time.
  * Birth and death rates change with the number of infected and susceptible hosts.

---

# Suggested readings

* [Phylogenetic Comparative Methods](https://lukejharmon.github.io/pcm) (online textbook), Luke Harmon
* [Bayesian evolutionary analysis with BEAST 2](https://ocul-uwo.primo.exlibrisgroup.com/permalink/01OCUL_UWO/r0c2m8/alma991045009498005163), Drummond and Bouckaert, eds.
