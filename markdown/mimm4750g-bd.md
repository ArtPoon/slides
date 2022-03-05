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

* These differential equations have a closed form solution

---

# Suggested readings

* [Phylogenetic Comparative Methods](https://lukejharmon.github.io/pcm) (online textbook), Luke Harmon