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