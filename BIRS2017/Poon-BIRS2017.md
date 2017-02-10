# Likelihood-free inference on tree shapes with kernel methods
## Art Poon
### Western University, London, Canada

---

# Learning from tree shapes
* *Phylodynamics* is the study of how phylogenetic trees are shaped by biological processes
* Roots in speciation models?
* Presently dominated by applications in infectious diseases (*e.g.*, influenza A virus, HIV)

---

# Lineages through time
![](/img/nLTT.svg)

---

# Coalescent
![](/img/coalescent-exponential.svg)

---

# Components of tree shapes

1. Branching order (topology)
2. Branch lengths (node heights)

LTT and coalescent have closed form solutions on node heights.

---

# Tree topologies are difficult to measure

* Imbalance statistics

* *e.g.,* Sackin's index: $\sum_{i=1}^{n} I_i/n$, where $I_i$ is depth of $i$-th tip

* But see Colijn (2016 MBE; 2014 EMPH)


---

# Kernel methods

* Consider complex objects $x_1, x_2 \in \mathcal{X}$

* Kernel function $\phi $ maps objects from $\mathcal{X}$ to a high dimensional feature space $\mathcal{F}$

* Feature space is extremely large!

* Taking inner product of two objects mapped to $\mathcal{F}$ skips over an enormous number of absent features

---

## Kernel adapted from natural language processing

 `$$K(T_1, T_2) = \sum_{n_1\in T_1}\sum_{n_2\in T_2} \Delta(n_1, n_2)$$`
 `$$\Delta(n_1, n_2) = \lambda \begin{cases} 1 & \text{if both tips} \\  k_G(n_1,n_2) (1+\Delta())  & \text{otherwise} \end{cases}$$`


---

# ABC

